"use client";
import React, { useRef, useEffect, useState } from "react";

import { MapComponent } from "@/components/Map";
import { Search } from "@/components/Search";
import { PollutantSwitcher } from "@/components/PollutantSwitcher";
import { MapKey } from "@/components/MapKey";

export default function Home() {
  const [userSearchResult, setUserSearchResult] = useState<object | null>(null);
  const [pollutionType, setPollutionType] = useState<string>("no2");
  const [pollutionValues, setPollutionValues] = useState<object | null>(null);

  return (
    // remove this div on production
    <div
      style={{
        width: "80%",
        height: "585px",
        padding: "30px",
      }}
    >
      <main className="w-full h-full justify-content content-center text-center relative border-2 border-black">
        <Search setUserSearchResult={setUserSearchResult}></Search>
        <PollutantSwitcher
          pollutionType={pollutionType}
          setPollutionType={setPollutionType}
        ></PollutantSwitcher>
        <MapComponent
          userSearchResult={userSearchResult}
          setUserSearchResult={setUserSearchResult}
          pollutionType={pollutionType}
          setPollutionValues={setPollutionValues}
        ></MapComponent>
        <MapKey
          pollutionType={pollutionType}
          pollutionValues={pollutionValues}
        ></MapKey>
        <p className="absolute right-0 bottom-0 pr-2 text-xs opacity-35">
          © OpenStreetMap contributors
        </p>
      </main>
    </div>
  );
}
