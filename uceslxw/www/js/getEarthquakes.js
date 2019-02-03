// create a variable that will hold the XMLHttpRequest()
// - this must be done outside a function so that
// all the functions can use the same variable
var client;

// a global variable to hold earthquake data
var earthquakes;


// and a variable that will hold the layer itself
// we need to do this outside the function so that we
// can use it to remove the layer later on
var earthquakelayer;

// run the function when you click the LOAD DATA BUTTON
function loadEarthquakeData() {
    // call the getEarthquakes code
    // keep the alert message so that we know something is happening
    alert("Loading Earthquakes");
    getEarthquakes(1);
}


// get the Earthquakes data using an XMLHttpRequest
// depending on situations,
// 1: the function only load the earthquake data
// 2: the function load and recenter the earthquake layer
function getEarthquakes(situation) {
    client = new XMLHttpRequest();
    client.open('GET', 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson');
    if (situation == 1) {
        client.onreadystatechange = earthquakeResponse_auto;
    }
    if (situation == 2) {
        client.onreadystatechange = earthquakeResponse_menu;
    }
    // note don't use earthquakeResponse() with brackets as that doesn't work
    client.send();
}


// wait for the response from the data server,
// and process the response once it is received
function earthquakeResponse_auto() {
    // this function listens out for the server to say that
    // the data is ready - i.e. has state 4
    if (client.readyState == 4) {
        // once the data is ready, process the data
        var earthquakedata = client.responseText;
        storeEarthquakedata(earthquakedata);
    }
}


function earthquakeResponse_menu() {
    // this function listens out for the server to say that
    // the data is ready - i.e. has state 4
    if (client.readyState == 4) {
        // once the data is ready, process the data
        var earthquakedata = client.responseText;
        loadEarthquakelayer(earthquakedata);
    }
}

// convert the received data - which is text - to JSON format
// and pass the data to a global variable
function storeEarthquakedata(earthquakedata) {
    // convert the text to JSON
    var earthquakejson = JSON.parse(earthquakedata);
    // use a global variable to hold the Earthquakes data
    earthquakes = earthquakejson;
}

// convert the received data - which is text - to JSON format
// and add it to the map
// also pass the data to a global variable
function loadEarthquakelayer(earthquakedata) {
    // convert the text to JSON
    var earthquakejson = JSON.parse(earthquakedata);
    // use a global variable to hold the Earthquakes data
    earthquakes = earthquakejson;
    // add the JSON layer onto the map - it will appear using the default icons
    earthquakelayer = L.geoJson(earthquakejson).addTo(mymap);
    // change the map zoom so that all the data is shown
    mymap.fitBounds(earthquakelayer.getBounds());
}
