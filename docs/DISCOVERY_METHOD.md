# Trend Contrast Finder — predeclared NASA sentinel study protocol

**Status:** experimental feature branch only, not main/deployed; 14 November 2026. Implementation: `src/discovery.js`, `src/react/ContrastFinder.jsx`, `tests/discovery.test.mjs`.

## What this actually does

**Question:** Of a small, fixed sample of eight Indonesian coordinate locations, which NASA POWER modeled monthly environmental values have the largest or smallest fitted historical changes, and what would we need to verify the contrast?

This is a *hypothesis-screening and education tool*, not an operational climate-risk or disaster warning platform. NASA already publishes the underlying observations and capable tools; Terra-Lens adds a guided and auditable question → source → complete-year processing → comparison → honest action brief workflow.

### Sample frame — chosen before inspecting results

| Number | Sample | Latitude | Longitude |
|---:|---|---:|---:|
| 1 | Banda Aceh | 5.5483 | 95.3238 |
| 2 | Medan | 3.5952 | 98.6722 |
| 3 | Jakarta | −6.2088 | 106.8456 |
| 4 | Bandung | −6.9175 | 107.6191 |
| 5 | Yogyakarta | −7.7956 | 110.3695 |
| 6 | Surabaya | −7.2575 | 112.7521 |
| 7 | Denpasar | −8.6500 | 115.2167 |
| 8 | Makassar | −5.1477 | 119.4327 |

These are illustrative named places spread across Indonesian regions, **not** a random sample, full national grid, region-based average, or claim that the corresponding NASA cells measure whole cities. The coordinate plot is only a georeferenced point schematic; point color shows request state, not meteorological values. We intentionally do not draw a fictitious interpolated raster.

### NASA source and variable definitions

One NASA POWER / MERRA-2-derived model grid-point API request per site and investigation; currently selectable: T2M (°C), T2M_MAX (°C, monthly maximum modeled hourly temperature; annual values average monthly maxima, not the annual maximum), RH2M (%), PRECTOTCORR (mm/day average daily rate, **not** annual precipitation total). All are monthly point values—not direct instrument observations at neighborhood level.

Requested years default **2001–2024 inclusive** and may be changed within **1981–2025**, with ≥10 calendar years required. Request parameters and source URLs are exported. The app can use its existing Cloudflare proxy when present or NASA directly. Only valid NASA-supplied monthly values contribute; no synthetic or missing observations are inserted.

### Method, missingness and comparisons

1. At most eight fixed requests, at most three concurrently; cancel on user demand. Failed, insufficient-coverage, still-pending and successful points remain explicitly visible.
2. For each site, calculate day-weighted annual mean only when **all twelve** months are valid. Compute classical OLS slope using actual calendar years with ≥10 complete years.
3. Rank successfully fitted slopes **descriptively**; never call this a national hot-spot ranking. Slope sign can differ among points without establishing significant opposing regional trends.
4. Default selected A and B are the sample's min/max fitted slopes. An explicit direct B−A test uses overlapping complete calendar years and an approximate Bartlett/Newey–West HAC interval through the existing `pairedContrast` implementation.
5. Because *the same dataset was used to select the extreme pair*, the unadjusted HAC interval/p-value are **post-selection exploratory diagnostics**, NOT a confirmatory test. There are up to 28 pair candidates with eight valid points; any scan, multiple variable/year choice or location inspection adds selection effects. HAC does **not** repair post-selection bias or spatial dependence.
6. Export JSON with raw valid monthly records, derived annual values, individual trend objects, selected pair diagnostic, URL, retrieval timestamp, failed/insufficient points, all sample coordinates, question, full period and limitations. Cached samples explicitly retain their *original* retrieved timestamp; in-memory cache expires after fifteen minutes.
7. To investigate further, open selected A/B in the existing detailed workspace, repeat with an independent scientific product or local station series and review physical meaning/land context. Be willing to find **no defensible contrast**.

**No human-risk score is computed.** No exposure, vulnerability, population, health, causal link, weather forecast, land-cover raster, or uncertainty of the NASA source data is present. The current prototype cannot determine who faces the highest personal or economic risk.

## How to test without mistaking fixtures for science

- `npm run check`: deterministic JS tests and production build; they use synthetic records only for code tests.
- Run a complete eight-location live NASA screen in a real browser; preserve evidence JSON, timestamp and any failures.
- Cross-check at least two raw NASA queries and the generated year-by-year series against independently calculated Python/NumPy/SciPy values, using **the same source data**.
- Browser tests: 390 px mobile, table keyboard scroll, unmount cancellation, back-to-back runs, cached samples, failed request and active A/B deep link.
- A research claim must say exactly which variable, cells, years, model/source version, sample frame, method and missingness produced it.
- If partial failures occur, do not promote the highest/lowest among remaining points as the full predeclared sample's extrema.

## Scientific and human-value go/no-go gates

- [x] Code structure for fixed frame, bounded requests, failure visibility, individual descriptive trends and paired diagnostics added on feature branch.
- [x] Node deterministic coverage for failure, cancellation, alignment and order.
- [x] Actual Chromium browser (locally served build via real Cloudflare Pages Function) fetched eight NASA point series and validated A/B deep-link, JSON export, 390px responsive layout and screenshots: [successful live workflow](https://github.com/Ni-zav/terra-lens/actions/runs/43582005814). Not a remotely deployed branch/site or human usability study.
- [ ] Any result featured in submission/demo independently rerun and reviewed.
- [ ] The 2026 challenge's **official Resources-tab data source** checked and genuinely used; NASA POWER alone has not been demonstrated to pass this separate requirement.
- [ ] An actual scientist/teacher/community user attempts the workflow without coaching; record *observed* outcomes, not hypothetical benefit.
- [ ] No change to production main or NASA submission without deliberate review.
