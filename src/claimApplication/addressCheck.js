// https://pe.usps.com/text/pub28/28apc_002.htm
const streetSuffixMapping = {
  "ALLEY": "ALY",
  "ALLEE": "ALY",
  "ALLY": "ALY",
  "ALY": "ALY",
  "ANEX": "ANX",
  "ANNEX": "ANX",
  "ANNX": "ANX",
  "ANX": "ANX",
  "ARCADE": "ARC",
  "ARC": "ARC",
  "AVENUE": "AVE",
  "AV": "AVE",
  "AVE": "AVE",
  "AVEN": "AVE",
  "AVENU": "AVE",
  "AVN": "AVE",
  "AVNUE": "AVE",
  "BAYOU": "BYU",
  "BAYOO": "BYU",
  "BEACH": "BCH",
  "BCH": "BCH",
  "BEND": "BND",
  "BND": "BND",
  "BLUFF": "BLF",
  "BLF": "BLF",
  "BLUF": "BLF",
  "BLUFFS": "BLFS",
  "BOTTOM": "BTM",
  "BOT": "BTM",
  "BOTTM": "BTM",
  "BTM": "BTM",
  "BOULEVARD": "BLVD",
  "BLVD": "BLVD",
  "BOUL": "BLVD",
  "BOULV": "BLVD",
  "BRANCH": "BR",
  "BR": "BR",
  "BRNCH": "BR",
  "BRIDGE": "BRG",
  "BRDGE": "BRG",
  "BRG": "BRG",
  "BROOK": "BRK",
  "BRK": "BRK",
  "BROOKS": "BRKS",
  "BURG": "BG",
  "BURGS": "BGS",
  "BYPASS": "BYP",
  "BYP": "BYP",
  "BYPA": "BYP",
  "BYPAS": "BYP",
  "BYPS": "BYP",
  "CAMP": "CP",
  "CP": "CP",
  "CMP": "CP",
  "CANYON": "CYN",
  "CANYN": "CYN",
  "CNYN": "CYN",
  "CAPE": "CPE",
  "CPE": "CPE",
  "CAUSEWAY": "CSWY",
  "CAUSWA": "CSWY",
  "CSWY": "CSWY",
  "CENTER": "CTR",
  "CEN": "CTR",
  "CENT": "CTR",
  "CENTR": "CTR",
  "CENTRE": "CTR",
  "CNTER": "CTR",
  "CNTR": "CTR",
  "CTR": "CTR",
  "CENTERS": "CTRS",
  "CIRCLE": "CIR",
  "CIR": "CIR",
  "CIRC": "CIR",
  "CIRCL": "CIR",
  "CRCL": "CIR",
  "CRCLE": "CIR",
  "CIRCLES": "CIRS",
  "CLIFF": "CLF",
  "CLF": "CLF",
  "CLIFFS": "CLFS",
  "CLUB": "CLB",
  "CLB": "CLB",
  "COMMON": "CMN",
  "COMMONS": "CMNS",
  "CORNER": "COR",
  "COR": "COR",
  "CORNERS": "CORS",
  "COURSE": "CRSE",
  "COURT": "CT",
  "CT": "CT",
  "COURTS": "CTS",
  "COVE": "CV",
  "CV": "CV",
  "COVES": "CVS",
  "CREEK": "CRK",
  "CRK": "CRK",
  "CRESCENT": "CRES",
  "CREST": "CRST",
  "CROSSING": "XING",
  "CROSSROAD": "XRD",
  "CROSSROADS": "XRDS",
  "CURVE": "CURV",
  "DALE": "DL",
  "DAM": "DM",
  "DIVIDE": "DV",
  "DRIVE": "DR",
  "DRIVES": "DRS",
  "ESTATE": "EST",
  "ESTATES": "ESTS",
  "EXPRESSWAY": "EXPY",
  "EXTENSION": "EXT",
  "EXTENSIONS": "EXTS",
  "FALL": "FALL",
  "FALLS": "FLS",
  "FERRY": "FRY",
  "FIELD": "FLD",
  "FIELDS": "FLDS",
  "FLAT": "FLT",
  "FLATS": "FLTS",
  "FORD": "FRD",
  "FORDS": "FRDS",
  "FOREST": "FRST",
  "FORGE": "FRG",
  "FORGES": "FRGS",
  "FORK": "FRK",
  "FORKS": "FRKS",
  "FORT": "FT",
  "FREEWAY": "FWY",
  "GARDEN": "GDN",
  "GARDENS": "GDNS",
  "GATEWAY": "GTWY",
  "GLEN": "GLN",
  "GLENS": "GLNS",
  "GREEN": "GRN",
  "GREENS": "GRNS",
  "GROVE": "GRV",
  "GROVES": "GRVS",
  "HARBOR": "HBR",
  "HARBORS": "HBRS",
  "HAVEN": "HVN",
  "HEIGHTS": "HTS",
  "HIGHWAY": "HWY",
  "HILL": "HL",
  "HILLS": "HLS",
  "HOLLOW": "HOLW",
  "HOLLOWS": "HOLWS",
  "INLET": "INLT",
  "ISLAND": "IS",
  "ISLANDS": "ISS",
  "ISLE": "ISLE",
  "JUNCTION": "JCT",
  "JUNCTIONS": "JCTS",
  "KEY": "KY",
  "KEYS": "KYS",
  "KNOLL": "KNL",
  "KNOLLS": "KNLS",
  "LAKE": "LK",
  "LAKES": "LKS",
  "LANDING": "LNDG",
  "LANE": "LN",
  "LIGHT": "LGT",
  "LIGHTS": "LGTS",
  "LOAF": "LF",
  "LOCK": "LCK",
  "LOCKS": "LCKS",
  "LODGE": "LDG",
  "LOOP": "LOOP",
  "MALL": "MALL",
  "MANOR": "MNR",
  "MANORS": "MNRS",
  "MEADOW": "MDW",
  "MEADOWS": "MDWS",
  "MEWS": "MEWS",
  "MILL": "ML",
  "MILLS": "MLS",
  "MISSION": "MSN",
  "MOTORWAY": "MTWY",
  "MOUNT": "MT",
  "MOUNTAIN": "MTN",
  "MOUNTAINS": "MTNS",
  "NECK": "NCK",
  "ORCHARD": "ORCH",
  "OVAL": "OVAL",
  "OVERPASS": "OPAS",
  "PARK": "PARK",
  "PARKWAY": "PKWY",
  "PASS": "PASS",
  "PASSAGE": "PSGE",
  "PATH": "PATH",
  "PIKE": "PIKE",
  "PINE": "PNE",
  "PINES": "PNES",
  "PLACE": "PL",
  "PLAIN": "PLN",
  "PLAINS": "PLNS",
  "PLAZA": "PLZ",
  "POINT": "PT",
  "POINTS": "PTS",
  "PORT": "PRT",
  "PRAIRIE": "PR",
  "RADIAL": "RADL",
  "RANCH": "RNCH",
  "RAPID": "RPD",
  "RAPIDS": "RPDS",
  "REST": "RST",
  "RIDGE": "RDG",
  "RIDGES": "RDGS",
  "RIVER": "RIV",
  "ROAD": "RD",
  "ROUTE": "RTE",
  "ROW": "ROW",
  "RUE": "RUE",
  "RUN": "RUN",
  "SHOAL": "SHL",
  "SHOALS": "SHLS",
  "SHORE": "SHR",
  "SHORES": "SHRS",
  "SKYWAY": "SKYWAY",
  "SPRING": "SPG",
  "SPRINGS": "SPGS",
  "SPUR": "SPUR",
  "SQUARE": "SQ",
  "STATION": "STA",
  "STREAM": "STRM",
  "STREET": "ST",
  "SUMMIT": "SMT",
  "TERRACE": "TER",
  "TRACE": "TRCE",
  "TRACK": "TRAK",
  "TRAFFICWAY": "TRFY",
  "TRAIL": "TRL",
  "TRAILER": "TRLR",
  "TUNNEL": "TUNL",
  "TURNPIKE": "TPKE",
  "UNDERPASS": "UPAS",
  "UNION": "UN",
  "VALLEY": "VLY",
  "VALLEYS": "VLYS",
  "VIADUCT": "VIA",
  "VIEW": "VW",
  "VILLAGE": "VLG",
  "VILLE": "VL",
  "VISTA": "VIS",
  "WALK": "WALK",
  "WALL": "WALL",
  "WAY": "WAY",
  "WELL": "WL",
  "WELLS": "WLS"
};

