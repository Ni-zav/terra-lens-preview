# Statistical method and interpretation

## What data mean

For each selected latitude and longitude, Terra-Lens requests a historical monthly series from the **NASA POWER monthly point API**, with NASA GMAO MERRA-2-derived meteorological variables. Coordinates select one grid-cell estimate, not a city average or field sensor.

All displayed series are from API responses at runtime. Missing values (null, nonfinite and NASA fill values such as -999) are dropped. Keys must be `YYYYMM`, with 1 ≤ MM ≤ 12; API-generated `YYYY13` annual summary keys are ignored. We do not interpolate missing observations.

## Annual aggregation

For a year `y` with **all twelve** months, let `v[y,m]` be the reported monthly mean and `d[y,m]` the number of Gregorian calendar days. We calculate

`A[y] = Σ(v[y,m] × d[y,m]) / Σ(d[y,m])`

for `m=1…12`. Incomplete years are excluded. This treats monthly rates/means as representative of their days. The original NASA POWER monthly API's own annual statistic may use a different aggregation convention, so we calculate and label our own derived annual series.

For `PRECTOTCORR`, this gives the **yearly average daily precipitation rate (mm/day)**. It is not a precipitation volume or an annual accumulation in mm.

## Trend

For `n ≥ 10` complete years, fit by ordinary least squares

`A[y] = α + β × (y - mean(years)) + ε[y]`.

The estimated `β` has unit per calendar year; Terra-Lens displays `10β`, in unit **per decade**. With nonconsecutive complete years, actual year values are used, not row indices.

Classical slope standard error:

`SE(β) = sqrt( Σ residual² / ((n-2) × Σ(year - mean(years))²) )`.

Two-sided t-test: `t = β / SE(β)` with `df = n-2` and `H0: β = 0`.
Two-sided p-value is from the Student t distribution. The 95% slope interval is

`[β - t_(0.975, n-2) × SE(β), β + t_(0.975, n-2) × SE(β)]`.

The implementation computes Student t tail probability through the regularized incomplete beta function; deterministic reference quantile tests are included.

Classification at `α=0.05` is *classical test significant* or *not significant*. If fewer than ten complete years are available, no significance result is shown.

## The limits are essential, not footnotes

1. **Serial correlation:** adjacent climate years may be correlated. Classical OLS p-values/CI assume independent residuals; significance may be overstated.
2. **Heteroskedasticity and nonlinear behavior:** simple linear inference does not model changing variance, abrupt regime shifts or curved trends.
3. **Multiple searches:** repeating variables, years and coordinates creates multiple-testing risk; p < 0.05 does not automatically control discovery errors.
4. **Model uncertainty:** the API gives reanalysis estimates affected by input data, assimilation and revisions, not direct station observations.
5. **Geography:** point comparison does not describe an entire region; differences in individual slopes are **not** a formal statistical test of between-region difference.
6. **No causation:** slope and significance say nothing by themselves about what physically caused change.
7. **No forecasts:** this code does not predict future climate values.
8. **Missing data:** excluding incomplete years can bias trends if missingness is systematic.
9. **Exploratory scope:** data definitions, units and model-version evolution must be revisited for publication-grade analyses.

Recommended post-hackathon statistical upgrades: residual autocorrelation diagnostics, HAC/Newey–West slope intervals, Mann–Kendall tests with autocorrelation adjustment, seasonal de-trending, spatial field significance/multiple-testing corrections, and cross-source validation.

## Interpretation examples (illustrative text, not NASA results)

- If a fitted slope is `+0.20 °C/decade`, it describes the linear estimate for that **selected point/time range**, not any city's overall warming.
- If `p ≥ 0.05`, the data fail this specific test's threshold; that does **not** prove there is no change.
- If `p < 0.05`, the significance statement is **conditional on assumptions**, not proof of causation or data accuracy.

## Code

Pure operations: `src/stats.js`. NASA adapter: `src/power.js`. Deterministic tests: `tests/analysis.test.mjs`.

## Relevant challenge-listed NASA methodology reference

