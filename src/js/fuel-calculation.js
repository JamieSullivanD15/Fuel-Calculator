
function calculateCost() {
  let units;
  let totalCost;
  console.log(distanceInput.value );
  console.log(consumptionInput.value );
  console.log(costInput.value );

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
