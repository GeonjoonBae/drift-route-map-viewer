from __future__ import annotations

import csv
import json
import math
import shutil
import struct
import sys
from pathlib import Path
from typing import Any

try:
    from pyproj import Transformer
except ImportError:  # pragma: no cover - local rebuild dependency
    Transformer = None


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "source_data" / "Yi-Bangik-Drift"
SHP_DIR = SOURCE / "QGIS_shapefile"
CSV_DIR = SOURCE / "pointlayer_csv"
IMAGE_DIR = SOURCE / "map-image"
GEOJSON_DIR = ROOT / "data" / "geojson"
MANIFEST_DIR = ROOT / "data" / "manifest"
ASSET_IMAGE_DIR = ROOT / "assets" / "images"
TILE_DIR = ROOT / "assets" / "tiles"

CHGIS_1820_DIR = Path(r"N:\개인\공부자료\표해 노정 연구\dataverse_files(1820 Layers UTF8 Encoding)")
CHGIS_TIME_PREF_DIR = Path(r"N:\개인\공부자료\표해 노정 연구\dataverse_files(V6 Time Series Prefecture Polygons)")
MING_COURIER_DIR = Path(r"N:\개인\공부자료\표해 노정 연구\dataverse_files(V6 Ming Dynasty Courier Routes and Stations)")

EARTH_RADIUS_M = 6378137.0
TRANSFORMERS: dict[str, Any] = {}


CSV_LAYERS = [
    {
        "source": "AD_JA_PointLayer.csv",
        "out": "ad_ja_points.geojson",
        "id": "ad_ja_points",
        "title": "행정 지명",
        "category": "place",
        "default_visible": True,
        "style": {"color": "#2563eb", "radius": 5},
    },
    {
        "source": "HG_PointLayer.csv",
        "out": "hg_points.geojson",
        "id": "hg_points",
        "title": "인문 지명",
        "category": "place",
        "default_visible": True,
        "style": {"color": "#7c3aed", "radius": 5},
    },
    {
        "source": "TG_PointLayer.csv",
        "out": "tg_points.geojson",
        "id": "tg_points",
        "title": "교통 지명",
        "category": "place",
        "default_visible": True,
        "style": {"color": "#f97316", "radius": 5},
    },
    {
        "source": "MG_PointLayer.csv",
        "out": "mg_points.geojson",
        "id": "mg_points",
        "title": "산계 지명",
        "category": "place",
        "default_visible": True,
        "style": {"color": "#16a34a", "radius": 5},
    },
    {
        "source": "WG_PointLayer.csv",
        "out": "wg_points.geojson",
        "id": "wg_points",
        "title": "수계 지명",
        "category": "place",
        "default_visible": True,
        "style": {"color": "#0891b2", "radius": 5},
    },
]

SHP_LAYERS = [
    {
        "source": "leespath_proved.shp",
        "out": "route_lines.geojson",
        "id": "route_lines",
        "title": "노정 선",
        "category": "route",
        "default_visible": True,
        "style": {"color": "#ef4444", "weight": 4.8, "opacity": 0.95},
    },
    {
        "source": "leespath_proved_PointLayer.shp",
        "out": "route_points.geojson",
        "id": "route_points",
        "title": "주요 지점",
        "category": "route",
        "default_visible": True,
        "pane": "keyStopPane",
        "style": {"color": "#dc2626", "radius": 7},
    },
]

COUNTY_LAYER = {
    "source": "v6_time_cnty_pts_gbk.dbf",
    "out": "county_points.geojson",
    "id": "county_points",
    "title": "시계열 현급 행정 지점",
    "category": "context",
    "default_visible": False,
    "style": {"color": "#64748b", "radius": 3},
}

