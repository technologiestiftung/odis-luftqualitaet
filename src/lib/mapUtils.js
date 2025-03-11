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
  no2: "NO₂",
  pm10: "PM10",
  "pm2.5": "PM2.5",
};
export const pollutantExplanation = {
  no2: "Stickstoffdioxid",
  pm10: "Feinstaub",
  "pm2.5": "Feinstaub",
};

export const categoryColors = [
  "#FAD6E3",
  "#E88AAA",
  "#D34D72",
  "#B82054",
  "#9D0C3F",
];

export const fillStyle = [
  "match",
  ["get", "Worst_Index"],
  ...categoryColors.flatMap((color, index) => [index + 1, color]),
  "#cccccc", // Default color if category is missing
];

export const categoryLabels = [
  "sehr niedrig",
  "niedrig",
  "mäßig",
  "erhöht",
  "hoch",
];
