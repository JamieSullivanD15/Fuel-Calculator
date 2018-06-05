
// Unit that was selected by dropdown menu
const distanceUnit = document.getElementById('distance-unit'),
      fuelCostUnit = document.getElementById('fuel-cost-unit'),
      consumptionUnit = document.getElementById('consumption-unit');

// Error message and fuel cost field at the bottom of the layout
const errorMessage = document.getElementById('error-message'),
      totalCostField = document.getElementById('total-cost');

// Input fields for each measurement
let distanceInput = document.getElementById('total-distance-input'),
    costInput = document.getElementById('fuel-cost-input'),
    consumptionInput = document.getElementById('fuel-consumption-input');


// --- DROPDOWN UNIT SELECTION ---
// --- DISTANCE ---
function switchDistanceUnit(unit) {
  if (unit === 'Km') {
    distanceUnit.innerHTML = 'Kilometres';
  } else if (unit === 'Miles') {
    distanceUnit.innerHTML = 'Miles';
  } else {
    console.log('Incorrect unit was passed');
  }
}

// --- FUEL COST ---
function switchFuelCostUnit(unit) {
  if (unit === 'Ltr') {
    fuelCostUnit.innerHTML = 'Per Ltr';
  } else if (unit === 'US') {
    fuelCostUnit.innerHTML = 'Per Gal (US)';
  } else if (unit === 'UK') {
    fuelCostUnit.innerHTML = 'Per Gal (UK)';
  } else {
    console.log('Incorrect unit was passed');
  }
}

// --- FUEL CONSUMPTION ---
function switchFuelConsumptionUnit(unit) {
  if (unit === 'Km/Ltr') {
    consumptionUnit.innerHTML = 'Km/Ltr';
  } else if (unit === 'Ltr/100Km') {
    consumptionUnit.innerHTML = 'Ltr/100Km';
  } else if (unit === 'US') {
    consumptionUnit.innerHTML = 'MPG (US)';
  } else if (unit === 'UK') {
    consumptionUnit.innerHTML = 'MPG (UK)';
  } else {
    console.log('Incorrect unit was passed');
  }
}


const startLocation = document.getElementById('start-location-form'),
      endLocation = document.getElementById('end-location-form');

startLocation.addEventListener('submit', getStartLocation);
endLocation.addEventListener('submit', getEndLocation);

function getStartLocation(e) {
  let location = document.getElementById('start-location-input').value;
  searchLocation(location);
  e.preventDefault();
}

function getEndLocation(e) {
  let location = document.getElementById('end-location-input').value;
  searchLocation(location);
  e.preventDefault();
}


function calculateCost() {
  let units;
  let totalCost;

  if (distanceInput.value != 0 && consumptionInput.value != 0 && costInput.value != 0) {
    units = convertUnits();
  } else {
    errorMessage.style = 'display: flex;';
    setTimeout(function() {
      errorMessage.style = 'display: none;';
    }, 3000);
    return;
  }

  // Total Cost = Distance / Fuel Consumption * Fuel Cost
  totalCost = (units['distance'].value / units['consumption'].value) * units['cost'].value;
  totalCostField.innerHTML = '&euro; ' + totalCost.toFixed(2);
}

function convertUnits() {
  let distance = cost = consumption = 0;
  let units = [];

  // Distance will always be measured in KM
  // 1 Mile is 1.609344 Kms
  distanceUnit.innerHTML === 'Miles' ?
    distance = distanceInput.value * 1.609344:
    distance = Number(distanceInput.value);

  // Fuel cost will be measured Per Litre
  // 1 Imperial Gallon = 4.54609 Litres
  // 1 US Gallon = 3.78541 Litres
  if (fuelCostUnit.innerHTML === 'Per Gal (UK)') {
    cost = costInput.value / 4.54609;
  } else if (fuelCostUnit.innerHTML === 'Per Gal (US)') {
    cost = costInput.value / 3.78541;
  } else {
    cost = Number(costInput.value);
  }

  // Consumption to be measured in KM Per Litre - Convert MPG to L/100km, then to km/L
  // 1 Imperial Gallon = 4.54609 Liters
  // 1 US Gallon = 3.78541 Liters
  // 1 Mile = 1.609344 Kms
  if (consumptionUnit.innerHTML === 'MPG (UK)') {
    consumption = (100 * 4.54609) / (1.609344 * consumptionInput.value);
    consumption = 100 / consumption;
  } else if (consumptionUnit.innerHTML === 'MPG (US)') {
    consumption = (100 * 3.78541) / (1.609344 * consumptionInput.value);
    consumption = 100 / consumption;
  } else if (consumptionUnit.innerHTML === 'Ltr/100Km') {
    // Convert to km/L
    consumption = 100 / consumptionInput.value;
  } else {
    consumption = Number(consumptionInput.value);
  }

  // Add values as a hashmap
  units['distance'] = {value: distance};
  units['cost'] = {value: cost};
  units['consumption'] = {value: consumption};

  return units;
}


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
