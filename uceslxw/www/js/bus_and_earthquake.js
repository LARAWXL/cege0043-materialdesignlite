// create a variable for each of the layers we want to load/remove
var earthquakelayer;
var busstoplayer;

// create a global variable to hold the earthquake data
var earthquakes;


// create a variable that will hold the XMLHttpRequest()
// - this must be done outside a function so that
// all the functions can use the same variable
var client;


// create the code to get the data using an XMLHttpRequest
function getData(layername) {
    client = new XMLHttpRequest();
    alert("Loading " + layername + " data! ");
    // depending on the layername we get different URLs var url;
    if (layername == "earthquake") {
        url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"
    }
    if (layername == "busstop") {
        url = "https://developer.cege.ucl.ac.uk:31113/cege0043-week2/busstops.geojson"
    }

    client.open('GET', url);
    client.onreadystatechange = dataResponse;
    client.send();
}

// create the code to wait for the response from the data server,
// and process the response once it is received
function dataResponse() {
    // this function listens out for the server to say that
    // the data is ready - i.e. has state 4
    if (client.readyState == 4) {
        // once the data is ready, process the data
        var geoJSONData = client.responseText;
        loadLayer(geoJSONData);
    }
}


// convert the received data - which is text - to JSON format
// and add it to the map
function loadLayer(geoJSONData) {
    // convert the text to JSON
    var json = JSON.parse(geoJSONData);

    // which layer did we actually load？
    if (geoJSONData.indexOf("earthquake") > 0) {
        loadingEarthquakes = true;
        // pass the earthquake data to the global variable we created earlier
        earthquakes = json;
    }
    if (geoJSONData.indexOf("IIT_METHOD") > 0) {
        loadingBusstops = true;
    }


    // add the JSON layer onto the map - it will appear using the default icons
    if (loadingEarthquakes === true) {
        earthquakelayer = L.geoJson(json).addTo(mymap);
        mymap.fitBounds(earthquakelayer.getBounds());
    }
    if (loadingBusstops === true) {
        busstoplayer = L.geoJson(json).addTo(mymap);
        mymap.fitBounds(busstoplayer.getBounds());
    }
}


// run the function when you click the REMOVE DATA BUTTON
function removeData(layername) {
    if (layername == "earthquake") {
        alert("Earthquake data will be removed");
        mymap.removeLayer(earthquakelayer);
    }
    if (layername == "busstop")  {
        alert("Bus stop data will be removed");
        mymap.removeLayer(busstoplayer);
    }

}