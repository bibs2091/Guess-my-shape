from flask import Flask, request, jsonify, render_template,flash
from flask_cors import CORS, cross_origin
from fastai.vision.all import *
# from PIL import Image
import base64
import io
import pathlib
import numpy as np
app = Flask(__name__)
CORS(app, support_credentials=True)
app.secret_key = '\xfd{H\xe5<\x95\xf9\xe3\x96.5\xd1\x01O<!\xd5\xa2\xa0\x9fR"\xa1\xa8'

# for windows

# def load_posix_learner():
#     save = pathlib.PosixPath
#     pathlib.PosixPath = pathlib.WindowsPath
#     learner = load_learner('model.pkl')
#     pathlib.PosixPath = save 
#     return learner

def predict_sketch(img):
    pred,pred_idx,probs = learner.predict(img)
    predictions = sorted(zip(classes, map(float, probs)), key=lambda p: p[1], reverse=True)
    # print(predictions[:10])
    return predictions

# load the learner
# learner = load_posix_learner()
learner = load_learner('model.pkl')
classes = learner.dls.vocab

# route for prediction
@app.route('/', methods=['GET','POST'])
def predict():
    if (request.method == "POST"): 
        image_b64 = request.get_data()
        base64_decoded = base64.b64decode(image_b64)
        image = Image.open(io.BytesIO(base64_decoded)).convert('L')
        image.thumbnail( [28,28],Image.ANTIALIAS )
        image_np = np.asarray(image)
        predictions = predict_sketch(image_np)
        return jsonify(
            answers=[predictions[0][0],predictions[1][0]]
        )
    return render_template("index.html")

