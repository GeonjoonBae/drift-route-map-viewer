(function () {
  "use strict";

  var FIELD = {
    id: "일련번호",
    hanja: "Chinese Name",
    korean: "한국어이름",
    major: "대분류",
    minor: "소분류",
    basis: "분류근거",
    province: "소속행정구역(省)",
    prefecture: "소속행정구역(府/州)",
    county: "소속행정구역(縣)",
    local: "소속행정구역(기층)",
    presentMajor: "현재 위치 광역 단위",
    presentLocal: "현재 위치 기초 단위",
    sourcePaper: "출처(논문)",
    sourcePrimary: "출처(1차사료)",
    pyohaerok: "『표ᄒᆡ록』",
    seo: "「서이방익사」",
    seungjeongwon: "『승정원일기』",
    ilseongnok: "『일성록』"
  };

  var APP_VERSION = "20260729-2";

  var I18N = {
    ko: {
      appTitle: "표해노정도 뷰어",
      fitVisible: "현재 레이어 맞춤",
      basemap: "배경 지도",
      scenes: "장면",
      search: "검색",
      layers: "레이어",
      legend: "범례",
      images: "지도 이미지",
      display: "표시",
      labelDensity: "레이블 밀도",
      searchPlaceholder: "지명, 한자명, 사료명",
      loading: "데이터 로딩 중",
      noResults: "검색 결과 없음",
      visibleLayers: "표시 레이어",
      dataReady: "데이터 로드 완료",
      error: "오류",
      languageButton: "English",
      route: "노정",
      place: "지명",
      context: "비교 자료",
      boundary: "경계",
      hydrography: "수문 도형",
      courier: "명대 역참",
      all: "전체",
      sublayers: "하위 레이어",
      showSidebar: "패널 열기",
      hideSidebar: "패널 닫기",
      routeCertain: "확정 구간",
      routeUncertain: "추정 구간",
      density0: "없음",
      density1: "최소",
      density2: "낮음",
      density3: "기본",
      density4: "높음",
      density5: "전체",
      route_lines: "노정 선",
      route_points: "주요 지점",
      canal_lines: "운하",
      ad_ja_points: "행정/특수행정 지명",
      hg_points: "인문 지명",
      tg_points: "교통 지명",
      mg_points: "산계 지명",
      wg_points: "수계 지명",
      county_points: "시계열 현급 행정 지점",
      ming_courier_stations: "명대 역참 지점",
      ming_courier_routes: "명대 역참 노선",
      chgis_1820_province_boundaries: "1820 성 경계",
      chgis_1796_prefecture_boundaries: "1796 부급 경계",
      chgis_1820_lakes: "호수",
      chgis_dem_hillshade: "CHGIS DEM + Hillshade",
      osm: "OpenStreetMap",
      overview: "전체 노정",
      routeScene: "노정만 보기",
      transport: "교통망 비교",
      placeContext: "지명 맥락",
      adminContext: "행정 지점 검토",
      overviewDesc: "이방익 표해노정과 주요 지명 레이어를 함께 표시합니다.",
      routeDesc: "복원된 이동 선분과 주요 지점만 표시합니다.",
      transportDesc: "노정, 교통 지명, 운하를 함께 표시합니다.",
      placeContextDesc: "행정, 인문, 산계, 수계, 교통 지명을 함께 표시합니다.",
      adminContextDesc: "시계열 현급 행정 지점과 행정 경계를 포함해 지명 위치를 검토합니다."
    },
    en: {
      appTitle: "Drift Route Map Viewer",
      fitVisible: "Fit visible layers",
      basemap: "Basemap",
      scenes: "Scenes",
      search: "Search",
      layers: "Layers",
      legend: "Legend",
      images: "Map Images",
      display: "Display",
      labelDensity: "Label Density",
      searchPlaceholder: "Place name, Chinese characters, source",
      loading: "Loading data",
      noResults: "No results",
      visibleLayers: "visible layers",
      dataReady: "data loaded",
      error: "Error",
      languageButton: "한국어",
      route: "Route",
      place: "Place",
      context: "Context",
      boundary: "Boundary",
      hydrography: "Hydrographic Features",
      courier: "Ming Courier Network",
      all: "All",
      sublayers: "Sublayers",
      showSidebar: "Show panel",
      hideSidebar: "Hide panel",
      routeCertain: "Confirmed Segments",
      routeUncertain: "Inferred Segments",
      density0: "None",
      density1: "Essential",
      density2: "Low",
      density3: "Standard",
      density4: "High",
      density5: "Full",
      route_lines: "Reconstructed Route",
      route_points: "Key Stops",
      canal_lines: "Grand Canal",
      ad_ja_points: "Administrative and Jurisdictional Places",
      hg_points: "Human Geography",
      tg_points: "Transport System",
      mg_points: "Mountain System",
      wg_points: "Water System",
      county_points: "Time-series County Seats",
      ming_courier_stations: "Ming Courier Stations",
      ming_courier_routes: "Ming Courier Routes",
      chgis_1820_province_boundaries: "1820 Province Boundaries",
      chgis_1796_prefecture_boundaries: "1796 Prefecture Boundaries",
      chgis_1820_lakes: "Lakes",
      chgis_dem_hillshade: "CHGIS DEM + Hillshade",
      osm: "OpenStreetMap",
      overview: "Overview",
      routeScene: "Route Only",
      transport: "Transport Network",
      placeContext: "Place Context",
      adminContext: "Administrative Context",
      overviewDesc: "Show Yi Bang-ik's reconstructed route with the main place layers.",
      routeDesc: "Show only the reconstructed route and key stops.",
      transportDesc: "Compare the route with transport places and the Grand Canal.",
      placeContextDesc: "Show administrative, human, mountain, water, and transport places.",
      adminContextDesc: "Add time-series county seats and administrative boundaries for context."
    }
  };

  var sceneText = {
    overview: { title: "overview", desc: "overviewDesc" },
    route: { title: "routeScene", desc: "routeDesc" },
    transport: { title: "transport", desc: "transportDesc" },
    place_context: { title: "placeContext", desc: "placeContextDesc" },
    admin_context: { title: "adminContext", desc: "adminContextDesc" }
  };

  var keyLabels = {
    en: {
      "일련번호": "ID",
      "한자이름": "Chinese Name",
      "Chinese Name": "Chinese Name",
      "한국어이름": "Korean Name",
      "NM_KOR": "Korean Name",
      "NM_CHN": "Chinese Name",
      "SEQ": "Sequence",
      "TYPE_NAME": "Type",
      "NOTE": "Note",
      "TYPE_MEMO": "Route Type",
      "TRANS_MEMO": "Transport",
      "대분류": "Major Category",
      "소분류": "Subtype",
      "분류근거": "Basis",
      "소속행정구역(省)": "Province",
      "소속행정구역(府/州)": "Prefecture/Zhou",
      "소속행정구역(縣)": "County",
      "소속행정구역(기층)": "Local Unit",
      "현재 위치 광역 단위": "Present Region",
      "현재 위치 기초 단위": "Present Locality",
      "『표ᄒᆡ록』": "Pyohaerok",
      "「서이방익사」": "Seo Yi Bangik sa",
      "『승정원일기』": "Seungjeongwon ilgi",
      "『일성록』": "Ilseongnok",
      "출처(논문)": "Scholarly Source",
      "출처(1차사료)": "Primary Source",
      "NAME_FT": "Traditional Name",
      "NAME_CH": "Chinese Name",
      "YZ_ID": "Station ID",
      "YZ_LABEL": "Station Label",
      "YZNM_PY": "Romanized Name",
      "YZNM_CH": "Chinese Name (Simplified)",
      "YZNM_FT": "Chinese Name (Traditional)",
      "CHGIS_ID": "CHGIS ID",
      "10CNTY_CH": "2010 County",
      "10CNTY_EN": "2010 County (English)",
      "10PREF_CH": "2010 Prefecture",
      "10PREF_EN": "2010 Prefecture (English)",
      "10PROV_CH": "2010 Province",
      "10PROV_EN": "2010 Province (English)",
      "GBCODE": "GB Code",
      "YZ_LAT": "Station Longitude",
      "YZ_LONG": "Station Latitude",
      "MAJ_MINOR": "Route Class",
      "SOURCE": "Source",
      "SRC": "Source",
      "STATUS": "Status",
      "PRES_LOC": "Present Location",
      "BEG_YR": "Start Year",
      "END_YR": "End Year",
      "TYPE_CH": "Chinese Type",
      "TYPE_PY": "Romanized Type",
      "LEV1_CH": "Province",
      "DYN_CH": "Dynasty",
      "_filter_year": "Filter Year",
      "_source_file": "Source File",
      "_source_crs": "Source CRS"
    },
    ko: {}
  };

  var filterLabelMap = {
    "route:certain": {
      ko: "확정 구간",
      en: "Confirmed Segments"
    },
    "route:uncertain": {
      ko: "추정 구간",
      en: "Inferred Segments"
    },
    "major:admin": {
      ko: "행정지명",
      en: "Administrative Place"
    },
    "major:jurisdictional": {
      ko: "특수행정지명",
      en: "Jurisdictional Agency"
    },
    "minor:admin-lv0": {
      ko: "행정 Lv0 - 京",
      en: "Lv0 (Capital) - 京 (<i>Jing</i>)"
    },
    "minor:admin-lv1": {
      ko: "행정 Lv1 - 省",
      en: "Lv1 - 省 (<i>Sheng</i>)"
    },
    "minor:admin-lv2": {
      ko: "행정 Lv2 - 府",
      en: "Lv2 - 府 (<i>Fu</i>)"
    },
    "minor:admin-lv3": {
      ko: "행정 Lv3 - 縣/州",
      en: "Lv3 - 縣 (<i>Xian</i>) / 州 (<i>Zhou</i>)"
    },
    "minor:other-admin": {
      ko: "기타 행정지명 - 衛/衙門/媽宮",
      en: "Other Administrative Place - 衛 (<i>Wei</i>) / 衙門 (<i>Yamen</i>) / 媽宮 (<i>Magong</i>)"
    },
    "minor:military": {
      ko: "군사지명 - 鎭",
      en: "Military Place - 鎭 (<i>Zhen</i>)"
    },
    "minor:building": { ko: "건축물", en: "Building" },
    "minor:education": { ko: "교육시설", en: "Educational Site" },
    "minor:temple": { ko: "종교시설(사찰)", en: "Buddhist Temple" },
    "minor:mountain-pass": { ko: "고개", en: "Mountain Pass" },
    "minor:bridge": { ko: "교량", en: "Bridge" },
    "minor:relay": { ko: "역참", en: "Relay Station" },
    "minor:gate": { ko: "관문", en: "Gate / Customs Pass" },
    "minor:river": { ko: "하천", en: "River" },
    "minor:lake": { ko: "호수", en: "Lake" },
    "minor:sandbar": { ko: "모래톱", en: "Sandbar" },
    "minor:dock": { ko: "부두", en: "Dock / Wharf" }
  };

  var state = {
    manifest: null,
    map: null,
    lang: "en",
    basemaps: new Map(),
    currentBasemap: null,
    currentBasemapId: null,
    layers: new Map(),
    layerDefs: new Map(),
    parentVisible: new Map(),
    parentCheckboxes: new Map(),
    filterStates: new Map(),
    filterCheckboxes: new Map(),
    filterDefs: new Map(),
    layerFeatures: new Map(),
    featureLayers: new Map(),
    featureIndex: [],
    translationsByFeature: new Map(),
    translationsByValue: new Map(),
    activeScene: null,
    lastSearch: "",
    labelDensity: 3,
    labelBuckets: new Map(),
    sidebarCollapsed: false,
    arrowLayers: new Map(),
    sidePopup: null,
    sidePopupLatLng: null
  };

  function qs(id) {
    return document.getElementById(id);
  }

  function assetUrl(path) {
    return path + (path.indexOf("?") === -1 ? "?" : "&") + "v=" + APP_VERSION;
  }

  function freshAssetUrl(path) {
    return assetUrl(path) + "&t=" + Date.now();
  }

  function mapKey(parts) {
    return parts.join("\u241f");
  }

  function parseCsv(text) {
    var rows = [];
    var row = [];
    var value = "";
    var inQuotes = false;

    for (var i = 0; i < text.length; i += 1) {
      var ch = text[i];
      if (inQuotes) {
        if (ch === "\"") {
          if (text[i + 1] === "\"") {
            value += "\"";
            i += 1;
          } else {
            inQuotes = false;
          }
        } else {
          value += ch;
        }
      } else if (ch === "\"") {
        inQuotes = true;
      } else if (ch === ",") {
        row.push(value);
        value = "";
      } else if (ch === "\n") {
        row.push(value.replace(/\r$/, ""));
        rows.push(row);
        row = [];
        value = "";
      } else {
        value += ch;
      }
    }

    if (value.length || row.length) {
      row.push(value.replace(/\r$/, ""));
      rows.push(row);
    }

    if (!rows.length) return [];
    var headers = rows.shift();
    return rows.filter(function (items) {
      return items.some(function (item) {
        return item !== "";
      });
    }).map(function (items) {
      var record = {};
      headers.forEach(function (header, index) {
        record[header] = items[index] || "";
      });
      return record;
    });
  }

  function t(key) {
    return (I18N[state.lang] && I18N[state.lang][key]) || I18N.ko[key] || key;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function colorOf(def) {
    return (def.style && def.style.color) || "#334155";
  }

  function isLineLayer(def) {
    return def.id.indexOf("lines") !== -1 || def.id === "route_lines" || def.id === "ming_courier_routes";
  }

  function isBoundaryLayer(def) {
    return def.category === "boundary" || def.id.indexOf("boundaries") !== -1;
  }

  function createMapPane(name, zIndex) {
    if (!state.map || !name) return;
    if (!state.map.getPane(name)) state.map.createPane(name);
    state.map.getPane(name).style.zIndex = zIndex;
  }

  function safePaneName(name) {
    if (!state.map || !name || !state.map.getPane(name)) return undefined;
    return name;
  }

  function layerTitle(def) {
    return t(def.id) || def.title;
  }

  function basemapTitle(def) {
    return t(def.id) || def.title;
  }

  function filterLabel(key) {
    var item = filterLabelMap[key];
    if (!item) return escapeHtml(key);
    return item[state.lang] || item.ko;
  }

  function keyLabel(key) {
    if (state.lang === "en" && keyLabels.en[key]) return keyLabels.en[key];
    return key.replace(/^_/, "");
  }

  function sourceFeatureId(props) {
    var keys = [FIELD.id, "SEQ", "SYS_ID", "KEY_ID", "NOTE_ID"];
    for (var i = 0; i < keys.length; i += 1) {
      if (props && props[keys[i]]) return String(props[keys[i]]).trim();
    }
    return "";
  }

  function translationFor(props, field, value) {
    if (state.lang !== "en") return value;
    var original = String(value || "").trim();
    if (!original) return value;

    var fid = sourceFeatureId(props);
    var translated = fid ? state.translationsByFeature.get(mapKey([fid, field, original])) : "";
    if (!translated) translated = state.translationsByValue.get(mapKey([field, original]));
    return translated || value;
  }

  function displayValue(props, field) {
    return translationFor(props, field, props ? props[field] : "");
  }

  function isKoreanNameField(field) {
    return field === FIELD.korean || field === "NM_KOR";
  }

  function popupDisplayValue(props, field) {
    if (isKoreanNameField(field)) return props ? props[field] : "";
    return displayValue(props, field);
  }

  function labelText(props, translated) {
    var hanjaKeys = [FIELD.hanja, "NM_CHN", "NAME_FT", "NAME_CH", "YZNM_FT", "YZNM_CH"];
    var fallbackKeys = [FIELD.korean, "NM_KOR", "TYPE_NAME", "NAME_PY", "YZNM_PY", "YZ_LABEL"];
    var i;
    for (i = 0; i < hanjaKeys.length; i += 1) {
      if (props && props[hanjaKeys[i]]) return props[hanjaKeys[i]];
    }
    for (i = 0; i < fallbackKeys.length; i += 1) {
      if (props && props[fallbackKeys[i]]) return translated ? displayValue(props, fallbackKeys[i]) : props[fallbackKeys[i]];
    }
    return "";
  }

  function primaryLabel(props) {
    return labelText(props, true) || "Unnamed";
  }

  function secondaryLabel(props) {
    var parts = [];
    [FIELD.korean, FIELD.major, FIELD.minor, "TYPE_MEMO", "TRANS_MEMO", "NOTE", "PRES_LOC"].forEach(function (key) {
      if (props && props[key]) {
        var value = displayValue(props, key);
        if (value && parts.indexOf(value) === -1) parts.push(value);
      }
    });
    return parts.join(" · ");
  }

  function popupTable(props) {
    var preferred = [
      FIELD.id, FIELD.hanja, FIELD.korean, "NM_KOR", "NM_CHN", "SEQ", "TYPE_NAME", "NOTE",
      "TYPE_MEMO", "TRANS_MEMO", FIELD.major, FIELD.minor, FIELD.basis, FIELD.province,
      FIELD.prefecture, FIELD.county, FIELD.local, FIELD.presentMajor, FIELD.presentLocal,
      FIELD.pyohaerok, FIELD.seo, FIELD.seungjeongwon, FIELD.ilseongnok, FIELD.sourcePaper,
      FIELD.sourcePrimary, "NAME_FT", "NAME_CH", "PRES_LOC", "BEG_YR", "END_YR",
      "YZ_ID", "YZ_LABEL", "YZNM_PY", "YZNM_CH", "YZNM_FT", "CHGIS_ID",
      "10CNTY_CH", "10CNTY_EN", "10PREF_CH", "10PREF_EN", "10PROV_CH", "10PROV_EN",
      "GBCODE", "YZ_LAT", "YZ_LONG", "MAJ_MINOR", "SOURCE", "SRC", "STATUS",
      "_source_file", "_source_crs"
    ];
    var used = new Set();
    var rows = [];

    function addRow(key) {
      var value = props[key];
      if (value === null || value === undefined || value === "") return;
      if (String(key).indexOf("_blank_") === 0 || key === "_feature_key") return;
      used.add(key);
      var display = popupDisplayValue(props, key);
      rows.push(
        "<tr><th>" + escapeHtml(keyLabel(key)) + "</th><td>" + escapeHtml(display) + "</td></tr>"
      );
    }

    preferred.forEach(addRow);
    Object.keys(props).forEach(function (key) {
      if (!used.has(key) && rows.length < 22) addRow(key);
    });

    return "<p class=\"popup-title\">" + escapeHtml(primaryLabel(props)) + "</p>" +
      "<table class=\"prop-table\"><tbody>" + rows.join("") + "</tbody></table>";
  }

  function normalizeMinor(text) {
    return String(text || "").replace(/\s+/g, "");
  }

  function splitMinor(text) {
    var raw = normalizeMinor(text);
    if (!raw) return [];
    var tokens = raw.split(/[\/,·]+/).filter(Boolean);
    if (raw.indexOf("기타행정") !== -1 && raw.indexOf("군사") !== -1) {
      tokens.push("기타행정시설", "군사시설");
    }
    if (raw.indexOf("행정Lv3") !== -1 && raw.indexOf("군사") !== -1) {
      tokens.push("행정Lv3", "군사시설");
    }
    return Array.from(new Set(tokens));
  }

  function featureTokens(def, props) {
    var tokens = [];
    var major = props[FIELD.major] || "";
    var minor = props[FIELD.minor] || "";

    if (def.id === "route_lines") {
      tokens.push(isUncertainFeature(def, props, []) ? "route:uncertain" : "route:certain");
    } else if (def.id === "ad_ja_points") {
      if (major.indexOf("행정 지명") !== -1) tokens.push("major:admin");
      if (major.indexOf("특수행정") !== -1) tokens.push("major:jurisdictional");

      splitMinor(minor).forEach(function (item) {
        if (item === "행정Lv0") tokens.push("minor:admin-lv0");
        if (item === "행정Lv1") tokens.push("minor:admin-lv1");
        if (item === "행정Lv2") tokens.push("minor:admin-lv2");
        if (item === "행정Lv3") tokens.push("minor:admin-lv3");
        if (item.indexOf("기타행정") !== -1) tokens.push("minor:other-admin");
        if (item.indexOf("군사") !== -1) tokens.push("minor:military");
      });
    } else if (def.id === "hg_points") {
      if (minor.indexOf("건축물") !== -1) tokens.push("minor:building");
      if (minor.indexOf("교육") !== -1) tokens.push("minor:education");
      if (minor.indexOf("종교") !== -1 || minor.indexOf("사찰") !== -1) tokens.push("minor:temple");
    } else if (def.id === "mg_points") {
      if (minor.indexOf("고개") !== -1) tokens.push("minor:mountain-pass");
    } else if (def.id === "tg_points") {
      if (minor.indexOf("교량") !== -1) tokens.push("minor:bridge");
      if (minor.indexOf("역참") !== -1) tokens.push("minor:relay");
      if (minor.indexOf("관문") !== -1) tokens.push("minor:gate");
    } else if (def.id === "wg_points") {
      if (minor.indexOf("하천") !== -1) tokens.push("minor:river");
      if (minor.indexOf("호수") !== -1) tokens.push("minor:lake");
      if (minor.indexOf("모래톱") !== -1) tokens.push("minor:sandbar");
      if (minor.indexOf("부두") !== -1) tokens.push("minor:dock");
    }

    return Array.from(new Set(tokens));
  }

  function markerSpec(def, props, tokens) {
    var basis = props[FIELD.basis] || "";
    if (def.id === "ad_ja_points") {
      if (tokens.indexOf("minor:military") !== -1) {
        return { className: "marker-triangle marker-military", glyph: basis || "鎭", size: 20, color: "#9f1239" };
      }
      if (tokens.indexOf("minor:other-admin") !== -1) {
        return { className: "marker-hex marker-other-admin", glyph: basis || "衙", size: 19, color: "#1d4ed8" };
      }
      if (tokens.indexOf("minor:admin-lv0") !== -1) {
        return { className: "marker-square marker-admin-lv0", glyph: "京", size: 25, color: "#1e3a8a" };
      }
      if (tokens.indexOf("minor:admin-lv1") !== -1) {
        return { className: "marker-double-circle marker-admin-lv1", glyph: "省", size: 23, color: "#1d4ed8" };
      }
      if (tokens.indexOf("minor:admin-lv2") !== -1) {
        return { className: "marker-dot-circle marker-admin-lv2", glyph: basis || "府", size: 20, color: "#2563eb" };
      }
      if (tokens.indexOf("minor:admin-lv3") !== -1) {
        return { className: "marker-small-circle marker-admin-lv3", glyph: "", size: 14, color: "#60a5fa" };
      }
    }
    if (def.id === "hg_points") {
      if (tokens.indexOf("minor:temple") !== -1) return { className: "marker-diamond marker-temple", glyph: "寺", size: 19, color: "#7c3aed" };
      if (tokens.indexOf("minor:education") !== -1) return { className: "marker-square marker-education", glyph: "文", size: 18, color: "#6d28d9" };
      return { className: "marker-square marker-building", glyph: basis || "門", size: 18, color: "#8b5cf6" };
    }
    if (def.id === "mg_points") {
      return { className: "marker-triangle marker-mountain", glyph: "嶺", size: 19, color: "#15803d" };
    }
    if (def.id === "tg_points") {
      if (tokens.indexOf("minor:bridge") !== -1) return { className: "marker-bridge marker-transport", glyph: "橋", size: 19, color: "#ea580c" };
      if (tokens.indexOf("minor:gate") !== -1) return { className: "marker-gate marker-transport", glyph: "關", size: 19, color: "#c2410c" };
      return { className: "marker-flag marker-transport", glyph: basis || "驛", size: 19, color: "#f97316" };
    }
    if (def.id === "wg_points") {
      if (tokens.indexOf("minor:river") !== -1) return { className: "marker-wave marker-water", glyph: "江", size: 19, color: "#0284c7" };
      if (tokens.indexOf("minor:lake") !== -1) return { className: "marker-lake marker-water", glyph: "湖", size: 19, color: "#0891b2" };
      if (tokens.indexOf("minor:sandbar") !== -1) return { className: "marker-sandbar marker-water", glyph: "洲", size: 19, color: "#ca8a04" };
      return { className: "marker-dock marker-water", glyph: "阜", size: 19, color: "#0f766e" };
    }
    if (def.id === "route_points") {
      return { className: "marker-route-stop", glyph: props.SEQ || "", size: 25, color: "#dc2626" };
    }
    if (def.id === "county_points") {
      return { className: "marker-county", glyph: "", size: 8, color: "#64748b" };
    }
    if (def.id === "ming_courier_stations") {
      return { className: "marker-small-circle marker-ming-station", glyph: "", size: 8, color: "#b7791f" };
    }
    return { className: "marker-dot-circle", glyph: "", size: 18, color: colorOf(def) };
  }

  function markerHtml(spec) {
    return "<span class=\"place-marker " + escapeHtml(spec.className) + "\" style=\"--marker-color:" +
      escapeHtml(spec.color) + "; --marker-size:" + escapeHtml(spec.size) + "px;\">" +
      "<span class=\"marker-glyph\">" + escapeHtml(spec.glyph || "") + "</span></span>";
  }

  function isUncertainFeature(def, props, tokens) {
    if (def.id === "route_lines" && Number(props.TYPE) === 3) return true;
    if (def.id === "route_lines" && Number(props.TYPE) === 4) return true;
    var values = [
      props.NOTE,
      props.TYPE_MEMO,
      props.TRANS_MEMO,
      props[FIELD.minor],
      props[FIELD.basis],
      props["비고"],
      props["비고(논문 등 연구 참고 사항)"]
    ].join(" ");
    if (/추정|미상|불명|未詳|疑|推定|박지원\s*고증|approx|uncertain/i.test(values)) return true;
    if (def.id === "ad_ja_points" && tokens.indexOf("minor:admin-lv3") !== -1 && tokens.indexOf("minor:military") !== -1) return true;
    return false;
  }

  function markerIcon(def, props, tokens) {
    var spec = markerSpec(def, props, tokens);
    if (isUncertainFeature(def, props, tokens)) spec = Object.assign({}, spec, { className: spec.className + " marker-uncertain" });
    var size = spec.size + 10;
    return L.divIcon({
      className: "custom-marker-wrapper",
      html: markerHtml(spec),
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      popupAnchor: [0, -size / 2]
    });
  }

  function markerPreviewHtml(def, tokenKey) {
    var props = {};
    props[FIELD.basis] = "";
    var tokens = tokenKey ? [tokenKey] : [];
    if (tokenKey && tokenKey.indexOf("major:") === 0) {
      tokens = tokenKey === "major:jurisdictional" ? ["minor:other-admin"] : ["minor:admin-lv2"];
    }
    var spec = markerSpec(def, props, tokens);
    return markerHtml(spec);
  }

  function filterPreviewHtml(def, tokenKey) {
    if (def.id === "route_lines") {
      var isUncertain = tokenKey === "route:uncertain";
      return "<span class=\"filter-line-preview " + (isUncertain ? "line-uncertain\" " : "\" ") +
        "style=\"--line-color:" + escapeHtml(colorOf(def)) + ";\"></span>";
    }
    return markerPreviewHtml(def, tokenKey);
  }

  function lineStyle(def, props) {
    var color = colorOf(def);
    var dashArray = null;
    var memo = [props.TYPE_MEMO, props.TRANS_MEMO].join(" ");
    if (def.id === "route_lines") {
      if (/추정|미상/.test(memo)) dashArray = "7 6";
    }
    var style = {
      color: color,
      weight: (def.style && def.style.weight) || 3,
      opacity: (def.style && def.style.opacity) || 0.85,
      dashArray: (def.style && def.style.dashArray) || dashArray,
      fillColor: (def.style && def.style.fillColor) || color,
      fillOpacity: def.style && def.style.fillOpacity !== undefined ? def.style.fillOpacity : 0.18
    };
    if (isBoundaryLayer(def)) {
      style.fill = false;
      style.fillOpacity = (def.style && def.style.fillOpacity) || 0;
      style.interactive = true;
    }
    return style;
  }

  function featureCenter(feature) {
    var geom = feature.geometry;
    if (!geom) return null;
    if (geom.type === "Point") {
      return L.latLng(geom.coordinates[1], geom.coordinates[0]);
    }
    var bounds = L.geoJSON(feature).getBounds();
    if (bounds && bounds.isValid()) return bounds.getCenter();
    return null;
  }

  function indexFeature(feature, def, layerIndex) {
    feature.properties = feature.properties || {};
    var key = def.id + ":" + layerIndex;
    feature.properties._feature_key = key;
    var props = feature.properties;
    var values = Object.keys(props).map(function (propKey) {
      return props[propKey] === null || props[propKey] === undefined ? "" : String(props[propKey]);
    });
    var translatedValues = Object.keys(props).map(function (propKey) {
      var value = props[propKey];
      return value === null || value === undefined ? "" : String(translationFor(props, propKey, value));
    });
    state.featureIndex.push({
      key: key,
      layerId: def.id,
      layerTitle: layerTitle(def),
      title: primaryLabel(props),
      meta: secondaryLabel(props),
      props: props,
      text: (values.join(" ") + " " + translatedValues.join(" ")).toLowerCase(),
      center: featureCenter(feature)
    });
  }

  function shouldBindPermanentLabel(def) {
    return ["ad_ja_points", "hg_points", "mg_points", "tg_points", "wg_points", "route_points"].indexOf(def.id) !== -1;
  }

  function labelPlacement(feature) {
    var latlng = featureCenter(feature);
    if (!latlng) return { direction: "right", offset: [10, 0] };
    var bucketSize = 0.05;
    var key = Math.round(latlng.lat / bucketSize) + ":" + Math.round(latlng.lng / bucketSize);
    var slot = state.labelBuckets.get(key) || 0;
    state.labelBuckets.set(key, slot + 1);
    var placements = [
      { direction: "right", offset: [12, 0] },
      { direction: "left", offset: [-12, 0] },
      { direction: "top", offset: [0, -10] },
      { direction: "bottom", offset: [0, 10] },
      { direction: "right", offset: [12, -24] },
      { direction: "right", offset: [12, 24] },
      { direction: "left", offset: [-12, -24] },
      { direction: "left", offset: [-12, 24] },
      { direction: "top", offset: [28, -10] },
      { direction: "bottom", offset: [-28, 10] },
      { direction: "right", offset: [12, -48] },
      { direction: "left", offset: [-12, 48] }
    ];
    return placements[slot % placements.length];
  }

  function labelMinZoom(item) {
    if (item.def.id === "route_points") return 0;
    if (item.def.id === "ad_ja_points") {
      if (item.tokens.indexOf("minor:admin-lv0") !== -1) return 0;
      if (item.tokens.indexOf("minor:admin-lv1") !== -1) return 0;
      if (item.tokens.indexOf("minor:other-admin") !== -1) return 0;
      if (item.tokens.indexOf("minor:military") !== -1) return 0;
      if (item.tokens.indexOf("minor:admin-lv2") !== -1) return 5;
      if (item.tokens.indexOf("minor:admin-lv3") !== -1) return 8;
      return 7;
    }
    if (item.def.id === "tg_points") {
      if (item.tokens.indexOf("minor:bridge") !== -1 || item.tokens.indexOf("minor:gate") !== -1) return 5;
      return 7;
    }
    if (item.def.id === "hg_points") return 6;
    if (item.def.id === "mg_points") return 6;
    if (item.def.id === "wg_points") return 6;
    return 8;
  }

  function densityZoomBonus(density) {
    return [99, -1, 0, 1, 2, 99][density] || 0;
  }

  function shouldShowLabel(item) {
    if (!item.visible) return false;
    var density = state.labelDensity;
    if (density <= 0) return false;
    if (item.def.id === "county_points") return false;
    if (density >= 5) return true;
    var minZoom = labelMinZoom(item) - densityZoomBonus(density);
    return state.map.getZoom() >= minZoom;
  }

  function updateTooltipVisibility(item) {
    var tooltip = item.layer.getTooltip && item.layer.getTooltip();
    if (!tooltip) return;
    var label = labelText(item.feature.properties || {}, true);
    if (label && tooltip.setContent) tooltip.setContent(label);
    var el = tooltip.getElement && tooltip.getElement();
    if (el) el.classList.toggle("label-hidden", !shouldShowLabel(item));
  }

  function updateAllLabels() {
    state.layerFeatures.forEach(function (items) {
      items.forEach(updateTooltipVisibility);
    });
  }

  function updateDensityLabel() {
    var el = qs("label-density-value");
    if (el) el.textContent = t("density" + state.labelDensity);
  }

  function ensureSidePopup() {
    if (state.sidePopup) return state.sidePopup;
    var popup = document.createElement("div");
    popup.className = "map-side-popup";
    popup.hidden = true;
    popup.innerHTML = "<button class=\"map-side-popup-close\" type=\"button\" aria-label=\"Close\">×</button>" +
      "<div class=\"map-side-popup-content\"></div>";
    state.map.getContainer().appendChild(popup);
    popup.querySelector(".map-side-popup-close").addEventListener("click", closeSidePopup);
    L.DomEvent.disableClickPropagation(popup);
    L.DomEvent.disableScrollPropagation(popup);
    state.sidePopup = popup;
    return popup;
  }

  function positionSidePopup(latlng) {
    if (!state.sidePopup || state.sidePopup.hidden || !latlng) return;
    var container = state.map.getContainer();
    var point = state.map.latLngToContainerPoint(latlng);
    var width = state.sidePopup.offsetWidth || 360;
    var height = state.sidePopup.offsetHeight || 260;
    var left = point.x + 18;
    var top = point.y - 24;
    left = Math.min(left, container.clientWidth - width - 12);
    left = Math.max(left, 12);
    top = Math.min(top, container.clientHeight - height - 12);
    top = Math.max(top, 12);
    state.sidePopup.style.left = left + "px";
    state.sidePopup.style.top = top + "px";
  }

  function openSidePopup(latlng, html) {
    var popup = ensureSidePopup();
    popup.querySelector(".map-side-popup-content").innerHTML = html;
    popup.hidden = false;
    state.sidePopupLatLng = latlng;
    positionSidePopup(latlng);
  }

  function closeSidePopup() {
    if (!state.sidePopup) return;
    state.sidePopup.hidden = true;
    state.sidePopupLatLng = null;
  }

  function popupLatLngForLayer(layer, feature, event) {
    if (event && event.latlng) return event.latlng;
    if (layer.getLatLng) return layer.getLatLng();
    if (layer.getBounds) return layer.getBounds().getCenter();
    return featureCenter(feature);
  }

  function openFeaturePopup(layer, feature, event) {
    var props = (feature && feature.properties) || layer._featureProps || {};
    openSidePopup(popupLatLngForLayer(layer, feature, event), popupTable(props));
  }

  function bindTooltipPopupEvents(layer, feature) {
    var tooltip = layer.getTooltip && layer.getTooltip();
    var element = tooltip && tooltip.getElement && tooltip.getElement();
    if (!element || element._sidePopupBound) return;
    element._sidePopupBound = true;
    element.addEventListener("click", function (event) {
      event.stopPropagation();
      openFeaturePopup(layer, feature);
    });
  }

  function createLayer(def, geojson) {
    var group = L.layerGroup();
    var items = [];
    var pane = safePaneName(def.pane);
    state.layerFeatures.set(def.id, items);

    geojson.features.forEach(function (feature, index) {
      feature.properties = feature.properties || {};
      var tokens = featureTokens(def, feature.properties);
      feature.properties._feature_key = def.id + ":" + index;
      indexFeature(feature, def, index);

      var layerOptions = {
        style: function (feat) {
          var style = lineStyle(def, feat.properties || {});
          if (isUncertainFeature(def, feat.properties || {}, [])) {
            style.dashArray = style.dashArray || "7 7";
            style.opacity = Math.min(style.opacity || 0.85, 0.62);
          }
          return style;
        },
        pointToLayer: function (feat, latlng) {
          if (def.id === "county_points") {
            var circleOptions = {
              radius: 3,
              color: "#ffffff",
              weight: 0.5,
              fillColor: colorOf(def),
              fillOpacity: 0.55
            };
            if (pane) circleOptions.pane = pane;
            return L.circleMarker(latlng, circleOptions);
          }
          if (def.id === "ming_courier_stations") {
            var stationOptions = {
              radius: def.style && def.style.radius ? def.style.radius : 2.4,
              color: "rgba(255, 255, 255, 0.72)",
              weight: 0.6,
              fillColor: colorOf(def),
              fillOpacity: 0.76
            };
            if (pane) stationOptions.pane = pane;
            return L.circleMarker(latlng, stationOptions);
          }
          var markerOptions = { icon: markerIcon(def, feat.properties || {}, tokens) };
          if (pane) markerOptions.pane = pane;
          return L.marker(latlng, markerOptions);
        },
        onEachFeature: function (feat, layer) {
          var props = feat.properties || {};
          state.featureLayers.set(props._feature_key, layer);
          layer._featureProps = props;
          layer.on("click", function (event) {
            if (event.originalEvent) L.DomEvent.stopPropagation(event.originalEvent);
            openFeaturePopup(layer, feat, event);
          });
          var label = labelText(props, true);
          if (label && shouldBindPermanentLabel(def)) {
            var placement = labelPlacement(feat);
            layer.bindTooltip(label, {
              permanent: true,
              direction: placement.direction,
              offset: placement.offset,
              className: "hanja-label"
            });
            layer.on("add tooltipopen", function () {
              window.setTimeout(function () {
                bindTooltipPopupEvents(layer, feat);
              }, 0);
            });
          }
        }
      };
      if (pane) layerOptions.pane = pane;

      var featureLayer = L.geoJSON(feature, layerOptions);

      var child = featureLayer.getLayers()[0] || featureLayer;
      var item = {
        def: def,
        feature: feature,
        layer: child,
        tokens: tokens,
        visible: false
      };
      items.push(item);
    });

    return group;
  }

  function createFilterDefs(def) {
    if (def.id === "route_lines") {
      return [
        {
          id: "route-certainty",
          title: "certainty",
          type: "certainty",
          items: ["route:certain", "route:uncertain"]
        }
      ];
    }
    if (def.id === "ad_ja_points") {
      return [
        {
          id: "ad-major",
          title: "major",
          type: "major",
          items: ["major:admin", "major:jurisdictional"]
        },
        {
          id: "ad-minor",
          title: "minor",
          type: "minor",
          items: [
            "minor:admin-lv0",
            "minor:admin-lv1",
            "minor:admin-lv2",
            "minor:admin-lv3",
            "minor:other-admin",
            "minor:military"
          ]
        }
      ];
    }
    if (def.id === "hg_points") {
      return [{ id: "hg-minor", type: "minor", items: ["minor:building", "minor:education", "minor:temple"] }];
    }
    if (def.id === "mg_points") {
      return [{ id: "mg-minor", type: "minor", items: ["minor:mountain-pass"] }];
    }
    if (def.id === "tg_points") {
      return [{ id: "tg-minor", type: "minor", items: ["minor:bridge", "minor:relay", "minor:gate"] }];
    }
    if (def.id === "wg_points") {
      return [{ id: "wg-minor", type: "minor", items: ["minor:river", "minor:lake", "minor:sandbar", "minor:dock"] }];
    }
    return [];
  }

  function filterCounts(layerId) {
    var counts = new Map();
    var items = state.layerFeatures.get(layerId) || [];
    items.forEach(function (item) {
      item.tokens.forEach(function (token) {
        counts.set(token, (counts.get(token) || 0) + 1);
      });
    });
    return counts;
  }

  function initializeFilters(def) {
    var groups = createFilterDefs(def);
    state.filterDefs.set(def.id, groups);
    var filterMap = new Map();
    groups.forEach(function (group) {
      group.items.forEach(function (key) {
        filterMap.set(key, true);
      });
    });
    state.filterStates.set(def.id, filterMap);
  }

  function passesFilter(item) {
    var groups = state.filterDefs.get(item.def.id) || [];
    if (!groups.length) return true;
    var filterState = state.filterStates.get(item.def.id);
    if (!filterState) return true;

    return groups.every(function (group) {
      var matching = group.items.filter(function (key) {
        return item.tokens.indexOf(key) !== -1;
      });
      if (!matching.length) return true;
      return matching.some(function (key) {
        return filterState.get(key);
      });
    });
  }

  function refreshLayer(layerId) {
    var group = state.layers.get(layerId);
    var items = state.layerFeatures.get(layerId) || [];
    if (!group) return;
    group.clearLayers();

    var parentOn = !!state.parentVisible.get(layerId);
    items.forEach(function (item) {
      item.visible = parentOn && passesFilter(item);
      if (item.visible) group.addLayer(item.layer);
    });
    updateAllLabels();
    refreshRouteArrows();
  }

  function bearing(from, to) {
    var lat1 = from[0] * Math.PI / 180;
    var lat2 = to[0] * Math.PI / 180;
    var dLon = (to[1] - from[1]) * Math.PI / 180;
    var y = Math.sin(dLon) * Math.cos(lat2);
    var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
  }

  function interpolateLatLng(a, b, tValue) {
    return L.latLng(a.lat + (b.lat - a.lat) * tValue, a.lng + (b.lng - a.lng) * tValue);
  }

  function arrowPosition(coords, fraction) {
    if (coords.length < 2) return null;
    var segments = [];
    var total = 0;
    for (var i = 0; i < coords.length - 1; i += 1) {
      var a = L.latLng(coords[i][1], coords[i][0]);
      var b = L.latLng(coords[i + 1][1], coords[i + 1][0]);
      var length = state.map.distance(a, b);
      segments.push({ a: a, b: b, length: length });
      total += length;
    }
    if (!total) return null;
    var target = total * fraction;
    var passed = 0;
    for (var j = 0; j < segments.length; j += 1) {
      var segment = segments[j];
      if (passed + segment.length >= target) {
        var local = segment.length ? (target - passed) / segment.length : 0.5;
        return {
          latlng: interpolateLatLng(segment.a, segment.b, local),
          angle: bearing([segment.a.lat, segment.a.lng], [segment.b.lat, segment.b.lng])
        };
      }
      passed += segment.length;
    }
    var last = segments[segments.length - 1];
    return {
      latlng: interpolateLatLng(last.a, last.b, 0.5),
      angle: bearing([last.a.lat, last.a.lng], [last.b.lat, last.b.lng])
    };
  }

  function lineCoordinates(feature) {
    var geom = feature.geometry;
    if (!geom) return [];
    if (geom.type === "LineString") return geom.coordinates;
    if (geom.type === "MultiLineString") return geom.coordinates.reduce(function (acc, line) {
      return acc.concat(line);
    }, []);
    return [];
  }

  function createArrowLayer(item) {
    var coords = lineCoordinates(item.feature);
    var pos = arrowPosition(coords, 0.62);
    if (!pos) return L.layerGroup();
    return L.layerGroup([
      L.marker(pos.latlng, {
        interactive: false,
        icon: L.divIcon({
          className: "route-arrow-icon",
          html: "<span class=\"route-arrow\" style=\"transform: rotate(" + (pos.angle - 90) + "deg);\">&gt;&gt;</span>",
          iconSize: [30, 18],
          iconAnchor: [15, 9]
        })
      })
    ]);
  }

  function refreshRouteArrows() {
    var group = state.layers.get("route_lines");
    var items = state.layerFeatures.get("route_lines") || [];
    if (!group) return;
    state.arrowLayers.forEach(function (arrowLayer) {
      if (group.hasLayer(arrowLayer)) group.removeLayer(arrowLayer);
    });
    state.arrowLayers.clear();
    items.forEach(function (item) {
      if (!item.visible) return;
      var arrows = createArrowLayer(item);
      state.arrowLayers.set(item.feature.properties._feature_key, arrows);
      group.addLayer(arrows);
    });
  }

  function setLayerVisible(layerId, visible) {
    var layer = state.layers.get(layerId);
    if (!layer) return;
    state.parentVisible.set(layerId, visible);
    if (visible) {
      if (!state.map.hasLayer(layer)) state.map.addLayer(layer);
    } else if (state.map.hasLayer(layer)) {
      state.map.removeLayer(layer);
    }
    var checkbox = state.parentCheckboxes.get(layerId);
    if (checkbox) checkbox.checked = visible;
    refreshLayer(layerId);
  }

  function setFilterVisible(layerId, filterKey, visible) {
    var filterMap = state.filterStates.get(layerId);
    if (!filterMap) return;
    filterMap.set(filterKey, visible);
    var checkbox = state.filterCheckboxes.get(layerId + "|" + filterKey);
    if (checkbox) checkbox.checked = visible;
    refreshLayer(layerId);
  }

  function visibleLayerIds() {
    var ids = [];
    state.layers.forEach(function (layer, id) {
      if (state.map.hasLayer(layer) && state.parentVisible.get(id)) ids.push(id);
    });
    return ids;
  }

  function fitVisibleLayers() {
    var group = L.featureGroup();
    state.layerFeatures.forEach(function (items) {
      items.forEach(function (item) {
        if (item.visible) group.addLayer(item.layer);
      });
    });
    if (group.getLayers().length) {
      state.map.fitBounds(group.getBounds().pad(0.08));
    }
  }

  function fitScene(scene) {
    if (scene.fit && scene.fit.layer_id) {
      var focused = L.featureGroup();
      var items = state.layerFeatures.get(scene.fit.layer_id) || [];
      items.forEach(function (item) {
        if (scene.fit.token && item.tokens.indexOf(scene.fit.token) === -1) return;
        focused.addLayer(item.layer);
      });
      if (focused.getLayers().length) {
        state.map.fitBounds(focused.getBounds().pad(0.12));
        return;
      }
    }
    fitVisibleLayers();
  }

  function createBasemap(def) {
    if (def.type === "tile") {
      return L.tileLayer(def.url, {
        minZoom: def.min_zoom || 0,
        maxZoom: def.max_zoom || 18,
        attribution: def.attribution || ""
      });
    }
    if (def.type === "image") {
      var imageOptions = {
        opacity: def.opacity || 1,
        interactive: false
      };
      var pane = safePaneName("basemapImagePane");
      if (pane) imageOptions.pane = pane;
      var imageLayer = L.imageOverlay(def.path, def.bounds, imageOptions);
      imageLayer.getAttribution = function () {
        return def.attribution || "";
      };
      return imageLayer;
    }
    return null;
  }

  function setBasemap(basemapId) {
    var next = state.basemaps.get(basemapId);
    if (!next) return;
    if (state.currentBasemap && state.map.hasLayer(state.currentBasemap)) {
      state.map.removeLayer(state.currentBasemap);
    }
    next.addTo(state.map);
    state.currentBasemap = next;
    state.currentBasemapId = basemapId;
    document.querySelectorAll("input[name=\"basemap\"]").forEach(function (input) {
      input.checked = input.value === basemapId;
    });
  }

  function renderBasemaps() {
    var wrap = qs("basemap-list");
    wrap.innerHTML = "";
    (state.manifest.basemaps || []).forEach(function (def) {
      var row = document.createElement("label");
      row.className = "basemap-row";

      var radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "basemap";
      radio.value = def.id;
      radio.checked = state.currentBasemapId ? state.currentBasemapId === def.id : !!def.default;
      radio.addEventListener("change", function () {
        if (radio.checked) setBasemap(def.id);
      });

      var title = document.createElement("span");
      title.textContent = basemapTitle(def);

      row.appendChild(radio);
      row.appendChild(title);
      wrap.appendChild(row);
    });
  }

  function renderScenes() {
    var wrap = qs("scene-list");
    wrap.innerHTML = "";
    state.manifest.scenes.forEach(function (scene) {
      var btn = document.createElement("button");
      var textKeys = sceneText[scene.id] || {};
      btn.type = "button";
      btn.className = "scene-button";
      btn.textContent = t(textKeys.title) || scene.title;
      btn.title = t(textKeys.desc) || scene.description;
      btn.dataset.sceneId = scene.id;
      btn.addEventListener("click", function () {
        applyScene(scene.id);
      });
      wrap.appendChild(btn);
    });
  }

  function applyScene(sceneId) {
    var scene = state.manifest.scenes.find(function (item) {
      return item.id === sceneId;
    });
    if (!scene) return;
    var visible = new Set(scene.visible_layers);
    state.layers.forEach(function (_, layerId) {
      setLayerVisible(layerId, visible.has(layerId));
    });
    state.activeScene = sceneId;
    document.querySelectorAll(".scene-button").forEach(function (button) {
      button.classList.toggle("active", button.dataset.sceneId === sceneId);
    });
    var textKeys = sceneText[scene.id] || {};
    updateStatus((t(textKeys.title) || scene.title) + " · " + (t(textKeys.desc) || scene.description));
    fitScene(scene);
  }

  function renderFilterCheckbox(def, key, counts) {
    var row = document.createElement("label");
    row.className = "filter-row";

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    var filterMap = state.filterStates.get(def.id);
    checkbox.checked = filterMap ? !!filterMap.get(key) : true;
    checkbox.addEventListener("change", function () {
      setFilterVisible(def.id, key, checkbox.checked);
      state.activeScene = null;
      clearSceneActive();
      updateStatus(visibleLayerIds().length + " " + t("visibleLayers"));
    });
    state.filterCheckboxes.set(def.id + "|" + key, checkbox);

    var swatch = document.createElement("span");
    swatch.className = "filter-marker-preview";
    swatch.innerHTML = filterPreviewHtml(def, key);

    var title = document.createElement("span");
    title.className = "filter-title";
    title.innerHTML = filterLabel(key);

    var count = document.createElement("span");
    count.className = "layer-count";
    count.textContent = String(counts.get(key) || 0);

    row.appendChild(checkbox);
    row.appendChild(swatch);
    row.appendChild(title);
    row.appendChild(count);
    return row;
  }

  function renderRoutePointLinks() {
    var children = document.createElement("div");
    children.className = "layer-children route-point-list";
    var items = (state.layerFeatures.get("route_points") || []).slice().sort(function (a, b) {
      return Number(a.feature.properties.SEQ || 0) - Number(b.feature.properties.SEQ || 0);
    });
    items.forEach(function (item) {
      var props = item.feature.properties || {};
      var button = document.createElement("button");
      button.type = "button";
      button.className = "route-point-link";
      button.textContent = (props.SEQ ? props.SEQ + ". " : "") + primaryLabel(props);
      button.addEventListener("click", function () {
        var center = featureCenter(item.feature);
        if (!center) return;
        setLayerVisible("route_points", true);
        state.map.setView(center, state.map.getZoom(), { animate: true });
        updateStatus(primaryLabel(props));
      });
      children.appendChild(button);
    });
    return children;
  }

  function renderLayerBlock(def) {
      var block = document.createElement("div");
      block.className = "layer-block";
      var header = document.createElement("div");
      header.className = "layer-row layer-parent-row";

      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = state.parentVisible.has(def.id) ? !!state.parentVisible.get(def.id) : !!def.default_visible;
      checkbox.addEventListener("change", function () {
        setLayerVisible(def.id, checkbox.checked);
        state.activeScene = null;
        clearSceneActive();
        updateStatus(visibleLayerIds().length + " " + t("visibleLayers"));
      });
      state.parentCheckboxes.set(def.id, checkbox);

      var swatch = document.createElement("span");
      swatch.className = "layer-swatch " + (isLineLayer(def) || isBoundaryLayer(def) ? "line" : "point");
      swatch.style.backgroundColor = colorOf(def);

      var title = document.createElement("span");
      title.className = "layer-title";
      title.textContent = layerTitle(def);

      var count = document.createElement("span");
      count.className = "layer-count";
      count.textContent = String(def.feature_count || 0);

      var toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "layer-toggle";
      toggle.textContent = "▾";
      toggle.setAttribute("aria-label", t("sublayers"));

      header.appendChild(checkbox);
      header.appendChild(swatch);
      header.appendChild(title);
      header.appendChild(count);
      header.appendChild(toggle);
      block.appendChild(header);

      var groups = state.filterDefs.get(def.id) || [];
      if (groups.length || def.id === "route_points") {
        var children = document.createElement("div");
        children.className = "layer-children";
        if (groups.length) {
          var counts = filterCounts(def.id);
          groups.forEach(function (group) {
            var groupTitle = document.createElement("div");
            groupTitle.className = "filter-group-title";
            if (group.type === "certainty") {
              groupTitle.textContent = state.lang === "en" ? "Certainty" : "확정성";
            } else {
              groupTitle.textContent = group.type === "major" ? (state.lang === "en" ? "Major Category" : "대분류") : (state.lang === "en" ? "Subtype" : "소분류");
            }
            children.appendChild(groupTitle);
            group.items.forEach(function (key) {
              children.appendChild(renderFilterCheckbox(def, key, counts));
            });
          });
        } else {
          children = renderRoutePointLinks();
        }
        toggle.addEventListener("click", function () {
          var collapsed = block.classList.toggle("collapsed");
          toggle.textContent = collapsed ? "▸" : "▾";
        });
        block.appendChild(children);
      } else {
        toggle.hidden = true;
      }

      return block;
  }

  function renderLayerList() {
    var wrap = qs("layer-list");
    wrap.innerHTML = "";
    state.manifest.layers.forEach(function (def) {
      wrap.appendChild(renderLayerBlock(def));
    });
  }

  function renderLegend() {
    var wrap = qs("legend-list");
    wrap.innerHTML = "";
    state.manifest.layers.forEach(function (def) {
      if (def.id === "county_points") return;
      var row = document.createElement("div");
      row.className = "legend-row";
      var swatch = document.createElement("span");
      swatch.className = "legend-swatch " + (isLineLayer(def) || isBoundaryLayer(def) ? "line" : "point");
      swatch.style.backgroundColor = colorOf(def);
      var text = document.createElement("span");
      text.textContent = layerTitle(def) + " · " + t(def.category);
      row.appendChild(swatch);
      row.appendChild(text);
      wrap.appendChild(row);

      var groups = state.filterDefs.get(def.id) || [];
      if (groups.length) {
        groups.forEach(function (group) {
          group.items.forEach(function (key) {
            var item = document.createElement("div");
            item.className = "legend-row legend-child-row";
            var icon = document.createElement("span");
            icon.className = "filter-marker-preview";
            icon.innerHTML = filterPreviewHtml(def, key);
            var label = document.createElement("span");
            label.innerHTML = filterLabel(key);
            item.appendChild(icon);
            item.appendChild(label);
            wrap.appendChild(item);
          });
        });
      }
    });
  }

  function renderImages() {
    var wrap = qs("image-list");
    wrap.innerHTML = "";
    state.manifest.images.forEach(function (image) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "image-button";
      btn.textContent = image.title;
      btn.addEventListener("click", function () {
        openImage(image);
      });
      wrap.appendChild(btn);
    });
  }

  function openImage(image) {
    var viewer = qs("image-viewer");
    var img = qs("image-viewer-img");
    img.src = image.path;
    img.alt = image.title;
    qs("image-viewer-title").textContent = image.title;
    viewer.hidden = false;
  }

  function closeImage() {
    qs("image-viewer").hidden = true;
    qs("image-viewer-img").src = "";
  }

  function search(query) {
    var results = qs("search-results");
    var text = query.trim().toLowerCase();
    state.lastSearch = query;
    results.innerHTML = "";
    if (text.length < 2) return;

    var matches = state.featureIndex
      .filter(function (item) {
        return item.text.indexOf(text) !== -1;
      })
      .slice(0, 12);

    if (!matches.length) {
      var empty = document.createElement("div");
      empty.className = "empty-results";
      empty.textContent = t("noResults");
      results.appendChild(empty);
      return;
    }

    matches.forEach(function (item) {
      var def = state.layerDefs.get(item.layerId);
      var title = item.props ? primaryLabel(item.props) : item.title;
      var meta = item.props ? secondaryLabel(item.props) : item.meta;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "search-result";
      btn.innerHTML = "<span class=\"result-title\">" + escapeHtml(title) + "</span>" +
        "<span class=\"result-meta\">" + escapeHtml(layerTitle(def) + (meta ? " · " + meta : "")) + "</span>";
      btn.addEventListener("click", function () {
        openFeature(item);
      });
      results.appendChild(btn);
    });
  }

  function openFeature(item) {
    setLayerVisible(item.layerId, true);
    var layer = state.featureLayers.get(item.key);
    if (!layer) return;
    var popupLatLng = null;
    if (layer.getBounds) {
      state.map.fitBounds(layer.getBounds().pad(0.4));
      popupLatLng = layer.getBounds().getCenter();
    } else if (layer.getLatLng) {
      state.map.setView(layer.getLatLng(), Math.max(state.map.getZoom(), 8));
      popupLatLng = layer.getLatLng();
    } else if (item.center) {
      state.map.setView(item.center, Math.max(state.map.getZoom(), 8));
      popupLatLng = item.center;
    }
    window.setTimeout(function () {
      openSidePopup(popupLatLng || item.center, popupTable(layer._featureProps || {}));
    }, 120);
  }

  function clearSceneActive() {
    document.querySelectorAll(".scene-button").forEach(function (button) {
      button.classList.remove("active");
    });
  }

  function updateStatus(text) {
    qs("status-bar").textContent = text;
  }

  function setSidebarCollapsed(collapsed) {
    state.sidebarCollapsed = !!collapsed;
    var shell = document.querySelector(".app-shell");
    if (shell) shell.classList.toggle("sidebar-collapsed", state.sidebarCollapsed);

    var toggle = qs("sidebar-toggle");
    if (toggle) {
      var label = state.sidebarCollapsed ? t("showSidebar") : t("hideSidebar");
      toggle.title = label;
      toggle.setAttribute("aria-label", label);
      toggle.classList.toggle("collapsed", state.sidebarCollapsed);
    }

    window.setTimeout(function () {
      if (state.map) state.map.invalidateSize();
      positionSidePopup(state.sidePopupLatLng);
    }, 240);
  }

  function updateStaticText() {
    document.documentElement.lang = state.lang === "en" ? "en" : "ko";
    document.title = t("appTitle");
    qs("app-title").textContent = t("appTitle");
    qs("fit-visible").title = t("fitVisible");
    qs("fit-visible").setAttribute("aria-label", t("fitVisible"));
    qs("language-toggle").textContent = t("languageButton");
    qs("language-toggle").setAttribute("aria-label", t("languageButton"));
    qs("section-basemap").textContent = t("basemap");
    qs("section-scenes").textContent = t("scenes");
    qs("section-search").textContent = t("search");
    qs("section-display").textContent = t("display");
    qs("label-density-title").textContent = t("labelDensity");
    updateDensityLabel();
    qs("section-layers").textContent = t("layers");
    qs("section-legend").textContent = t("legend");
    qs("section-images").textContent = t("images");
    qs("search-input").placeholder = t("searchPlaceholder");
    qs("label-density").value = String(state.labelDensity);
    var sidebarLabel = state.sidebarCollapsed ? t("showSidebar") : t("hideSidebar");
    qs("sidebar-toggle").title = sidebarLabel;
    qs("sidebar-toggle").setAttribute("aria-label", sidebarLabel);
    if (!state.manifest) updateStatus(t("loading"));
  }

  function rerenderControls() {
    updateStaticText();
    renderBasemaps();
    renderScenes();
    renderLayerList();
    renderLegend();
    renderImages();
    if (state.activeScene) {
      document.querySelectorAll(".scene-button").forEach(function (button) {
        button.classList.toggle("active", button.dataset.sceneId === state.activeScene);
      });
    }
    search(state.lastSearch || qs("search-input").value);
  }

  function registerTranslation(row) {
    var field = (row.field || "").trim();
    var original = (row.original_ko || "").trim();
    if (!field || !original) return;

    var translated = (row.review_en || "").trim() || original;
    state.translationsByValue.set(mapKey([field, original]), translated);

    (row.feature_ids || "").split(";").forEach(function (rawId) {
      var fid = rawId.trim();
      if (fid) state.translationsByFeature.set(mapKey([fid, field, original]), translated);
    });
  }

  function loadTranslations() {
    state.translationsByFeature.clear();
    state.translationsByValue.clear();
    return fetch(freshAssetUrl("data/translations/point_translation_template.csv"))
      .then(function (response) {
        if (!response.ok) return "";
        return response.text();
      })
      .then(function (text) {
        if (!text) return;
        parseCsv(text).forEach(registerTranslation);
      })
      .catch(function (error) {
        console.warn("Translation CSV load failed", error);
      });
  }

  function loadLayers() {
    var requests = state.manifest.layers.map(function (def) {
      state.layerDefs.set(def.id, def);
      state.parentVisible.set(def.id, !!def.default_visible);
      return fetch(assetUrl(def.path))
        .then(function (response) {
          if (!response.ok) throw new Error(def.path + " load failed");
          return response.json();
        })
        .then(function (geojson) {
          var layer = createLayer(def, geojson);
          state.layers.set(def.id, layer);
          initializeFilters(def);
          if (def.default_visible) layer.addTo(state.map);
          refreshLayer(def.id);
        });
    });

    return Promise.all(requests);
  }

  function initMap() {
    var center = state.manifest.default_center || [31.8, 119.0];
    var zoom = state.manifest.default_zoom || 5;
    state.map = L.map("map", {
      zoomControl: false,
      preferCanvas: true
    }).setView(center, zoom);

    L.control.zoom({ position: "topright" }).addTo(state.map);

    createMapPane("basemapImagePane", 180);
    createMapPane("hydrographyPane", 320);
    createMapPane("boundaryPane", 330);
    createMapPane("keyStopPane", 670);

    (state.manifest.basemaps || []).forEach(function (def) {
      var basemap = createBasemap(def);
      if (!basemap) return;
      state.basemaps.set(def.id, basemap);
      if (def.default) {
        basemap.addTo(state.map);
        state.currentBasemap = basemap;
        state.currentBasemapId = def.id;
      }
    });

    state.map.on("zoomend", updateAllLabels);
    state.map.on("move zoom", function () {
      positionSidePopup(state.sidePopupLatLng);
    });
    state.map.on("click", closeSidePopup);
  }

  function bindUi() {
    qs("fit-visible").addEventListener("click", fitVisibleLayers);
    qs("sidebar-toggle").addEventListener("click", function () {
      setSidebarCollapsed(!state.sidebarCollapsed);
    });
    qs("label-density").addEventListener("input", function (event) {
      state.labelDensity = Number(event.target.value);
      updateDensityLabel();
      updateAllLabels();
    });
    qs("language-toggle").addEventListener("click", function () {
      state.lang = state.lang === "en" ? "ko" : "en";
      rerenderControls();
      updateStatus(visibleLayerIds().length + " " + t("visibleLayers"));
    });
    qs("search-input").addEventListener("input", function (event) {
      search(event.target.value);
    });
    qs("image-close").addEventListener("click", closeImage);
    qs("image-viewer").addEventListener("click", function (event) {
      if (event.target.id === "image-viewer") closeImage();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !qs("image-viewer").hidden) closeImage();
    });
  }

  updateStaticText();

  fetch(assetUrl("data/manifest/layers.json"))
    .then(function (response) {
      if (!response.ok) throw new Error("Layer manifest load failed");
      return response.json();
    })
    .then(function (manifest) {
      state.manifest = manifest;
      initMap();
      bindUi();
      return loadTranslations().then(loadLayers);
    })
    .then(function () {
      rerenderControls();
      applyScene("overview");
      updateStatus(visibleLayerIds().length + " " + t("visibleLayers") + " · " + t("dataReady"));
    })
    .catch(function (error) {
      console.error(error);
      updateStatus(t("error") + ": " + error.message);
    });
}());
