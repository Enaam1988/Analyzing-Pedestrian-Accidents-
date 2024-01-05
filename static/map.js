function initMap() {
    let map = L.map('map').setView([-35.260511, 149.132038], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Fetch data from your Flask backend API
    fetch('http://127.0.0.1:5000/api/all-data-json')
        .then(response => response.json())
        .then(data => {
            // Create an empty layer group for markers
            let markers = L.layerGroup().addTo(map);

            data.forEach(crash => {
                let latitude = crash.latitude;
                let longitude = crash.longitude;
                let area = crash.reported_location;
                let date = crash.crash_date; 
                
                // Create a marker with a popup
                let marker = L.marker([latitude, longitude])
                    .bindPopup(`<strong>Reported Location: ${area}</strong><br>Date: ${date}<br>Severity: ${crash.severity}`)
                    .addTo(markers);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Load the Leaflet library dynamically
let script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
script.crossOrigin = '';

script.onload = function () {
    initMap();
};

document.head.appendChild(script);






