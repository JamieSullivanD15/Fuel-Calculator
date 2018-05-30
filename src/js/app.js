
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
