
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
