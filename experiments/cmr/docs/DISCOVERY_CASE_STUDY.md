# NASA POWER real-data screen — eight Indonesian sentinel points

**Status:** verified research artifact on an unmerged feature branch, not an official NASA Space Apps submitted finding. **Retrieved and independently reproduced:** 14 Nov 2026 ~09:40 UTC, [successful live NASA and SciPy workflow](https://github.com/Ni-zav/terra-lens/actions/runs/43581659085). Workflow artifact `eight-point-nasa-sentinel-evidence` contains the retrieved valid monthly records, derived annual series, exact NASA URLs, timestamps and post-selection diagnostics.

## Research question and predeclared scope

Among **eight specifically selected NASA POWER grid points** near named Indonesian locations, what are the descriptive trends in NASA MERRA-2-derived 2 m air-temperature monthly means over 2001–2024? Which sites should a local researcher *examine* further, not necessarily declare high-risk?

- Source: NASA POWER monthly point API, `T2M`, `community=AG`, original request URLs recorded in workflow artifact.
- Period: calendar years 2001–2024 inclusive.
- Data: **288 valid monthly point observations and 24 complete calendar-year day-weighted annual means for each of 8 sites**.
- Model estimates: no station temperature observations, city polygon mean, population-weighted exposure or measured human risk.
- Sampling: 8 named coordinate conveniences across Indonesia, chosen before this run, not a national spatially representative network or raster.

## Real source results

| Point | Latitude | Longitude | Fitted `T2M` slope (°C/decade) |
|---|---:|---:|---:|
| Banda Aceh | 5.5483 | 95.3238 | +0.234915 |
| Medan | 3.5952 | 98.6722 | +0.290685 |
| Jakarta | −6.2088 | 106.8456 | +0.223835 |
| Bandung | −6.9175 | 107.6191 | +0.178578 |
| Yogyakarta | −7.7956 | 110.3695 | +0.179141 |
| Surabaya | −7.2575 | 112.7521 | +0.139632 |
| Denpasar | −8.6500 | 115.2167 | +0.279566 |
| Makassar | −5.1477 | 119.4327 | +0.170671 |

All eight **fitted** slopes were positive for this model, period and sample. The smallest was Surabaya; the largest was Medan. **These model-derived location-point values cannot be generalized to whole cities, populations, neighborhoods or all Indonesia.** The difference in fitted slopes is not a direct measure of human heat hazard or local adaptation priority.

## Direct selected pair — mathematically checked, NOT confirmatory

The tool selected minimum Surabaya as **A** and maximum Medan as **B** using the same observed trends.

| Diagnostic | Result |
|---|---:|
| Paired full calendar years | 24 |
| Model B−A fitted slope difference | **+0.1510526 °C/decade** |
| Exploratory Bartlett/Newey–West bandwidth | 2 years |
| Approximate HAC 95% interval | **+0.0226454 to +0.2794599 °C/decade** |
| Approximate unadjusted two-sided p | **0.0232243** |
| Residual Durbin–Watson diagnostic | 2.0702 |

**DO NOT report “Medan is statistically proven to be warming faster than Surabaya” or use p<0.05 as a confirmatory finding.** Those two locations were selected as the most extreme *after reviewing all eight points*. A p-value and interval computed with no selection adjustment can exaggerate evidential strength, even though the paired residual variance accounts approximately for short-lag autocorrelation. Additional uncertainty arises from geographical reanalysis support, residual temporal/spatial dependence and physical climate processes. A selection-independent analysis or more appropriate controlled design is needed to make an inferential claim.

For comparison, the **pre-existing** 2001–2024 Jakarta vs Yogyakarta B−A study did **not** establish unequal fitted warming rates (approximate paired p≈0.374). See [existing two-point case study](CASE_STUDY.md). We should show both results to demonstrate that this tool will report non-findings and guard against selecting only pleasing contrasts.

## Independent validation achieved

- Real direct NASA POWER requests were made for all eight model points: **8/8 successful**, zero failures or insufficient-year records.
- `scripts/live-discovery.mjs` preserved raw valid monthly observations and derived annual estimates.
- `scripts/verify-discovery-scipy.py` independently recalculated all monthly-to-annual weighted means, all eight OLS slopes/p/95% intervals and the selected-pair approximate HAC variance, confidence interval and p from the **same real NASA records**. All matched; workflow passed.
- Existing fixed-fixture unit tests and browser smoke tests assess code behavior, not validity of actual NASA climate measurements.
- **A separate actual Chromium browser run of the complete eight-point Finder also PASSED**, using real NASA POWER responses through the locally served Cloudflare Pages Function code: 8/8 valid point requests, A/B deep link, full exported evidence JSON, 390px mobile overflow, and authentic desktop/mobile screenshots. [Live browser run #43582005814](https://github.com/Ni-zav/terra-lens/actions/runs/43582005814). This is **not proof of a hosted feature-branch deployment or user adoption**. A real user comprehension test remains an independent gate.

## Who can responsibly use the result?

An educator can ask students why eight positive point slopes do not identify a national heat-risk ranking. A community science team could ask where to compare independent station observations and whether land elevation/urbanization/exposure confound a point comparison. A researcher can download exact NASA URLs and derived data for an independent check. **These are potential uses, not verified uptake.**

The finder uses NASA POWER, which is not named on the challenge's NASA Resources tab. The separate [Giovanni regional case](NASA_QUALIFYING_SOURCE_HANDOFF.md) analyzes output from a listed NASA service; its spatial support differs from the finder's points. An importer alone cannot certify a user-supplied file.
