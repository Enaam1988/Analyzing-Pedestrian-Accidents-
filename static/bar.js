let chartInstance;

// Function to generate a random color
function randomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to create the bar chart
function createBarChart(data) {
  // Check if a chart instance already exists and destroy it
  if (chartInstance) {
    chartInstance.destroy();
  }

  // Count the severity distribution dynamically
  let severityCounts = {};

  data.forEach(item => {
    let severity = item.severity;
    if (severity in severityCounts) {
      severityCounts[severity]++;
    } else {
      severityCounts[severity] = 1;
    }
  });

  let severityData = Object.keys(severityCounts);
  let countData = Object.values(severityCounts);

  // Generate random colors for each bar
  const backgroundColors = severityData.map(() => randomColor());

  // Create a bar chart
  const ctx = document.getElementById('pedestrianCrashChart').getContext('2d');
  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: severityData,
      datasets: [{
        // label: 'Severity Distribution',
        data: countData,
        backgroundColor: backgroundColors,
        borderWidth: 1,
      }]
    },
    options: {plugins: {
      legend: {
          display: false}
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Function to filter data based on selected crash type
function filterDataByCrashType(selectedCrashType, jsonData) {
  return selectedCrashType === 'All' ? jsonData : jsonData.filter(item => item.crash_type === selectedCrashType);
}

// Function to initialize the dashboard
function initDashboard(jsonData) {
  // Select the dropdown menu
  let crashTypeSelect = d3.select("#crashTypeSelect");

  // Extract unique crash types from your data
  let uniqueCrashTypes = [...new Set(jsonData.map(item => item.crash_type))];

  // Append options to the dropdown for each unique crash type
  uniqueCrashTypes.forEach(function (crashType) {
    crashTypeSelect
      .append("option")
      .text(crashType)
      .property("value", crashType);
  });

  // Event listener for dropdown change
  crashTypeSelect.on('change', function () {
    let selectedCrashType = this.value;
    let filteredData = filterDataByCrashType(selectedCrashType, jsonData);
    createBarChart(filteredData);
  });

  // Create a bar chart initially with all data
  createBarChart(jsonData);
}

d3.json("http://127.0.0.1:5000/api/all-data-json")
  .then(function (jsonData) {
    initDashboard(jsonData);
  })
  .catch(function (error) {
    console.error('Error fetching data:', error);
  });