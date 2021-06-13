// const stadiumObject = JSON.parse(stadium);
const stadiumLocation = JSON.parse(coords);

mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/light-v10', // style URL
  center: stadiumLocation.coordinates, // starting position [lng, lat]
  zoom: 9, // starting zoom
});

new mapboxgl.Marker()
  .setLngLat(stadiumLocation.coordinates)
  .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML('<h5>Team Stadium</h5>'))
  .addTo(map);
