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
    if request.method == 'POST':
        global_db_con = get_db()
        id = request.form['ID']
        print("Obtained id: " + id)
        cur = global_db_con.cursor()
        sql = f"""SELECT * FROM keys WHERE id = '{id}';"""
        cur.execute(sql)
        match = cur.fetchall()
        for row in match:
            print(row[0])
        for row in match:
            if id == row[0]:
                print("Match was found")
                print(row[1])
                data = row[1]
                cur.close()
                return data
            else:
                return "Error key not found"
        return "Error invalid key"
        

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
