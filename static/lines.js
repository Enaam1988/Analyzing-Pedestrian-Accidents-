// fetchDataAndCreateChart();
const apiURL = 'http://127.0.0.1:5000/api/all-data-json';
const ctx = document.getElementById('myLineChart').getContext('2d');

async function fetchDataAndCreateChart() {
    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Group the data by year
        const groupedData = groupDataByYear(data);

        // Extract unique crash types
        const crashTypes = [...new Set(data.map((crash) => crash.crash_type))];
        const datasets = crashTypes.map((type) => {
            return {
                label: type,
                data: Object.keys(groupedData).map((year) => {
                    const crashes = groupedData[year];
                    const count = crashes.filter((crash) => crash.crash_type === type).length;
                    return count;
                }),
                borderColor: getRandomColor(),
                borderWidth: 2, // Increase the line width to make it more visible
                borderDash: [], // Change the line style if needed (e.g., [5, 5] for dashed)
                fill: false,
            };
        });
        
        const labels = Object.keys(groupedData);

        const myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets,
            },
        });
    } catch (error) {
        console.error('Fetch error', error);
    }
}

// Helper function to group data by year
function groupDataByYear(data) {
    const groupedData = {};
    data.forEach((crash) => {
        const date = new Date(crash.crash_date);
        const year = date.getFullYear(); // Extract the year from the date
        if (!groupedData[year]) {
            groupedData[year] = [];
        }
        groupedData[year].push(crash);
    });
    return groupedData;
}

// Generate a random color for the line chart
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

fetchDataAndCreateChart();

