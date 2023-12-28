# Analyzing-Pedestrian-Accidents-
## Project Overview and Purpose

This  Analyzing-Pedestrian-Accidents compiles and analyzes data related to Pedestrian Crashes reported since 2012, as documented by the Australian Federal Police (AFP) through the AFP Crash Report Form. The primary purpose of this project is to provide insights into pedestrian safety and accident patterns in Australia. It aims to:

- **Analyze Crash Data:** This project collects, cleans, and organizes pedestrian crash data reported by the police or the public. By doing so, it seeks to identify trends, hotspots, and contributing factors to pedestrian accidents.

- **Enhance Safety Measures:** Through data-driven insights, this project strives to contribute to improved pedestrian safety measures. The findings may help authorities and urban planners make informed decisions regarding road infrastructure, signage, and traffic regulations.

- **Raise Awareness:** By making this data accessible to the public and researchers, this project aims to raise awareness about pedestrian safety issues. It encourages discussions and initiatives to reduce pedestrian accidents and improve road safety.
This repository serves as a valuable resource for anyone interested in pedestrian safety, urban planning, or road safety initiatives in Australia. It is a starting point for data-driven analysis and discussions aimed at making our streets safer for pedestrians.
## How to Use and Interact with the Project

This data visualization project aims to tell a compelling story using data visualizations, providing insights into a dataset with over 100 records. Below are the steps to interact with the project effectively:

### Prerequisites

Before getting started, make sure you have the following prerequisites installed:

- [Python](https://www.python.org/downloads/)
- [Flask](https://flask.palletsprojects.com/en/2.1.x/installation/)
- [SQLite]( https://www.sqlite.org/download.html)

### Database Setup

To set up the database for this project, follow these steps:

1. **Database Creation:** Using Python in Jupyter Notebook, create a database and connect to an existing SQLite.

   ```python
   # Example for creating a SQLite database
   import sqlite3

   # Connect to the database or create it if it doesn't exist
   conn = sqlite3.connect('your_database.db')


### Running the Project

1. Run the Flask application: 
2. Open your web browser and navigate to the provided URL (usually `http://127.0.0.1:5000/`).

### Interacting with Visualizations

1. On the project website, you will find interactive visualizations created using JavaScript libraries.

2. Use HTML menus, dropdowns, and textboxes to filter and customize the visualizations based on your preferences. These interactive components will allow you to explore the data and gain insights.

3. Explore different aspects of the dataset, change parameters, and observe how the visualizations respond dynamically.

### API Routes (Optional)

If you wish to access the visualizations via API routes, the Flask application provides interactive API endpoints. You can make requests to these endpoints to retrieve specific visualizations as JSON data.

- Example API routes:
- `[/map](http://127.0.0.1:5000/)`: Retrieves data for Visualization map.
- `[/pie](http://127.0.0.1:5000/)`: Retrieves data for Visualization pie.
- `[/bar](http://127.0.0.1:5000/)`: Retrieves data for Visualization bar.
- `[/pie](http://127.0.0.1:5000/)`: Retrieves data for Visualization pie.


