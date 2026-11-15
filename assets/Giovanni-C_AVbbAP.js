import{c as e,d as t,f as n,m as r,o as i,s as a,t as o}from"./index-BBaZCAwo.js";import{n as s,t as c}from"./science-DcnrwqlQ.js";var l=r(n(),1);function u(e){if(typeof e!=`string`||e.length>12e6)throw Error(`Invalid CSV or file exceeds 12 MB.`);let t={},n=[],r=new Set;for(let i of e.replace(/^\uFEFF/,``).split(/\r?\n/)){let e=i.trim();if(!e||e.startsWith(`#`))continue;let a=e.indexOf(`,`);if(a<1)continue;let o=e.slice(0,a).trim().replace(/^"|"$/g,``),s=e.slice(a+1).trim().replace(/^"|"$/g,``);if(/^[A-Za-z_][\w-]*$/.test(o)&&![`time`,`timestamp`,`date`].includes(o.toLowerCase())){n.length||(t[o.toLowerCase()]=s);continue}if(!/^\d{4}-\d{2}(?:-\d{2})?(?:[ T]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z)?)?$/.test(o))continue;let c=Number(o.slice(0,4)),l=Number(o.slice(5,7));if(l<1||l>12||c<1850||c>2100)throw Error(`Invalid monthly timestamp.`);if(o.length>=10){let e=Number(o.slice(8,10)),t=new Date(Date.UTC(c,l,0)).getUTCDate();if(e<1||e>t)throw Error(`Invalid calendar date in monthly CSV.`)}let u=o.slice(0,4)+o.slice(5,7);if(r.has(u))throw Error(`Multiple samples per month: use a monthly Giovanni time series, not daily or 3-hourly data.`);r.add(u);let d=s===``?NaN:Number(s),f=[`_fillvalue`,`fillvalue`,`fill_value`,`missing_value`].filter(e=>Object.hasOwn(t,e)).map(e=>{let n=Number(t[e]);if(t[e].trim()===``||!Number.isFinite(n))throw Error(`Invalid ${e} metadata.`);return n});!Number.isFinite(d)||f.includes(d)||!f.length&&d===-999||n.push({year:c,month:l,value:d,date:u})}if(!t.param_name||!t.unit)throw Error(`Giovanni CSV metadata must include param_name and unit. This importer does not accept unlabeled CSV.`);if(n.sort((e,t)=>e.year-t.year||e.month-t.month),!n.length)throw Error(`No valid monthly measurements found in source CSV.`);return{metadata:t,monthly:n}}function d(t,{id:n=`G`,color:r=`#e79bc0`,fileName:a,sha256:o,product:s,doi:c,sourceURL:l}={}){let u=t.metadata,d=u.lat!==void 0&&u.lon!==void 0&&u.lat!==``&&u.lon!==``,f=Number(u.lat),p=Number(u.lon),m=d&&Number.isFinite(f)&&Number.isFinite(p)&&f>=-90&&f<=90&&p>=-180&&p<=180,h=m?i.GRID_POINT:i.UNKNOWN;return e({id:n,color:r,monthly:t.monthly,support:h,label:s?`${s} (Giovanni)`:`${u.param_name} (Giovanni)`,geo:m?{lat:f,lon:p}:null,variable:{code:`GIOVANNI:`+u.param_name,label:u.param_name,unit:u.unit},provenance:{kind:`giovanni-import`,fileName:a,sha256:o,product:s||null,doi:c||null,url:l||null,metadata:u,authenticated:!1,warning:`User-supplied file; provenance and source quality are not independently authenticated. Check product-specific missing-value markers; declared numeric fill/missing values are excluded, or -999 when none is declared.`}})}var f=`Title:,"Time Series, Area-Averaged of 2-meter air temperature monthly 0.5 x 0.625 (monthly)"
User Start Date:,2001-01-01T00:00:00Z
User End Date:,2024-12-31T23:59:59Z
User Bounding Box:,"110,-8,111,-7"
Data Bounding Box:,"110,-8,110.625,-7"
URL to Reproduce Results:,"https://giovanni.gsfc.nasa.gov/giovanni/#service=ArAvTs&starttime=2001-01-01T00:00:00Z&endtime=2024-12-31T23:59:59Z&bbox=110,-8,111,-7&data=M2TMNXSLV_5_12_4_T2M&portal=GIOVANNI&format=json"
Fill Value (mean_M2TMNXSLV_5_12_4_T2M):, 1000000000000000

time, mean_M2TMNXSLV_5_12_4_T2M
2001-01-01 00:00:00,298.295044
2001-02-01 00:00:00,298.171051
2001-03-01 00:00:00,298.237946
2001-04-01 00:00:00,298.656982
2001-05-01 00:00:00,298.633362
2001-06-01 00:00:00,297.930359
2001-07-01 00:00:00,297.69046
2001-08-01 00:00:00,298.15976
2001-09-01 00:00:00,299.769592
2001-10-01 00:00:00,299.042236
2001-11-01 00:00:00,298.737152
2001-12-01 00:00:00,298.309265
2002-01-01 00:00:00,298.535217
2002-02-01 00:00:00,298.127014
2002-03-01 00:00:00,298.790466
2002-04-01 00:00:00,298.898315
2002-05-01 00:00:00,298.774414
2002-06-01 00:00:00,298.25351
2002-07-01 00:00:00,298.452026
2002-08-01 00:00:00,298.419861
2002-09-01 00:00:00,299.057617
2002-10-01 00:00:00,300.719452
2002-11-01 00:00:00,299.457123
2002-12-01 00:00:00,299.28949
2003-01-01 00:00:00,298.828918
2003-02-01 00:00:00,298.564209
2003-03-01 00:00:00,298.653625
2003-04-01 00:00:00,299.23999
2003-05-01 00:00:00,298.627075
2003-06-01 00:00:00,298.033997
2003-07-01 00:00:00,297.331909
2003-08-01 00:00:00,298.245422
2003-09-01 00:00:00,299.204468
2003-10-01 00:00:00,299.151398
2003-11-01 00:00:00,299.008392
2003-12-01 00:00:00,298.378326
2004-01-01 00:00:00,298.631134
2004-02-01 00:00:00,298.126923
2004-03-01 00:00:00,298.544647
2004-04-01 00:00:00,299.189087
2004-05-01 00:00:00,298.622681
2004-06-01 00:00:00,297.519531
2004-07-01 00:00:00,297.590973
2004-08-01 00:00:00,297.538849
2004-09-01 00:00:00,299.356934
2004-10-01 00:00:00,300.449799
2004-11-01 00:00:00,299.96875
2004-12-01 00:00:00,298.567291
2005-01-01 00:00:00,298.599945
2005-02-01 00:00:00,298.88855
2005-03-01 00:00:00,298.96756
2005-04-01 00:00:00,298.927795
2005-05-01 00:00:00,298.598877
2005-06-01 00:00:00,298.466949
2005-07-01 00:00:00,297.5289
2005-08-01 00:00:00,297.405304
2005-09-01 00:00:00,298.542938
2005-10-01 00:00:00,299.010895
2005-11-01 00:00:00,298.919312
2005-12-01 00:00:00,298.432404
2006-01-01 00:00:00,298.259857
2006-02-01 00:00:00,298.670593
2006-03-01 00:00:00,298.454102
2006-04-01 00:00:00,298.512115
2006-05-01 00:00:00,298.385651
2006-06-01 00:00:00,297.151398
2006-07-01 00:00:00,296.68042
2006-08-01 00:00:00,297.183044
2006-09-01 00:00:00,298.358124
2006-10-01 00:00:00,299.764282
2006-11-01 00:00:00,300.358063
2006-12-01 00:00:00,299.523315
2007-01-01 00:00:00,299.107086
2007-02-01 00:00:00,298.846069
2007-03-01 00:00:00,298.605072
2007-04-01 00:00:00,298.992065
2007-05-01 00:00:00,298.765167
2007-06-01 00:00:00,298.088226
2007-07-01 00:00:00,297.791351
2007-08-01 00:00:00,298.1073
2007-09-01 00:00:00,298.955048
2007-10-01 00:00:00,299.552368
2007-11-01 00:00:00,298.481323
2007-12-01 00:00:00,298.737061
2008-01-01 00:00:00,298.463348
2008-02-01 00:00:00,297.959686
2008-03-01 00:00:00,298.228668
2008-04-01 00:00:00,298.529785
2008-05-01 00:00:00,297.888245
2008-06-01 00:00:00,297.73587
2008-07-01 00:00:00,297.400665
2008-08-01 00:00:00,298.54715
2008-09-01 00:00:00,299.272003
2008-10-01 00:00:00,299.418518
2008-11-01 00:00:00,298.796204
2008-12-01 00:00:00,298.314117
2009-01-01 00:00:00,298.158203
2009-02-01 00:00:00,298.117065
2009-03-01 00:00:00,298.695618
2009-04-01 00:00:00,299.053101
2009-05-01 00:00:00,298.730103
2009-06-01 00:00:00,298.09729
2009-07-01 00:00:00,297.060211
2009-08-01 00:00:00,297.566772
2009-09-01 00:00:00,298.806549
2009-10-01 00:00:00,299.601776
2009-11-01 00:00:00,299.562531
2009-12-01 00:00:00,299.129822
2010-01-01 00:00:00,298.499969
2010-02-01 00:00:00,299.118622
2010-03-01 00:00:00,299.385956
2010-04-01 00:00:00,299.374359
2010-05-01 00:00:00,299.185211
2010-06-01 00:00:00,298.476196
2010-07-01 00:00:00,298.07428
2010-08-01 00:00:00,298.11145
2010-09-01 00:00:00,298.53363
2010-10-01 00:00:00,298.443787
2010-11-01 00:00:00,298.790314
2010-12-01 00:00:00,298.111694
2011-01-01 00:00:00,297.931793
2011-02-01 00:00:00,298.147644
2011-03-01 00:00:00,298.280121
2011-04-01 00:00:00,298.413818
2011-05-01 00:00:00,298.382843
2011-06-01 00:00:00,297.239502
2011-07-01 00:00:00,296.995911
2011-08-01 00:00:00,297.350342
2011-09-01 00:00:00,298.260406
2011-10-01 00:00:00,299.526672
2011-11-01 00:00:00,298.910431
2011-12-01 00:00:00,298.990692
2012-01-01 00:00:00,298.202576
2012-02-01 00:00:00,298.466156
2012-03-01 00:00:00,298.311462
2012-04-01 00:00:00,298.66452
2012-05-01 00:00:00,298.264038
2012-06-01 00:00:00,297.347687
2012-07-01 00:00:00,296.931976
2012-08-01 00:00:00,297.789917
2012-09-01 00:00:00,299.194214
2012-10-01 00:00:00,299.599121
2012-11-01 00:00:00,299.400024
2012-12-01 00:00:00,298.762848
2013-01-01 00:00:00,298.268311
2013-02-01 00:00:00,298.836426
2013-03-01 00:00:00,299.014679
2013-04-01 00:00:00,299.048401
2013-05-01 00:00:00,298.963562
2013-06-01 00:00:00,298.566711
2013-07-01 00:00:00,297.501801
2013-08-01 00:00:00,297.152374
2013-09-01 00:00:00,297.833008
2013-10-01 00:00:00,299.343506
2013-11-01 00:00:00,299.065796
2013-12-01 00:00:00,298.499023
2014-01-01 00:00:00,298.00415
2014-02-01 00:00:00,298.194122
2014-03-01 00:00:00,299.090942
2014-04-01 00:00:00,299.203705
2014-05-01 00:00:00,299.257355
2014-06-01 00:00:00,298.733063
2014-07-01 00:00:00,297.68692
2014-08-01 00:00:00,297.569641
2014-09-01 00:00:00,298.357086
2014-10-01 00:00:00,300.038391
2014-11-01 00:00:00,299.545746
2014-12-01 00:00:00,298.69873
2015-01-01 00:00:00,298.232147
2015-02-01 00:00:00,298.470917
2015-03-01 00:00:00,298.679688
2015-04-01 00:00:00,298.778137
2015-05-01 00:00:00,298.325165
2015-06-01 00:00:00,297.664917
2015-07-01 00:00:00,297.51593
2015-08-01 00:00:00,298.17865
2015-09-01 00:00:00,299.250854
2015-10-01 00:00:00,300.776337
2015-11-01 00:00:00,300.230865
2015-12-01 00:00:00,299.332672
2016-01-01 00:00:00,299.700806
2016-02-01 00:00:00,299.07254
2016-03-01 00:00:00,299.720245
2016-04-01 00:00:00,299.657288
2016-05-01 00:00:00,299.608734
2016-06-01 00:00:00,298.892822
2016-07-01 00:00:00,298.645813
2016-08-01 00:00:00,298.36792
2016-09-01 00:00:00,298.822754
2016-10-01 00:00:00,298.806305
2016-11-01 00:00:00,298.871155
2016-12-01 00:00:00,298.465851
2017-01-01 00:00:00,298.459839
2017-02-01 00:00:00,298.337463
2017-03-01 00:00:00,298.847961
2017-04-01 00:00:00,298.893372
2017-05-01 00:00:00,298.633484
2017-06-01 00:00:00,298.14386
2017-07-01 00:00:00,297.401459
2017-08-01 00:00:00,297.955566
2017-09-01 00:00:00,299.272949
2017-10-01 00:00:00,298.945404
2017-11-01 00:00:00,298.942444
2017-12-01 00:00:00,298.735077
2018-01-01 00:00:00,298.48233
2018-02-01 00:00:00,298.372894
2018-03-01 00:00:00,298.838623
2018-04-01 00:00:00,299.204285
2018-05-01 00:00:00,298.66391
2018-06-01 00:00:00,298.152679
2018-07-01 00:00:00,297.35611
2018-08-01 00:00:00,298.213257
2018-09-01 00:00:00,299.587891
2018-10-01 00:00:00,300.209106
2018-11-01 00:00:00,299.563629
2018-12-01 00:00:00,298.89151
2019-01-01 00:00:00,299.096069
2019-02-01 00:00:00,299.033905
2019-03-01 00:00:00,298.817169
2019-04-01 00:00:00,299.448822
2019-05-01 00:00:00,298.731415
2019-06-01 00:00:00,297.563782
2019-07-01 00:00:00,297.610901
2019-08-01 00:00:00,298.25412
2019-09-01 00:00:00,299.23175
2019-10-01 00:00:00,300.44397
2019-11-01 00:00:00,300.829834
2019-12-01 00:00:00,300.039062
2020-01-01 00:00:00,299.43396
2020-02-01 00:00:00,299.19339
2020-03-01 00:00:00,299.372345
2020-04-01 00:00:00,299.520325
2020-05-01 00:00:00,299.365753
2020-06-01 00:00:00,298.438873
2020-07-01 00:00:00,297.638794
2020-08-01 00:00:00,298.226013
2020-09-01 00:00:00,299.006683
2020-10-01 00:00:00,299.110199
2020-11-01 00:00:00,299.289398
2020-12-01 00:00:00,298.443573
2021-01-01 00:00:00,298.345459
2021-02-01 00:00:00,298.272614
2021-03-01 00:00:00,298.651672
2021-04-01 00:00:00,298.729095
2021-05-01 00:00:00,298.984406
2021-06-01 00:00:00,298.655487
2021-07-01 00:00:00,298.005585
2021-08-01 00:00:00,298.336731
2021-09-01 00:00:00,298.63446
2021-10-01 00:00:00,299.182861
2021-11-01 00:00:00,298.844116
2021-12-01 00:00:00,298.915436
2022-01-01 00:00:00,298.600311
2022-02-01 00:00:00,298.536255
2022-03-01 00:00:00,298.900909
2022-04-01 00:00:00,299.180328
2022-05-01 00:00:00,299.241394
2022-06-01 00:00:00,298.456635
2022-07-01 00:00:00,297.803955
2022-08-01 00:00:00,298.04187
2022-09-01 00:00:00,298.690277
2022-10-01 00:00:00,298.40506
2022-11-01 00:00:00,298.602142
2022-12-01 00:00:00,298.744232
2023-01-01 00:00:00,298.38916
2023-02-01 00:00:00,298.204529
2023-03-01 00:00:00,298.925293
2023-04-01 00:00:00,299.102936
2023-05-01 00:00:00,298.784943
2023-06-01 00:00:00,298.438477
2023-07-01 00:00:00,297.471497
2023-08-01 00:00:00,297.854156
2023-09-01 00:00:00,298.955902
2023-10-01 00:00:00,301.028442
2023-11-01 00:00:00,300.297241
2023-12-01 00:00:00,299.605957
2024-01-01 00:00:00,299.483978
2024-02-01 00:00:00,299.684692
2024-03-01 00:00:00,299.565918
2024-04-01 00:00:00,299.856659
2024-05-01 00:00:00,299.249695
2024-06-01 00:00:00,298.906891
2024-07-01 00:00:00,298.006042
2024-08-01 00:00:00,298.21637
2024-09-01 00:00:00,299.216736
2024-10-01 00:00:00,300.02533
2024-11-01 00:00:00,299.808838
2024-12-01 00:00:00,299.092712
`,p=o(),m=c(f);function h(){let e={schema:`terra-lens-giovanni-area-v1`,dataset:`M2TMNXSLV 5.12.4`,variable:`T2M`,unit:`K`,doi:`10.5067/AP1B0BA5PD2K`,requestedBounds:[110,-8,111,-7],dataBounds:[110,-8,110.625,-7],temporalSupport:`Monthly means, 2001–2024; annual means weighted by calendar days`,sourceCSV_SHA256:`ff7cd37fd010ae16015ce22400c2cb583c975c6d9277e0235cbd674d774e54dc`,sourceNetCDF_SHA256:`d9a320f77ef79b65ec6dba4454e247c700b420cb4966270cf677f88f75f74668`,originalCSV:`https://giovanni.gsfc.nasa.gov/giovanni/daac-bin/serializer.pl?SESSION=343566EA-E094-11F1-A1CF-4CF1FED1C619&RESULTSET=6BED9890-E095-11F1-9112-2588FFD1C619&RESULT=6BEDAC4A-E095-11F1-9112-2588FFD1C619&FILE=g4.areaAvgTimeSeries.M2TMNXSLV_5_12_4_T2M.20010101-20241231.110E_8S_111E_7S.nc`,originalNetCDF:`https://giovanni.gsfc.nasa.gov/session/343566EA-E094-11F1-A1CF-4CF1FED1C619/6BED9890-E095-11F1-9112-2588FFD1C619/6BEDAC4A-E095-11F1-9112-2588FFD1C619/g4.areaAvgTimeSeries.M2TMNXSLV_5_12_4_T2M.20010101-20241231.110E_8S_111E_7S.nc`,source:`https://giovanni.gsfc.nasa.gov/giovanni/#service=ArAvTs&starttime=2001-01-01T00:00:00Z&endtime=2024-12-31T23:59:59Z&bbox=110,-8,111,-7&data=M2TMNXSLV_5_12_4_T2M`,limitations:`Model reanalysis; exploratory classical OLS; serial correlation, selection, model and processing uncertainty are not quantified. No quality-flag variable is present in the Giovanni output; input-granule QA was not independently audited. NASA reprocessed September 2020 and June–September 2021, including a warm-bias correction; the aggregated export does not identify its input granule versions.`,...m},t=URL.createObjectURL(new Blob([JSON.stringify(e,null,2)+`
`],{type:`application/json`})),n=document.createElement(`a`);n.href=t,n.download=`giovanni-regional-evidence.json`,n.click(),setTimeout(()=>URL.revokeObjectURL(t),1e3)}function g(){let{annual:e,trend:t}=m,n=e=>50+(e-2001)*680/23,r=e=>185-(e-297.8)*120/1.8;return(0,p.jsxs)(`section`,{className:`giovanni-card giovanni-tutorial`,"aria-labelledby":`nasa-source-case`,children:[(0,p.jsx)(`h3`,{id:`nasa-source-case`,children:`NASA Giovanni · Regional temperature, 2001–2024`}),(0,p.jsxs)(`p`,{children:[`MERRA-2 monthly 2 m air temperature, averaged over grid cells near Yogyakarta. The fitted annual trend is `,(0,p.jsxs)(`strong`,{children:[`+`,t.slopePerDecade.toFixed(3),` K per decade`]}),` (classical 95% interval `,t.ciLowPerDecade.toFixed(3),` to `,t.ciHighPerDecade.toFixed(3),`; p = `,t.pValue.toFixed(3),`).`]}),(0,p.jsxs)(`figure`,{children:[(0,p.jsxs)(`svg`,{style:{width:`100%`,height:`auto`},viewBox:`0 0 760 220`,role:`img`,"aria-label":`Annual area-averaged MERRA-2 temperature in kelvin, 2001 to 2024, with linear fit`,children:[[298,298.5,299,299.5].map(e=>(0,p.jsxs)(`g`,{children:[(0,p.jsx)(`line`,{x1:`50`,x2:`730`,y1:r(e),y2:r(e),stroke:`#395064`}),(0,p.jsx)(`text`,{x:`44`,y:r(e)+4,textAnchor:`end`,fill:`#b2c8d6`,fontSize:`12`,children:e})]},e)),(0,p.jsx)(`polyline`,{fill:`none`,stroke:`#62d6e4`,strokeWidth:`2`,points:e.map(e=>`${n(e.year)},${r(e.value)}`).join(` `)}),(0,p.jsx)(`line`,{x1:n(2001),y1:r(t.fitted[0].value),x2:n(2024),y2:r(t.fitted.at(-1).value),stroke:`#f6b975`,strokeDasharray:`5 4`}),e.map(e=>(0,p.jsx)(`circle`,{cx:n(e.year),cy:r(e.value),r:`3`,fill:`#62d6e4`,children:(0,p.jsxs)(`title`,{children:[e.year,`: `,e.value.toFixed(3),` K`]})},e.year)),(0,p.jsx)(`text`,{x:`50`,y:`210`,fill:`#b2c8d6`,fontSize:`12`,children:`2001`}),(0,p.jsx)(`text`,{x:`700`,y:`210`,fill:`#b2c8d6`,fontSize:`12`,children:`2024`}),(0,p.jsx)(`text`,{x:`50`,y:`17`,fill:`#b2c8d6`,fontSize:`12`,children:`Annual mean (K) · blue: data · dashed: fit`})]}),(0,p.jsx)(`figcaption`,{children:`Complete years only; monthly means weighted by days. Hover a point for its value.`})]}),(0,p.jsx)(`p`,{children:`Model reanalysis, not a thermometer or city-wide observation. The inference assumes independent, homoscedastic residuals; serial correlation, selection, multiple testing and model uncertainty can make it optimistic. It does not establish cause. The output contains no quality-flag variable; input-granule quality was not independently audited.`}),(0,p.jsxs)(`p`,{className:`giovanni-note`,children:[`NASA reprocessed September 2020 and June–September 2021, including a correction for a near-surface warm bias. This aggregate does not identify which input granule versions were used. `,(0,p.jsx)(`a`,{href:`https://docserver.gesdisc.eosdis.nasa.gov/public/project/MERRA/Records_MERRA-2_Data_Reprocessing_and_Service_Changes.pdf`,target:`_blank`,rel:`noreferrer`,children:`NASA reprocessing record`})]}),(0,p.jsxs)(`p`,{children:[(0,p.jsx)(`a`,{href:`https://doi.org/10.5067/AP1B0BA5PD2K`,children:`NASA M2TMNXSLV v5.12.4`}),` · `,(0,p.jsx)(`a`,{href:`https://giovanni.gsfc.nasa.gov/giovanni/#service=ArAvTs&starttime=2001-01-01T00:00:00Z&endtime=2024-12-31T23:59:59Z&bbox=110,-8,111,-7&data=M2TMNXSLV_5_12_4_T2M`,children:`Reproduce in Giovanni`}),` · `,(0,p.jsx)(`a`,{href:`./docs/NASA_QUALIFYING_SOURCE_HANDOFF.md`,children:`Original files, methods and limitations`})]}),(0,p.jsx)(`button`,{type:`button`,onClick:h,children:`Download regional evidence JSON`}),(0,p.jsxs)(`details`,{children:[(0,p.jsx)(`summary`,{children:`Inspect all 24 annual values`}),(0,p.jsx)(`div`,{className:`sc-table-wrap`,tabIndex:`0`,children:(0,p.jsxs)(`table`,{className:`discovery-table`,children:[(0,p.jsx)(`thead`,{children:(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`th`,{scope:`col`,children:`Year`}),(0,p.jsx)(`th`,{scope:`col`,children:`Annual mean (K)`})]})}),(0,p.jsx)(`tbody`,{children:e.map(e=>(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`th`,{scope:`row`,children:e.year}),(0,p.jsx)(`td`,{children:e.value.toFixed(3)})]},e.year))})]})})]})]})}var _=`﻿Year,Canada,United_States\r
1980,1,3\r
1981,2,1\r
1982,1,0\r
1983,2,1\r
1984,2,1\r
1985,1,1\r
1986,0,1\r
1987,2,2\r
1988,2,3\r
1989,3,1\r
1990,1,2\r
1991,2,1\r
1992,0,1\r
1993,1,1\r
1994,2,1\r
1995,2,1\r
1996,2,1\r
1997,2,1\r
1998,3,2\r
1999,2,2\r
2000,1,2\r
2001,2,2\r
2002,2,3\r
2003,1,2\r
2004,1,2\r
2005,2,2\r
2006,2,2\r
2007,2,3\r
2008,2,1\r
2009,2,1\r
2010,2,2\r
2011,1,4\r
2012,2,3\r
2013,2,2\r
2014,2,0\r
2015,2,2\r
2016,1,2\r
2017,1,2\r
2018,2,2\r
2019,1,2\r
2020,2,2\r
2021,3,4\r
2022,3,4\r
2023,4,4`;function v(e){let n=e.replace(/^\uFEFF/,``).trim().split(/\r?\n/);if(n.shift()!==`Year,Canada,United_States`)throw Error(`Unexpected NASA tutorial CSV header`);let r=new Set,i=n.map(e=>{let t=e.split(`,`);if(t.length!==3||!/^\d{4}$/.test(t[0])||!/^\d+$/.test(t[1])||!/^\d+$/.test(t[2]))throw Error(`Invalid tutorial data row`);let n=Number(t[0]);if(r.has(n))throw Error(`Duplicate tutorial year`);return r.add(n),{year:n,canada:Number(t[1]),unitedStates:Number(t[2])}}).sort((e,t)=>e.year-t.year);if(i.length!==44||i.some((e,t)=>e.year!==1980+t))throw Error(`Unexpected tutorial coverage`);return{rows:i,canada:t(i.map(e=>({year:e.year,value:e.canada}))),unitedStates:t(i.map(e=>({year:e.year,value:e.unitedStates})))}}var y=v(_),b=`https://github.com/nasa/gesdisc-tutorials/blob/f81701924c0336811ef3b90e659ffeb83c28de1b/news_%26_dia/data/g4.ints.M2SMNXEDI_2_HWF.19800101-20231231.JJA.csv`,x=`https://github.com/nasa/gesdisc-tutorials/blob/f81701924c0336811ef3b90e659ffeb83c28de1b/news_%26_dia/Giovanni_MERRA2_Extreme_Monthly.ipynb`;function S(){let e={source:b,tutorial:x,dataset:`M2SMNXEDI version 2`,doi:`10.5067/O8AX56DO60MI`,sha256:`34193c502c6417eb1163967a33dc2b19a87ea8be5518142f6196cb77b0a2b8fd`,variable:`HWF`,season:`June–August`,period:`1980–2023`,support:`NASA tutorial describes country means; geographic mask and weighting not documented in CSV`,units:`NASA labels HWF counts per month; published table has one value per June–August season. Conversion to days per summer is not established.`,limitations:`Original Giovanni job URL, precise area weighting, rounding and quality flags are unavailable; descriptive, selected example, not an eligibility determination.`,rows:y.rows,slopesPerDecade:{canada:y.canada.slopePerDecade,unitedStates:y.unitedStates.slopePerDecade}},t=URL.createObjectURL(new Blob([JSON.stringify(e,null,2)+`
`],{type:`application/json`})),n=document.createElement(`a`);n.href=t,n.download=`giovanni-tutorial-evidence.json`,n.click(),setTimeout(()=>URL.revokeObjectURL(t),1e3)}function C(){return(0,p.jsxs)(`section`,{className:`giovanni-card giovanni-tutorial`,"aria-labelledby":`giovanni-example-heading`,children:[(0,p.jsx)(`h3`,{id:`giovanni-example-heading`,children:`NASA Giovanni tutorial: summer heatwave index`}),(0,p.jsx)(`p`,{children:`NASA published a Giovanni-generated table for Canada and the United States, one value per June–August season from 1980 to 2023. The index counts days meeting a heatwave criterion in MERRA-2 model data; it is not a count of separate heatwave events.`}),(0,p.jsxs)(`p`,{children:[`Fitting a straight line to the published values gives `,(0,p.jsxs)(`strong`,{children:[`+`,y.canada.slopePerDecade.toFixed(2)]}),` for Canada and `,(0,p.jsxs)(`strong`,{children:[`+`,y.unitedStates.slopePerDecade.toFixed(2)]}),` for the United States per decade, in the tutorial’s HWF count units. These are descriptive fits, not a test of which country changed faster.`]}),(0,p.jsx)(`p`,{className:`giovanni-note`,children:`NASA labels HWF in counts per month, but this published table has one value per summer. The export does not document how the three monthly values were combined, so these slopes cannot be confidently translated into extra heatwave days per summer. The collection uses a 1991–2020 baseline. Rounding, area weighting, original Giovanni job URL and quality flags are also undocumented. Do not use these estimates for decisions or as an eligibility determination.`}),(0,p.jsxs)(`p`,{className:`giovanni-note`,children:[(0,p.jsx)(`a`,{href:b,target:`_blank`,rel:`noreferrer`,children:`NASA-published original CSV`}),` · `,(0,p.jsx)(`a`,{href:x,target:`_blank`,rel:`noreferrer`,children:`NASA tutorial`}),` · `,(0,p.jsx)(`a`,{href:`https://doi.org/10.5067/O8AX56DO60MI`,target:`_blank`,rel:`noreferrer`,children:`M2SMNXEDI version 2 DOI`}),` · `,(0,p.jsx)(`a`,{href:`./docs/GIOVANNI_TUTORIAL_CASE.md`,target:`_blank`,rel:`noreferrer`,children:`Methods and limitations`})]}),(0,p.jsx)(`button`,{type:`button`,onClick:S,children:`Download tutorial evidence JSON`}),(0,p.jsxs)(`details`,{children:[(0,p.jsx)(`summary`,{children:`Inspect all 44 published values`}),(0,p.jsx)(`div`,{className:`sc-table-wrap`,tabIndex:`0`,children:(0,p.jsxs)(`table`,{className:`discovery-table`,children:[(0,p.jsx)(`thead`,{children:(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`th`,{scope:`col`,children:`Year`}),(0,p.jsx)(`th`,{scope:`col`,children:`Canada`}),(0,p.jsx)(`th`,{scope:`col`,children:`United States`})]})}),(0,p.jsx)(`tbody`,{children:y.rows.map(e=>(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`th`,{scope:`row`,children:e.year}),(0,p.jsx)(`td`,{children:e.canada}),(0,p.jsx)(`td`,{children:e.unitedStates})]},e.year))})]})})]})]})}function w({west:e,south:t,east:n,north:r,start:i,end:a}){let o=[e,t,n,r].map(e=>typeof e==`string`&&e.trim()===``?NaN:Number(e)),[s,c,l,u]=o,d=Number(i),f=Number(a);if(o.some(e=>!Number.isFinite(e))||s<-180||l>180||c<-90||u>90||s>=l||c>=u)throw Error(`Enter valid west, south, east and north bounds; antimeridian-crossing boxes are not supported.`);if(!Number.isInteger(d)||!Number.isInteger(f)||d<1980||f>2025||d>f)throw Error(`Choose whole years from 1980 through 2025.`);return`https://giovanni.gsfc.nasa.gov/giovanni/#`+new URLSearchParams({service:`ArAvTs`,starttime:`${d}-01-01T00:00:00Z`,endtime:`${f}-12-31T23:59:59Z`,bbox:o.join(`,`),data:`M2TMNXSLV_5_12_4_T2M`}).toString()}var T=`https://cmr.earthdata.nasa.gov/search/collections.json`,E=9e5,D=new Map;function O(e,t){let n=String(e??``).trim();if(n.length<2||n.length>100)throw Error(`Enter a search term of 2–100 characters.`);let r=[`west`,`south`,`east`,`north`].map(e=>String(t[e]??``).trim()===``?NaN:Number(t[e])),[i,a,o,s]=r,c=Number(t.start),l=Number(t.end);if(r.some(e=>!Number.isFinite(e))||i<-180||o>180||a<-90||s>90||i>=o||a>=s)throw Error(`Enter valid non-antimeridian bounds.`);if(!Number.isInteger(c)||!Number.isInteger(l)||c<1900||l>2100||c>l)throw Error(`Enter a valid range of whole years.`);return`${T}?${new URLSearchParams({keyword:n,bounding_box:r.join(`,`),temporal:`${c}-01-01T00:00:00Z,${l}-12-31T23:59:59Z`,page_size:`10`})}`}async function k(e,t,{fetcher:n=fetch,signal:r,now:i=Date.now}={}){let a=O(e,t),o=D.get(a),s=i();if(o&&s-o.time<E)return{...o.data,cached:!0};let c=await n(a,{signal:r});if(!c.ok)throw Error(`NASA catalog request failed (HTTP ${c.status}).`);let l=await c.json();if(!Array.isArray(l?.feed?.entry))throw Error(`NASA catalog returned an unexpected response.`);let u={url:a,entries:l.feed.entry.slice(0,10).filter(e=>/^C\d+-[A-Za-z0-9_]+$/.test(e.id||``)).map(e=>({id:e.id,title:String(e.title||e.short_name||e.id),shortName:String(e.short_name||``),version:String(e.version_id||``),start:e.time_start||null,end:e.time_end||null,url:`https://search.earthdata.nasa.gov/search/granules?p=${encodeURIComponent(e.id)}`})),retrievedAt:new Date(s).toISOString()};return D.size>=25&&D.delete(D.keys().next().value),D.set(a,{time:s,data:u}),{...u,cached:!1}}function A({region:e}){let[t,n]=(0,l.useState)(``),[r,i]=(0,l.useState)(null),[a,o]=(0,l.useState)(``),[s,c]=(0,l.useState)(!1),u=(0,l.useRef)(null);(0,l.useEffect)(()=>()=>u.current?.abort(),[]),(0,l.useEffect)(()=>{u.current?.abort(),u.current=null,c(!1),i(null),o(``)},[e.west,e.south,e.east,e.north,e.start,e.end,t]);async function d(){u.current?.abort();let n=new AbortController;u.current=n;let r=setTimeout(()=>n.abort(),6e4);o(``),i(null),c(!0);try{let r=await k(t,e,{signal:n.signal});u.current===n&&i(r)}catch(e){u.current===n&&o(e.name===`AbortError`?`Catalog request timed out or was cancelled.`:e.message)}finally{clearTimeout(r),u.current===n&&(u.current=null,c(!1))}}return(0,p.jsxs)(`section`,{className:`giovanni-card giovanni-tutorial`,"aria-labelledby":`catalog-title`,children:[(0,p.jsx)(`h3`,{id:`catalog-title`,children:`Find datasets in NASA Earthdata (experimental)`}),(0,p.jsx)(`p`,{children:`Search NASA's collection catalog for the bounds and years above. Catalog overlap does not establish that observations exist at your exact location, that a variable is suitable, or that Terra-Lens can analyze the collection. Results may include partner data.`}),(0,p.jsx)(`label`,{htmlFor:`catalog-term`,children:`Dataset or topic`}),(0,p.jsx)(`input`,{id:`catalog-term`,type:`text`,value:t,maxLength:`100`,onChange:e=>n(e.target.value),placeholder:`e.g. soil moisture`}),(0,p.jsx)(`button`,{type:`button`,id:`catalog-search`,disabled:s,onClick:d,children:s?`Searching NASA catalog…`:`Search collections`}),(0,p.jsx)(`p`,{className:`giovanni-note`,children:`At most 10 collection records; successful searches are cached in this browser for 15 minutes. NASA's catalog may take up to a minute. No data archives are downloaded.`}),a&&(0,p.jsx)(`p`,{role:`alert`,children:a}),r&&(0,p.jsxs)(`div`,{"aria-live":`polite`,children:[(0,p.jsxs)(`p`,{children:[r.entries.length,` collection records returned`,r.cached?` (cached)`:``,`. `,(0,p.jsx)(`a`,{href:r.url,target:`_blank`,rel:`noreferrer`,children:`Original NASA catalog query`})]}),r.entries.length>0&&(0,p.jsx)(`ul`,{children:r.entries.map(e=>(0,p.jsxs)(`li`,{children:[(0,p.jsx)(`a`,{href:e.url,target:`_blank`,rel:`noreferrer`,children:e.title}),` · `,e.shortName,` `,e.version,` · coverage `,e.start?.slice(0,10)||`not stated`,` to `,e.end?.slice(0,10)||`open or not stated`]},e.id))})]})]})}var j=e=>Number.isFinite(e)?(e>0?`+`:``)+Number(e).toFixed(3):`—`;function M({imported:e,onImport:t,onRemove:n}){let[r,i]=(0,l.useState)(``),[o,c]=(0,l.useState)(``),[f,m]=(0,l.useState)(``),[h,_]=(0,l.useState)(``),[v,y]=(0,l.useState)({west:`110`,south:`-8`,east:`111`,north:`-7`,start:`2001`,end:`2024`}),b=``,x=``;try{b=w(v)}catch(e){x=e.message}async function S(e){let n=e.target.files?.[0];if(n){i(``);try{if(n.size>12e6)throw Error(`File is too large (12 MB maximum).`);let e=await n.arrayBuffer(),r=new TextDecoder(`utf-8`,{fatal:!0}).decode(e),i=await crypto.subtle.digest(`SHA-256`,e),a=Array.from(new Uint8Array(i),e=>e.toString(16).padStart(2,`0`)).join(``),c={fileName:n.name,sha256:a,product:o.trim(),doi:h.trim(),sourceURL:f.trim()};t(r.replace(/^\uFEFF/,``).startsWith(`Title:,`)?s(r,c):d(u(r),c))}catch(e){i(e.message)}finally{e.target.value=``}}}let T=e?a(e):null;return(0,p.jsxs)(`div`,{className:`giovanni-workspace`,"aria-labelledby":`giovanni-heading`,children:[(0,p.jsxs)(`div`,{className:`giovanni-head`,children:[(0,p.jsxs)(`div`,{className:`pane-title-group`,children:[(0,p.jsx)(`span`,{className:`section-kicker`,children:`NASA Source Import · Local File`}),(0,p.jsx)(`h2`,{id:`giovanni-heading`,children:`Explore NASA Giovanni cases`})]}),(0,p.jsxs)(`p`,{className:`giovanni-links`,children:[(0,p.jsx)(`a`,{href:`https://giovanni.gsfc.nasa.gov/giovanni/`,target:`_blank`,rel:`noreferrer`,children:`Open NASA Giovanni`}),` · `,(0,p.jsx)(`a`,{href:`https://github.com/nasa/gesdisc-tutorials/blob/main/notebooks/How_to_Access_GiC_Time_Series_Service.ipynb`,target:`_blank`,rel:`noreferrer`,children:`NASA CSV workflow example`})]})]}),(0,p.jsx)(`p`,{className:`giovanni-note`,children:`The regional case below is ready to explore—no upload needed. The cards and sidebar outside this panel describe the separate NASA POWER point investigation; they are not the Giovanni area average.`}),(0,p.jsx)(g,{}),(0,p.jsx)(C,{}),(0,p.jsxs)(`section`,{className:`giovanni-card giovanni-tutorial`,"aria-labelledby":`giovanni-query-title`,children:[(0,p.jsx)(`h3`,{id:`giovanni-query-title`,children:`Explore another region with Giovanni`}),(0,p.jsx)(`p`,{children:`Choose a bounding box and years for NASA MERRA-2 monthly 2 m temperature. Giovanni runs the area-average request on NASA’s site and may require Earthdata sign-in. Download its CSV and import it below; this app never receives your credentials.`}),(0,p.jsx)(`div`,{className:`giovanni-region-fields`,children:[[`west`,`West longitude`],[`south`,`South latitude`],[`east`,`East longitude`],[`north`,`North latitude`],[`start`,`First year`],[`end`,`Last year`]].map(([e,t])=>(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`label`,{htmlFor:`region-`+e,children:t}),(0,p.jsx)(`input`,{id:`region-`+e,type:`number`,step:e===`start`||e===`end`?`1`:`any`,value:v[e],onChange:t=>y({...v,[e]:t.target.value})})]},e))}),x?(0,p.jsx)(`p`,{role:`status`,children:x}):(0,p.jsx)(`p`,{children:(0,p.jsx)(`a`,{id:`giovanni-region-query`,href:b,target:`_blank`,rel:`noreferrer`,children:`Open this region in NASA Giovanni`})}),(0,p.jsx)(`p`,{className:`giovanni-note`,children:`Supported here: M2TMNXSLV v5.12.4 monthly mean T2M, non-antimeridian boxes and years 1980–2025. Other products and automated Giovanni acquisition are not implemented. Keep source metadata and check quality before drawing conclusions.`})]}),(0,p.jsx)(A,{region:v}),(0,p.jsxs)(`div`,{className:`giovanni-grid`,children:[(0,p.jsxs)(`div`,{className:`giovanni-copy`,children:[(0,p.jsxs)(`div`,{className:`giovanni-card`,children:[(0,p.jsx)(`h3`,{children:`Independent NASA Series Integration (Series G)`}),(0,p.jsxs)(`p`,{className:`giovanni-note`,children:[`Import a `,(0,p.jsx)(`strong`,{children:`monthly`}),` Giovanni Cloud point CSV or classic area-average M2TMNXSLV v5.12.4 T2M CSV. It joins the workspace as series `,(0,p.jsx)(`strong`,{children:`G`}),` and runs through the same annual-mean, OLS, Mann–Kendall, and anomaly calculations as NASA POWER.`]}),(0,p.jsxs)(`p`,{className:`giovanni-note`,children:[`Giovanni point-service CSVs contain a `,(0,p.jsx)(`strong`,{children:`single grid-point series`}),` when valid latitude and longitude metadata are present; area-averaged exports are different products. Do not infer a direct physical difference between unlike sources. Files are processed locally, and source authenticity is not certified by this browser.`]})]}),T?(0,p.jsxs)(`div`,{"aria-live":`polite`,className:`giovanni-summary`,children:[(0,p.jsx)(`h3`,{children:`Active Imported Series (G)`}),(0,p.jsxs)(`p`,{children:[(0,p.jsx)(`strong`,{children:e.label}),` · `,e.monthly.length,` monthly records, `,T.coverage.completeYears,` complete years · unit `,e.variable.unit,`. `,(0,p.jsxs)(`em`,{children:[T.verdict.headline,`.`]})]}),T.trend&&(0,p.jsxs)(`p`,{className:`giovanni-note`,children:[`OLS `,j(T.trend.slopePerDecade),` `,e.variable.unit,`/decade (p `,T.trend.pValue.toFixed(4),`) · Sen `,j(T.robust.senSlopePerDecade),` (Mann–Kendall p `,T.robust.pValue.toFixed(4),`)`]}),(0,p.jsxs)(`p`,{className:`giovanni-note`,children:[`SHA-256: `,(0,p.jsx)(`code`,{children:e.provenance.sha256})]}),(0,p.jsx)(`button`,{type:`button`,id:`giovanni-remove`,onClick:n,children:`Remove series G`})]}):(0,p.jsxs)(`div`,{className:`giovanni-summary is-empty`,children:[(0,p.jsx)(`h3`,{children:`Series G Status`}),(0,p.jsx)(`p`,{className:`giovanni-note`,children:`No Giovanni CSV currently imported. Upload a NASA Giovanni monthly time-series CSV on the right to overlay Series G across Annual, Monthly, Seasonal, and Compare views.`})]})]}),(0,p.jsxs)(`div`,{className:`giovanni-form`,children:[(0,p.jsx)(`h3`,{children:`NASA provenance & original monthly CSV`}),(0,p.jsx)(`p`,{className:`giovanni-note`,children:`For cloud CSVs, verify the product’s missing-value codes: declared numeric fill values are excluded, or −999 if none is declared. Other undocumented codes may remain.`}),(0,p.jsxs)(`div`,{className:`coord-row`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`label`,{htmlFor:`giovanni-product`,children:`NASA dataset/product identifier`}),(0,p.jsx)(`input`,{id:`giovanni-product`,value:o,onChange:e=>c(e.target.value),placeholder:`e.g. M2TMNXSLV, version`})]}),(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`label`,{htmlFor:`giovanni-doi`,children:`Dataset DOI (if known)`}),(0,p.jsx)(`input`,{id:`giovanni-doi`,value:h,onChange:e=>_(e.target.value),placeholder:`doi:10.5067/...`})]})]}),(0,p.jsx)(`label`,{htmlFor:`giovanni-source`,children:`Original NASA result/download URL`}),(0,p.jsx)(`input`,{id:`giovanni-source`,type:`url`,value:f,onChange:e=>m(e.target.value),placeholder:`https://...nasa.gov/...`}),(0,p.jsx)(`label`,{htmlFor:`giovanni-file`,children:`Giovanni monthly time-series CSV (max 12 MB)`}),(0,p.jsx)(`input`,{id:`giovanni-file`,type:`file`,accept:`.csv,text/csv`,onChange:S}),r&&(0,p.jsx)(`p`,{role:`alert`,className:`status error`,children:r})]})]})]})}export{M as default};