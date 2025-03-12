import React from "react";
import { categoryColors, categoryLabels, fillOpacity } from "@/lib/mapUtils";

interface MapKeyProps {
  pollutionValues: object | null; // Expecting values 1-5
}

export const MapKey = ({ pollutionValues }: MapKeyProps) => {
  return (
    <div className="text-sm pointer-events-none absolute bottom-2 sm:left-1/2 sm:transform sm:-translate-x-1/2 z-10 w-full sm:max-w-[400px] p-2 px-2 pr-[55px] sm:pr-2">
      <div className="bg-white border-2 border-black p-2">
        {/* Title */}
        <p className="text-left">Bedarf für Luftverbesserung</p>

        {/* Discrete Category Bar */}
        <div className="relative w-full h-5 mt-1 overflow-visible flex">
          {categoryColors.map((color, index) => (
            <div
              key={index}
              className={`flex-1 h-full ${
                // @ts-expect-error placeholder
                pollutionValues && pollutionValues["Worst_Index"] === index + 1
                  ? "border-2 border-red-600"
                  : ""
              }`}
              style={{ backgroundColor: color, opacity: fillOpacity }}
            />
          ))}
        </div>

        {/* Category Labels */}
        <div className="flex justify-between mt-1 text-xs">
          {categoryLabels.map((label, index) => (
            <span key={index} className="text-center w-1/5">
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
