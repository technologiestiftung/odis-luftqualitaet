import ClearIcon from "@/components/icons/clear-icon";
import {
  minMaxColors,
  pollutantExplanation,
  pollutantLabels,
} from "@/lib/mapUtils";

interface MapPopupProps {
  screenCoordinates: any | object;
  features: any | object;
  closePopup: any;
  userSearchResult: any | object;
}

export const MapPopup = ({
  screenCoordinates,
  features,
  closePopup,
  userSearchResult,
}: MapPopupProps) => {
  console.log(userSearchResult);

  const isMobile = window.innerWidth < 640; // Tailwind's `sm` breakpoint is 640px

  return (
    <div
      className={`text-left absolute z-30 
        ${isMobile ? "w-full top-0 left-0" : "w-[300px]"}
      `}
      style={
        isMobile
          ? {} // No need for screen coordinates on mobile
          : {
              left: `${screenCoordinates?.x || 0}px`,
              top: `${screenCoordinates?.y || 0}px`,
              transform: "translate(-50%, -100%)",
            }
      }
    >
      {/* shadow-xl */}
      <div className="p-2 border-[#f5b4cb] bg-white border-2 relative m-2">
        <p className="font-bold text-base pb-2 pr-8">
          {userSearchResult?.properties?.text
            ? userSearchResult.properties.text
            : "\u200B"}
        </p>

        <button
          className="absolute top-2 right-1  text-white px-2 py-1 rounded"
          onClick={closePopup}
          ref={(el) => {
            if (el && userSearchResult?.properties?.text) {
              console.log("Äää");

              el.focus();
            }
          }}
        >
          <ClearIcon />
        </button>
        <ul className="text-base">
          {Object.entries(features).map(([key, value]) => (
            <li key={key}>
              <span className="w-[180px] inline-block">
                {/* @ts-ignore */}
                <span className="font-bold">{pollutantLabels[key]}</span>
                {/* @ts-ignore */}
                <span> - {pollutantExplanation[key]} </span>
              </span>
              {"| "}
              {/* @ts-ignore */}
              <span className="font-bold">{value} ppm</span>
            </li>
          ))}
          <li className="pt-2">
            Die Luftqualtität ist hier <span className="font-bold">gut</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
