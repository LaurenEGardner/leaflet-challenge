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

//Define eqDepth function for marker color
function eqDepth(depth) {
    if (depth < 10) {
        return "#bdff00";
    }else if (depth < 30) {
        return "#e3f018";
    }else if (depth < 50) {
        return "#ffce00";
    }else if (depth < 70) {
        return "#ff6612";
    }else if (depth < 90) {
        return "#ff0000";
    }else return "#c12424";
}

//Define eqScale function for marker size
function eqScale(magnitude) {
    return magnitude * 3;
}


// // Our style object
// var mapStyle = {
//     color: "white",
//     fillColor: "pink",
//     fillOpacity: 0.5,
//     weight: 1.5
//   };

//grabbing GeoJSON data
d3.json(geoData).then(function(data) {
    console.log(data)
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
        onEachFeature: function(features, layer) {
            layer.bindPopup('<h3>'+features.properties.place+'</h3><hr><p>Magnitude: '+features.properties.mag+'<br>Time: '+new Date(features.properties.time)+'<br>Depth: '+features.geometry.coordinates[2]+'</p>')
        },
        pointToLayer: function(features, latlng) {
            return L.circleMarker(latlng, {
                fillColor: eqDepth(features.geometry.coordinates[2]),
                radius: eqScale(features.properties.mag),
                color: "black",
                weight: .5,
                fillOpacity: 0.7
            });
        }
    }).addTo(myMap);
    
  });

  //adding legend

var colorList = []
var labelList = []

  //set up the legend
var legend = L.control({position: 'bottomright'})
legend.onAdd = function(myMap) {
    var div = L.DomUtil.create('div', 'info legend')
    var colors = ["#bdff00","#e3f018","#ffce00","#ff6612","#ff0000","#c12424"]
    var labels = ["-10-10", "10-30", "30-50", "50-70", "70-90", "90+"]
  }






