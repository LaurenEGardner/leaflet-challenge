// Creating map object
var myMap = L.map("mapid", {
    center: [37.09, -95.71],
    zoom: 4
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
}).addTo(myMap);

// Load in GeoJson data
var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

var geojson = d3.json(geoData);



//Define eqScale function for marker size
function eqScale(magnitude) {
    return magnitude * 3;
}

//function to return fill color based on depth
function getColor(d) {
    return d > 90 ? '#c12424' :
        d > 70 ? '#ff0000' :
            d > 50 ? '#ff6612' :
                d > 30 ? '#ffce00' :
                    d > 10 ? '#e3f018' :
                        '#bdff00';
}

//grabbing GeoJSON data
d3.json(geoData).then(function (data) {
    //console.log(data)
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
        onEachFeature: function (features, layer) {
            layer.bindPopup('<h3>' + features.properties.place + '</h3><hr><p>Magnitude: ' + features.properties.mag + '<br>Time: ' + new Date(features.properties.time) + '<br>Depth: ' + features.geometry.coordinates[2] + '</p>')
        },
        pointToLayer: function (features, latlng) {
            return L.circleMarker(latlng, {
                fillColor: getColor(features.geometry.coordinates[2]),
                radius: eqScale(features.properties.mag),
                color: "black",
                weight: .5,
                fillOpacity: 0.7
            });
        }
    }).addTo(myMap);

});

//adding legend

var colorList = ["#bdff00", "#e3f018", "#ffce00", "#ff6612", "#ff0000", "#c12424"]



//set up the legend
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        limits = ["-10-10", "10-30", "30-50", "50-70", "70-90", "90+"],
        colors = ["#bdff00", "#e3f018", "#ffce00", "#ff6612", "#ff0000", "#c12424"],
        labels = [];

        var legendInfo = "<h1>Depth</h1>" +
        "<div class=\"labels\">" +
          "<div class=\"min\">" + limits[0] + "</div>" +
          "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
        "</div>";
  
      div.innerHTML = legendInfo;
  
      limits.forEach(function(limit, index) {
        labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
      });
  
      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
};

legend.addTo(myMap);






