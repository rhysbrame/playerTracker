const stadiumObject = JSON.parse(stadiumObj);
console.log(stadiumObject);
mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/light-v10', // style URL
  center: stadiumObject.geometry.coordinates, // starting position [lng, lat]
  zoom: 9, // starting zoom
});

new mapboxgl.Marker()
  .setLngLat(stadiumObject.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `
      <h3>${stadiumObject.Name}</h3>
      <h5>${stadiumObject.City}, ${stadiumObject.State}</h5>
      `
    )
  )
  .addTo(map);
