from flask import Flask, request, jsonify
from keras.models import load_model
from PIL import Image, ImageOps
import numpy as np

app = Flask(__name__)

# Disable scientific notation for clarity
np.set_printoptions(suppress=True)

# Load the model and labels
model = load_model("keras_Model.h5", compile=False)
class_names = open("labels.txt", "r").readlines()

def preprocess_image(image):
    # Resize and normalize the image
    size = (224, 224)
    image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)
    image_array = np.asarray(image)
    normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1
    return normalized_image_array

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    image = Image.open(file.stream).convert("RGB")

    # Preprocess the image
    processed_image = preprocess_image(image)

    # Create the input array for the model
    data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
    data[0] = processed_image

    # Make the prediction
    prediction = model.predict(data)
    index = np.argmax(prediction)
    class_name = class_names[index].strip()
    confidence_score = float(prediction[0][index])

    return jsonify({
        "class": class_name,
        "confidence_score": confidence_score
    })

if __name__ == "__main__":
    app.run(debug=True)