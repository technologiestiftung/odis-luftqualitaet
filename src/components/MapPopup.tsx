import ClearIcon from "@/components/icons/clear-icon";
import {
  pollutantExplanation,
  pollutantLabels,
  categoryLabels,
} from "@/lib/mapUtils";

interface MapPopupProps {
  screenCoordinates: { x: number; y: number };
  features: object;
  closePopup: () => void;
  userSearchResult: { properties: { text: string } };
}

export const MapPopup = ({
  screenCoordinates,
  features,
  closePopup,
  userSearchResult,
}: MapPopupProps) => {
  const isMobile = window.innerWidth < 640; // Tailwind's `sm` breakpoint is 640px

  return (
    <div
      className={`drop-shadow-lg text-left absolute z-30 
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
      <div className="p-2 border-[#000] bg-white border-2 relative m-2">
        {/* <p className="font-bold text-base pb-2 pr-8">
          {userSearchResult?.properties?.text
            ? userSearchResult.properties.text
            : "\u200B"}
        </p> */}

        {userSearchResult?.properties?.text && (
          <p className="text-xs pb-2 pr-8">
            {userSearchResult?.properties?.text}
          </p>
        )}

        <button
          className="absolute top-2 right-1  text-white px-2 py-1 rounded"
          onClick={closePopup}
          // ref={(el) => {
          //   if (el && userSearchResult?.properties?.text) {
          //     el.focus();
          //   }
          // }}
        >
          <ClearIcon />
        </button>

        {/* underline decoration-sky-500"> */}
        <p className="text-lg mb-2 pr-6">
          An{" "}
          <span className="underline decoration-2 underline-offset-4 decoration-[#e40422]">
            diesem Ort
          </span>{" "}
          ist der Bedarf für Luftverbesserung:{" "}
          <span className="font-bold">
            {/* @ts-expect-error placeholder */}
            {categoryLabels[features["Worst_Index"] - 1]}
          </span>
        </p>
        <p className="text-sm mb-2">
          Jahresdurchschnitt der berechneten Luftschadstoffe in Mikrogramm pro
          m³:
        </p>
        <ul className="text-sm">
          {Object.entries(features)
            .slice(0, 3)
            .map(([key, value]) => (
              <li key={key}>
                <span className="w-[145px] inline-block">
                  {/* @ts-expect-error placeholder placeholder*/}
                  <span className="font-bold">{pollutantLabels[key]}</span>
                  {/* @ts-expect-error placeholder placeholder*/}
                  <span> - {pollutantExplanation[key]} </span>
                </span>
                {"| "}
                <span className="font-bold">{value}</span> µg/m³
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
