import React from "react";

import { pollutantLabels } from "@/lib/mapUtils";

interface PollutantSwitcherProps {
  pollutionType: string;
  setPollutionType: React.Dispatch<React.SetStateAction<string>>;
}

export const PollutantSwitcher = ({
  pollutionType,
  setPollutionType,
}: PollutantSwitcherProps) => {
  return (
    <div className="absolute top-16 z-10 text-center w-full text-sm pointer-events-none">
      {["no2", "pm10", "pm2.5"].map((pType) => (
        <button
          // @ts-expect-error placeholder
          tabIndex={"0"}
          key={pType}
          className={`pointer-events-auto hover:text-opacity-50 cursor-pointer p-2 border-2 border-black w-20 m-1 ${
            pType === pollutionType
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
          onClick={() => {
            setPollutionType(pType);
          }}
          // @ts-expect-error placeholder
          title={`${pollutantLabels[pType]}-Werte anzeigen`}
        >
          {/* @ts-expect-error placeholder placeholder*/}
          {pollutantLabels[pType]}
        </button>
      ))}
    </div>
  );
};
