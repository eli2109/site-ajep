# Site AJEP

Landing page de l’**Association des Jeunes et Étudiants de Puteaux**.

Ouvre `index.html` dans un navigateur, ou sers le dossier :

```bash
cd "/Users/tanguy/Documents/site AJEP"
python3 -m http.server 8080
```

Puis va sur http://127.0.0.1:8080

## À brancher

Dans `js/config.js` :

- `whatsapp` : numéro international sans `+` (ex. `33612345678`)
- `email` : adresse de contact
- `instagram` : URL du compte, si vous en avez un

## Photos à remplacer

Chaque visuel porte un badge **Photo à remplacer — …**. Les fichiers sont dans `images/` :

| Fichier | Sujet |
|---|---|
| `hero.jpg` | Jeunes réunis, étudiant / discutant |
| `axe-etudier.jpg` | Espace de travail, révisions |
| `axe-apprendre.jpg` | Cours, livres, discussion |
| `axe-fetes.jpg` | Table de fête, convivialité |
| `axe-rencontrer.jpg` | Jeunes autour d’une table |
| `axe-decouvrir.jpg` | Université d’été, projets |
| `rdv-leil-shishi.jpg` | Soirée d’étude + repas |
| `rdv-samedi.jpg` | Étude du Tanakh |
| `rdv-dimanche.jpg` | Cours de Talmud |
| `activite-*.jpg` | Les 5 activités |
| `mission.jpg` | Échange autour d’un texte |

Garde les mêmes noms de fichiers, ou mets à jour les `src` dans `index.html`.

## Intervenants

Les 4 cartes sont des placeholders (nom, photo, bio). Remplace-les dans la section `#intervenants` de `index.html`.

## Mentions légales

Complète `mentions-legales.html` (RNA, SIRET, président, hébergeur).
