import React, { useEffect, useState } from "react";
import maplibregl from "maplibre-gl";

import { ExpandIcon } from "@/components/icons/expand-icon";
import { CompressIcon } from "@/components/icons/compress-icon";
import { PlusIcon } from "@/components/icons/plus-icon";
import { MinusIcon } from "@/components/icons/minus-icon";

interface MapNavsProps {
  map: maplibregl.Map | null;
}

export const MapNavs = ({ map }: MapNavsProps) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  function fullScreen() {
    const doc = document.documentElement as HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void>;
    };
    const docExit = document as Document & {
      webkitExitFullscreen?: () => Promise<void>;
    };

    if (!doc || !document) return;

    // @ts-expect-error placeholder
    if (!document.fullscreenElement && !docExit.webkitFullscreenElement) {
      setIsFullScreen(true);
      if (doc.requestFullscreen) {
        doc.requestFullscreen();
      } else if (doc.webkitRequestFullscreen) {
        doc.webkitRequestFullscreen();
      }
    } else {
      setIsFullScreen(false);
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (docExit.webkitExitFullscreen) {
        docExit.webkitExitFullscreen();
      }
    }
  }

  useEffect(() => {
    function handleFullScreenChange() {
      // @ts-expect-error placeholder
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        setIsFullScreen(false);
      }
    }

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullScreenChange
      );
    };
  }, []);

  return (
    <nav className="z-10 absolute bottom-[8px] right-0 grid p-2">
      <button
        className="h-[43px] w-[43px] px-3 py-1 hover:cursor-pointer bg-white mb-1 hover:text-opacity-50 text-black"
        title="Hineinzoomen"
        onClick={() => {
          // @ts-expect-error placeholder
          if (map) map.current.zoomIn();
        }}
      >
        <PlusIcon />
      </button>
      <button
        className="h-[43px] w-[43px] px-3 py-1 hover:cursor-pointer bg-white mb-1 hover:text-opacity-50 text-black"
        title="Hinauszoomen"
        onClick={() => {
          // @ts-expect-error placeholder
          if (map) map.current.zoomOut();
        }}
      >
        <MinusIcon />
      </button>
      <a
        href="https://luftqualitaet.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
        title="Vollbildschirm"
        className="flex h-[43px] w-[43px] px-3 py-1 hover:cursor-pointer bg-white mb-1 hover:text-opacity-50 text-black"
      >
        <ExpandIcon />
      </a>
    </nav>
  );
};
