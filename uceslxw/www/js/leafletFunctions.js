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

    // change the map zoom so that all the data is shown
    mymap.setView([51.505, -0.09], 13);
}


// Add the getDistance, getDistanceFromPoint and calculateDistance functions
function getDistance() {
    alert('getting distance');
    // getDistanceFromPoint is the function called
    // once the distance has been found
    navigator.geolocation.getCurrentPosition(getDistanceFromPoint)

    //WHY NOT getDistanceFromPoint(navigator.geolocation.getCurrentPosition);
}

function getDistanceFromPoint(position) {
    // find the coordinates of a point using this website:
    // these are the coordinates for Warren Street
    var lat = 51.524616;
    var lng = -0.13818;
    // return the distance in kilometers
    var distance = calculateDistance(position.coords.latitude, position.coords.longitude, lat, lng, 'K');
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

