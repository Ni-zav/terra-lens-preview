# Verified NASA case study — Yogyakarta and Jakarta

**Run:** 14 November 2026, 04:59 UTC (11:59 WIB) · **Source:** NASA POWER monthly point API, MERRA-2-derived meteorological data. This report contains values returned by real NASA API requests, **not browser-test fixture data**.

**Reproduction:** `node scripts/live-evidence.mjs`. Auditable successful workflow: [NASA Live Evidence #43559281083](https://github.com/Ni-zav/terra-lens/actions/runs/43559281083). The workflow uploaded an artifact `live-nasa-case-study` with the computed annual series and metadata.

## Study definition

- Variable: `T2M`, 2-meter near-surface air temperature (°C).
- Time period: 2001–2024 inclusive.
- Unit of analysis: one NASA POWER grid point at each requested coordinate.
- Processing: 288 valid monthly records, 24 complete annual means for each point; calendar-day-weighted annual means; OLS slope versus calendar year, two-sided classical Student t-test, 95% t-based CI.
- Inference threshold: α = 0.05, *conditional on OLS error assumptions*.

| Selected point | Requested latitude, longitude | Trend (°C/decade) | Classical 95% CI (°C/decade) | Classical two-sided p-value |
|---|---|---:|---:|---:|
| Yogyakarta | -7.7956, 110.3695 | +0.1791 | +0.0348 to +0.3235 | 0.01732 |
| Jakarta | -6.2088, 106.8456 | +0.2238 | +0.0962 to +0.3515 | 0.001455 |

Source API queries:

- [Yogyakarta NASA POWER JSON](https://power.larc.nasa.gov/api/temporal/monthly/point?parameters=T2M&community=AG&longitude=110.3695&latitude=-7.7956&start=2001&end=2024&format=JSON)
- [Jakarta NASA POWER JSON](https://power.larc.nasa.gov/api/temporal/monthly/point?parameters=T2M&community=AG&longitude=106.8456&latitude=-6.2088&start=2001&end=2024&format=JSON)

## Findings and non-findings

Under the tool's **classical OLS assumptions**, both estimated point-level slopes are positive and have p-values below 0.05. **This does not prove** that the residuals are independent or that inference remains significant after autocorrelation-aware correction. A visual comparison of the two point slopes does not establish a significant *difference between* their trends.

These are historical modeled/reanalysis grid-cell estimates, not urban area averages or thermometer readings. Do not attribute changes to urbanization, greenhouse gases, land use, or any single cause on this evidence alone.

## Validation status

- [x] Source requests succeeded from GitHub Actions on 14 Nov 2026.
- [x] Monthly response parsing and annual aggregation yielded 24 complete calendar years each.
- [x] Independent nonproduction browser fixture and computation unit tests passed in CI.
- [x] Independent SciPy `linregress` slope, t-interval, and p-value independently reproduced on **the same live NASA responses** as the JavaScript implementation. [Passing workflow #43563257853](https://github.com/Ni-zav/terra-lens/actions/runs/43563257853), 14 Nov 2026. The logs show matching trends and confidence intervals to at least six decimal places.
- [x] Chromium browser tested with the **real** NASA API through the actual Pages Function code running locally, including two points, another variable, 576-row CSV and mobile overflow. [Live NASA browser workflow #43563581913](https://github.com/Ni-zav/terra-lens/actions/runs/43563581913); [actual screenshots](screenshots/README.md).
- [x] GitHub Pages production and review-preview workflows verified end-to-end against live NASA POWER responses (`scripts/hosted-acceptance.mjs`).
- [x] Official 2026 challenge Resources tab inspected: Giovanni is listed under NASA Data & Resources.
- [x] Analyze an authentic Giovanni area-average export from the listed resource; see [source provenance and independent verification](NASA_QUALIFYING_SOURCE_HANDOFF.md). POWER itself is not named in the NASA resource list. The Giovanni source is an area average, not either POWER point.
- [x] Real-NASA browser screenshots generated. They are not synthetic browser-test fixtures.

## Reading the evidence

Use this case study as the first credible hackathon demo and preserve the numerical values only alongside the exact 2001–2024 period, coordinates, variable, source, retrieval timestamp and OLS assumptions. NASA may revise its datasets, so subsequent requests might differ.


## Directly tested difference: Jakarta minus Yogyakarta (new)

**Independent validation:** [NASA POWER NumPy/SciPy + JavaScript run #43579062738](https://github.com/Ni-zav/terra-lens/actions/runs/43579062738), 14 November 2026. The same authentic NASA responses were fed to independent Python/NumPy and JavaScript calculations.

| Paired statistic | Verified estimate |
| --- | ---: |
| Shared complete years | 24 (2001–2024) |
| Fitted trend difference (Jakarta − Yogyakarta) | **+0.044694 °C/decade** |
| Classical OLS 95% CI for difference (`D_y`) | **−0.072287 to +0.161674 °C/decade** (`p = 0.436621`) |
| Exploratory Newey–West HAC bandwidth | 2 annual lags (`SE = 0.004924 °C/yr`) |
| Approximate HAC 95% CI for difference | **−0.057416 to +0.146803 °C/decade** |
| Approximate HAC two-sided p | **0.3738526** |
| Durbin–Watson residual diagnostic on `D_y` | **2.2054** (`2.21`) |

**Interpretation:** The difference between the two fitted trends is numerically positive, but this paired HAC approximation does **not** establish that Jakarta's NASA grid point warmed faster than Yogyakarta's. The CI includes zero. This does not prove the rates are identical. The analysis uses aligned complete years and models serially correlated annual difference residuals; it remains exploratory, conditional on model assumptions, and cannot identify physical causes or represent whole cities. The chosen 2-lag Bartlett kernel and t(n−2) reference are documented in [METHODOLOGY.md](METHODOLOGY.md). NASA source/model uncertainty and the consequences of exploratory searches are not eliminated by this HAC correction.

The independent implementations agreeing on these figures validates the computation on the **same** underlying NASA data, not the physical accuracy of that data or proof of general scientific significance.
