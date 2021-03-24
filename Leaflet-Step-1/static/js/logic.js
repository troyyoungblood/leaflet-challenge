// Store our API endpoint inside queryUrl

// week data  - 2143 files
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// monthly  - 10634 files
// let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"


// Define a function that will give each marker a different color based on its depth
function markerColorEq(depth) {
  if (depth <= 2)
    return  "#ffeda0";
  if (depth > 2 && depth <= 4)
    return "#fed976";  
  if (depth > 4 && depth <= 6)
    return  "#feb24c";
  if (depth > 6 && depth <= 10)
    return "#fd8d3c"; 
  if (depth > 10 && depth <= 25)
    return  "#fc4e2a";
  if (depth > 25 && depth <= 75)
    return "#e31a1c"; 
  if (depth > 75 && depth <= 100)
    return  "#b10026";
  if (depth > 100)
    return "#800026"; 
}  


// Perform a GET request to the query URL
d3.json(queryUrl).then(eQData => {
  // Once we get a response, send the data.features object to the createFeatures function
  console.log(eQData);
  createFeatures(eQData.features);
});

function createFeatures(earthquakeData) {

  console.log(earthquakeData);

  let depth = [];
  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h5>" + feature.properties.place +
      "<p>" + "Depth(ft): " + feature.geometry.coordinates[2] + 
      "<br>" + "Magnitude: " + feature.properties.mag + "</p></h5>");
    // layer.bindPopup("<h3>" + feature.properties.place +
    //   "</h3><hr><p>" + "depth" + feature.geometry.coordinates[2] + "</p>");
      // console.log(feature.geometry.coordinates[2]);
      depth.push(feature.geometry.coordinates[2]);
  }
  console.log(depth);

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array

  let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
      radius: feature.properties.mag*3,
      fillColor: markerColorEq(feature.geometry.coordinates[2]),
      fillOpacity: 0.9,
      opacity: 0.5,
      color: "#b10026"
    });
  }
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  let streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  let darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  let baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  // Set up the legend
  let legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    let limits = ["-10", "2", "4", "6", "10", "25", "75", "100"];
    let labels = ['<strong>Earthquake Depth (ft)</strong>'];

    for (let i = 0; i < limits.length; i++) {
      div.innerHTML +=
      labels.push(
          '<i style="background:' + markerColorEq(limits[i]) + '"></i> ' + 
          + limits[i] + (limits[i + 1] ? ' - ' + limits[i + 1] + '<br>' : ' + '));
    }
    div.innerHTML = labels.join('<br>', '<br>');

    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);

}