The selected 2026 challenge's published resource mirror includes NASA's [*Time-Series Analysis of Remotely-Sensed SeaWiFS Chlorophyll in River-Influenced Coastal Regions*](https://ntrs.nasa.gov/api/citations/20090042747/downloads/20090042747.pdf) (Acker et al., NASA NTRS record 20090042747). We consulted its discussion of time-series regression, outlier sensitivity, and the difference between ordinary and robust trend methods to inform the explanatory limitations above. **This is a methodology reference, not the source of Terra-Lens temperature observations**: the actual climate data in this project are retrieved from NASA POWER. Using a research reference is not automatically evidence of satisfying NASA's requirement to use a listed NASA *data source*.


## Direct comparison of two trends: paired annual differences

The original pointwise classical p-values test each individual fitted slope against zero; they **do not** test whether locations A and B have different slopes. Terra-Lens now provides a separate **paired B − A trend contrast**. It intersects the sets of complete calendar years, retaining only years where *both* locations have 12 valid source months, and calculates annual difference D[y] = B[y] − A[y]. It runs a regression of D[y] against the actual calendar year, using at least 10 shared full years. The slope per decade estimates the **difference between fitted trends**, not causation. It records excluded unmatched years.

An exploratory heteroskedasticity/autocorrelation-consistent (HAC) estimate accompanies the classical paired slope. For the difference regression, define centered elapsed calendar years x[y], residuals e[y], and Sxx = sum(x[y]²). Let z[y] = x[y]e[y]. For Bartlett truncation lag L = floor(4(n/100)^(2/9)), bounded to 1…n−2, estimate slope variance from (sum(z[y]²) + 2 sum over k=1…L of (1−k/(L+1)) sum over y>k z[y]z[y−k]) / Sxx², multiplied by n/(n−2). Negative roundoff is clamped to zero. The interval uses a **heuristic Student t critical value with n−2 df**, so the resulting p-value/interval are approximate, not an exact finite-sample HAC inference. Durbin–Watson is displayed only as a rough residual-dependence diagnostic.

HAC, Durbin–Watson and the individual residual lag-1 diagnostic require consecutive complete calendar years. If an internal year is missing, the application withholds these diagnostics instead of treating observations across the gap as adjacent. The descriptive paired slope still uses the actual calendar years; classical and rank-based inference remain conditional on their assumptions and may be biased by missingness.

**Important:** Newey–West does not repair biased sampling, nonlinear time dynamics, model uncertainty, spatial dependence between source grids, multiple comparisons, choice of variable/site after seeing results, or mismatched geographical sampling supports. A 95% interval including zero means no formal evidence of a difference under this particular approximation, **not** evidence that the trends are exactly the same. If many pairs are screened, a post-selection p-value is not a confirmatory result.

Code: src/contrast.js; deterministic tests: tests/contrast.test.mjs. The full month-by-month NASA records, derived annual records, slopes, paired inference, source links and retrieval times can be downloaded in an auditable Evidence JSON export.

## More variables and listed NASA resource integration

NASA POWER now exposes an allowlisted nine-variable catalog with NASA-defined physical units and descriptions, including mean/min/max temperature (all monthly aggregates), dew point, relative and specific humidity, 2 m wind, surface pressure and precipitation *rate*. See [data catalog](DATA_CATALOG.md). All nine use the same annual mean and slope method when the returned month represents a monthly mean/rate; no cross-variable statistical comparisons are implied.

The Giovanni workspace accepts the cloud point-service CSV with `param_name` and `unit`, or the classic area-average CSV for M2TMNXSLV v5.12.4 monthly T2M. It hashes original file bytes and requires at most one observation per calendar month. The area adapter records the requested bounds and labels the support as area-average; it is not paired with POWER points. A paired comparison is also withheld when either series has unstated spatial support, including when both supports are unknown. The regional query builder opens Giovanni on NASA's site for user-selected non-antimeridian bounds and years, and the user imports the resulting CSV; it does not handle Earthdata credentials or automatically fetch the output. The browser cannot authenticate a local file or establish its source quality. Different units are **not** automatically converted. The [checked regional case](NASA_QUALIFYING_SOURCE_HANDOFF.md) includes original outputs, DOI and independent verification.

## Rank-based trend check: Mann–Kendall and Theil–Sen

Alongside classical OLS, Terra-Lens computes a non-parametric **Mann–Kendall monotonic trend test** (with tie-corrected variance and continuity correction) and the **Theil–Sen median pairwise slope** (`10 × median((A[j] - A[i]) / (y[j] - y[i]))` for all `i < j`) with its rank-based 95% interval (Sen 1968; Gilbert 1987, matching `scipy.stats.theilslopes`).

These methods are complementary checks on the **same observations**, not statistically independent tests or independent confirmation from a second dataset. Agreement between them does not remove shared sampling, source, or temporal-dependence errors.

- **Evidence grading:** Rather than treating a single `p < 0.05` as a binary pass/fail, each series receives an evidence verdict based on agreement between the parametric OLS t-test and the rank-based Mann–Kendall test (*Consistent increase/decrease* when both reach `p < 0.05` with the same sign; *Mixed evidence* when only one reaches `p < 0.05`; *No trend detected* when neither does).
- **Residual dependence diagnostic:** We compute the lag-1 autocorrelation `r₁` of the OLS annual residuals and flag when `|r₁| > 1.96 / √n`, warning that serial correlation may make both classical OLS and standard Mann–Kendall p-values optimistic.
- **Seasonal & monthly anomalies:** Complete-year monthly climatologies (`mean` and `sd` per calendar month `m=1…12`) allow viewing monthly anomalies (`v[y,m] - mean[m]`) or standardized anomalies (`(v[y,m] - mean[m]) / sd[m]`) when comparing series with different physical units or spatial supports, as well as descriptive per-calendar-month OLS slopes (`12` parallel fits, descriptive only without multiple-testing correction).

## Shared canonical Series representation & Multi-source case hygiene

Every data source adapter (`powerSeries` in `src/power.js`, `giovanniSeries` in `src/giovanni.js`) produces the same immutable `Series` contract (`src/series.js`): raw monthly records (`{year, month, value}`), physical variable metadata (`{code, label, unit}`), spatial support (`grid-point` vs `area-average`), coordinates, and provenance. All derived quantities (complete-year annual means, classical OLS, Mann–Kendall / Theil–Sen, lag-1 residual autocorrelation, monthly climatology/anomalies, seasonal slopes, and evidence verdicts) are pure, lazily memoized functions of a `Series`. Display controls (10-year window, anomaly mode, seasonal view) operate purely in the view-model layer (`src/react/chart-model.js`) and never mutate or re-run statistical inference.

In the **Multi-source** tab (`src/react/ScienceCases.jsx`, backed by `src/science/`), two additional NASA datasets are integrated with explicit support boundaries:
- **NASA PO.DAAC SWOT Level-2 RiverSP vD (`src/science/swot.js`, `src/science/water.js`):** Irregular satellite pass water-surface elevations (`wse`, meters relative to geoid) on SWORD Reach `74267300251` are plotted on their own axis with pass-level quality flags (`r_u = 1` suspect, `r_u = 2` degraded) separated from monthly NASA POWER `PRECTOTCORR` (`mm/day`). Because only 3 calendar months overlap (`2025-03` to `2025-05`), no regression slope or correlation p-value is computed.
- **NASA GISS Surface Temperature Analysis (`GISTEMP v4`, `src/science/gistemp.js`, `src/science/global.js`):** Global monthly land-ocean temperature anomalies (`GLB.Ts+dSST`, native `1951–1980` baseline, dated official table excerpt `2026-11-14`) and local NASA POWER `T2M` (`°C`) are both rebased by subtracting their respective `2001–2020` calendar-month means before computing Gregorian day-weighted annual anomalies (`2001–2024`). This aligns the visual reference baseline without equating a global area average to a `0.5° × 0.625°` grid cell or claiming a formal point-vs-globe difference test.

### Giovanni regional MERRA-2 case and Global Award source compliance

A locally valid parser or a mere citation to Giovanni is not sufficient on its own; therefore, the Giovanni workspace integrates and analyzes an authentic, unmodified Giovanni area-average export for MERRA-2 `M2TMNXSLV v5.12.4` monthly `T2M` (`110°E–111°E, 8°S–7°S`, `2001–2024`). Its monthly values are combined using Gregorian day weights only for complete years, then fit against calendar year with classical OLS (`+0.177171 K/decade`, `95% CI [+0.042313, +0.312030] K/decade`, `p = 0.012376`). This is an area-average model reanalysis, distinct from POWER grid-point estimates; the preserved CSV and NetCDF files, two 6-cell weighted intermediates, byte-preserved NASA OPeNDAP `MERRA2_401` `.dap.nc4` subsets for the five reprocessed months (`2020-09`, `2021-06..2021-09`), source checksums, independent SciPy verification, and limitations are documented in [NASA_QUALIFYING_SOURCE_HANDOFF.md](NASA_QUALIFYING_SOURCE_HANDOFF.md). Neither the Giovanni aggregate nor the native `M2TMNXSLV.5.12.4` monthly granules carry a per-cell quality-flag variable, and no cross-source significance test is implied. Final Global Award eligibility remains NASA's decision.
