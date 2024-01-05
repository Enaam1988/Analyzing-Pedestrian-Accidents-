// // Function to fetch data from the API
async function fetchData() {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/all-data-json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

let severityChart; // Declare the severityChart variable globally

// Function to create and update the severity chart
async function createSeverityChart(data) {
    if (severityChart) {
        severityChart.destroy(); // Destroy the existing chart if it exists
    }
    let severityCounts = {
        'Injury': 0,
        'Fatal': 0,
        'Property Damage Only': 0,
    };

    data.forEach((entry) => {
        severityCounts[entry.severity]++;
    });

    let severityLabels = Object.keys(severityCounts);
    let severityData = Object.values(severityCounts);

    // Create a dataset for each severity category
    let datasets = severityLabels.map((label, index) => {
        let backgroundColors = ['red', 'orange', 'green'];
        return {
            label: label,
            data: [severityData[index]],
            backgroundColor: [backgroundColors[index]],
        };
    });

    severityChart = new Chart(document.getElementById('severityChart'), {
        type: 'bar',
        data: {
            labels: ['Severity Distribution'],
            datasets: datasets,
        },
        options: {
            legend: {
                display: true,
                position: 'top',
            },
        },
    });
}



let crashTypeChart; // Declare the crashTypeChart variable globally
let pedestrianCasualtiesChart; // Declare the pedestrianCasualtiesChart variable globally

// Function to create and update the crash type chart
async function createCrashTypeChart(data) {
    if (crashTypeChart) {
        crashTypeChart.destroy(); // Destroy the existing chart if it exists
    }

    let crashTypes = {'Struck pedestrian (On Road)':0,
    'Struck pedestrian (Off Road)':0,
    'Right angle collision':0,
    'Opposite direction side swipe':0,
    'Other - Vehicle to Vehicle':0,
    'Collision with parked vehicle':0,
    'Right turn into oncoming vehicle':0,};

    data.forEach((entry) => {
        let crashType = entry.crash_type;
        if (crashTypes[crashType]) {
            crashTypes[crashType]++;
        } else {
            crashTypes[crashType] = 1;
        }
    });

    let crashTypeLabels = Object.keys(crashTypes);
    let crashTypeData = Object.values(crashTypes);

    crashTypeChart = new Chart(document.getElementById('crashTypeChart'), {
        type: 'pie',
        data: {
            labels: crashTypeLabels,
            datasets: [{
                data: crashTypeData,
                backgroundColor: ['blue', 'purple', 'gray', 'pink', 'brown', 'cyan','green'],
            }],
        },
    });
}

// Function to create and update the pedestrian casualties chart
async function createPedestrianCasualtiesChart(data) {
    if (pedestrianCasualtiesChart) {
        pedestrianCasualtiesChart.destroy(); // Destroy the existing chart if it exists
    }

    let pedestrianCounts = {
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0,
        
    };

    data.forEach((entry) => {
        let numPedestrians = entry.pedestrian_casualties;
        pedestrianCounts[numPedestrians]++;
    });

    let pedestrianLabels = Object.keys(pedestrianCounts);
    let pedestrianData = Object.values(pedestrianCounts);

    pedestrianCasualtiesChart = new Chart(document.getElementById('pedestrianCasualtiesChart'), {
        type: 'doughnut',
        data: {
            labels: pedestrianLabels,
            datasets: [{
                data: pedestrianData,
                backgroundColor: ['yellow', 'green', 'blue','red'],
            }],
        },
    });
}

// Function to populate the dropdown menu with crash_id values
function populateCrashIdDropdown(data) {
    let crashIdSelect = document.getElementById('crashIdSelect');

    // Get unique crash_id values from the data
    let crashIds = [...new Set(data.map(entry => entry.crash_id))];

    // Populate the dropdown menu
    crashIds.forEach(crashId => {
        const option = document.createElement('option');
        option.value = crashId;
        option.textContent = crashId;
        crashIdSelect.appendChild(option);
    });

    // Add an event listener to handle selection change
    crashIdSelect.addEventListener('change', () => {
        const selectedCrashId = crashIdSelect.value;
        updateDashboard(selectedCrashId, data);
    });
}

// Function to update the dashboard based on selected crash_id
function updateDashboard(selectedCrashId, data) {
    // Filter data based on the selected crash_id
    let filteredData = data.filter(entry => entry.crash_id == selectedCrashId);

    // Update the charts with filtered data
    createSeverityChart(filteredData);
    createCrashTypeChart(filteredData);
    createPedestrianCasualtiesChart(filteredData);
}

// Main function to initialize the dashboard
async function initializeDashboard() {
    let data = await fetchData();
    populateCrashIdDropdown(data);

    // Initialize the dashboard with the first crash_id value
    if (data.length > 0) {
        let initialCrashId = data[0].crash_id;
        updateDashboard(initialCrashId, data);
    }
}

// Call the initializeDashboard function when the page loads
document.addEventListener('DOMContentLoaded', initializeDashboard);

