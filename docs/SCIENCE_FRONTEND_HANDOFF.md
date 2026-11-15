# Terra-Lens data/science engine — frontend integration contract

**Status (2026-11-15):** Merged and connected to the user-facing React UI in `src/react/ScienceCases.jsx` (`#tab-cases`, **Multi-source** tab) on branch `feat/terminal-layout-multi-point`, with automated Playwright coverage in `tests/browser.smoke.mjs`.

## Why this is better than more standalone charts

The user can ask a question in plain language; the backend returns a **short, responsible answer** plus a separate **advanced** source-level evidence bundle. The same scientific record drives both; the frontend must not fabricate monthly values or substitute decorative imagery for observations.

### Stable imports

```js
import {
  SCIENCE_CATALOG, SCIENCE_QUESTIONS, scienceForAudience,
  analyzeRiverContext, analyzeLocalGlobal,
  fetchSWOT, parseSWOTHydrocron, swotMonthlySnapshots,
  parseGISTEMPtext, compareLocalGlobal, buildWaterCase
} from './src/science/index.js';
```

`scienceForAudience()` returns a catalog for the default/simple UI. `scienceForAudience({advanced:true})` exposes all sources and even planned capabilities, **clearly labeled as planned**.

### Ready-to-use question 1: river satellite + nearby precipitation context

```js
const result = await analyzeRiverContext({
  featureId: '74267300251',
  start: '2025-03-15T00:00:00Z',
  end: '2025-05-16T00:00:00Z',
  powerPoint: {lat: 38.2527, lon: -85.7585, label:'Louisville-area grid cell'},
  maxQuality: 2, // include degraded satellite overpasses WITH flags visible
  year: 2025
}, {signal: controller.signal});

// First screen: result.simple.title, .whatChanged, .where,
// .observationCount, .commonMonths, .nextStep, .limitation
// Advanced drawer: result.advanced.sourceA/B, .harmonization, .association
```

This makes **real NASA requests**. For a static GitHub Pages frontend, Hydrocron's browser CORS behavior needs an acceptance test. An optional authenticated team-controlled proxy may be needed; never store Earthdata credentials in frontend code. The repo has a Cloudflare Pages proxy for POWER, but Hydrocron has **not** been proxied yet. For a robust demo use the dated GitHub Actions evidence artifact or checked-in review-branch source snapshot rather than inventing values during network failure.

The Ohio River reach is a real, *specific SWORD ID*, not a free-form geocoded city or arbitrary point. You cannot click anywhere and claim there is a SWOT river reach under that pixel without SWORD discovery.

### Ready-to-use question 2: local reanalysis vs global observed temperature index

```js
import sourceTxt from './data/source-snapshots/nasa-giss-gistemp-global-2001-2024.txt?raw'; // Vite
const result = await analyzeLocalGlobal({
  powerPoint:{lat:-7.7956,lon:110.3695,label:'Near Yogyakarta'},
  from:2001,to:2024,
  baselineStart:2001,baselineEnd:2020,
  gistempSourceText:sourceTxt,gistempSourceFormat:'txt'
}, {signal:controller.signal});
// result.simple is one short answer with BOTH rates and limitations;
// result.advanced contains ORIGINAL records, rebased monthly anomalies,
// full-year annual derived anomalies, trend objects and methodological caveats.
```

This is reliable without a direct NASA GISS browser request. The GISS source TXT is a **dated copy of only 2001–2024 from the official NASA table** (not a live NASA response). POWER remains a live NASA request. GISTEMP's original baseline is 1951–1980; the engine separately subtracts 2001–2020 *monthly* normals from both series and day-weights complete years. This aligns displayed anomaly reference periods, **not spatial support, source uncertainty or scientific construction**. No formal test of a point-vs-globe difference is claimed.

### Output shape

```ts
interface Investigation {
  schema: 'terra-lens-cross-source-water-v1'|'terra-lens-local-global-context-v1';
  simple: {
    title: string; // readable question and answer
    // other specific named scientific facts, units, years and limitations
  };
  advanced: {
    // actual source observations / monthly / complete annual values,
    // source URLs, field units, QA, excluded data, assumptions;
    // each case explicitly documents which tests were NOT performed.
  };
  context?: object;
}
```

The frontend may build tabs/cards/charts/map however it likes. Do not silently discard `simple.limitation`, `advanced.caveat(s)`, `qualityCounts`, `excluded`, or `advanced.harmonization`.

## Verified case JSON can be used without browser NASA API calls

The science branch now contains **committed, independently verified real-NASA case snapshots**:

- `data/cases/manifest.json` — tiny summary metadata, source URLs, dates, simple results, and explicit whether GISS was live or a dated original-table excerpt
- `data/cases/ohio-river-swot-power.json` — NASA SWOT 12 pass observations, all QA flags, real NASA POWER monthly model rainfall context, 3 aligned calendar months
- `data/cases/yogyakarta-global-gistemp-power.json` — NASA GISS original dated global monthly subset (288 records) plus real NASA POWER point monthly values (288), complete-year trends and provenance

The files were generated by `.github/workflows/pin-science-snapshots.yml` **only on this science branch**, using actual NASA source records and **independent Python verification before committing**. Workflow: https://github.com/Ni-zav/terra-lens/actions/runs/43611878413 . No fake scientific observations or AI-generated numeric data.

A frontend built with Vite can lazily import the case chosen by the user:

```js
// These paths are relative to a UI module in src/react/, adjust if needed.
const manifest = (await import('../../data/cases/manifest.json')).default;
// Show manifest.cases[].simple instantly, with source caveats and dates.
const detailed = (await import('../../data/cases/ohio-river-swot-power.json')).default;
// Or use yogyakarta-global-gistemp-power.json for that case instead.
// Label the evidence "verified snapshot" and its generatedAt date.
```

This is robust for static GitHub Pages and an offline demo after assets are cached. It **does not** refresh automatically at render time, claim real-time satellite monitoring, or guarantee independent scientific physical accuracy. A future refresh requires rerunning source verification on the science branch. Keep the large JSON behind dynamic imports to avoid inflating the initial interface.

## Progressive disclosure suggestion (not implemented as UI)

**Simple:** one question → two source descriptions → one auditable numeric answer → “what this means / cannot say” → “verify next” → “View data & method”.

**Advanced:** time-series selection, exact NASA URLs, dates, different source cadences and QA, month-level missingness, whether an OLS comparison is statistically meaningful, original observations, export JSON.

**Critical evidence distinctions:**
- Water surface elevation **meters relative to a geoid** is not water depth, discharge, flood level, extent or a prediction.
- Precipitation **mm/day monthly mean rate** is not monthly accumulation or a watershed-wide rain total.
- SWOT **irregular overpasses** cannot be treated as a daily continuous hydrological gauge.
- GISTEMP **global area index anomaly** cannot be mapped to a latitude/longitude city pin.
- Comparing NASA sources is not causal attribution, and their differences are not automatically statistical significance.

## Repo coordination & commands

These pure modules are intended to be **cherry-picked or imported into the UI branch only after review**. Avoid merging the whole data branch if frontend differences are still being redesigned. The core files are under `src/science/*` and `data/source-snapshots/*`. The workflow and scripts under `scripts/live-*`, `scripts/verify-*`, and `.github/workflows/*` are independent of React and CSS.

```bash
npm ci
npm run check
node scripts/live-swot-water-case.mjs
python scripts/verify-swot-water-python.py
node scripts/live-gistemp-context.mjs
python scripts/verify-gistemp-python.py
```

Actual NASA network is required for SWOT and POWER; the official GISS dated snapshot allows reliable global context when its live host is inaccessible.