BOUNDARY_LAYERS = [
    {
        "source": "v6_1820_prov_pgn_utf.shp",
        "source_path": CHGIS_1820_DIR / "v6_1820_prov_pgn_utf" / "v6_1820_prov_pgn_utf.shp",
        "out": "chgis_1820_province_boundaries.geojson",
        "id": "chgis_1820_province_boundaries",
        "title": "1820 성 경계",
        "category": "boundary",
        "default_visible": True,
        "pane": "boundaryPane",
        "style": {"color": "#334155", "weight": 1.4, "opacity": 0.78, "fillOpacity": 0},
    },
    {
        "source": "v6_time_pref_pgn_gbk_wgs84.shp",
        "source_path": CHGIS_TIME_PREF_DIR
        / "v6_time_pref_pgn_gbk_wgs84"
        / "v6_time_pref_pgn_gbk_wgs84.shp",
        "out": "chgis_1796_prefecture_boundaries.geojson",
        "id": "chgis_1796_prefecture_boundaries",
        "title": "1796 부급 경계",
        "category": "boundary",
        "default_visible": True,
        "pane": "boundaryPane",
        "year_filter": 1796,
        "style": {"color": "#475569", "weight": 1.15, "opacity": 0.68, "fillOpacity": 0, "dashArray": "4 4"},
    },
]

HYDROGRAPHIC_LAYERS = [
    {
        "source": "Canal_LineLayer.shp",
        "out": "canal_lines.geojson",
        "id": "canal_lines",
        "title": "운하",
        "category": "hydrography",
        "default_visible": True,
        "pane": "hydrographyPane",
        "style": {"color": "#0284c7", "weight": 3, "opacity": 0.78},
    },
    {
        "source": "v6_1820_lks_pgn_utf.shp",
        "source_path": CHGIS_1820_DIR / "v6_1820_lks_pgn_utf" / "v6_1820_lks_pgn_utf.shp",
        "out": "chgis_1820_lakes.geojson",
        "id": "chgis_1820_lakes",
        "title": "호수",
        "category": "hydrography",
        "default_visible": True,
        "pane": "hydrographyPane",
        "style": {"color": "#0284c7", "weight": 1.1, "opacity": 0.84, "fillColor": "#0284c7", "fillOpacity": 0.26},
    },
]

MING_COURIER_LAYERS = [
    {
        "source": "Ming_Stations_2016.shp",
        "source_path": MING_COURIER_DIR / "Ming_Stations_2016" / "Ming_Stations_2016.shp",
        "out": "ming_courier_stations.geojson",
        "id": "ming_courier_stations",
        "title": "명대 역참 지점",
        "category": "courier",
        "default_visible": False,
        "style": {"color": "#b7791f", "radius": 2.4},
    },
    {
        "source": "Ming_Routes_2016.shp",
        "source_path": MING_COURIER_DIR / "Ming_Routes_2016" / "Ming_Routes_2016.shp",
        "out": "ming_courier_routes.geojson",
        "id": "ming_courier_routes",
        "title": "명대 역참 노선",
        "category": "courier",
        "default_visible": False,
        "style": {"color": "#8b5e34", "weight": 3.8, "opacity": 0.74},
    },
]


def ensure_csv_field_limit() -> None:
    limit = sys.maxsize
    while True:
        try:
            csv.field_size_limit(limit)
            return
        except OverflowError:
            limit //= 10


def parse_float(value: Any) -> float | None:
    if value is None:
        return None
    text = str(value).strip()
    if not text or text in {"-", "NULL", "null"}:
        return None
    text = text.replace(",", "")
    try:
        return float(text)
    except ValueError:
        return None


def clean_properties(properties: dict[str, Any]) -> dict[str, Any]:
    cleaned: dict[str, Any] = {}
    blank_count = 0
    for key, value in properties.items():
        new_key = str(key).strip()
        if not new_key:
            blank_count += 1
            new_key = f"_blank_{blank_count}"
        if isinstance(value, str):
            value = value.strip()
        if value == "":
            value = None
        cleaned[new_key] = value
    return cleaned


