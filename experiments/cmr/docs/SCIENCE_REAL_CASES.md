# NASA data, human questions and real scientific findings

**Prepared 14 November 2026 UTC/WIB.** Only results from actually executed NASA source operations are called verified. No effect on human wellbeing, agriculture, flooding, or policy has been measured. Values may change when NASA revises products.

## Case A — Ohio River overpasses & modeled rain context (SWOT + POWER)

**Real NASA inputs:**
- NASA SWOT RiverSP Version D, SWORD reach **74267300251** near Louisville, Kentucky, USA. PO.DAAC Hydrocron original API, `2025-03-15T00:00Z` through `2025-05-16T00:00Z`.
- NASA POWER `PRECTOTCORR` for coordinate **38.2527, −85.7585**, calendar 2025, corrected modeled mean daily rainfall rate in **mm/day**.
- [Successfully validated real data + independent Python reproduction](https://github.com/Ni-zav/terra-lens/actions/runs/43610222429).

**Actual recorded result:** SWOT returns **12 retained overpasses** from March 22 through May 15, 2025, covering **3 UTC calendar months**. Water-surface elevation across *those observed passes* ranged from **120.6820 m to 131.2465 m**, a **10.5645 m observed spread**. Quality 1 (suspect): 10, quality 2 (degraded): 2; none quality 0. Monthly POWER has 12 model values for 2025, with 3 months overlapping satellite passes. Calculations/metadata were reproduced independently in Python.

**Human-use question:** A teacher or local river-research volunteer could identify *when satellite readings suggest a major change* and decide whether local gauge records, upstream precipitation, reach width and quality notes warrant deeper examination. This is an **investigation prompt**, not a flood alert, cause-of-flood explanation, warning, operational discharge or measured human exposure. Ground-based historical flood context must be sourced independently before identifying event attribution.

**Scientific limits:** WSE is referenced to a geoid, not a bankfull stage. SWOT pass sampling is irregular, not a full monthly river height mean. A single nearby POWER grid point isn't the upstream watershed. Three paired months cannot support a long-term trend test or causal rainfall correlation. Quality flags and Version D uncertainty require careful interpretation. A wider range in sparse satellite passes does not by itself establish the real event peak.

## Case B — Global warming in local context (GISS + POWER)

**Authentic data sources:**
- NASA GISS GISTEMP v4 global **land-ocean temperature index anomalies** originally relative to **1951–1980**, 2001–2024 selected monthly rows from NASA's official global text table, dated **2026-11-14**; the original GISS server closes live connections from the GitHub CI runner, so the repo checks in a **transparent NASA-official-table excerpt** in `data/source-snapshots/nasa-giss-gistemp-global-2001-2024.txt`.
- NASA POWER `T2M` model grid point near Yogyakarta, **−7.7956, 110.3695**, actual retrieved monthly values, 2001–2024.
- [Live POWER + dated official GISS snapshot + independent Python verification](https://github.com/Ni-zav/terra-lens/actions/runs/43610885039).

**Processing:** separately rebase each monthly series against **2001–2020 monthly normals**, retain 24 complete calendar years 2001–2024, day-weight annual anomalies and compute descriptive OLS trend rates with explicit source differences.

**Reproduced historical fitted slopes:** NASA global GISTEMP index approximately **+0.25037 °C/decade**; NASA POWER near-Yogyakarta model point approximately **+0.17909 °C/decade** for 2001–2024. They are different data-generation mechanisms and spatial populations, and the user is **not** told that their fitted numeric difference constitutes a formal test or explains local causes. These are not direct city thermometers or area-wide Yogyakarta estimates.

**Human-use question:** A student can distinguish local modeled temperatures from a global area-average index, see their different baselines, and explain why a local/global comparison is useful for context but not an attribution or whole-city risk conclusion.

## Case C — Existing two-point direct climate comparison (POWER)

The existing `main` app has independently verified Yogyakarta and Jakarta point models (2001–2024) and an aligned-complete-year paired HAC calculation: **Jakarta − Yogyakarta +0.044694 °C/decade**, approximate 95% interval **−0.057416 to +0.146803** and p≈0.374. This does **not** establish that the fitted rates differ. [Source verification in main](CASE_STUDY.md).

## What we deliberately have NOT implemented

- Giovanni authenticated API ingestion or an authentic downloaded Giovanni dataset; only the earlier local CSV importer exists.
- NASA GPM IMERG, GLDAS modeled soil water, MODIS NDVI/LST/AppEEARS QA masks, FIRMS thermal-anomaly record joining. They are **cataloged as planned**.
- Spatially matched NASA SWOT river reach and POWER catchment-aggregated precipitation; actual workflow uses only nearby model point.
- Real operational flood prediction, irrigation advice, heat-health risk, fire causality or human impact claims.
- Global Award Resources-tab eligibility proof; official tab returned errors from automated retrieval. See [resource eligibility assessment](NASA_RESOURCES_PROVENANCE.md).

## Why the cross-source approach matters

Different NASA observations complement one another only when their physical support and uncertainty are kept intact. A credible application lets a person **identify a question**, inspect real source values, see why two measurements have different meanings, export evidence, and decide what additional field verification is justified. A fused score without these precautions would be less useful than the original data.
