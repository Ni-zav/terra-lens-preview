# NASA dataset registry and integration policy

Date: 14 November 2026. **Catalog entries are not observations or proof of hackathon eligibility.**

## NASA Earthdata collection discovery

An experimental Giovanni-workspace search queries NASA's [Common Metadata Repository collection API](https://cmr.earthdata.nasa.gov/search/site/docs/search/api.html) using a user-entered keyword and selected bounding box and years. It returns at most ten catalog records and links to their Earthdata pages; successful results are cached in memory for 15 minutes. Live browser requests succeeded on a hosted experiment and a GitHub runner after earlier local timeouts; the cause of those timeouts remains unverified. Catalog overlap is not proof that a specific variable or granule is available, suitable, NASA-owned or supported by Terra-Lens; records may include partner data. Variable-level discovery, generalized collection adapters, source quality validation and automatic analysis of arbitrary collections remain unimplemented.

## Live data: NASA POWER monthly point API

NASA POWER is implemented and queried live. Its meteorological parameters derive from NASA MERRA-2 reanalysis and select model grid-point estimates, not whole-city measurements.

| Code | Parameter | Unit | Interpretation |
|---|---|---|---|
| T2M | 2 m temperature | °C | Monthly mean |
| T2M_MAX | 2 m daily maximum temperature | °C | Monthly aggregate of daily maxima, not the hottest single day |
| T2M_MIN | 2 m daily minimum temperature | °C | Monthly aggregate of daily minima, not the coldest single day |
| T2MDEW | Dew/frost-point temperature | °C | Monthly mean |
| RH2M | Relative humidity | % | Percentage |
| QV2M | Specific humidity | g/kg | Distinct from RH2M |
| WS2M | 2 m wind speed | m/s | Not gust speed |
| PS | Surface pressure | kPa | Depends on surface elevation |
| PRECTOTCORR | Corrected precipitation rate | mm/day | Monthly average daily rate, not annual total |

API metadata, units, availability, and product revisions should be checked against the original result. The nine variables above are allowlisted in the adapter but not independently proven available for every geography/date.

## Challenge-listed resources and candidates

The [published independent resource-list reproduction](https://hackathlone.com/challenges/earth-system-trend-detective) lists Giovanni, GES DISC Hydrology Time Series, NASA AppEEARS, and a NASA SeaWiFS methods paper. **Only the official NASA [challenge Resources tab](https://www.spaceappschallenge.org/2026/challenges/earth-system-trend-detective/?tab=resources) can settle the final eligibility requirements.**

| Service | Data and source | Implementation |
|---|---|---|
| NASA Giovanni / Giovanni in the Cloud | MERRA-2, AIRS and other time series; source-specific product/version/DOI | Local monthly CSV import; original authenticated M2TMNXSLV T2M regional output and independent verification are integrated. Granule lineage and QA remain unverified. |
| GES DISC Hydrology Time Series | GLDAS and related hydrology datasets | Research only, requires retrieval and units validation |
| NASA AppEEARS | MODIS vegetation indices / land surface temperature, with QA masks | Research only, requires authenticated subset, calendar and quality methods |
| NASA FIRMS | MODIS and VIIRS fire detections / radiative power | Research only; detection ≠ burnt area or fire cause |
| NASA POWER | MERRA-2-derived meteorological estimates | Live integrated; POWER not explicitly present in reproduced challenge resource list |

No universal "all NASA data" connector is claimed. Valid integration requires authentic dataset/version, unit semantics, time steps, geographic support, missingness, quality control, and reproducible calculations.

## Evidence rules

1. Preserve NASA request URL/download URL, product identifier/version, DOI if available, extraction footprint, source units, retrieved time and original input.
2. Keep untouched original data and an SHA-256 checksum where files are imported. User-entered provenance does not cryptographically establish NASA authenticity.
3. Record every missing month; require 12 valid months for annual means. Convert with Gregorian day weights only when appropriate for monthly mean/rate values.
4. Report point slopes separately from paired B-minus-A differences; keep calendar-year alignment, record dropped unmatched years and document the HAC approximation.
5. For multi-point discovery, predeclare sites and time span; display failures and all trials, avoid cherry-picking positive results.
6. Do not compare NASA POWER point data directly with Giovanni region averages as if they sampled the same spatial unit.
7. A source listed as a *resource* is not evidence of actual data use. Mark Global Award resource compliance unresolved until authentic data from a qualifying source has been analyzed.

## Primary references

- [NASA POWER monthly API](https://power.larc.nasa.gov/docs/services/api/temporal/monthly/)
- [NASA POWER parameter inventory](https://power.larc.nasa.gov/docs/methodology/data/sources_hydrology/)
- [NASA Giovanni CSV and citation guide](https://giovanni.gsfc.nasa.gov/giovanni/doc/UsersManualworkingdocument.docx.html)
- [NASA official Giovanni in the Cloud notebook](https://github.com/nasa/gesdisc-tutorials/blob/main/notebooks/How_to_Access_GiC_Time_Series_Service.ipynb)
- [NASA GES DISC 2026 migration](https://github.com/nasa/gesdisc-tutorials/blob/main/user-guidance/GES_DISC_Migration_to_Earthdata_Website_and_Earthdata_Cloud.md)
