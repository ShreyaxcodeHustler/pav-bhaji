# 🍽️ Nearby Food Finder 

A location-based web application that helps users discover nearby restaurants using OpenStreetMap data and interactive maps.

The application uses the browser's Geolocation API to detect the user's current location, displays it on an interactive Leaflet map, and finds nearby restaurants within a selected search radius.

---

## 🚀 Features

### 📍 Geolocation

* Detects the user's current location using the browser Geolocation API.
* Displays the user's location on the map.

### 🗺️ Interactive Map

* Built using Leaflet.js.
* Displays markers for nearby restaurants.
* Shows popups with restaurant information.

### 🔍 Nearby Restaurant Search

* Searches nearby restaurants using the OpenStreetMap Overpass API.
* Supports configurable search radius:

  * 1 km
  * 5 km
  * 10 km

### 📏 Distance Calculation

* Calculates the distance between the user and each restaurant using the Haversine Formula.
* Sorts restaurants by nearest distance.

### 🎯 Interactive Results

* Clicking a restaurant card:

  * Highlights the selected card.
  * Zooms to the restaurant on the map.
  * Opens the restaurant marker popup.

### ⭐ Favorites

* Save favorite restaurants.
* Favorites are stored using Local Storage.
* Saved favorites persist across page refreshes.

### ⚡ User Experience Improvements

* Loading indicators.
* Error handling.
* Automatic retry for temporary network issues.
* Handles API rate limits and server busy responses.

---

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript (ES6)
* Leaflet.js
* OpenStreetMap
* Overpass API
* Browser Geolocation API
* Local Storage API

---

## 📂 Project Structure

```text
Pav-Bhaji-Finder/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## ▶️ How to Run

1. Clone the repository:

```bash
git clone https://github.com/your-username/pav-bhaji-finder.git
```

2. Open the project folder.

3. Launch using VS Code Live Server or any local web server.

4. Allow location permissions when prompted.

5. Click **Find Nearby Pav Bhaji**.

---

## 🧠 Concepts Demonstrated

* DOM Manipulation
* Event Handling
* Async/Await
* Fetch API
* REST API Consumption
* Geolocation API
* Local Storage
* Distance Calculation (Haversine Formula)
* Dynamic UI Rendering
* Interactive Maps

---

## 🔮 Future Improvements

* Search for any food item instead of only Pav Bhaji.
* Mobile responsive UI.
* Favorite restaurants panel.
* Search history.
* Category filtering.
* Restaurant ratings and reviews.
* Deployment using GitHub Pages.

---

## 📸 Screenshots

Add screenshots of:

* Home screen
* Restaurant search results
* Interactive map
* Favorites feature

---

## 👨‍💻 Author

Developed as a frontend web development project to practice:

* JavaScript
* APIs
* Maps
* Geolocation
* User Interface Design
