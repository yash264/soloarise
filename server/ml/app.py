# install dependencies
from flask import Flask, request, jsonify, render_template
import joblib
import numpy as np
import pandas as pd
from suggestions import recommend_tasks
from flask_cors import CORS

app = Flask(__name__)

# set the cors value
cors_options = {
    "origins": "https://soloariseserver.onrender.com",
    "methods": ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    "allow_headers": ["Content-Type", "Authorization"],
    "supports_credentials": True
}


# Apply CORS to the app with specific options
CORS(app, resources={r"/*": cors_options})

# Load model and label encoder
model = joblib.load('models/difficulty_predictor.pkl')


@app.route('/')
def home():
    return "<h1>Welcome to Server Side.</h1>"

# Classify student performance
def classify_level(prediction):
    if prediction == 1:
        return "easy"
    elif prediction == 2:
        return "medium"
    else:
        return "hard"


# route to predicting the score
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        previous_level = int(data.get('previous_level'))
        points = int(data.get('points'))

        # Predict performance category
        prediction = model.predict(np.array([[previous_level, points]]))
        level=classify_level(prediction)

        # Get recommendation
        recommendation = recommend_tasks(level)

        return jsonify({
            'prediction': str(level),
            'recommendation': recommendation,
            })
    
    except Exception as error:
        return jsonify({"error": str(error)})


if __name__ == '__main__':
    app.run(debug=True)