import React, { useState, useEffect } from "react";
import SearchIcon from "@/components/icons/search-icon";
import ClearIcon from "@/components/icons/clear-icon";

const searchParam =
  "https://gdi.berlin.de/searches/bkg/geosearch?bbox=12.45,52.35,13.75,52.75&outputformat=json&srsName=EPSG:4326&count=4&query=";

interface SearchProps {
  setUserSearchResult: React.Dispatch<React.SetStateAction<object | null>>;
}

export const Search = ({ setUserSearchResult }: SearchProps) => {
  const [search, setSearch] = useState("");
  // const [hasFocus, setHasFocus] = useState(false);
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [shouldFetch, setShouldFetch] = useState(true);

  useEffect(() => {
    if (shouldFetch && search.length > 2) {
      fetch(searchParam + encodeURIComponent(search))
        .then((res) => res.json())
        .then((data) => {
          setResults(data.features || []);
          setShowDropdown(true);
        })
        .catch((error) => console.error("Search error:", error));
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  }, [search, shouldFetch]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        prevIndex < results.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      const selectedItem = results[selectedIndex];
      setUserSearchResult(selectedItem);
      // @ts-expect-error placeholder
      setSearch(selectedItem.properties.text || "");
      setShowDropdown(false);
      setShouldFetch(false); // Prevent unnecessary refetching
      setSelectedIndex(-1);
    }
  };

  return (
    <div className="absolute w-full p-2 z-20 top-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="group grid grid-cols-1 grid-rows-1 items-center z-10"
      >
        <input
          value={search}
          type="text"
          id="search"
          autoComplete="off"
          className="relative pl-10 pr-20 placeholder-berlin-grey row-start-1 col-start-1 w-full h-[47px] border-2 border-black px-4 focus:outline-none focus:border-focus-blue focus:shadow-default rounded-none"
          placeholder="nach einem Ort suchen"
          onChange={(e) => {
            setSearch(e.target.value);
            setShouldFetch(true); // Allow fetching when user types
          }}
          // onFocus={() => setHasFocus(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          onKeyDown={handleKeyDown}
        />
        <div className="relative row-start-1 col-start-1 pl-3 pointer-events-none">
          <SearchIcon />
        </div>
        <div className="relative row-start-1 col-start-1 w-full h-full flex flex-row gap-2 justify-end pointer-events-none pr-2.5">
          <button
            type="button"
            className={`${
              search === "" ? "hidden" : ""
            } pointer-events-auto p-1.5`}
            onClick={(e) => {
              e.preventDefault();
              setSearch("");
              setResults([]);
              setShowDropdown(false);
              setShouldFetch(true); // Allow fetching after clearing input
              setUserSearchResult(null);
            }}
            aria-label="clear"
          >
            <ClearIcon />
          </button>
          {/* <button
            type="submit"
            aria-label="submit"
            className={`w-fit pointer-events-auto border-l-0 pl-2 pr-2.5 ${
              hasFocus ? "border-focus-blue" : "border-l-black"
            } border-2 border-black`}
          >
            <StartSearchIcon />
          </button> */}
        </div>
      </form>
      {showDropdown && results.length > 0 && (
        <ul className="relative z-20 w-full bg-white border border-black shadow-lg">
          {results.map((item, index) => (
            <li
              key={index}
              className={`text-left px-4 py-2 cursor-pointer hover:bg-gray-200 ${
                selectedIndex === index ? "bg-gray-300" : ""
              }`}
              onMouseDown={() => {
                setUserSearchResult(item);
                // @ts-expect-error placeholder
                setSearch(item?.properties?.text || "");
                setShowDropdown(false);
                setShouldFetch(false); // Prevent unnecessary refetching
                setSelectedIndex(-1);
              }}
            >
              {/* @ts-expect-error placeholder placeholder*/}
              {item.properties.text || ""}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
