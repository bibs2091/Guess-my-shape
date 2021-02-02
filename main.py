from flask import Flask, request, jsonify, render_template,flash
from flask_cors import CORS, cross_origin
from fastai.vision import *
app = Flask(__name__)
CORS(app, support_credentials=True)
app.secret_key = '\xfd{H\xe5<\x95\xf9\xe3\x96.5\xd1\x01O<!\xd5\xa2\xa0\x9fR"\xa1\xa8'

# route for prediction
@app.route('/', methods=['GET','POST'])
def predict():
    if (request.method == "POST"):     
        return str("hh")
    return render_template("index.html")

