<?php
/**
 * Webhook GitHub → git pull sur o2switch.
 * Le secret n’est PAS dans Git : fichier deploy-secret.php à côté.
 */
header('Content-Type: text/plain; charset=utf-8');

$secretFile = __DIR__ . '/deploy-secret.php';
if (!is_file($secretFile)) {
    http_response_code(404);
    exit('Not found');
}

$secret = require $secretFile;
if (!is_string($secret) || $secret === '') {
    http_response_code(500);
    exit('Secret missing');
}

$payload = file_get_contents('php://input') ?: '';
$sig = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';
$expected = 'sha256=' . hash_hmac('sha256', $payload, $secret);

if ($sig === '' || !hash_equals($expected, $sig)) {
    http_response_code(403);
    exit('Forbidden');
}

$data = json_decode($payload, true);
$ref = is_array($data) ? ($data['ref'] ?? '') : '';
if ($ref !== '' && $ref !== 'refs/heads/main') {
    exit('Ignored branch');
}

$git = '/usr/local/cpanel/3rdparty/bin/git';
if (!is_executable($git)) {
    $git = 'git';
}

chdir(__DIR__);
$cmd = escapeshellcmd($git) . ' pull --ff-only origin main 2>&1';
exec($cmd, $out, $code);
echo implode("\n", $out) . "\n";
http_response_code($code === 0 ? 200 : 500);
exit($code === 0 ? 'OK' : 'FAIL');
