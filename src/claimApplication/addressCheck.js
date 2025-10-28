// https://pe.usps.com/text/pub28/28apc_002.htm
const streetSuffixMapping = {
  "alley": "aly",
  "allee": "aly",
  "ally": "aly",
  "aly": "aly",
  "anex": "anx",
  "annex": "anx",
  "annx": "anx",
  "anx": "anx",
  "arcade": "arc",
  "arc": "arc",
  "avenue": "ave",
  "av": "ave",
  "ave": "ave",
  "aven": "ave",
  "avenu": "ave",
  "avn": "ave",
  "avnue": "ave",
  "bayou": "byu",
  "bayoo": "byu",
  "beach": "bch",
  "bch": "bch",
  "bend": "bnd",
  "bnd": "bnd",
  "bluff": "blf",
  "blf": "blf",
  "bluf": "blf",
  "bluffs": "blfs",
  "bottom": "btm",
  "bot": "btm",
  "bottm": "btm",
  "btm": "btm",
  "boulevard": "blvd",
  "blvd": "blvd",
  "boul": "blvd",
  "boulv": "blvd",
  "branch": "br",
  "br": "br",
  "brnch": "br",
  "bridge": "brg",
  "brdge": "brg",
  "brg": "brg",
  "brook": "brk",
  "brk": "brk",
  "brooks": "brks",
  "burg": "bg",
  "burgs": "bgs",
  "bypass": "byp",
  "byp": "byp",
  "bypa": "byp",
  "bypas": "byp",
  "byps": "byp",
  "camp": "cp",
  "cp": "cp",
  "cmp": "cp",
  "canyon": "cyn",
  "canyn": "cyn",
  "cnyn": "cyn",
  "cape": "cpe",
  "cpe": "cpe",
  "causeway": "cswy",
  "causwa": "cswy",
  "cswy": "cswy",
  "center": "ctr",
  "cen": "ctr",
  "cent": "ctr",
  "centr": "ctr",
  "centre": "ctr",
  "cnter": "ctr",
  "cntr": "ctr",
  "ctr": "ctr",
  "centers": "ctrs",
  "circle": "cir",
  "cir": "cir",
  "circ": "cir",
  "circl": "cir",
  "crcl": "cir",
  "crcle": "cir",
  "circles": "cirs",
  "cliff": "clf",
  "clf": "clf",
  "cliffs": "clfs",
  "club": "clb",
  "clb": "clb",
  "common": "cmn",
  "commons": "cmns",
  "corner": "cor",
  "cor": "cor",
  "corners": "cors",
  "course": "crse",
  "court": "ct",
  "ct": "ct",
  "courts": "cts",
  "cove": "cv",
  "cv": "cv",
  "coves": "cvs",
  "creek": "crk",
  "crk": "crk",
  "crescent": "cres",
  "crest": "crst",
  "crossing": "xing",
  "crossroad": "xrd",
  "crossroads": "xrds",
  "curve": "curv",
  "dale": "dl",
  "dam": "dm",
  "divide": "dv",
  "drive": "dr",
  "drives": "drs",
  "estate": "est",
  "estates": "ests",
  "expressway": "expy",
  "extension": "ext",
  "extensions": "exts",
  "fall": "fall",
  "falls": "fls",
  "ferry": "fry",
  "field": "fld",
  "fields": "flds",
  "flat": "flt",
  "flats": "flts",
  "ford": "frd",
  "fords": "frds",
  "forest": "frst",
  "forge": "frg",
  "forges": "frgs",
  "fork": "frk",
  "forks": "frks",
  "fort": "ft",
  "freeway": "fwy",
  "garden": "gdn",
  "gardens": "gdns",
  "gateway": "gtwy",
  "glen": "gln",
  "glens": "glns",
  "green": "grn",
  "greens": "grns",
  "grove": "grv",
  "groves": "grvs",
  "harbor": "hbr",
  "harbors": "hbrs",
  "haven": "hvn",
  "heights": "hts",
  "highway": "hwy",
  "hill": "hl",
  "hills": "hls",
  "hollow": "holw",
  "hollows": "holws",
  "inlet": "inlt",
  "island": "is",
  "islands": "iss",
  "isle": "isle",
  "junction": "jct",
  "junctions": "jcts",
  "key": "ky",
  "keys": "kys",
  "knoll": "knl",
  "knolls": "knls",
  "lake": "lk",
  "lakes": "lks",
  "landing": "lndg",
  "lane": "ln",
  "light": "lgt",
  "lights": "lgts",
  "loaf": "lf",
  "lock": "lck",
  "locks": "lcks",
  "lodge": "ldg",
  "loop": "loop",
  "mall": "mall",
  "manor": "mnr",
  "manors": "mnrs",
  "meadow": "mdw",
  "meadows": "mdws",
  "mews": "mews",
  "mill": "ml",
  "mills": "mls",
  "mission": "msn",
  "motorway": "mtwy",
  "mount": "mt",
  "mountain": "mtn",
  "mountains": "mtns",
  "neck": "nck",
  "orchard": "orch",
  "oval": "oval",
  "overpass": "opas",
  "park": "park",
  "parkway": "pkwy",
  "pass": "pass",
  "passage": "psge",
  "path": "path",
  "pike": "pike",
  "pine": "pne",
  "pines": "pnes",
  "place": "pl",
  "plain": "pln",
  "plains": "plns",
  "plaza": "plz",
  "point": "pt",
  "points": "pts",
  "port": "prt",
  "prairie": "pr",
  "radial": "radl",
  "ranch": "rnch",
  "rapid": "rpd",
  "rapids": "rpds",
  "rest": "rst",
  "ridge": "rdg",
  "ridges": "rdgs",
  "river": "riv",
  "road": "rd",
  "route": "rte",
  "row": "row",
  "rue": "rue",
  "run": "run",
  "shoal": "shl",
  "shoals": "shls",
  "shore": "shr",
  "shores": "shrs",
  "skyway": "skyway",
  "spring": "spg",
  "springs": "spgs",
  "spur": "spur",
  "square": "sq",
  "station": "sta",
  "stream": "strm",
  "street": "st",
  "summit": "smt",
  "terrace": "ter",
  "trace": "trce",
  "track": "trak",
  "trafficway": "trfy",
  "trail": "trl",
  "trailer": "trlr",
  "tunnel": "tunl",
  "turnpike": "tpke",
  "underpass": "upas",
  "union": "un",
  "valley": "vly",
  "valleys": "vlys",
  "viaduct": "via",
  "view": "vw",
  "village": "vlg",
  "ville": "vl",
  "vista": "vis",
  "walk": "walk",
  "wall": "wall",
  "way": "way",
  "well": "wl",
  "wells": "wls"
};

