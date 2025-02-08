from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import os

app = Flask(__name__)
# Load the model and labels
MODEL_PATH = "D:/model/keras_model.h5"
LABELS_PATH = "D:/model/labels.txt"

model = load_model(MODEL_PATH)
with open(LABELS_PATH, "r") as f:
    labels = f.read().splitlines()

# Preprocess the image
def preprocess_image(image):
    image = image.resize((224, 224))  # Resize to match model input size
    image = np.array(image) / 255.0  # Normalize pixel values
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image

# Define the prediction route
@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    image = Image.open(file.stream)
    processed_image = preprocess_image(image)

    # Make prediction
    predictions = model.predict(processed_image)
    predicted_class_index = np.argmax(predictions)
    predicted_class = labels[predicted_class_index]

    return jsonify({"class": predicted_class})

if __name__ == "__main__":
    app.run(debug=True)