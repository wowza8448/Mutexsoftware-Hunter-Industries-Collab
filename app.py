from flask import Flask, render_template, request, redirect, url_for, g, jsonify
#from flask_json import FlaskJSON, JsonError, json_response, as_json

import sys
import datetime
import traceback


from db_con import get_db_instance, get_db

#global_db_con = get_db()

app = Flask(__name__)
#FlaskJSON(app)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_id', methods=['GET', 'POST'])
def get_id():
    global_db_con = get_db()
    id = request.form['ID']
    print("Obtained id: " + id)
    cur = global_db_con.cursor()
    sql = """SELECT * FROM keys;"""
    cur.execute(sql)
    match = cur.fetchall()
    for row in match:
        print(row[0])
        if id == row[0]:
            print("Match was found")
            new = row[1]
            return render_template('index.html', pass_back = "hello")
    print("Match was never found")
    return "Error no match found"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