def read_csv_rows(path: Path) -> list[dict[str, Any]]:
    raw = path.read_bytes()[:3]
    encoding = "utf-8-sig" if raw == b"\xef\xbb\xbf" else "utf-8"
    with path.open("r", encoding=encoding, newline="") as f:
        reader = csv.DictReader(f)
        return [clean_properties(row) for row in reader]


def write_geojson(path: Path, features: list[dict[str, Any]]) -> None:
    fc = {"type": "FeatureCollection", "features": features}
    path.write_text(json.dumps(fc, ensure_ascii=False, indent=2), encoding="utf-8")


def csv_to_geojson(layer: dict[str, Any]) -> dict[str, Any]:
    source_path = CSV_DIR / layer["source"]
    features: list[dict[str, Any]] = []
    skipped = 0
    for row in read_csv_rows(source_path):
        lon = parse_float(row.get("경도"))
        lat = parse_float(row.get("위도"))
        if lon is None or lat is None:
            skipped += 1
            continue
        props = dict(row)
        chinese_name = props.pop("한자이름", None)
        props["_layer_id"] = layer["id"]
        props["_layer_title"] = layer["title"]
        props["_source_file"] = layer["source"]
        if chinese_name is not None:
            props["Chinese Name"] = chinese_name
        features.append(
            {
                "type": "Feature",
                "geometry": {"type": "Point", "coordinates": [lon, lat]},
                "properties": props,
            }
        )

    out_path = GEOJSON_DIR / layer["out"]
    write_geojson(out_path, features)
    return {**layer, "path": f"data/geojson/{layer['out']}", "feature_count": len(features), "skipped_rows": skipped}


def read_cpg(path: Path) -> str:
    cpg = path.with_suffix(".cpg")
    if not cpg.exists():
        return "utf-8"
    value = cpg.read_text(encoding="utf-8", errors="replace").strip().upper()
    if value == "GBK":
        return "gbk"
    return "utf-8"


def read_dbf(path: Path, encoding: str) -> list[dict[str, Any]]:
    data = path.read_bytes()
    if len(data) < 32:
        return []

    record_count = int.from_bytes(data[4:8], "little")
    header_len = int.from_bytes(data[8:10], "little")
    record_len = int.from_bytes(data[10:12], "little")

    fields: list[tuple[str, str, int, int]] = []
    offset = 32
    while offset + 32 <= len(data) and data[offset] != 0x0D:
        raw_name = data[offset : offset + 11].split(b"\x00", 1)[0]
        name = raw_name.decode(encoding, errors="replace")
        field_type = chr(data[offset + 11])
        field_len = data[offset + 16]
        decimals = data[offset + 17]
        fields.append((name, field_type, field_len, decimals))
        offset += 32

    records: list[dict[str, Any]] = []
    pos = header_len
    for _ in range(record_count):
        raw_record = data[pos : pos + record_len]
        pos += record_len
        if not raw_record or raw_record[0:1] == b"*":
            continue
        values: dict[str, Any] = {}
        field_pos = 1
        for name, field_type, field_len, decimals in fields:
            raw_value = raw_record[field_pos : field_pos + field_len]
            field_pos += field_len
            text = raw_value.decode(encoding, errors="replace").strip()
            if not text:
                values[name] = None
            elif field_type in {"N", "F"}:
                if set(text) == {"*"}:
                    values[name] = text
                elif decimals:
                    values[name] = parse_float(text)
                else:
                    try:
                        values[name] = int(text)
                    except ValueError:
                        values[name] = parse_float(text) if parse_float(text) is not None else text
            else:
                values[name] = text
        records.append(values)
    return records


def detect_crs(path: Path) -> str:
    prj = path.with_suffix(".prj")
    if not prj.exists():
        return "EPSG:4326"
    text = prj.read_text(encoding="utf-8", errors="replace")
    if "Web_Mercator" in text:
        return "EPSG:3857"
    if "Xian_1980" in text or "Xian 1980" in text:
        return "EPSG:2333"
    return "EPSG:4326"


