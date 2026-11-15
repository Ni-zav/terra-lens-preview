# NASA qualifying source: Giovanni MERRA-2 regional temperature

## Eligibility and source

The official [2026 Be An Earth System Trend Detective Resources tab](https://www.spaceappschallenge.org/2026/challenges/earth-system-trend-detective/?tab=resources) lists [Giovanni](https://giovanni.gsfc.nasa.gov/) under **NASA Data & Resources**, verified directly on 15 November 2026. The [NASA Space Apps organizing team](https://github.com/nasa/spaceapps/discussions/1827) says Global Awards require use of at least one NASA data source included in the challenge resources and citation of sources. We used Giovanni to create the data series, not merely a citation. Eligibility decisions remain with organizers.

NASA GMAO MERRA-2 **M2TMNXSLV 5.12.4**, monthly mean single-level diagnostics, variable **T2M**, 2 m air temperature in K, 0.5° latitude × 0.625° longitude grid. DOI [10.5067/AP1B0BA5PD2K](https://doi.org/10.5067/AP1B0BA5PD2K). This is a model reanalysis assimilating observations, not a station measurement. Giovanni's requested area was west 110°, south −8°, east 111°, north −7°; Giovanni reports data bounding points 110° to 110.625° E, −8° to −7°. This is an area average over the included model grid cells, not the city of Yogyakarta or a single POWER point. Period January 2001–December 2024.

## Original files and retrieval

Authenticated Giovanni v4.40 produced the two unmodified outputs on 15 November 2026. Browser download file timestamps (UTC, second precision): CSV **01:42:21**, NetCDF **01:42:29**. The [reproducible Giovanni query](https://giovanni.gsfc.nasa.gov/giovanni/#service=ArAvTs&starttime=2001-01-01T00:00:00Z&endtime=2024-12-31T23:59:59Z&bbox=110,-8,111,-7&data=M2TMNXSLV_5_12_4_T2M) may create a new job whose temporary result URL differs. The exact source URLs used for these files, including temporary Giovanni job identifiers (not Earthdata credentials), are:

- Original NASA Giovanni CSV serializer URL (`serializer.pl` reads the session `.nc` file specified in `FILE=` and serves `Content-Type: text/csv; charset=ISO-8859-1`, `Content-Disposition: attachment; filename="g4.areaAvgTimeSeries.M2TMNXSLV_5_12_4_T2M.20010101-20241231.110E_8S_111E_7S.csv"`, `9,434` bytes, verified via Earthdata URS login on 15 November 2026 to match SHA-256 `ff7cd37fd010ae16015ce22400c2cb583c975c6d9277e0235cbd674d774e54dc`): `https://giovanni.gsfc.nasa.gov/giovanni/daac-bin/serializer.pl?SESSION=343566EA-E094-11F1-A1CF-4CF1FED1C619&RESULTSET=6BED9890-E095-11F1-9112-2588FFD1C619&RESULT=6BEDAC4A-E095-11F1-9112-2588FFD1C619&FILE=g4.areaAvgTimeSeries.M2TMNXSLV_5_12_4_T2M.20010101-20241231.110E_8S_111E_7S.nc`
- Original NASA Giovanni NetCDF session URL (`84,396` bytes, verified via Earthdata URS login on 15 November 2026 to match SHA-256 `d9a320f77ef79b65ec6dba4454e247c700b420cb4966270cf677f88f75f74668`): `https://giovanni.gsfc.nasa.gov/session/343566EA-E094-11F1-A1CF-4CF1FED1C619/6BED9890-E095-11F1-9112-2588FFD1C619/6BEDAC4A-E095-11F1-9112-2588FFD1C619/g4.areaAvgTimeSeries.M2TMNXSLV_5_12_4_T2M.20010101-20241231.110E_8S_111E_7S.nc`

Because NASA Giovanni session URLs require Earthdata Login and eventually expire, the unmodified files are preserved byte-for-byte in [`data/source-snapshots/`](../data/source-snapshots/):

- Preserved CSV ([`g4.areaAvgTimeSeries.M2TMNXSLV_5_12_4_T2M.20010101-20241231.110E_8S_111E_7S.csv`](../data/source-snapshots/g4.areaAvgTimeSeries.M2TMNXSLV_5_12_4_T2M.20010101-20241231.110E_8S_111E_7S.csv)): SHA-256 `ff7cd37fd010ae16015ce22400c2cb583c975c6d9277e0235cbd674d774e54dc`
- Preserved NetCDF ([`g4.areaAvgTimeSeries.M2TMNXSLV_5_12_4_T2M.20010101-20241231.110E_8S_111E_7S.nc`](../data/source-snapshots/g4.areaAvgTimeSeries.M2TMNXSLV_5_12_4_T2M.20010101-20241231.110E_8S_111E_7S.nc)): SHA-256 `d9a320f77ef79b65ec6dba4454e247c700b420cb4966270cf677f88f75f74668`

The CSV declares fill `1000000000000000`; NetCDF declares `_FillValue` and `missing_value` near 1e15, K, `cell_methods: time: mean lat, lon: mean`, and 288 samples. NetCDF history records latitude-weighted averaging with NCO `ncwa -w wlat -a lat,lon`. No monthly values are masked or equal to the declared fill. The NetCDF has no quality-flag variable; no quality filtering can be independently asserted. Input-granule-level flags and processing uncertainty were not independently audited. The CSV is a Giovanni-derived aggregate, not native source granules.

NASA's [reprocessing record](https://docserver.gesdisc.eosdis.nasa.gov/public/project/MERRA/Records_MERRA-2_Data_Reprocessing_and_Service_Changes.pdf) says September 2020 and June–September 2021 were reprocessed across all MERRA-2 collections; the 2021 correction addressed a near-surface warm bias. The preserved aggregate's NetCDF names Giovanni intermediate files but does not identify native input-granule filenames or version prefixes, so we cannot verify which versions contributed. As a **sensitivity check, not a correction or proof of input version**, independently refitting after excluding both affected calendar years gives +0.186620 K/decade over 22 years (classical p=0.016118); the published 24-year analysis remains the primary result. NASA's [GMAO FAQ](https://gmao.gsfc.nasa.gov/gmao-products/merra-2/faq_merra-2/) describes monthly quality checking before release; that general process does not replace a granule-level audit of this export.

## Independent six-cell aggregation evidence

The original Giovanni session also produced two intermediate NetCDF files containing the six grid-cell values and latitude weights used for the regional average. They were retrieved through Earthdata by the project owner and are preserved byte-for-byte in `data/source-snapshots/`:

- `giovanni-m2tmnxslv-t2m-first-weighted.nc` (January 2001–August 2017), SHA-256 `bbc7cb7fd75fd4856e6671380fdeffc76ea3c02f21b3011f36e2f1bba65c5766`.
- `giovanni-m2tmnxslv-t2m-second-weighted.nc` (September 2017–December 2024), SHA-256 `fdf05b71256eca606080f61077c9e2f54af298a2c05a69fb3cc055aa4fe276ee`.

`scripts/verify-giovanni-grid.py` independently recomputes all 288 area means from the 3 × 2 cell values and latitude weights, checks timestamps and hashes, and independently fits the trend from those recalculated means. The largest difference from Giovanni's original area-average NetCDF is 0.000015188 K; the grid-derived OLS slope is +0.177171416 K/decade (classical 95% interval +0.042312908 to +0.312029923, p=0.012376069). Differences from the original aggregate-based fit are at floating-point precision. This establishes reproducibility of the spatial calculation, not source accuracy or native input-granule version. Neither intermediate contains quality flags or native granule identifiers.

## Reprocessed-month comparison (byte-preserved NASA OPeNDAP `.dap.nc4` & `.dap.csv` subsets)

For September 2020 and June–September 2021, we retrieved and preserved the **byte-identical NASA Hyrax OPeNDAP NetCDF-4 (`.dap.nc4`) and CSV (`.dap.csv`) subset responses** (`dap4.ce=/T2M[0:0][164:166][464:465];/lat[164:166];/lon[464:465];/time[0:0]`) directly from `https://opendap.earthdata.nasa.gov/collections/C1276812859-GES_DISC/granules/` using Earthdata authentication, stored in [`data/source-snapshots/opendap-merra2-reprocessed-202009-202109/`](../data/source-snapshots/opendap-merra2-reprocessed-202009-202109/) alongside the earlier 3-decimal transcription (`data/source-snapshots/owner-transcribed-merra-reprocessed-grid-202009-202109.json`):

- `2020-09` (`MERRA2_401.tavgM_2d_slv_Nx.202009.nc4`, `ProductionDateTime`: `Re-processed file generated: Wed Nov  4 01:12:28 2020 GMT`): `.dap.nc4` SHA-256 `ba1c75ba6305fa95490ed9a33b339d1ce0686ce2a807cabd51cc0576a48bf78c`, `.dap.csv` SHA-256 `7af40c8075e1f46cb859deb1aff82cdf60887342c0cf2f6d60f9fedce3331152`.
- `2021-06` (`MERRA2_401.tavgM_2d_slv_Nx.202106.nc4`, `ProductionDateTime`: `Re-processed file generated: Mon Nov 29 20:02:40 2021 GMT`): `.dap.nc4` SHA-256 `62395054ebf9f41558f60385e1cce3ee1ad93eefab796a31111616985f4f2526`, `.dap.csv` SHA-256 `0f2d27f019b7c01dff59a8ba0f096a244e1a11e84c365e6053df23cd5f318371`.
- `2021-07` (`MERRA2_401.tavgM_2d_slv_Nx.202107.nc4`, `ProductionDateTime`: `Re-processed file generated: Tue Nov 30 17:25:54 2021 GMT`): `.dap.nc4` SHA-256 `8c0a811bacdfa5057f8c3f6e0f5319e11650c2485f79750690d7886806658423`, `.dap.csv` SHA-256 `705fb13dbb9d9edf3cbc15619ac1b0959be99f26e2c0e7bd74515280377d8f44`.
- `2021-08` (`MERRA2_401.tavgM_2d_slv_Nx.202108.nc4`, `ProductionDateTime`: `Re-processed file generated: Fri Dec  3 01:55:50 2021 GMT`): `.dap.nc4` SHA-256 `7c7e4d6d952414fd9c8d74c24a253fccfe3c07476a60f05a5a58be9dce7db8aa`, `.dap.csv` SHA-256 `834c5f90512a4ca69a88c08ed3257df3a522a97e9a6f6d207cca78ed597d8aa8`.
- `2021-09` (`MERRA2_401.tavgM_2d_slv_Nx.202109.nc4`, `ProductionDateTime`: `Re-processed file generated: Mon Dec  6 18:35:02 2021 GMT`): `.dap.nc4` SHA-256 `86c82000352664be8ce42a16de9b82c9fd25b9c172fe6402bbe53a1e7c681c71`, `.dap.csv` SHA-256 `a770f63fc440c6f830b006da0074a71e107368b08e1444e9b8e3fe5fce5f6c5e`.

`scripts/verify-transcribed-merra-grid.py` verifies the SHA-256 hashes and native NetCDF global attributes (`GranuleID`, `ShortName`, `VersionID`, `identifier_product_doi`, `ProductionDateTime`) of all five byte-preserved OPeNDAP `.dap.nc4` files and confirms that all 30 grid-cell values (`5 months × 3 latitudes × 2 longitudes`) in `giovanni-m2tmnxslv-t2m-second-weighted.nc` are **IEEE 754 `float32` bit-for-bit identical (`0.0 K` maximum difference)** to the reprocessed `MERRA2_401` OPeNDAP granules (and match the 3-decimal transcription within `0.000465 K`). The native `M2TMNXSLV.5.12.4` monthly reanalysis granules themselves contain physical diagnostic variables (`T2M`, etc.) with `_FillValue = 1e+15` and no separate per-cell quality-flag variable. Because Giovanni's cached intermediate NetCDF does not embed the `GranuleID` string attribute, we retain the explicit limitation that native granule version identity is corroborated by exact `float32` cell-value equality rather than a Giovanni job manifest.

## Analysis and independent verification

Question: How did modeled regional 2 m air temperature change over 2001–2024? All 288 months are present. We calculate each annual mean from the 12 monthly means weighted by Gregorian month lengths, excluding incomplete years, then fit OLS to actual calendar years. The 24-year fit is **+0.177171 K/decade**, classical two-sided **p = 0.012376**, 95% classical slope interval **[+0.042313, +0.312030] K/decade**. Temperature differences in K equal differences in °C. This is an exploratory historical model estimate. The standard interval assumes independent homoscedastic residuals; serial correlation, selection, multiple testing, model and processing uncertainty can make it optimistic. It does not establish causation, forecast future warming, or test differences against POWER.

An independent Python implementation reads the original NetCDF and CSV directly, checks hashes, product metadata, fill/mask and absence of quality flags, matches each month (maximum CSV rounding difference 0.0000005 K), calculates its own annual means, and compares its SciPy `linregress` and Student-t interval against JavaScript. All 24 annual values, slope, p and interval passed. This checks numerical consistency and the downloaded outputs, not accuracy against independent observations.

## Reproduce

From the repository root:

```sh
npm ci
npm run check
node scripts/verify-giovanni-area.mjs > /tmp/terra-lens-giovanni-js.json
python3 -m venv /tmp/terra-lens-nasa-science
/tmp/terra-lens-nasa-science/bin/pip install scipy netCDF4
/tmp/terra-lens-nasa-science/bin/python scripts/verify-giovanni-area.py
/tmp/terra-lens-nasa-science/bin/python scripts/verify-giovanni-grid.py
/tmp/terra-lens-nasa-science/bin/python scripts/verify-transcribed-merra-grid.py
```

The Python verifier runs the JS calculation itself and fails on source hash, missing or masked data, numerical or metadata mismatches. Local test: 70 Node tests passed and SciPy/NetCDF verification passed on 15 November 2026. CI workflow `.github/workflows/giovanni-area.yml` repeats the focused checks; consult the PR checks for the current head rather than assuming a pending run passed.

## Integration

The science adapter `src/science/giovanni-case.js` parses classic Giovanni area-average exports for this product, and the Giovanni workspace displays the original regional chart and fitted result. The workspace can also construct a Giovanni query for other supported bounds and years and import the resulting classic CSV locally. This is distinct from the cloud-service CSV importer; imported provenance remains unverified. Keep area-average data and POWER point data separate. Temporary result URLs may expire; the original artifacts and checksum are the durable evidence. No NASA submission has been made.

Source-review branch: `review/nasa-qualifying-source-20261115`, [draft PR #5](https://github.com/Ni-zav/terra-lens/pull/5), implementation commit `195e00742eb2358b2e39d919ba9e1096f1c4c31e`. Its work is integrated into the separate draft review branch without merging main. Check the current PR head and CI before treating any results as final.
