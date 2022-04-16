from flask import Flask, render_template, request, redirect, url_for, g, jsonify, session

import sys
import datetime
import traceback


from db_con import get_db_instance, get_db



app = Flask(__name__)


app.secret_key = "super secret key"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/SensorReadings/GetSensorZoneReadingsForSiteId', methods=['POST', 'GET'])
def get_id():
    data = {'firstname':'john', 'lastname':'doe'}
    return data

@app.route('/guid_test', methods=['POST', 'GET'])
def get_guid():
    return {'name': 'john', 'temp':'alt'}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
