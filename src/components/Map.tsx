import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { mapStyle } from "@/lib/mapStyle";
import { fillColorStyle, fillOpacity } from "@/lib/mapUtils";
import { MapNavs } from "@/components/MapNavs";
import { MapPopup } from "@/components/MapPopup";

const layerNames = {
  no2: "merged_no2",
  pm10: "merged_pm10",
  "pm2.5": "merged_pm25",
};

// @ts-ignore
const setMapInteraction = (map, enabled) => {
  if (!map) return;
  const actions = [
    "dragPan",
    "scrollZoom",
    "boxZoom",
    "keyboard",
    "doubleClickZoom",
    "touchZoomRotate",
  ];

  actions.forEach((action) =>
    enabled ? map[action].enable() : map[action].disable()
  );
};

interface MapProps {
  userSearchResult: any | object;
  setUserSearchResult: React.Dispatch<React.SetStateAction<object> | null>;
  pollutionType: string;
  setPollutionValues: React.Dispatch<React.SetStateAction<object> | null>;
}

export const MapComponent = ({
  userSearchResult,
  setUserSearchResult,
  pollutionType,
  setPollutionValues,
}: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [popupData, setPopupData] = useState(null);

  const removeGridHighlight = () => {
    if (!map.current) return;
    if (map.current.getSource("highlighted-grid")) {
      map.current.removeLayer("highlighted-grid");
      map.current.removeSource("highlighted-grid");
    }
  };

  // @ts-ignore
  const whenClicked = (e, newScreenPoint) => {
    if (!map.current) return;

    setPopupData(null);

    const features = map.current.queryRenderedFeatures(newScreenPoint, {
      layers: ["zoomInLayer"],
    });

    removeGridHighlight();

    if (!features[0]) return;

    // Highlight the grid
    map.current.addSource("highlighted-grid", {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: features[0].geometry,
        properties: {},
      },
    });

    map.current.addLayer({
      id: "highlighted-grid",
      type: "line",
      source: "highlighted-grid",
      paint: {
        "line-color": "#e40422",
        "line-width": 3,
      },
    });

    // Ensure the map centers on the selected feature before placing the popup
    map.current.easeTo({
      center: e.lngLat,
      // zoom: Math.max(map.current.getZoom(), 13),
      essential: true,
    });

    // Compute screen coordinates for correct popup placement
    map.current.once("moveend", () => {
      if (!map.current) return;
      const screenCoords = map.current.project(e.lngLat);

      setPopupData({
        // @ts-ignore
        coordinates: e.lngLat,
        screenCoordinates: screenCoords,
        features: features[0].properties,
      });

      setPollutionValues(features[0].properties);
    });
  };

  useEffect(() => {
    if (!map.current) return;
    if (!userSearchResult) return;

    setPopupData(null);
    removeGridHighlight();

    map.current.flyTo({
      center: userSearchResult.geometry.coordinates,
      zoom: 13,
      essential: true,
    });

    map.current?.once("moveend", () => {
      setMapInteraction(map.current, true);
      if (!map.current) return;
      const newScreenPoint = map.current.project(
        userSearchResult.geometry.coordinates
      );
      whenClicked(
        { lngLat: userSearchResult.geometry.coordinates },
        newScreenPoint
      );
    });
  }, [userSearchResult]);

  useEffect(() => {
    if (!mapContainer.current) return;
    if (typeof window === "undefined") return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      // @ts-ignore
      style: mapStyle(
        pollutionType,
        window.location.origin + window.location.pathname
      ),
      attributionControl: false,
      hash: true,
      minZoom: 5,
      maxZoom: 14,
      center: [13.3915, 52.49899],
      zoom: 13,
      maxBounds: [
        [13.046434258466917, 52.30190843622876],
        [13.820874468731887, 52.69894396430871],
      ],
      padding: 350,
      dragRotate: false,
      pitchWithRotate: false,
    });

    map.current.on("click", (e) => {
      if (!map.current) return;
      setUserSearchResult(null);

      const currentZoomLevel = map.current.getZoom();

      if (currentZoomLevel < 12) {
        const zoomOutLayerFeatures = map.current.queryRenderedFeatures(
          e.point,
          {
            layers: ["zoomOutLayer"],
          }
        );

        if (!zoomOutLayerFeatures[0]) {
          removeGridHighlight();
          setPollutionValues(null);
          return;
        }

        setMapInteraction(map.current, false);

        map.current.flyTo({
          center: e.lngLat,
          zoom: 13,
          essential: true,
        });

        map.current?.once("moveend", () => {
          setMapInteraction(map.current, true);
          if (!map.current) return;
          const newScreenPoint = map.current.project(e.lngLat);
          whenClicked(e, newScreenPoint);
        });
      } else {
        whenClicked(e, e.point);
      }
    });
  }, []);

  useEffect(() => {
    if (!map.current || !map.current.loaded()) return;

    map.current.setPaintProperty(
      "zoomInLayer",
      "fill-color",
      fillColorStyle(pollutionType)
    );

    if (map.current.getLayer("zoomOutLayer")) {
      map.current.removeLayer("zoomOutLayer");

      map.current.addLayer({
        id: "zoomOutLayer",
        type: "fill",
        source: layerNames[pollutionType as keyof typeof layerNames],
        // @ts-ignore
        "source-layer": layerNames[pollutionType],
        minzoom: 1,
        maxzoom: 12,
        paint: {
          "fill-opacity": fillOpacity,
          // @ts-ignore
          "fill-color": fillColorStyle(pollutionType),
          "fill-antialias": false,
        },
      });
    }
  }, [pollutionType]);

  return (
    <div ref={mapContainer} className="w-full h-full relative">
      {/* @ts-ignore */}
      <MapNavs map={map} />
      {popupData && (
        <MapPopup
          // @ts-ignore
          screenCoordinates={popupData.screenCoordinates}
          // @ts-ignore
          features={popupData.features}
          closePopup={() => {
            setPopupData(null);
            removeGridHighlight();
            setPollutionValues(null);
            setUserSearchResult(null);
          }}
          userSearchResult={userSearchResult}
        />
      )}
    </div>
  );
};
