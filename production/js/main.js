
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


const startLocation = document.getElementById('start-location-form');
const endLocation = document.getElementById('end-location-form');

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
