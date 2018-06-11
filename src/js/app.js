
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
