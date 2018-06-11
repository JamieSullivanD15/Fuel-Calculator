
const apiKey = config.API_KEY;
let map, directionsDisplay, directionsService;

function createMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    scrollwheel: true,
  });

  directionsDisplay = new google.maps.DirectionsRenderer({
    draggable: true,
    map: map
  });

  // Try Geolocation
  // If found then zoom into their location, if not then present a zoomed out world map
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setZoom(10);
      map.setCenter(pos);
    });
  } else {
    // Browser doesn't support Geolocation
    map.setZoom(1);
    map.setCenter(map.getCenter());
    map.setMarker()
  }
}

function calculateRoute() {
  let startLocation = document.getElementById('start-location-input'),
      endLocation = document.getElementById('end-location-input');

  directionsService = new google.maps.DirectionsService();

  directionsDisplay.addListener('directions_changed', function() {
    computeTotalDistance(directionsDisplay.getDirections());
  });

  if (startLocation.value != '' && endLocation.value != '') {
    displayRoute(startLocation.value, endLocation.value, directionsService, directionsDisplay);
  } else {
    locationError.innerHTML = `<i class="fa fa-exclamation-circle"></i>
    Please enter a start and end location`;
    locationError.style = 'display: flex;';
    setTimeout(function() {
      locationError.style = 'display: none;';
    }, 3000);
    return;
  }
}

function displayRoute(startLocation, endLocation, service, display) {
  service.route({
    origin: startLocation,
    destination: endLocation,
    travelMode: 'DRIVING',
    avoidTolls: false
  }, function(response, status) {
    if (status === 'OK') {
      display.setDirections(response);
    } else {
      locationError.innerHTML = `<i class="fa fa-exclamation-circle"></i>
      Unable to find the specified location`;
      locationError.style = 'display: flex;';
      setTimeout(function() {
        locationError.style = 'display: none;';
      }, 3000);
      return;
    }
  });
}

function computeTotalDistance(result) {
  let total = 0;
  let route = result.routes[0];
  for (let i = 0; i < route.legs.length; i++) {
    total += route.legs[i].distance.value;
  }
  total = total / 1000;
  distanceInput.value = total.toFixed(2);
  distanceUnit.innerHTML = 'Kilometres';
}
