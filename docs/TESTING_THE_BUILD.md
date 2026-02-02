# Comment préparer et tester son build (Foolproof)

Nous avons configuré le projet pour utiliser des **chemins relatifs**. Cela signifie que le dossier `build/` est "universel" : il fonctionnera peu importe où vous le placez sur votre serveur.

## 1. Compiler le projet
C'est la seule commande à connaître :
```bash
npm run build
```
Le dossier `build/` est généré. Vous pouvez maintenant le renommer ou le mettre dans n'importe quel sous-dossier de votre serveur.

## 2. Tester localement
N'ouvrez jamais le fichier `build/index.html` par double-clic (les navigateurs bloquent les scripts). Utilisez cette commande :

```bash
npm run preview
```
Puis ouvrez le lien indiqué (ex: `http://localhost:4173`).

---

## Pourquoi est-ce "Foolproof" ?
Avant, il fallait préciser le nom du dossier au moment du build. Désormais, grâce au réglage `relative: true` dans `svelte.config.js`, le site calcule lui-même ses chemins. 

**Exemple :** 
- Si vous uploadez dans `archives/2026/projet1/`, le site s'adaptera tout seul.
- Si vous uploadez à la racine `labs.letemps.ch/`, il s'adaptera aussi.

Pas besoin de configuration complexe. Compilez, uploadez, c'est tout.
