
// Unit that was selected by dropdown menu
const distanceUnit = document.getElementById('distance-unit'),
      fuelCostUnit = document.getElementById('fuel-cost-unit'),
      consumptionUnit = document.getElementById('consumption-unit');

// Error message and fuel cost field at the bottom of the layout
const caculateError = document.getElementById('calculate-error'),
      locationError = document.getElementById('location-error'),
      totalCostField = document.getElementById('total-cost');

// Input fields for each measurement
let distanceInput = document.getElementById('total-distance-input'),
    costInput = document.getElementById('fuel-cost-input'),
    consumptionInput = document.getElementById('fuel-consumption-input');


// --- DROPDOWN UNIT SELECTION ---
// --- DISTANCE ---
function switchDistanceUnit(unit) {
  if (unit === 'Kilometres') {
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


function calculateCost() {
  let units;
  let totalCost;

  if (distanceInput.value != 0 && consumptionInput.value != 0 && costInput.value != 0) {
    units = convertUnits();
  } else {
    caculateError.style = 'display: flex;';
    setTimeout(function() {
      caculateError.style = 'display: none;';
    }, 3000);
    return;
  }

  // Total Cost = Distance / Fuel Consumption * Fuel Cost
  totalCost = (units['distance'].value / units['consumption'].value) * units['cost'].value;
  totalCostField.innerHTML = '&euro; ' + totalCost.toFixed(2);
}

function convertUnits() {
  // 1 Mile is 1.609344 Kms
  // 1 Imperial Gallon = 4.54609 Litres
  // 1 US Gallon = 3.78541 Litres
  let distance = cost = consumption = 0;
  let units = [];

  // Distance will always be measured in KM
  distanceUnit.innerHTML === 'Miles' ?
    distance = distanceInput.value * 1.609344:
    distance = Number(distanceInput.value);

  // Fuel cost will be measured Per Litre
  if (fuelCostUnit.innerHTML === 'Per Gal (UK)') {
    cost = costInput.value / 4.54609;
  } else if (fuelCostUnit.innerHTML === 'Per Gal (US)') {
    cost = costInput.value / 3.78541;
  } else {
    cost = Number(costInput.value);
  }

  // Consumption to be measured in KM Per Litre - Convert MPG to L/100km, then to km/L
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
