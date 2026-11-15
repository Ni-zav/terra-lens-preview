# NASA qualifying source: Giovanni MERRA-2 regional temperature

## Eligibility and source

The official [2026 Be An Earth System Trend Detective Resources tab](https://www.spaceappschallenge.org/2026/challenges/earth-system-trend-detective/?tab=resources) lists [Giovanni](https://giovanni.gsfc.nasa.gov/) under **NASA Data & Resources**, verified directly on 15 November 2026. The [NASA Space Apps organizing team](https://github.com/nasa/spaceapps/discussions/1827) says Global Awards require use of at least one NASA data source included in the challenge resources and citation of sources. We used Giovanni to create the data series, not merely a citation. Eligibility decisions remain with organizers.

NASA GMAO MERRA-2 **M2TMNXSLV 5.12.4**, monthly mean single-level diagnostics, variable **T2M**, 2 m air temperature in K, 0.5° latitude × 0.625° longitude grid. DOI [10.5067/AP1B0BA5PD2K](https://doi.org/10.5067/AP1B0BA5PD2K). This is a model reanalysis assimilating observations, not a station measurement. Giovanni's requested area was west 110°, south −8°, east 111°, north −7°; Giovanni reports data bounding points 110° to 110.625° E, −8° to −7°. This is an area average over the included model grid cells, not the city of Yogyakarta or a single POWER point. Period January 2001–December 2024.

## Original files and retrieval

Authenticated Giovanni v4.40 produced the two unmodified outputs on 15 November 2026. Browser download file timestamps (UTC, second precision): CSV **01:42:21**, NetCDF **01:42:29**. The [reproducible Giovanni query](https://giovanni.gsfc.nasa.gov/giovanni/#service=ArAvTs&starttime=2001-01-01T00:00:00Z&endtime=2024-12-31T23:59:59Z&bbox=110,-8,111,-7&data=M2TMNXSLV_5_12_4_T2M) may create a new job whose temporary result URL differs. The exact source URLs used for these files, including temporary Giovanni job identifiers (not Earthdata credentials), are:

- CSV: `https://giovanni.gsfc.nasa.gov/giovanni/daac-bin/serializer.pl?SESSION=343566EA-E094-11F1-A1CF-4CF1FED1C619&RESULTSET=6BED9890-E095-11F1-9112-2588FFD1C619&RESULT=6BEDAC4A-E095-11F1-9112-2588FFD1C619&FILE=g4.areaAvgTimeSeries.M2TMNXSLV_5_12_4_T2M.20010101-20241231.110E_8S_111E_7S.nc`
- NetCDF: `https://giovanni.gsfc.nasa.gov/session/343566EA-E094-11F1-A1CF-4CF1FED1C619/6BED9890-E095-11F1-9112-2588FFD1C619/6BEDAC4A-E095-11F1-9112-2588FFD1C619/g4.areaAvgTimeSeries.M2TMNXSLV_5_12_4_T2M.20010101-20241231.110E_8S_111E_7S.nc`

Files are preserved byte-for-byte in `data/source-snapshots/`:

- `.csv` SHA-256 `ff7cd37fd010ae16015ce22400c2cb583c975c6d9277e0235cbd674d774e54dc`
- `.nc` SHA-256 `d9a320f77ef79b65ec6dba4454e247c700b420cb4966270cf677f88f75f74668`

The CSV declares fill `1000000000000000`; NetCDF declares `_FillValue` and `missing_value` near 1e15, K, `cell_methods: time: mean lat, lon: mean`, and 288 samples. NetCDF history records latitude-weighted averaging with NCO `ncwa -w wlat -a lat,lon`. No monthly values are masked or equal to the declared fill. The NetCDF has no quality-flag variable; no quality filtering can be independently asserted. Input-granule-level flags and processing uncertainty were not independently audited. The CSV is a Giovanni-derived aggregate, not native source granules.

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
```

The Python verifier runs the JS calculation itself and fails on source hash, missing or masked data, numerical or metadata mismatches. Local test: 70 Node tests passed and SciPy/NetCDF verification passed on 15 November 2026. CI workflow `.github/workflows/giovanni-area.yml` repeats the focused checks; consult the PR checks for the current head rather than assuming a pending run passed.

## Integration

The science adapter `src/science/giovanni-case.js` parses classic Giovanni area-average exports for this product, and the Giovanni workspace displays the original regional chart and fitted result. The workspace can also construct a Giovanni query for other supported bounds and years and import the resulting classic CSV locally. This is distinct from the cloud-service CSV importer; imported provenance remains unverified. Keep area-average data and POWER point data separate. Temporary result URLs may expire; the original artifacts and checksum are the durable evidence. No NASA submission has been made.

Source-review branch: `review/nasa-qualifying-source-20261115`, [draft PR #5](https://github.com/Ni-zav/terra-lens/pull/5), implementation commit `195e00742eb2358b2e39d919ba9e1096f1c4c31e`. Its work is integrated into the separate draft review branch without merging main. Check the current PR head and CI before treating any results as final.
