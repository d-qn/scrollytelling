# Workflow: R, Datawrapper & Sirius

Ce guide explique comment alimenter les graphiques Datawrapper depuis R et intégrer le projet final dans Sirius.

## 1. Pipeline de Données avec R (`DatawRappr`)

Nous utilisons le package `DatawRappr` pour mettre à jour automatiquement les données des graphiques Datawrapper utilisés dans le scrollytelling.

### Installation

```r
install.packages("devtools")
devtools::install_github("munichrocker/DatawRappr")
library(DatawRappr)
```

### Authentification

Créez une clé API sur [Datawrapper > Settings > API Tokens](https://app.datawrapper.de/account/api-tokens) avec les droits `read`, `write`, et `chart:write`.

```r
# Stockez votre clé dans .Renviron pour la sécurité
# DW_KEY=votre_api_key_ici
dw_key <- Sys.getenv("DW_KEY")
datawrapper_auth(api_key = dw_key)
```

### Mise à jour des Graphiques

Supposons que vous avez un graphique dans le scrollytelling avec l'ID `ABCDE`.

```r
library(tidyverse)
library(DatawRappr)

# 1. Préparer vos données
df_glaciers <- read_csv("data/glaciers.csv") %>%
  filter(year > 1900)

# 2. Pousser les données vers Datawrapper
# Cela met à jour le dataset du graphique sans changer ses réglages visuels
dw_data_to_chart(df_glaciers, chart_id = "ABCDE")

# 3. Republier le graphique (Important pour que les changements soient visibles)
dw_publish_chart(chart_id = "ABCDE")

print("Graphique mis à jour avec succès !")
```

### Automatisation (Github Actions)

Vous pouvez lancer ce script R via Github Actions chaque jour/semaine pour garder le scrollytelling à jour sans redéployer le code SvelteKit.

---

## 2. Intégration dans Sirius (CMS)

Une fois votre application SvelteKit prête, voici comment l'intégrer dans un article Sirius.

### Configuration du Build

Si votre projet sera hébergé dans un sous-dossier (ex: `https://labs.letemps.ch/2026/scrolly-glaciers/`), vous devez définir le `BASE_PATH` avant de construire.

```bash
# Dans votre terminal
export BASE_PATH="/2026/scrolly-glaciers"
npm run build
```

Cela génère un dossier `build/` contenant :
- `index.html`
- `_app/` (CSS/JS)

### Hébergement

Uploadez tout le continu du dossier `build/` sur votre serveur statique (S3, FTP, etc.) à l'emplacement correspondant au `BASE_PATH`.

**Exemple d'URL finale :** `https://labs.letemps.ch/2026/scrolly-glaciers/index.html`

### Embed dans Sirius

1. Ouvrez votre article dans Sirius.
2. Ajoutez un bloc **"Code"** ou **"Embed"** (selon les droits).
3. Insérez le code suivant (grâce à `pym.js` intégré, la hauteur s'adaptera automatiquement) :

```html
<div id="scrolly-container"></div>
<script type="text/javascript" src="https://pym.nprapps.org/pym.v1.min.js"></script>
<script>
    var pymParent = new pym.Parent('scrolly-container', 'https://labs.letemps.ch/2026/scrolly-glaciers/index.html', {});
</script>
```

*Note : Assurez-vous que le script `pym.v1.min.js` est autorisé par la CSP du site, ou utilisez la version hébergée par Le Temps si disponible.*