def transformer_for(crs: str) -> Any:
    if crs not in TRANSFORMERS:
        if Transformer is None:
            raise RuntimeError("pyproj is required to reproject CHGIS boundary layers from EPSG:2333 to EPSG:4326")
        TRANSFORMERS[crs] = Transformer.from_crs(crs, "EPSG:4326", always_xy=True)
    return TRANSFORMERS[crs]


def transform_xy(x: float, y: float, crs: str) -> list[float]:
    if crs == "EPSG:3857":
        lon = (x / EARTH_RADIUS_M) * 180.0 / math.pi
        lat = (2.0 * math.atan(math.exp(y / EARTH_RADIUS_M)) - math.pi / 2.0) * 180.0 / math.pi
        return [lon, lat]
    if crs == "EPSG:2333":
        lon, lat = transformer_for(crs).transform(x, y)
        return [lon, lat]
    return [x, y]


def feature_matches_year(props: dict[str, Any], year: int | None) -> bool:
    if year is None:
        return True
    begin = parse_float(props.get("BEG_YR"))
    end = parse_float(props.get("END_YR"))
    if begin is not None and begin > year:
        return False
    if end is not None and end < year:
        return False
    return True


def shp_source_path(layer: dict[str, Any]) -> Path:
    if layer.get("source_path"):
        return Path(layer["source_path"])
    return SHP_DIR / layer["source"]


def read_shp_features(path: Path, layer: dict[str, Any]) -> list[dict[str, Any]]:
    encoding = read_cpg(path)
    records = read_dbf(path.with_suffix(".dbf"), encoding)
    crs = detect_crs(path)
    year_filter = layer.get("year_filter")

    data = path.read_bytes()
    features: list[dict[str, Any]] = []
    pos = 100
    record_index = 0
    while pos + 8 <= len(data):
        content_len_words = int.from_bytes(data[pos + 4 : pos + 8], "big")
        content_start = pos + 8
        content_end = content_start + content_len_words * 2
        content = data[content_start:content_end]
        pos = content_end
        if len(content) < 4:
            continue

        shape_type = int.from_bytes(content[0:4], "little", signed=True)
        props = records[record_index] if record_index < len(records) else {}
        record_index += 1
        props = clean_properties(dict(props))
        if not feature_matches_year(props, year_filter):
            continue
        props["_layer_id"] = layer["id"]
        props["_layer_title"] = layer["title"]
        props["_source_file"] = layer["source"]
        props["_source_crs"] = crs
        if year_filter is not None:
            props["_filter_year"] = year_filter

        geometry: dict[str, Any] | None = None
        if shape_type == 1 and len(content) >= 20:
            x, y = struct.unpack("<2d", content[4:20])
            geometry = {"type": "Point", "coordinates": transform_xy(x, y, crs)}
        elif shape_type in {3, 5} and len(content) >= 44:
            num_parts = int.from_bytes(content[36:40], "little", signed=True)
            num_points = int.from_bytes(content[40:44], "little", signed=True)
            parts_start = 44
            points_start = parts_start + num_parts * 4
            parts = [
                int.from_bytes(content[parts_start + i * 4 : parts_start + (i + 1) * 4], "little", signed=True)
                for i in range(num_parts)
            ]
            points = []
            for i in range(num_points):
                start = points_start + i * 16
                x, y = struct.unpack("<2d", content[start : start + 16])
                points.append(transform_xy(x, y, crs))
            if shape_type == 3 and num_parts <= 1:
                geometry = {"type": "LineString", "coordinates": points}
            elif shape_type == 3:
                lines = []
                for i, start in enumerate(parts):
                    end = parts[i + 1] if i + 1 < len(parts) else len(points)
                    lines.append(points[start:end])
                geometry = {"type": "MultiLineString", "coordinates": lines}
            else:
                polygons = []
                for i, start in enumerate(parts):
                    end = parts[i + 1] if i + 1 < len(parts) else len(points)
                    ring = points[start:end]
                    if len(ring) < 4:
                        continue
                    if ring[0] != ring[-1]:
                        ring.append(ring[0])
                    polygons.append([ring])
                if len(polygons) == 1:
                    geometry = {"type": "Polygon", "coordinates": polygons[0]}
                elif polygons:
                    geometry = {"type": "MultiPolygon", "coordinates": polygons}

        if geometry:
            features.append({"type": "Feature", "geometry": geometry, "properties": props})

    return features