const commonAbbreviations = {
  "dr martin luther king jr": "mlk",
  "dr martin luther king": "mlk",
  "martin luther king jr": "mlk",
  "martin luther king": "mlk",
  "cape may court house": "capemay cthse",
  "north": "n",
  "northwest": "nw",
  "northeast": "ne",
  "east": "e",
  "south": "s",
  "souteast": "se",
  "southwest": "sw",
  "west": "w",
  "county road": "cr",
  "state route": "sr",
  "interstate": "i",
};

function normalizeAddress(address) {
  let cleanAddress = address.replace(/\./g, ''); // remove periods
  cleanAddress = cleanAddress.toUpperCase();

  for (const [key, value] of Object.entries(commonAbbreviations)) {
    const regex = new RegExp(`\\b${key}\\b`, 'gi'); // Match whole words only
    cleanAddress = cleanAddress.replace(regex, value);
  }

  const words = cleanAddress.split(' ');
  cleanAddress = words.map(word => streetSuffixMapping[word] || word).join(' ');

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
  const inputAddress = `${address1}, ${address2 ? address2 + ", " : ""}${city}, NJ ${zipcode1} ${zipcode2}`; // TODO: reinsert ${state}
  const normalizedInputAddress = normalizeAddress(inputAddress);

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
        console.log(data);

        const candidates = data.candidates;

        const highScoreCandidates = candidates.filter(candidate => candidate.score > 90);
        
        if (highScoreCandidates.length === 0) {
          verifyFunction(normalizedInputAddress);
          return;
        }

        if (highScoreCandidates.some(a => normalizeAddress(a) === normalizedInputAddress)) {
          console.log("found match");
          proceedFunction(normalizedInputAddress);
          return;
        }
        
        const topCandidate = highScoreCandidates.sort((a, b) => b.score - a.score)[0];
        suggestFunction(normalizeAddress(topCandidate));
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