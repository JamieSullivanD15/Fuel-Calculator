
const consumptionUnit = document.getElementById('consumption-unit');
const distanceUnit = document.getElementById('distance-unit');
const fuelCostUnit = document.getElementById('fuel-cost-unit');

function switchToLPKM() {
  consumptionUnit.innerHTML = 'Ltr/Km';
}

function switchToMPG() {
  consumptionUnit.innerHTML = 'MPG';
}

function switchToKilometres() {
  distanceUnit.innerHTML = 'Km';
}

function switchToMiles() {
  distanceUnit.innerHTML = 'Miles';
}

function switchToPerLtr() {
  fuelCostUnit.innerHTML = 'Per Ltr';
}

function switchToPerGal() {
  fuelCostUnit.innerHTML = 'Per Gal';
}
