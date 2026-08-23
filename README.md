# Site AJEP

Landing page de l’**Association des Jeunes et Étudiants de Puteaux**.

Ouvre `index.html` dans un navigateur, ou sers le dossier :

```bash
cd "/Users/tanguy/Documents/site AJEP"
python3 -m http.server 8080
```

## Formulaire

Les boutons « Rejoindre le groupe WhatsApp » **n’ouvrent pas WhatsApp**. Ils affichent le formulaire. Les demandes partent vers l’adresse définie dans `js/config.js` (`email`) via FormSubmit.

La première réception peut demander une confirmation de l’adresse e-mail.

## Photos à remplacer

Chaque visuel porte un badge **Photo à remplacer**. Fichiers dans `images/` :

| Fichier | Sujet |
|---|---|
| `hero.jpg` | Jeunes réunis |
| `axe-etudier.jpg` | Local / espace de travail |
| `activite-etudiants.jpg` | Espace étudiants |
| `axe-apprendre.jpg` | Cours, livres |
| `axe-fetes.jpg` | Hanouka, Pourim, fêtes |
| `axe-rencontrer.jpg` | Repas, soirées |
| `axe-decouvrir.jpg` | Université d’été |
| `rdv-leil-shishi.jpg` | Jeudi soir |
| `rdv-samedi.jpg` | Samedi matin |
| `rdv-dimanche.jpg` | Dimanche matin |

## Mentions légales

Complète `mentions-legales.html` (RNA, SIRET, président, hébergeur).
