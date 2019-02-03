//write a function that when called will add a point, line and polygon to the map.
function addPointLinePoly() {
    // add a point
    L.marker([51.5, -0.09]).addTo(mymap)
        .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
// add a circle
    L.circle([51.508, -0.11], 500, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
    }).addTo(mymap).bindPopup("I am a circle.");
// add a polygon with 3 end points (i.e. a triangle)
    var myPolygon = L.polygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047]
    ], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
    }).addTo(mymap).bindPopup("I am a polygon.");
}


// wait for the response from the data server,
// and process the response once it is received
function earthquakeResponse() {
    // this function listens out for the server to say that
    // the data is ready - i.e. has state 4
    if (client.readyState == 4) {
        // once the data is ready, process the data
        var earthquakedata = client.responseText;
        loadEarthquakelayer(earthquakedata);
    }
}


// convert the received data - which is text - to JSON format and add it to the map
function loadEarthquakelayer(earthquakedata) {
    // convert the text to JSON
    var earthquakejson = JSON.parse(earthquakedata);
    // add the JSON layer onto the map - it will appear using the default icons
    // earthquakelayer = L.geoJson(earthquakejson).addTo(mymap);
    // load the geoJSON layer -- using customer icons
    earthquakelayer = L.geoJson(earthquakejson,
        {
            // use point to layer to create the points
            pointToLayer: function (feature, latlng) {
                // look at the GeoJSON file - specifically at the properties -
                // to see the earthquake magnitude and
                // use a different marker depending on this value
                // also include a pop-up that shows the place value of the earthquakes
                if (feature.properties.mag > 1.75) {
                    return L.marker(latlng, {icon: testMarkerRed}).bindPopup("<b>" + feature.properties.place + "</b>");
                }
                else {
                    // magnitude is 1.75 or less
                    return L.marker(latlng, {icon: testMarkerPink}).bindPopup("<b>" + feature.properties.place + "</b>");
                    ;
                }
            },
        }).addTo(mymap);
    // change the map zoom so that all the data is shown
    mymap.fitBounds(earthquakelayer.getBounds());
}