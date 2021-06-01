const playerLocation = JSON.parse(geometry);
const playerObject = JSON.parse(player);
const teamObject = JSON.parse(team);

mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/light-v10', // style URL
  center: playerLocation.coordinates, // starting position [lng, lat]
  zoom: 9, // starting zoom
});

new mapboxgl.Marker()
  .setLngLat(playerLocation.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h3>${playerObject.FirstName} ${playerObject.LastName}</h3><p>${teamObject.Name}</p>`
    )
  )
  .addTo(map);
