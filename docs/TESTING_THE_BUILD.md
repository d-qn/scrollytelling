# Comment tester son build localement

Il est **impossible** de tester le projet en ouvrant le fichier `build/index.html` directement dans un navigateur (double-clic). Les navigateurs bloquent le chargement des scripts pour des raisons de sécurité.

Voici les deux procédures de test :

## 1. Test Standard (Racine)
Utilisez cette méthode pour vérifier le fonctionnement général.

1. Compilez le projet :
   ```bash
   npm run build
   ```
2. Lancez l'aperçu :
   ```bash
   npm run preview
   ```
3. Ouvrez l'URL indiquée (souvent `http://localhost:4173`).

---

## 2. Test pour un sous-dossier (ex: Labs)
Indispensable si votre site sera hébergé sur `mon-domaine.ch/le-sous-dossier/`.

1. Compilez en précisant le dossier :
   ```bash
   BASE_PATH=/le-sous-dossier npm run build
   ```
2. Lancez l'aperçu :
   ```bash
   npm run preview
   ```
3. **IMPORTANT** : Dans votre navigateur, vous devrez manuellement ajouter le chemin à l'URL :
   `http://localhost:4173/le-sous-dossier/`

---

## Pourquoi mon build affiche-t-il des erreurs 404 ?
Si vous voyez des erreurs 404 dans la console, cela signifie que :
- Soit vous avez ouvert le fichier `index.html` en direct (sans serveur).
- Soit le `BASE_PATH` utilisé pour le build ne correspond pas à l'endroit où se trouvent les fichiers sur votre serveur ou votre `preview`.
