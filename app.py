from flask import Flask, render_template, request, redirect, url_for, g, jsonify, session
#from flask_json import FlaskJSON, JsonError, json_response, as_json

import sys
import datetime
import traceback


from db_con import get_db_instance, get_db

#global_db_con = get_db()

app = Flask(__name__)
#FlaskJSON(app)

app.secret_key = "super secret key"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_id', methods=['GET', 'POST'])
def get_id():
    if request.method == 'POST':
        global_db_con = get_db()
        id = request.form['ID']
        print("Obtained id: " + id)
        cur = global_db_con.cursor()
        sql = """SELECT * FROM keys;"""
        cur.execute(sql)
        match = cur.fetchall()
        for row in match:
            print(row[0])
        for row in match:
            if id == row[0]:
                print("Match was found")
                new = row[1]
                session['pass_back'] = new
                return redirect(url_for('pass_new', data = new))
            session['pass_back'] = "No key found"
            return redirect(url_for('pass_new', data = "No key found"))
        print("Match was never found")
        return "Error no match found"

@app.route('/pass_new')
def pass_new():
    data = session['pass_back']
    return data

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
