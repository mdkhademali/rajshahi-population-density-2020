// ===========================================
// Rajshahi Division - Population Density Map
// Prepared by: Md. Khadem Ali
// Data Source: GPWv4 Population Density (CIESIN, 2020)
// ===========================================

// Step 1: Load Population Density dataset (GPWv4)
var dataset = ee
  .ImageCollection("CIESIN/GPWv411/GPW_Population_Density")
  .first() // latest year (2020)
  .select("population_density");

// Step 2: Load Bangladesh administrative boundaries
var admin = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level1");

// Filter only Rajshahi Division
var rajshahi = admin.filter(ee.Filter.eq("ADM1_NAME", "Rajshahi"));

// Step 3: Visualization parameters
var vis = {
  min: 0,
  max: 1000,
  palette: ["ffffcc", "ffeda0", "feb24c", "f03b20", "bd0026"],
};

// Step 4: Clip dataset to Rajshahi Division
var rajshahiDensity = dataset.clip(rajshahi);

// Step 5: Display on Map
Map.centerObject(rajshahi, 8);
Map.addLayer(rajshahiDensity, vis, "Population Density (Rajshahi)");
Map.addLayer(rajshahi, { color: "black" }, "Rajshahi Boundary");

// Step 6: Add Legend

var legend = ui.Panel({
  style: { position: "bottom-left", padding: "8px 15px" },
});
var legendTitle = ui.Label({
  value: "Population Density (people per km²)",
  style: {
    fontWeight: "bold",
    fontSize: "14px",
    margin: "0 0 6px 0",
    color: "black",
  },
});
legend.add(legendTitle);

var palette = ["ffffcc", "ffeda0", "feb24c", "f03b20", "bd0026"];
var labels = ["Very Low", "Low", "Medium", "High", "Very High"];

for (var i = 0; i < palette.length; i++) {
  var colorBox = ui.Label({
    style: {
      backgroundColor: palette[i],
      padding: "10px",
      margin: "0 0 4px 0",
    },
  });
  var description = ui.Label({
    value: labels[i],
    style: { margin: "0 0 4px 6px" },
  });
  var row = ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow("horizontal"),
  });
  legend.add(row);
}
Map.add(legend);

// Step 7: Export the image to Google Drive

Export.image.toDrive({
  image: rajshahiDensity,
  description: "Rajshahi_Population_Density_2020", // name shown in Tasks tab
  folder: "EarthEngine_Exports", // Drive folder name (it will be auto-created)
  fileNamePrefix: "Rajshahi_PopDensity_2020",
  region: rajshahi.geometry(),
  scale: 1000, // meters per pixel
  crs: "EPSG:4326",
  maxPixels: 1e13,
  fileFormat: "GeoTIFF",
});

// Step 8: Confirmation message

print(
  "✅ Population density map for Rajshahi Division displayed successfully!"
);
print(
  "📁 Export started — check the 'Tasks' tab to send GeoTIFF to your Google Drive."
);
