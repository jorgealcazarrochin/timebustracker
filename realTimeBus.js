mapboxgl.accessToken = 'pk.eyJ1Ijoiam9yZ2VhbGNhemFyMTIiLCJhIjoiY2xtYXplcWd2MHZqNTNmcGRib3ZwaDRsdSJ9.lvg2xWN4Hb16s3JOWSA8Gg';

let map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [-71.104081, 42.365554],
zoom: 14,
});

var busesMarkers = [];
async function run(){
// get bus data    
const locations = await getBusLocations();
console.log(locations)
locations.forEach((bus, i) => {
    var marker = new mapboxgl.Marker()
    .setLngLat([bus.attributes.longitude, bus.attributes.latitude])
    .addTo(map)
    busesMarkers.push(marker);	
})};

async function getBusLocations(){
    const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
    const response = await fetch (url);
    const json   = await response.json();
    return json.data;
}

run();
