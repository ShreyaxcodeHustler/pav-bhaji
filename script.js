const button=document.getElementById("locationButton");
const output=document.getElementById("output");

button.addEventListener("click", getLocation);

function getLocation(){
    navigator.geolocation.getCurrentPosition(showPosition, showError);
}

function showPosition(position){
    const latitude=position.coords.latitude;
    const longitude=position.coords.longitude;

    output.textContent='Latitude:${latitude} Longitude:${longitude}';
}

function showError(error){
    output.textContent="Location access denied or unavailable";
}
