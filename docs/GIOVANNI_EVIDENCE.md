# NASA Giovanni: authentic dataset and proof workflow

An independently verified authentic regional Giovanni example is integrated; see [source handoff](NASA_QUALIFYING_SOURCE_HANDOFF.md). Arbitrary imported files are not automatically authenticated.

This pathway supports the challenge-listed Giovanni service, whose [NASA user guide](https://giovanni.gsfc.nasa.gov/giovanni/doc/UsersManualworkingdocument.docx.html) documents exported CSV files. The [NASA Giovanni in the Cloud tutorial](https://github.com/nasa/gesdisc-tutorials/blob/main/notebooks/How_to_Access_GiC_Time_Series_Service.ipynb) provides its authenticated time-series API example and CSV metadata fields. NASA Earthdata Login can be required. Never commit tokens/passwords.

1. Sign in to Giovanni/Earthdata and select a **monthly** NASA Earth-science time series (for example a confirmed MERRA-2 monthly collection, rather than guessing a product ID). Confirm the selected variable, its physics, units, exact NASA collection ID/version/DOI, area/point method, and years.
2. Download an untouched original CSV. Preserve its result/download URL, retrieval timestamp and footprint. Do not alter or substitute synthetic data.
3. In Terra-Lens, open **Analyze a NASA Giovanni monthly export**. Import this genuine CSV. The browser reads the file locally; nothing is uploaded.
4. The cloud parser requires `param_name` and `unit`, rejects multiple records per month, and excludes nonnumeric values and numeric sentinels declared as `_FillValue`, `fillvalue`, `fill_value` or `missing_value`. If none is declared, it excludes the legacy `-999` sentinel. Other product-specific missing codes are not inferred; verify them against the source documentation. The separate supported classic area adapter reads its declared fill value. Incomplete calendar years are dropped, not filled.
5. For ten or more complete years, Terra-Lens runs the same classical OLS as the NASA POWER analysis. Check the count and unit before interpreting a slope.
6. Enter the authentic NASA dataset ID/version, DOI, and original URL. Export the evidence JSON with SHA-256 of the untouched CSV, NASA metadata, original valid monthly series, annual derived series and OLS diagnostics.
7. Independently reproduce numbers with SciPy or another scientific package. Do not assert Kelvin temperatures are Celsius without conversion (changes in K and °C have equal magnitude), or equate a region-averaged series with a POWER grid-point sample.
8. Verify the official NASA Space Apps Resources tab and include this specific **analyzed dataset**, along with a defensible finding, in the demo and submission. Source links alone are insufficient.

Any locally supplied file and user-entered metadata cannot be authenticated automatically. The checked regional case has an independent result; NASA determines official eligibility and the team submission remains the owner's responsibility.

Future extensions: GLDAS hydrology needs unit- and model-aware analysis; MODIS/AppEEARS NDVI and LST require quality masks and seasonal treatment; NASA FIRMS fire detections require consistent observation coverage and should not be treated as exact burnt-area measurements.

For imported Giovanni Cloud series, the app cannot establish the product’s temporal aggregation from the CSV. Annual values are day-weighted averages of the monthly values, not annual totals or annual extremes. Check the product documentation and whether averaging is meaningful before interpreting a trend. Imported provenance and quality remain user-supplied and unverified.
