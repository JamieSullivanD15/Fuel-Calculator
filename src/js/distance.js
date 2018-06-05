
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
