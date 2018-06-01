
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

startLocation.addEventListener('submit', searchStartLocation);
endLocation.addEventListener('submit', searchEndLocation);

function searchStartLocation(e) {
  e.preventDefault();
  let location = document.getElementById('start-location-input').value;
  console.log(location);
}

function searchEndLocation(e) {
  e.preventDefault();
  let location = document.getElementById('end-location-input').value;
  console.log(location);
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


function createMap() {
  var location = {lat: 53.350733, lng: -6.283442}

  var mapOptions = {
    center: new google.maps.LatLng(location),
    zoom: 17,
    scrollwheel: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
}
