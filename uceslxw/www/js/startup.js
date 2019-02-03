function trackAndCircle() {
    trackLocation()
    addPointLinePoly()
    getEarthquakes(1)
}

function startup() {
    document.addEventListener('DOMContentLoaded', function () {
        trackAndCircle();
    }, false);
}