const commonAbbreviations = {
  "NEW JERSEY": "NJ",
  "DR MARTIN LUTHER KING JR": "MLK",
  "DR MARTIN LUTHER KING": "MLK",
  "MARTIN LUTHER KING JR": "MLK",
  "MARTIN LUTHER KING": "MLK",
  "CAPE MAY COURT HOUSE": "CAPEMAY CTHSE",
  "NORTH": "N",
  "NORTHWEST": "NW",
  "NORTHEAST": "NE",
  "EAST": "E",
  "SOUTH": "S",
  "SOUTHEAST": "SE",
  "SOUTHWEST": "SW",
  "WEST": "W",
  "COUNTY ROAD": "CR",
  "STATE ROUTE": "SR",
  "INTERSTATE": "I",
};

// TODO: include these examples in Jest Tests
// 13 South Main Street, Cape May Court House, NJ 08210
// 350 Dr Martin Luther King Jr Blvd, Newark, NJ 07102

function normalizeAddress(address) {
  let cleanAddress = address.replace(/\./g, ''); // remove periods
  cleanAddress = cleanAddress.toUpperCase();

  for (const [key, value] of Object.entries({ ...commonAbbreviations, ...streetSuffixMapping })) {
    const regex = new RegExp(`\\b${key}\\b`, 'gi'); // Match whole words only
    cleanAddress = cleanAddress.replace(regex, value);
  }

  return cleanAddress;
}

