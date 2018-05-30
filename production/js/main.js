
// Units selected by dropdown menu
const distanceUnit = document.getElementById('distance-unit'),
      fuelCostUnit = document.getElementById('fuel-cost-unit'),
      consumptionUnit = document.getElementById('consumption-unit');

// Input fields for each measurement
let distanceInput = document.getElementById('total-distance-input'),
    costInput = document.getElementById('fuel-cost-input'),
    consumptionInput = document.getElementById('fuel-consumption-input');

// Accurate values of each field
let distance = cost = consumption = 0;


// --- DISTANCE ---
// 1 Mile is 1.60934 Kilometres
function switchToKilometres() {
  if (distanceUnit.innerHTML === 'Miles') {
    distance = distanceInput.value * 1.60934;
    distanceInput.value = distance.toFixed(2);
  }
  distanceUnit.innerHTML = 'Km';
}

function switchToMiles() {
  if (distanceUnit.innerHTML === 'Km') {
    distance = distanceInput.value / 1.60934;
    distanceInput.value = distance.toFixed(2);
  }
  distanceUnit.innerHTML = 'Miles';
}

// --- FUEL COST ---
// 1 MPG is 0.354006 KM per Litre
function switchToPerLtr() {
  console.log('\nLitre Switch');
  console.log(cost + ' - Variable');
  console.log(costInput.value + ' - Input');
  if (fuelCostUnit.innerHTML === 'Per Gal') {
    cost = costInput.value / 4.54609;
    costInput.value = Number(cost.toFixed(2));
  }
  fuelCostUnit.innerHTML = 'Per Ltr';
}

function switchToPerGal() {
  console.log('\nGallon Switch');
  console.log(cost + ' - Variable');
  console.log(costInput.value + ' - Input');
  if (fuelCostUnit.innerHTML === 'Per Ltr') {
    cost = costInput.value * 4.54609;
    costInput.value = Number(cost.toFixed(2));
  }
  fuelCostUnit.innerHTML = 'Per Gal';
}

// --- FUEL CONSUMPTION ---
// 1 Imperial Gallon is 4.54609 Litre's
function switchToLPKM() {
  if (consumptionUnit.innerHTML === 'MPG') {
    consumptionInput.value = Math.round((consumptionInput.value * 0.354006) * 100) / 100;
  }
  consumptionUnit.innerHTML = 'Ltr/Km';
}

function switchToMPG() {
  if (consumptionUnit.innerHTML === 'Ltr/Km') {
    consumptionInput.value = Math.round((consumptionInput.value / 0.354006) * 100) / 100;
  }
  consumptionUnit.innerHTML = 'MPG';
}

// Distance / Consumption * Fuel Cost
function calculateCost() {
  let totalCost = 0;
  let consumption = 0;

  // consumptionUnit.innerHTML === 'Ltr/Km' ? consumption = (fuelConsumption.value / 0.354006) :
  // consumption = Number(fuelConsumption.value);

  console.log(consumption);

  // if (distance !== 0 && consumption !== 0 && cost !== 0) {
  //   totalCost = distance / consumption * cost;
  // }
  //
  // console.log(totalCost);
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


// // Distance / Consumption * Fuel Cost
// function calculateCost() {
//   let totalCost,
//       distance = document.getElementById('total-distance-input').value,
//       cost = document.getElementById('fuel-cost-input').value,
//       consumption = document.getElementById('fuel-consumption-input').value;
//
//
//
//   if (distance !== 0 && consumption !== 0 && cost !== 0) {
//     totalCost = distance / consumption * cost;
//   }
//
//   console.log(totalCost);
// }


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
