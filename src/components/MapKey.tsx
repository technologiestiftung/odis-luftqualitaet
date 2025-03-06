import React, { useEffect, useState } from "react";
import minMaxValues from "@/lib/pollutant_stats.json";
import {
  minMaxColors,
  pollutantExplanation,
  pollutantLabels,
} from "@/lib/mapUtils";

interface MapKeyProps {
  pollutionType: string;
  pollutionValues: object | null;
}

export const MapKey = ({ pollutionType, pollutionValues }: MapKeyProps) => {
  const [indicatorPosition, setIndicatorPosition] = useState(0);

  // Get min and max values for the selected pollution type
  // @ts-ignore
  const min = minMaxValues[pollutionType][0];
  // @ts-ignore
  const max = minMaxValues[pollutionType][1];
  // @ts-ignore
  const currentValue = pollutionValues?.[pollutionType] ?? min;

  // Calculate indicator position as a percentage
  useEffect(() => {
    if (min !== max) {
      const percent = ((currentValue - min) / (max - min)) * 100;
      setIndicatorPosition(Math.min(100, Math.max(0, percent))); // Keep within bounds
    }
  }, [pollutionType, pollutionValues, min, max]);

  return (
    <div className="pointer-events-none absolute bottom-2 sm:left-1/2 sm:transform sm:-translate-x-1/2 z-10 w-full sm:max-w-[400px] p-2 px-2 pr-[55px] sm:pr-2">
      <div className="bg-white border-2 border-black p-2">
        {" "}
        {/* Title */}
        <p className="text-xs text-left mb-2">
          Jahresdurchschnitt {/* @ts-ignore */}
          <span className="font-bold">{pollutantLabels[pollutionType]} </span>(
          {/* @ts-ignore */}
          {pollutantExplanation[pollutionType]})
        </p>
        {/* Labels */}
        <div className="flex justify-between text-xs">
          <span>wenig belastet</span>
          <span>stärker belastet</span>
        </div>
        {/* Gradient Bar */}
        <div className="relative w-full h-5 mt-1 overflow-visible">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: `linear-gradient(to right, ${minMaxColors[0]}, ${minMaxColors[1]})`,
            }}
          />

          {/* Indicator */}
          {pollutionValues && (
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-[#e40422] transition-all duration-500"
              style={{ left: `${indicatorPosition}%` }}
            >
              <div className="w-3 h-3 bg-[#e40422] rounded-full absolute -top-2 left-1/2 transform -translate-x-1/2"></div>
            </div>
          )}
        </div>
        {/* Min & Max Values */}
        <div className="flex justify-between mt-1 text-xs">
          <span>min. {min} ppm</span>
          <span>max. {max} ppm</span>
        </div>
      </div>
    </div>
  );
};
