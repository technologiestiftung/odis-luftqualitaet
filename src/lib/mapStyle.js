import { fillOpacity, fillStyle } from "@/lib/mapUtils";
import bm_web_gry from "./bm_web_gry.json";

const notSymbolLayers = bm_web_gry.layers.filter((d) => d.type !== "symbol");
const symbolLayers = bm_web_gry.layers.filter((d) => d.type === "symbol");
symbolLayers.forEach((l) => {
  if (l.paint) {
    l.paint["text-opacity"] = 0.8;
  }
});

export function mapStyle(location) {
  const tileBounds = [13.087593, 52.337607, 13.762103, 52.675884];

  return {
    name: "mapstyle",
    version: 8,
    metadata: {},
    sprite:
      "https://sgx.geodatenzentrum.de/gdz_basemapde_vektor/sprites/v2/bm_web_gry_sprite",
    glyphs:
      "https://sgx.geodatenzentrum.de/gdz_basemapde_vektor/fonts/v2/{fontstack}/{range}.pbf",
    sources: {
      // baseMap: {
      //   type: "raster",
      //   tiles: [
      //     "https://sgx.geodatenzentrum.de/wmts_basemapde/tile/1.0.0/de_basemapde_web_raster_grau/default/GLOBAL_WEBMERCATOR/{z}/{y}/{x}.png",
      //     // "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      //   ],
      //   tileSize: 256,
      // },
      smarttiles_de: bm_web_gry.sources.smarttiles_de,
      zoomInLayer: {
        type: "vector",
        tiles: [location + "tiles/highzoom/{z}/{x}/{y}.pbf"],
        minzoom: 12,
        maxzoom: 13,
        bounds: tileBounds,
      },
      worst_index: {
        type: "vector",
        tiles: [location + "tiles/worst_index/{z}/{x}/{y}.pbf"],
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
      ...notSymbolLayers,
      // {
      //   id: "baseMap",
      //   type: "raster",
      //   source: "baseMap",
      //   layout: {
      //     // visibility: "visisible",
      //   },
      //   paint: {
      //     // "raster-contrast": 0.1,
      //     "raster-opacity": 0.5,
      //   },
      // },
      {
        id: "zoomInLayer",
        type: "fill",
        source: "zoomInLayer",
        "source-layer": "all",
        maxzoom: 24,
        paint: {
          "fill-opacity": fillOpacity,
          "fill-color": fillStyle,
          "fill-antialias": false,
        },
      },
      {
        id: "zoomOutLayer",
        type: "fill",
        source: "worst_index",
        "source-layer": "worst_index",
        minzoom: 1,
        maxzoom: 12,
        paint: {
          "fill-opacity": fillOpacity,
          "fill-color": fillStyle,
          "fill-antialias": false,
        },
      },
      ...symbolLayers,
    ],
  };
}

// "fill-opacity": [
//   "interpolate",
//   ["linear"],
//   ["zoom"],
//   9,
//   fillOpacity,
//   12,
//   fillOpacity - 0.2,
// ],
