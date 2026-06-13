const button=document.getElementById("locationButton");
const output=document.getElementById("output");
let map;

button.addEventListener("click", getLocation);

function getLocation(){
    navigator.geolocation.getCurrentPosition(showPosition, showError);
}

async function showPosition(position){
    const latitude=position.coords.latitude;
    const longitude=position.coords.longitude;
    initializeMap(latitude, longitude);
    output.textContent='Latitude:${latitude} Longitude:${longitude}';
    searchNearby(latitude, longitude);
}

function showError(error){
    output.textContent="Location access denied or unavailable";
}

async function searchNearby(lat, lon){
    const query =
        `https://nominatim.openstreetmap.org/search?q=pav+bhaji&format=jsonv2&limit=10`;

    try{
        const response= await fetch(query);
        const data =await response.json();
        displayPlaces(data);

    }
    catch(error){
        console.log(error);
    }
}

function displayPlaces(places){
    const PlaceList= document.getElementById("placesList");
    placesList.innerHTML="";
    places.forEach(place=>{
        const item= document.createElement("li");
        item.textContent=place.display_name;
        placesList.appendChild(item);
    })
}

function initializeMap(latitude, longitude){
    if(map){
        map.remove();
    }
    map=L.map("map").setView([latitude,longitude], 15);
    L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19
        }
    ).addTo(map);
        L.marker(
        [latitude, longitude]
    ).addTo(map)
    .bindPopup("You are here")
    .openPopup();
}