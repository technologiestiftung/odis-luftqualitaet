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
        <p className="absolute left-0 bottom-4 md:bottom-0 pl-2 text-xs opacity-75 text-black">
          <a
            target="_blank"
            href="https://www.technologiestiftung-berlin.de/impressum"
            className="pr-2"
          >
            Impressum
          </a>
          <a
            target="_blank"
            href="https://www.technologiestiftung-berlin.de/erklaerung-zur-barrierefreiheit"
          >
            Erklärung zur Barrierefreiheit
          </a>
        </p>
        <p className="absolute left-0 md:left-auto md:right-0 bottom-0 pl-2 pr-2 text-xs opacity-75">
          © 2024 basemap.de / BKG | Datenquellen: © GeoBasis-DE
        </p>
      </main>
    </div>
  );
}
