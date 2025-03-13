import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { mapStyle } from "@/lib/mapStyle";
import { MapNavs } from "@/components/MapNavs";
import { MapPopup } from "@/components/MapPopup";

// @ts-expect-error placeholder
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
  userSearchResult: null | object;
  setUserSearchResult: React.Dispatch<React.SetStateAction<object> | null>;
  setPollutionValues: React.Dispatch<React.SetStateAction<object> | null>;
}

export const MapComponent = ({
  userSearchResult,
  setUserSearchResult,
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

  // @ts-expect-error placeholder
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
        // @ts-expect-error placeholder
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
      // @ts-expect-error placeholder
      center: userSearchResult.geometry.coordinates,
      zoom: 13,
      essential: true,
    });

    map.current?.once("moveend", () => {
      setMapInteraction(map.current, true);
      if (!map.current) return;
      const newScreenPoint = map.current.project(
        // @ts-expect-error placeholder
        userSearchResult.geometry.coordinates
      );
      whenClicked(
        // @ts-expect-error placeholder
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
      // @ts-expect-error placeholder
      style: mapStyle(window.location.origin + window.location.pathname),
      attributionControl: false,
      // hash: true,
      minZoom: 5,
      maxZoom: 17,
      center: [13.3915, 52.49899],
      zoom: 10,
      maxBounds: [
        [12.386026099042283, 52.04424084038726],
        [14.492019196446051, 52.95377995481144],
      ],
      padding: 350,
      dragRotate: false,
      pitchWithRotate: false,
      scrollZoom: window.location.origin === "http://localhost:3000",
    });

    map.current?.fitBounds(
      [
        [13.046434258466917, 52.30190843622876],
        [13.820874468731887, 52.69894396430871],
      ],
      {
        padding: 10,
        duration: 0,
      }
    );

    const geolocateControl = new maplibregl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true, // Keep tracking user location
      showAccuracyCircle: false, // Remove accuracy circle
    });

    map.current.addControl(geolocateControl, "bottom-right"); // Place button at top-right

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

  return (
    <div ref={mapContainer} className="w-full h-full relative">
      {/* @ts-expect-error placeholder*/}
      <MapNavs map={map} />
      {popupData && (
        <MapPopup
          // @ts-expect-error placeholder
          screenCoordinates={popupData.screenCoordinates}
          // @ts-expect-error placeholder
          features={popupData.features}
          closePopup={() => {
            setPopupData(null);
            removeGridHighlight();
            setPollutionValues(null);
            setUserSearchResult(null);
          }}
          // @ts-expect-error placeholder
          userSearchResult={userSearchResult}
        />
      )}
    </div>
  );
};
