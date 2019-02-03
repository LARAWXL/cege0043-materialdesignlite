function trackLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap).bindPopup("<b>You were here</b>");
    //mymap.setView([position.coords.latitude, position.coords.longitude],11);
    getDistance()
}

// get distance from multiple earthquakes
function getDistance() {
    //alert('getting distance');
    // getDistanceFromPoint is the function called
    // once the distance has been found
    navigator.geolocation.getCurrentPosition(getDistanceFromMultiplePoints)
}

function getDistanceFromPoint(position) {
    // find the coordinates of a point using this website:
    // these are the coordinates for Warren Street
    var lat = 51.524616;
    var lng = -0.13818;
    // return the distance in kilometers
    var distance = calculateDistance(position.coords.latitude, position.coords.longitude, lat, lng, 'K');
    // check whether the distance is within 100m, and pop up an alert message
    if (distance < 0.1) {
        alert("You are in UCL")
    }
    document.getElementById('showDistance').innerHTML = "Distance: " + distance;
}

// code adapted from
// https://www.htmlgoodies.com/beyond/javascript/calculate-the-distance-between-two-points-in-your-web-apps.html
function calculateDistance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var radlon1 = Math.PI * lon1 / 180;
    var radlon2 = Math.PI * lon2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var subAngle = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    subAngle = Math.acos(subAngle);
    // convert the degree value returned by acos back to degrees from radians
    subAngle = subAngle * 180 / Math.PI;
    // ((subtended angle in degrees)/360) * 2 * pi * radius )
    // where radius of the earth is 3956 miles
    dist = (subAngle / 360) * 2 * Math.PI * 3956;
    // convert miles to km
    if (unit == "K") {
        dist = dist * 1.609344;
    }
    // convert miles to nautical miles
    if (unit == "N") {
        dist = dist * 0.8684;
    }
    return dist;
}

// every time the user location is changed/tracked –
// check the distance of the user from each Earthquake in the data
// and pop up an alert showing the distance to the nearest earthquake
function getDistanceFromMultiplePoints(position) {
    var minDistance = 100000000000;
    var closestQuake = "";
    for (var i = 0; i < earthquakes.features.length; i++) {
        var obj = earthquakes.features[i];
        var distance = calculateDistance(position.coords.latitude,
            position.coords.longitude, obj.geometry.coordinates[0], obj.geometry.coordinates[1], 'K');
        if (distance < minDistance) {
            minDistance = distance;
            closestQuake = obj.properties.place;
        }
    }
    alert("Earthquake: " + closestQuake + " is distance " + minDistance + "away");
}