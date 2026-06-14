const button = document.getElementById("locationButton");
const output = document.getElementById("output");

let map;
let restaurantMarkers = [];

button.addEventListener("click", getLocation);

// -----------------------------
// Get user location
// -----------------------------
function getLocation() {
    button.disabled = true; // prevent multiple clicks
    navigator.geolocation.getCurrentPosition(
        showPosition,
        showError
    );
}

// -----------------------------
// Success: location received
// -----------------------------
async function showPosition(position) {

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    output.textContent =
        `Latitude: ${latitude.toFixed(5)}
         Longitude: ${longitude.toFixed(5)}`;

    initializeMap(latitude, longitude);

    // start search
    searchNearby(latitude, longitude);
}

// -----------------------------
// Error: location denied
// -----------------------------
function showError(error) {
    output.textContent =
        "Location access denied or unavailable";

    button.disabled = false; // re-enable button
}

// -----------------------------
// Search nearby restaurants
// -----------------------------
async function searchNearby(lat, lon) {

    output.textContent =
        "Searching for nearby pav bhaji places...";

    const radius =
        document.getElementById("radius").value;

    console.log("Radius:", radius);

    const query = `
    [out:json];
    (
      node["amenity"="restaurant"]
      (around:${radius},${lat},${lon});

      way["amenity"="restaurant"]
      (around:${radius},${lat},${lon});

      relation["amenity"="restaurant"]
      (around:${radius},${lat},${lon});
    );
    out center;
    `;

    try {

        const response = await fetch(
            "https://overpass-api.de/api/interpreter",
            {
                method: "POST",
                body: query
            }
        );

        // -----------------------------
        // Handle HTTP errors
        // -----------------------------
        if (!response.ok) {

            const errorText = await response.text();
            console.log(errorText);

            if (response.status === 429) {
                output.textContent =
                    "Too many requests. Please wait and try again.";

                button.disabled = false;
                return;
            }

            throw new Error("Overpass query failed");
        }

        const data = await response.json();

        // -----------------------------
        // Add distance to each place
        // -----------------------------
        const places = data.elements.map(place => {

            const placeLat =
                place.lat || place.center?.lat;

            const placeLon =
                place.lon || place.center?.lon;

            const distance =
                calculateDistance(
                    lat,
                    lon,
                    placeLat,
                    placeLon
                );

            return {
                ...place,
                distance
            };
        });

        // sort nearest first
        places.sort((a, b) =>
            a.distance - b.distance
        );

        displayPlaces(places);

        output.textContent =
            `Found ${places.length} places within ${radius}m radius.`;

        button.disabled = false; // re-enable button

    } catch (error) {

        console.log(error);

        output.textContent =
            "Network issue. Retrying in 3 seconds...";

        // retry logic (safe now)
        setTimeout(() => {
            searchNearby(lat, lon);
        }, 3000);
    }
}

// -----------------------------
// Render list + markers
// -----------------------------
function displayPlaces(places) {

    // remove old markers
    restaurantMarkers.forEach(marker => {
        map.removeLayer(marker);
    });

    restaurantMarkers = [];

    const placesList =
        document.getElementById("placesList");

    placesList.innerHTML =
        "<p>Loading results...</p>";

    places.forEach(place => {

        const item =
            document.createElement("li");

        const name =
            place.tags?.name ||
            "Unnamed Place";

        const address =
            place.tags?.addr_street ||
            "Address unavailable";

        item.className = "place-card";

        item.innerHTML = `
            <div class="place-name">🍽 ${name}</div>
            <div class="place-address">📍 ${address}</div>
            <div class="place-distance">🚶 ${place.distance.toFixed(2)} km away</div>
        `;

        placesList.appendChild(item);

        const markerLat =
            place.lat || place.center?.lat;

        const markerLon =
            place.lon || place.center?.lon;

        if (markerLat && markerLon) {

            const marker = L.marker([
                markerLat,
                markerLon
            ])
            .addTo(map)
            .bindPopup(
                `${name}<br>
                 ${place.distance.toFixed(2)} km`
            );

            restaurantMarkers.push(marker);

            // click list → zoom map
            item.addEventListener("click", () => {

                map.setView(
                    [markerLat, markerLon],
                    18
                );

                marker.openPopup();
            });
        }
    });
}

// -----------------------------
// Initialize map
// -----------------------------
function initializeMap(latitude, longitude) {

    if (map) {
        map.remove();
    }

    map = L.map("map")
        .setView([latitude, longitude], 14);

    L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19
        }
    ).addTo(map);

    L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup("You are here")
        .openPopup();
}

// -----------------------------
// Distance (Haversine formula)
// -----------------------------
function calculateDistance(
    lat1, lon1, lat2, lon2
) {

    const R = 6371;

    const dLat =
        (lat2 - lat1) * Math.PI / 180;

    const dLon =
        (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +

        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *

        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );

    return R * c;
}