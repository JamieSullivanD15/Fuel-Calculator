
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
