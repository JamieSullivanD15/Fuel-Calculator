
const apiKey = 'AIzaSyBNzkiCpla_K_p7-3O4tpSfy8N7ZOto5io';
let map;

function createMap() {


  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34, lng: 151},
    scrollwheel: true,
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

function createMarker(position) {
  var marker = new google.maps.Marker({
    position: position,
    title:"Hello World!"
  });

  marker.setMap(map);
  map.setCenter(position);
  map.setZoom(12);
}

function computeTotalDistance(result) {
  var total = 0;
  var myroute = result.routes[0];
  for (var i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }
  total = total / 1000;
  distanceInput.value = total.toFixed(2);
}

function displayRoute(origin, destination, service, display) {
  service.route({
    origin: origin,
    destination: destination,
    travelMode: 'DRIVING',
    avoidTolls: false
  }, function(response, status) {
    if (status === 'OK') {
      display.setDirections(response);
    } else {
      alert('Could not display directions due to: ' + status);
    }
  });
}


function calculateRoute() {
  var directionsService = new google.maps.DirectionsService();

  var directionsDisplay = new google.maps.DirectionsRenderer({
    draggable: true,
    map: map,
    panel: document.getElementById('right-panel')
  });

  directionsDisplay.addListener('directions_changed', function() {
    computeTotalDistance(directionsDisplay.getDirections());
  });

  displayRoute('Santry Dublin', 'Bull Island Dublin', directionsService, directionsDisplay);
}

async function searchLocation(location) {
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${apiKey}`);
  const responseData = await response.json();
  console.log(responseData);

  let position = responseData.results[0].geometry.location;
  createMarker(position);
}
