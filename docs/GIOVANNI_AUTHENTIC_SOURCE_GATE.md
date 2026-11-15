# Unresolved required NASA Resources-tab source — secure authenticated Giovanni evidence path

**Status 15 Nov 2026:** The branch now incorporates an authenticated Giovanni area-average export and independent numerical verification. See [source handoff](NASA_QUALIFYING_SOURCE_HANDOFF.md). The original output contains no quality-flag variable and input-granule QA has not been independently audited. NASA determines award eligibility; citing a URL alone is insufficient.

The branch also analyzes a [NASA-published tutorial CSV attributed to Giovanni](GIOVANNI_TUTORIAL_CASE.md). Its original job URL, precise weighting and quality flags are not available, so it is a useful candidate but does not close this project's strict source-verification gate.

NASA source: https://giovanni.gsfc.nasa.gov/giovanni/
Official GO Team guidance: https://github.com/nasa/spaceapps/discussions/1827
Original NASA Giovanni in the Cloud tutorial: https://github.com/nasa/gesdisc-tutorials/blob/main/notebooks/How_to_Access_GiC_Time_Series_Service.ipynb
Authenticated NASA Earthdata credentials must NEVER be pasted in chat, committed, logged or bundled in browser JavaScript.

## Participant-dependent action (requires an actual NASA Earthdata login)

