import { fillColorStyle, fillOpacity } from "@/lib/mapUtils";

export function mapStyle(pollutionType, location) {
  const tileBounds = [13.087593, 52.337607, 13.762103, 52.675884];

  return {
    name: "mapstyle",
    version: 8,
    metadata: {},
    sources: {
      osmBaseMap: {
        type: "raster",
        //           "https://sgx.geodatenzentrum.de/wmts_basemapde/tile/1.0.0/de_basemapde_web_raster_grau/default/DE_EPSG_3857_ADV/{z}/{x}/{y}.png",
        tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
      },
      zoomInLayer: {
        type: "vector",
        tiles: [location + "tiles/highzoom/{z}/{x}/{y}.pbf"],
        minzoom: 12,
        maxzoom: 13,
        bounds: tileBounds,
      },
      merged_no2: {
        type: "vector",
        tiles: [location + "tiles/merged_no2/{z}/{x}/{y}.pbf"],
        minzoom: 1,
        maxzoom: 10,
        bounds: tileBounds,
      },
      merged_pm10: {
        type: "vector",
        tiles: [location + "tiles/merged_pm10/{z}/{x}/{y}.pbf"],
        minzoom: 1,
        maxzoom: 10,
        bounds: tileBounds,
      },
      merged_pm25: {
        type: "vector",
        tiles: [location + "tiles/merged_pm25/{z}/{x}/{y}.pbf"],
        minzoom: 1,
        maxzoom: 10,
        bounds: tileBounds,
      },
    },
    layers: [
      {
        id: "background",
        type: "background",
        paint: {
          "background-color": "#fff",
        },
      },
      {
        id: "osmBaseMap",
        type: "raster",
        source: "osmBaseMap",
        layout: {
          // visibility: "visisible",
        },
        paint: {
          "raster-saturation": -1,
          "raster-contrast": 0.1,
          "raster-opacity": 0.6,
        },
      },
      {
        id: "zoomInLayer",
        type: "fill",
        source: "zoomInLayer",
        "source-layer": "all",
        maxzoom: 24,
        paint: {
          "fill-opacity": fillOpacity,
          "fill-color": fillColorStyle(pollutionType),
          "fill-antialias": false,
        },
      },
      {
        id: "zoomOutLayer",
        type: "fill",
        source: "merged_no2",
        "source-layer": "merged_no2",
        minzoom: 1,
        maxzoom: 12,
        paint: {
          "fill-opacity": fillOpacity,
          "fill-color": fillColorStyle(pollutionType),
          "fill-antialias": false,
        },
      },
    ],
  };
}
