import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import Flask, jsonify, render_template
from flask_cors import CORS
import os
import json


##### Database Set-up ##########
engine = create_engine("sqlite:///crash_database.db")
Base = automap_base()
Base.prepare(autoload_with=engine)
session = Session(engine)
print(Base.classes.keys())

# dynamically access the table classes
access_crash2 = Base.classes.crash1

####### Flask Set-Up ##############

app = Flask(__name__, static_folder='static', static_url_path='/static')


app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///crash_database.sqlite"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)
#################################
######## FRONT END #############
################################

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/map")
def map_page():
    return render_template("map.html")
@app.route("/introduction")
def introduction_page():
    return render_template("introduction.html")
@app.route("/pie")
def pie_page():
    return render_template("pie.html")
@app.route("/bar")
def bar_page():
    return render_template("bar.html")
@app.route("/lines")
def lines_page():
    return render_template("lines.html")
@app.route("/dashboard")
def dashboard_page():
    return render_template("dashboard.html")
################################
####### BACKEND ###############
################################
# Flask routes

from datetime import datetime

@app.route('/api/all-data-json', methods=['GET'])
def get_data():
    results = session.query(access_crash2).all()
    data = []

    for row in results:
        try:
            # Convert crash_date to a formatted string
            formatted_date = row.crash_date.strftime('%Y-%m-%d')
        except Exception as e:
            print(f"Error processing record with crash_id {row.crash_id}: {e}")
            formatted_date = None

        data.append({
            'crash_id': row.crash_id,
            'crash_date': formatted_date,
            'crash_time': row.crash_time,
            'severity': row.severity,
            'crash_type': row.crash_type,
            'pedestrians': row.pedestrians,
            'pedestrian_casualties': row.pedestrian_casualties,
            'reported_location': row.reported_location,
            'latitude': row.latitude,
            'longitude': row.longitude
        })

    session.close()

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)



