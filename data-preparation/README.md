### unzip 2023_pollutant_grid_avg.csv.zip

### run jupyter notebook to create grid geojson

jupyter notebook

### create tiles with tippecanoe

tippecanoe --output-to-directory ./tiles --no-tile-compression --force -B 13 '--minimum-zoom=10' '--maximum-zoom=13' ./output_grid.json

         // "fill-color": [
          //   "step",
          //   ["get", "no2"],
          //   "#FFFF00", // Yellow at 0-10
          //   10,
          //   "#FFCC00", // Lighter Orange
          //   20,
          //   "#FF9900", // Orange
          //   30,
          //   "#FF6600", // Darker Orange
          //   45,
          //   "#FF0000", // Red at 80-100
          // ],
