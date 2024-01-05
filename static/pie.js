const apiURL = 'http://127.0.0.1:5000/api/all-data-json';
const ctx = document.getElementById('myPieChart').getContext('2d');

async function fetchDataAndCreateChart() {
    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const labels = Object.keys(data);
        const values = Object.values(data);

        const myPieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: [
                    'Struck pedestrian (On Road)',
                    'Struck pedestrian (Off Road)',
                    'Right angle collision',
                    'Opposite direction side swipe',
                    'Other - Vehicle to Vehicle',
                    'Collision with parked vehicle',
                    'Right turn into oncoming vehicle',
                ],
                datasets: [{
                    data: [473, 79, 2, 1, 4, 3, 2],
                    backgroundColor: [
                        '#EB5406',
                        '#FFA500',
                        '#513B1C',
                        '#347C17',
                        '#EB5406',
                        '#5a23c8',
                        '#FF69B4',
                    ],
                }],
            },
        });
    } catch (error) {
        console.error('Fetch error', error);
    }
}

fetchDataAndCreateChart();