def shp_to_geojson(layer: dict[str, Any]) -> dict[str, Any]:
    source_path = shp_source_path(layer)
    features = read_shp_features(source_path, layer)
    out_path = GEOJSON_DIR / layer["out"]
    write_geojson(out_path, features)
    return {
        **{key: value for key, value in layer.items() if key != "source_path"},
        "path": f"data/geojson/{layer['out']}",
        "feature_count": len(features),
    }


def boundary_to_geojson(layer: dict[str, Any]) -> dict[str, Any] | None:
    source_path = shp_source_path(layer)
    if not source_path.exists():
        print(f"Skipping missing boundary source: {source_path}")
        return None
    return shp_to_geojson(layer)


def county_dbf_to_geojson(layer: dict[str, Any]) -> dict[str, Any]:
    source_path = SHP_DIR / layer["source"]
    records = read_dbf(source_path, "gbk")
    features: list[dict[str, Any]] = []
    skipped = 0
    for record in records:
        lon = parse_float(record.get("X_COOR"))
        lat = parse_float(record.get("Y_COOR"))
        if lon is None or lat is None:
            skipped += 1
            continue
        props = clean_properties(dict(record))
        props["_layer_id"] = layer["id"]
        props["_layer_title"] = layer["title"]
        props["_source_file"] = layer["source"]
        props["_source_crs"] = "DBF X_COOR/Y_COOR"
        features.append(
            {
                "type": "Feature",
                "geometry": {"type": "Point", "coordinates": [lon, lat]},
                "properties": props,
            }
        )
    out_path = GEOJSON_DIR / layer["out"]
    write_geojson(out_path, features)
    return {**layer, "path": f"data/geojson/{layer['out']}", "feature_count": len(features), "skipped_rows": skipped}


def copy_images() -> list[dict[str, Any]]:
    images = []
    for source_path in sorted(IMAGE_DIR.glob("*.jpg")):
        safe_name = source_path.name
        target_path = ASSET_IMAGE_DIR / safe_name
        shutil.copy2(source_path, target_path)
        images.append({"title": source_path.stem, "path": f"assets/images/{safe_name}"})
    return images


def prepare_basemaps() -> list[dict[str, Any]]:
    basemaps: list[dict[str, Any]] = []
    chgis_tiles = TILE_DIR / "chgis_dem_hillshade"
    zooms: list[int] = []
    if chgis_tiles.exists():
        for child in chgis_tiles.iterdir():
            if child.is_dir() and child.name.isdigit():
                zooms.append(int(child.name))

    if zooms:
        basemaps.append(
            {
                "id": "chgis_dem_hillshade",
                "title": "CHGIS DEM + Hillshade",
                "type": "tile",
                "url": "assets/tiles/chgis_dem_hillshade/{z}/{x}/{y}.png",
                "default": True,
                "min_zoom": min(zooms),
                "max_zoom": max(zooms),
                "attribution": "CHGIS V5 DEM, based on GTOPO-30.",
            }
        )

    basemaps.append(
        {
            "id": "osm",
            "title": "OpenStreetMap",
            "type": "tile",
            "url": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            "default": not bool(zooms),
            "max_zoom": 18,
            "attribution": "&copy; OpenStreetMap contributors",
        }
    )
    return basemaps


