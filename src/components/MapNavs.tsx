import React from "react";
import maplibregl from "maplibre-gl";

import { ExpandIcon } from "@/components/icons/expand-icon";
import { PlusIcon } from "@/components/icons/plus-icon";
import { MinusIcon } from "@/components/icons/minus-icon";

interface MapNavsProps {
  map: maplibregl.Map | null;
}

export const MapNavs = ({ map }: MapNavsProps) => {
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
