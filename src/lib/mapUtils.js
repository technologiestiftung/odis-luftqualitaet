import minMaxValues from "@/lib/pollutant_stats.json";

export function fillColorStyle(pollutionType) {
  const min = minMaxValues[pollutionType][0];
  const max = minMaxValues[pollutionType][1];

  return [
    "interpolate",
    ["linear"],
    ["get", pollutionType],
    min,
    minMaxColors[0],
    max,
    minMaxColors[1],
  ];
}
export const fillOpacity = 0.6;
export const minMaxColors = ["#FAD6E3", "#9D0C3F"];
export const pollutantLabels = {
  no2: "NO2",
  pm10: "PM10",
  "pm2.5": "PM2.5",
};
export const pollutantExplanation = {
  no2: "Stickstoffdioxid",
  pm10: "Feinstaub",
  "pm2.5": "Feinstaub",
};