def write_manifest(layers: list[dict[str, Any]], images: list[dict[str, Any]], basemaps: list[dict[str, Any]]) -> None:
    manifest = {
        "title": "표해노정 웹지도",
        "dataset": "Yi Bang-ik Drift",
        "source_repo": "https://github.com/GeonjoonBae/Yi-Bangik-Drift",
        "generated_from": "source_data/Yi-Bangik-Drift",
        "default_center": [31.8, 119.0],
        "default_zoom": 5,
        "basemaps": basemaps,
        "layers": layers,
        "scenes": [
            {
                "id": "overview",
                "title": "전체 노정",
                "description": "이방익 표해노정과 주요 지명 레이어를 함께 표시합니다.",
                "fit": {"layer_id": "route_lines", "token": "route:certain"},
                "visible_layers": [
                    "route_lines",
                    "route_points",
                    "ad_ja_points",
                    "hg_points",
                    "tg_points",
                    "mg_points",
                    "wg_points",
                    "canal_lines",
                    "chgis_1820_province_boundaries",
                    "chgis_1796_prefecture_boundaries",
                    "chgis_1820_lakes",
                ],
            },
            {
                "id": "route",
                "title": "노정만 보기",
                "description": "복원된 이동 선분과 주요 지점만 표시합니다.",
                "visible_layers": ["route_lines", "route_points"],
            },
            {
                "id": "transport",
                "title": "교통망 비교",
                "description": "노정, 교통 지명, 운하를 함께 표시합니다.",
                "visible_layers": ["route_lines", "route_points", "tg_points", "canal_lines"],
            },
            {
                "id": "place_context",
                "title": "지명 맥락",
                "description": "행정, 인문, 산계, 수계, 교통 지명을 함께 표시합니다.",
                "visible_layers": ["ad_ja_points", "hg_points", "tg_points", "mg_points", "wg_points"],
            },
            {
                "id": "admin_context",
                "title": "행정 지점 검토",
                "description": "시계열 현급 행정 지점을 포함해 지명 위치를 검토합니다.",
                "visible_layers": [
                    "route_lines",
                    "route_points",
                    "ad_ja_points",
                    "county_points",
                    "chgis_1820_province_boundaries",
                    "chgis_1796_prefecture_boundaries",
                ],
            },
        ],
        "images": images,
    }
    path = MANIFEST_DIR / "layers.json"
    path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")


def main() -> None:
    ensure_csv_field_limit()
    GEOJSON_DIR.mkdir(parents=True, exist_ok=True)
    MANIFEST_DIR.mkdir(parents=True, exist_ok=True)
    ASSET_IMAGE_DIR.mkdir(parents=True, exist_ok=True)

    layers: list[dict[str, Any]] = []
    for layer in SHP_LAYERS:
        layers.append(shp_to_geojson(layer))
    for layer in CSV_LAYERS:
        layers.append(csv_to_geojson(layer))
    layers.append(county_dbf_to_geojson(COUNTY_LAYER))
    for layer in MING_COURIER_LAYERS:
        layers.append(shp_to_geojson(layer))
    for layer in BOUNDARY_LAYERS:
        boundary_layer = boundary_to_geojson(layer)
        if boundary_layer:
            layers.append(boundary_layer)
    for layer in HYDROGRAPHIC_LAYERS:
        hydro_layer = boundary_to_geojson(layer) if layer.get("source_path") else shp_to_geojson(layer)
        if hydro_layer:
            layers.append(hydro_layer)
    images = copy_images()
    basemaps = prepare_basemaps()
    write_manifest(layers, images, basemaps)

    print("Generated layers:")
    for layer in layers:
        skipped = f", skipped={layer['skipped_rows']}" if "skipped_rows" in layer else ""
        print(f"- {layer['id']}: {layer['feature_count']} features{skipped}")
    print(f"Images copied: {len(images)}")
    print(f"Basemaps prepared: {len(basemaps)}")


if __name__ == "__main__":
    main()
