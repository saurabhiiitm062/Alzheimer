from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS  # CORS for handling Cross-Origin Resource Sharing
import joblib
import logging
from preprocess import preprocess_text

app = Flask(__name__)

# Enable CORS for all routes, allowing requests from any origin
CORS(app, resources={r"/*": {"origins": "*"}})

# Setup logging
logging.basicConfig(level=logging.DEBUG)

# Correct file paths for models and vectorizer
vectorizer_path = "C:/Users/deeps/web development/Pictures/Screenshots/Desktop/alzihmer project/Alzheimer-Detection/backend/vectorizer.joblib"
model_control_path = "C:/Users/deeps/web development/Pictures/Screenshots/Desktop/alzihmer project/Alzheimer-Detection/backend/model_control.joblib"
model_alz_path = "C:/Users/deeps/web development/Pictures/Screenshots/Desktop/alzihmer project/Alzheimer-Detection/backend/model_alz.joblib"

# Load vectorizer
import joblib

try:
    vectorizer_path = "C:/Users/deeps/web development/Pictures/Screenshots/Desktop/alzihmer project/Alzheimer-Detection/backend/vectorizer.joblib"
    vec = joblib.load(vectorizer_path)
    print("Vectorizer loaded successfully!")
except Exception as e:
    print(f"Error loading vectorizer: {e}")

# Load models
try:
    logging.info('Loading control model...')
    model_control = joblib.load(model_control_path)
    logging.info('Control model loaded.')

    logging.info('Loading Alzheimer model...')
    model_alz = joblib.load(model_alz_path)
    logging.info('Alzheimer model loaded.')
except FileNotFoundError as e:
    logging.error(f"Model file not found: {e}")
    raise e

@app.route('/', methods=['GET'])
def get_data():
    """Health check route."""
    return jsonify({"message": "API is Running"})

@app.route('/predict', methods=['POST'])
def predict():
    """Prediction route."""
    try:
        logging.info('Received prediction request.')

        # Extract input data
        data = request.get_json()
        if 'data' not in data:
            raise ValueError("Missing 'data' key in request payload.")

        # Preprocess input text
        features = preprocess_text(data['data'])
        logging.info('Text preprocessed.')

        # Calculate probabilities
        prob_control = model_control.predict_proba(features)
        prob_alz = model_alz.predict_proba(features)
        logging.info(f'Control probabilities: {prob_control}')
        logging.info(f'Alzheimer probabilities: {prob_alz}')

        # Determine prediction and confidence
        prediction = 1 if prob_control[0][1] > prob_alz[0][1] else 0
        confidence = prob_control[0][1] if prediction == 1 else prob_alz[0][1]
        
        logging.info(f'Prediction: {prediction}, Confidence: {confidence}')

        return jsonify({
            'Prediction': prediction,
            'Confidence': confidence
        })
    except Exception as e:
        logging.error(f'Error during prediction: {str(e)}')
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=3000)
