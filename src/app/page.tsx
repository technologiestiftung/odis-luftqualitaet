"use client";
import React, { useState } from "react";

import { MapComponent } from "@/components/Map";
import { Search } from "@/components/Search";
// import { PollutantSwitcher } from "@/components/PollutantSwitcher";
import { MapKey } from "@/components/MapKey";

export default function Home() {
  const [userSearchResult, setUserSearchResult] = useState<object | null>(null);
  const [pollutionValues, setPollutionValues] = useState<object | null>(null);

  return (
    // remove this div on production
    <div
      style={{
        width: "80%",
        height: "585px",
        padding: "30px",
        maxWidth: "800px",
      }}
    >
      <main className="w-full h-full justify-content content-center text-center relative">
        <Search setUserSearchResult={setUserSearchResult}></Search>
        {/* <PollutantSwitcher
          pollutionType={pollutionType}
          setPollutionType={setPollutionType}
        ></PollutantSwitcher> */}
        <MapComponent
          userSearchResult={userSearchResult}
          setUserSearchResult={setUserSearchResult}
          setPollutionValues={setPollutionValues}
        ></MapComponent>
        <MapKey pollutionValues={pollutionValues}></MapKey>
        <p className="absolute left-0 bottom-0 pl-2 text-xs opacity-35">
          <a href="">Impressum</a>
          <a href="">Erklärung zur Barrierefreiheit</a>
        </p>
        <p className="absolute right-0 bottom-0 pl-2 text-xs opacity-35">
          © OpenStreetMap contributors
        </p>
      </main>
    </div>
  );
}