1. Open your official challenge [Resources tab](https://www.spaceappschallenge.org/2026/challenges/earth-system-trend-detective/?tab=resources) and capture the exact NASA Giovanni/Hydrology Time Series/AppEEARS resource name and link (a screenshot is ideal).
2. Open NASA Giovanni and sign in via Earthdata Login as required. Select a **genuine monthly NASA mission/model product** with ≥10 years of monthly data; preferred candidate: MERRA-2 monthly near-surface meteorology, but confirm the actual collection and variables in the portal rather than guessing.
3. Export **the unedited original monthly time-series CSV** and separately record the NASA product's confirmed short name/version, DOI, original download/job URL, variable, unit, geographic support, retrieved timestamp. A tool/service citation by itself is NOT proof of source use.
4. Keep the original CSV in a private local folder outside Git; the CLI runs entirely from disk, does not log Earthdata tokens and writes a generated **analysis JSON only** under `artifacts/`.

### On the developer's Mac / Linux shell

```bash
cd terra-lens
npm ci
export GIOVANNI_CSV_FILE="$HOME/Downloads/ORIGINAL_NASA_GIOVANNI_MONTHLY.csv"
export GIOVANNI_PRODUCT_ID="ACTUAL_OFFICIAL_NASA_COLLECTION_ID"
export GIOVANNI_PRODUCT_DOI="10.xxxx/ACTUAL_OFFICIAL_PRODUCT_DOI"
export GIOVANNI_DATA_URL="https://giovanni.gsfc.nasa.gov/giovanni/ACTUAL_RESULT_URL"
node scripts/verify-giovanni-source.mjs
python3 -m pip install --user scipy
python3 scripts/verify-giovanni-source-python.py
```

Replace placeholder values with actual NASA source identifiers and the original URL; fake placeholder values will not make the record authentic. The cloud parser requires `param_name` and `unit`, rejects multiple samples per calendar month and excludes declared numeric fill values (or `-999` if no fill is declared); it cannot infer every product-specific missing marker. Trend calculation requires at least ten complete calendar years. These checks do **not** certify Earthdata authenticity or source quality.

5. Review the actual `artifacts/giovanni-source-evidence.json`: SHA-256 of original CSV, NASA URL/DOI as externally recorded, parser metadata, retained month records, complete annual records, classical OLS slope, interval and p-value and caveats.
6. Cross-check the original source URL/product DOI on NASA's product page; examine temperature/Kelvin conversion, regional-vs-point support, time aggregation, fill values, quality flags and model uncertainty. Independent Python numerical agreement checks code only; cannot establish NASA dataset origin or scientific source correctness.
7. **Only after scientific validation**, select one clear analysis to present in NASA submission with exact NASA source and measured result, and preserve the official Project submission confirmation.

### For multi-source value

A genuine NASA Giovanni monthly dataset could be connected via the existing `src/giovanni.js` importer to the model point climate workflow, **only** if units, physical variable definition, spatial aggregation and time support match. Do NOT blindly merge its series with NASA POWER or compute a causal correlation. The new SWOT and GISS examples remain separate, supplementary science exhibits.

## Strict safety checks

- No Earthdata username/password or bearer token enters git, chat, web frontend, CI logs or source snapshot manifest.
- Do not report a new download as authenticated until its original output and provenance have been checked; the existing regional case is documented separately.
- Do not replace a missing Giovanni CSV with a fabricated one or a NASA GISS snapshot and relabel it as Giovanni.
- Do not label the local source-file checker as an authenticated NASA downloader.
- The source's official list membership may need organizer confirmation; NASA mission authenticity and event eligibility are separate requirements.

## New secure source-acquisition path (15 November 2026)

The project now has an **opt-in, participant-authenticated source fetcher**:
[`scripts/fetch-authentic-giovanni.mjs`](../scripts/fetch-authentic-giovanni.mjs).
It requests NASA's official `https://api.giovanni.earthdata.nasa.gov/timeseries`
endpoint with an Earthdata bearer token in an HTTP header, and writes the
**unaltered response bytes outside the repository**. It refuses unlabeled,
sparse or duplicate-month data and invokes the independent JavaScript evidence
pipeline; its analysis output remains a *source claim pending manual NASA review*.

**Select the exact variable identifier in NASA's authoritative
[configured-variables](https://api.giovanni.earthdata.nasa.gov/configured-variables)
catalog before running.** A scientifically suitable candidate is the NASA
MERRA-2 monthly model product **M2IMNXASM v5.12.4**, `T2M` in Kelvin,
[DOI 10.5067/5ESKGQTZG7FO](https://doi.org/10.5067/5ESKGQTZG7FO).
The *collection ID*, *API variable identifier*, and *collection DOI* are
different metadata fields. Do not guess the API variable ID or substitute
NASA POWER data under the same label. This is a single-grid-point time series,
not automatically an area-averaged regional observation.

On a laptop with Earthdata Login **already authorized**, set the following
values locally (never paste the token into GitHub, logs, ChatGPT or a PR):

```bash
cd terra-lens
# Source a bearer token from your own authenticated Earthdata environment
# into EARTHDATA_TOKEN without saving it to files or shell history.
export GIOVANNI_VARIABLE_ID="EXACT_ID_FROM_NASA_CONFIGURED_VARIABLES"
export GIOVANNI_PRODUCT_ID="M2IMNXASM_5.12.4"
export GIOVANNI_PRODUCT_DOI="10.5067/5ESKGQTZG7FO"
export GIOVANNI_LAT="-7.7956"
export GIOVANNI_LON="110.3695"
export GIOVANNI_START="2001-01-01"
export GIOVANNI_END="2024-12-31"
export GIOVANNI_DOWNLOAD_DIR="$HOME/Documents/terra-lens-original-nasa"
node scripts/fetch-authentic-giovanni.mjs
unset EARTHDATA_TOKEN
```

The script prints an original-file path, result evidence path, NASA request URL,
monthly-row count, and SHA-256. The data and generated evidence are **private
local artifacts**, not already included on GitHub. If the API returns a 401/403,
redirect, timeout, quota error, a nonmonthly CSV or fewer than 10 complete
years, correct the genuine NASA access/data request; do not create synthetic
results or edit the downloaded response into an allegedly original file.

Then run the independent numerical check using the printed paths:

```bash
GIOVANNI_EVIDENCE_FILE="/absolute/path/to/giovanni-evidence-....json" \
GIOVANNI_CSV_FILE="/absolute/path/to/giovanni-original-....csv" \
python3 scripts/verify-giovanni-source-python.py
```

Confirm the original NASA collection DOI, spatial method and CSV metadata;
test in the `Giovanni` tab, preserve the untouched original and use the evidence
only after external source review. This fetcher has not been used to acquire the
regional case; that case was downloaded through Giovanni's browser workflow and
is documented in the source handoff. A fetcher alone does not establish eligibility.
