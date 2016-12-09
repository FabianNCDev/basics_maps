// {lat: -13.417754036761492, lng: -76.13222032785417}
function onDocumentReady() {
  var socket = io.connect('/');
  var map = L.map('mimapa', {
    center: [-13.417754036761492, -76.13222032785417],
    zoom: 20
  });

  // L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(map);
  // L.tileLayer('http://{s}.tile2.opencyclemap.org/transport/{z}/{x}/{y}.png', {foo: 'bar'}).addTo(map);
  // L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {foo: 'bar'}).addTo(map);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="/">Traffcit</a> contributors'
  , foo: 'bar'
  }).addTo(map);

  map.on('click', function(data) {
    console.log(map.getCenter());
  });

  // L.marker([-13.417754036761492, -76.13222032785417]).addTo(map)
  //   .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
  //   .openPopup();
  // L.marker([-13.417754036761492, -76.13323039000300]).addTo(map)
  //   .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
  //   .openPopup();

  map.locate({
    enableHighAccuracy: true
  });

  map.on('locationfound', function(position) {
    var mycords = position.latlng;
    var marker = L.marker([mycords.lat,mycords.lng]);

    marker.addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();
    socket.emit('coords:me', {latlng: mycords});
  });

  function onReceiveData(position) {
    console.log(position);
    var mycords = position.latlng;
    var marker = L.marker([mycords.lat,mycords.lng]);

    marker.addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();
  }
  socket.on('coord:users',onReceiveData);
}

window.addEventListener('load', onDocumentReady);
