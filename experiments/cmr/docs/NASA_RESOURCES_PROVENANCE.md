# 2026 challenge Resources qualification — careful evidence status

**Snapshot:** 15 November 2026. **Selected challenge:** [Be An Earth System Trend Detective!](https://www.spaceappschallenge.org/2026/challenges/earth-system-trend-detective/).

## Binding Global Award rule

NASA Global Organizing (GO) Team publicly states that Global Awards require **at least one NASA data source included in the Resources of the selected challenge** to be *actually used*, and the sources identified and cited. Adding a resource hyperlink alone is insufficient. NASA public organizer references:
- https://github.com/nasa/spaceapps/discussions/1827
- https://github.com/nasa/spaceapps/discussions/1849
- https://github.com/nasa/spaceapps/discussions/1947

## What has been verified and what has not

| Source/resource | Evidence | Status |
|---|---|---|
| [Official challenge Resources tab](https://www.spaceappschallenge.org/2026/challenges/earth-system-trend-detective/?tab=resources) | The official page response was retrieved on 15 November 2026; its embedded Resources content lists Giovanni, Hydrology Time Series and AppEEARS under NASA Data & Resources, and SWOT under Space Agency Partner Resources. | **Directly verified** |
| Independent community transcription of Resources tab | https://github.com/nasa-hackathon-2026/resources (not NASA-operated) lists Giovanni, Hydrology Time Series, AppEEARS, and SWOT Mission among the challenge resources. This cannot replace a direct NASA-official snapshot. | **Secondary corroboration only** |
| **NASA SWOT** mission via PO.DAAC Hydrocron | Actual `SWOT_L2_HR_RiverSP_D` reach 74267300251 downloaded, QA screened, analyzed in conjunction with NASA POWER; [real-data run](https://github.com/Ni-zav/terra-lens/actions/runs/43610222429). NASA official API documentation: https://podaac.github.io/hydrocron/timeseries/ | **Real NASA-led mission dataset analyzed. The official page places SWOT under SPACE AGENCY PARTNER resources, not the NASA-resources group. Do not count as meeting mandatory NASA-source eligibility without organizer confirmation.** |
| NASA POWER | Real model-derived T2M, PRECTOTCORR already verified; no direct evidence POWER itself is named in official Resources. | **Live and validated, but not assumed qualifying** |
| NASA GISS GISTEMP v4 | Authentic original NASA table snapshot (2001–2024) independently processed alongside live NASA POWER. [NASA original table](https://data.giss.nasa.gov/gistemp/tabledata_v4/GLB.Ts+dSST.txt). | **Analyzed additional NASA data; NOT assumed officially listed** |
| NASA Giovanni | [Authenticated area-average CSV and NetCDF](NASA_QUALIFYING_SOURCE_HANDOFF.md), M2TMNXSLV v5.12.4 T2M, 2001–2024; source job URLs and hashes preserved; JS independently checked against NetCDF and SciPy. No quality-flag variable in the output; input-granule QA was not independently audited. | **Actual challenge-listed NASA service output analyzed; final eligibility decisions belong to NASA.** The separate [tutorial CSV](GIOVANNI_TUTORIAL_CASE.md) has weaker provenance. |
| AppEEARS, GLDAS, GPM, MODIS | Product-specific actual raw data and QA not yet integrated. | **Planned only** |

**Important:** NASA SWOT is a joint NASA/CNES mission. The official challenge Resources tab places the **SWOT Mission information entry under Space Agency Partner resources**, *separately* from the NASA entries Giovanni, Hydrology Time Series and AppEEARS. The secondary resource index points to a Canadian Space Agency SWOT informational page, while the actual science dataset here is NASA PO.DAAC RiverSP. This is a scientifically valid NASA SWOT dataset, but **we cannot prove it meets the GO Team's selected challenge tab requirement without organizer confirmation that this partner entry qualifies**. Do not tell judges the gate is definitively cleared on this evidence alone.

## Source-use evidence and remaining limits

The resource list is directly verified. An authenticated Giovanni area-average CSV and NetCDF are now incorporated and analyzed, with product ID, DOI, source URLs, exact hashes and independent numerical verification. The output has no quality-flag variable; input-granule QA, model error and original data reprocessing are not independently verified. The other submission and team requirements still need review. This evidence is not NASA’s final eligibility determination.

The SWOT, POWER and GISS studies remain separate examples; do not represent them as the Giovanni regional export or use separate p-values to test a difference between them. Cite the actual Giovanni export and the other sources used in the project.

The importer and source-file verifier do not by themselves establish source use. The separate NASA tutorial table and its unresolved lineage are documented in [the candidate case](GIOVANNI_TUTORIAL_CASE.md).

## One-minute participant verification

1. Open the [official challenge Resources tab](https://www.spaceappschallenge.org/2026/challenges/earth-system-trend-detective/?tab=resources) in a regular logged-in browser.
2. Preserve a screenshot or copied resource names/URLs, including the entry concerning SWOT or Hydrology Time Series, and any Giovanni link. The public page response was inspected on 15 November; preserve a fresh screenshot if the team needs a submission record.
3. Cite the [Giovanni regional export](NASA_QUALIFYING_SOURCE_HANDOFF.md) with its dataset DOI, original links, spatial/temporal support and quality limitations.
4. If using SWOT as supplementary evidence, reference `SWOT_L2_HR_RiverSP_D`, SWORD Reach `74267300251`, the original NASA Hydrocron request, quality flags, and the product DOI [10.5067/SWOT-RIVERSP-D](https://doi.org/10.5067/SWOT-RIVERSP-D). Its partner-resource placement is not the basis of the Giovanni source-use claim.
5. Cite NASA POWER and NASA GISS separately as additional original NASA resources; do not confuse helpful scientific data with the event's mandatory listed-source gate.

No NASA login credentials, Earthdata tokens or private account data are stored in this repository.
