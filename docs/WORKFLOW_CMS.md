# Workflow: R, Datawrapper & CMS Integration

This guide explains how to power Datawrapper charts with R and integrate the final Scrollytelling format into your CMS.

## 1. Data Pipeline with R (`DatawRappr`)

We recommend using the `DatawRappr` package to automatically update the datasets behind your charts.

### Installation

```r
install.packages("devtools")
devtools::install_github("munichrocker/DatawRappr")
library(DatawRappr)
```

### Authentication

Create an API Key at [Datawrapper > Settings > API Tokens](https://app.datawrapper.de/account/api-tokens) with `read`, `write`, and `chart:write` scopes.

```r
# Store your key safely in .Renviron
# DW_KEY=your_api_key_here
dw_key <- Sys.getenv("DW_KEY")
datawrapper_auth(api_key = dw_key)
```

### Updating Charts

Assuming you have a chart with ID `ABCDE`.

```r
library(tidyverse)
library(DatawRappr)

# 1. Prepare data
df <- read_csv("data/data.csv") %>%
  filter(year > 2000)

# 2. Push data to Datawrapper
# Updates dataset without changing visual settings
dw_data_to_chart(df, chart_id = "ABCDE")

# 3. Republish chart (Crucial for visibility)
dw_publish_chart(chart_id = "ABCDE")

print("Chart updated successfully!")
```

### Automation

You can run this script via Github Actions to keep your story up-to-date without redeploying the SvelteKit app.

---

## 2. CMS Integration

Once your SvelteKit app is compiled, here is how to embed it (e.g., in WordPress, Arc XP, Sirius, etc.).

### Build Configuration

Simply build the project. No special path configuration is needed as the boilerplate uses **relative paths** automatically.

```bash
# Terminal
npm run build
```

This generates a `build/` folder containing:
- `index.html`
- `_app/` (CSS/JS assets)

### Hosting

Upload the `build/` folder contents to your static file server (S3, Google Cloud Storage, FTP).

**Example final URL:** `https://example.com/2026/my-story/index.html`

### Embedding via Iframe (Recommended)

To embed the story robustly, use a standard `<iframe>`. This method is bulletproof against CMS script blockers and prevents infinite resizing loops.

**Fixed-Height "Scrollbox" Pattern:**
Since the boilerplate uses internal scrolling, you must define a fixed height for the iframe.

```html
<iframe 
    src="https://example.com/2026/my-story/index.html" 
    width="100%" 
    height="660" 
    frameborder="0" 
    style="border: none; display: block;"
    title="Scrollytelling Story"
    loading="lazy"
></iframe>
```

### Responsive Height (Optional)
If your CMS allows custom CSS, you can make the height responsive:

```html
<style>
  .scrolly-iframe {
      width: 100%;
      height: 600px; /* Mobile safe height */
      border: none;
      display: block;
  }
  @media (min-width: 768px) {
      .scrolly-iframe {
          height: 800px; /* Taller on Desktop */
      }
  }
</style>

<iframe 
    src="https://example.com/2026/my-story/index.html" 
    class="scrolly-iframe"
    scrolling="no"
></iframe>
```