export function checkMailingAddress(
  address1,
  address2,
  city,
  stateNumber,
  zipcode1,
  zipcode2,
  proceedFunction,
  suggestFunction,
  verifyFunction
) {
  const inputAddress = `${address1}, ${address2 ? address2 + ", " : ""}${city}, NJ, ${zipcode1}${zipcode2 ? "-" + address2 : "" }`; // TODO: reinsert ${state}
  const normalizedInputAddress = normalizeAddress(inputAddress);
  console.log(`normalizedInputAddress: ${normalizedInputAddress}`);

  if (stateNumber == 34) { // 34 is NJ
    const address1Encoded = encodeURIComponent(address1);
    const address2Encoded = encodeURIComponent(address2);
    const cityEncoded = encodeURIComponent(city);
    const zipcode1Encoded = encodeURIComponent(zipcode1);
    const zipcode2Encoded = encodeURIComponent(zipcode2);

    const url = `https://geo.nj.gov/arcgis/rest/services/Tasks/NJ_Geocode/GeocodeServer/findAddressCandidates?` +
      `Address=${address1Encoded}&` +
      `Address2=${address2Encoded}&` +
      `City=${cityEncoded}&` +
      `Postal=${zipcode1Encoded}&` +
      `PostalExt=${zipcode2Encoded}&` +
      `f=pjson`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const candidates = data.candidates;

        if (candidates.some(a => normalizeAddress(a.address) === normalizedInputAddress)) {
          proceedFunction(normalizedInputAddress);
          return;
        }

        const highScoreCandidates = candidates.filter(candidate => candidate.score > 90);
        
        if (highScoreCandidates.length === 0) {
          verifyFunction(normalizedInputAddress);
          return;
        }

        const topCandidate = highScoreCandidates.sort((a, b) => b.score - a.score)[0];
        suggestFunction(normalizeAddress(topCandidate.address));
      })
      .catch(error => {
        console.error('Error checking address data:', error);
        proceedFunction(normalizedInputAddress);
      });
  } else {
    console.log("not nj");
    proceedFunction(normalizedInputAddress);
  }
}

// {
  // "spatialReference": {
  //   "wkid": 102711,
  //   "latestWkid": 3424
  // },
  // "candidates": [
  //   {
  //   "address": "123 Main Street, Newark, New Jersey, 07105",
  //   "location": {
  //     "x": 590375.503736172454,
  //     "y": 689362.209437993588
  //   },
  //   "score": 97,
  //   "attributes": {
      
  //   },
  //   "extent": {
  //     "xmin": 590099.821288942127,
  //     "ymin": 688996.795748931472,
  //     "xmax": 590651.17786089913,
  //     "ymax": 689727.626358074602
  //   }
  //   }
  // ]
  // }