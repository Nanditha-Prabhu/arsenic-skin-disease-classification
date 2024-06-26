from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np
import cv2
from flask_cors import CORS
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
import joblib
import tensorflow as tf

app = Flask(__name__)
CORS(app)

# Load the pre-trained model
model = load_model('C:/Users/NANDITHAPRABU/Documents/6thSemMiniProject/models/effnet4446Adam2.h5')

# Load the pre-trained clustering components
scaler = joblib.load('C:/Users/NANDITHAPRABU/Documents/6thSemMiniProject/models/scaler.pkl')  # Make sure to save and load your scaler
pca = joblib.load('C:/Users/NANDITHAPRABU/Documents/6thSemMiniProject/models/pca.pkl')  # Make sure to save and load your PCA model
kmeans = joblib.load('C:/Users/NANDITHAPRABU/Documents/6thSemMiniProject/models/kmeans.pkl')  # Make sure to save and load your KMeans model

def apply_clahe(img):
    # divide into R, G, B channels
    b, g, r = cv2.split(img)

    # Create a CLAHE object
    clahe = cv2.createCLAHE(clipLimit=4.0, tileGridSize=(8,8))

    # Apply CLAHE to each channel
    r_clahe = clahe.apply(r)
    g_clahe = clahe.apply(g)
    b_clahe = clahe.apply(b)

    # Merge R,G,B channels
    output_img = cv2.merge([b_clahe, g_clahe, r_clahe])

    return output_img

# Define a function to preprocess the image
def preprocess_image(image):
    image = apply_clahe(image)
    image = cv2.resize(image, (224, 224))
    image = image.astype("float") / 255.0
    image = np.expand_dims(image, axis=0)
    return image

# Function to extract features for clustering
def extract_features(image):
    base_model = tf.keras.applications.VGG16(input_shape=(224, 224, 3), include_top=False, weights='imagenet')
    features = base_model.predict(image)
    features = features.reshape((features.shape[0], -1))
    return features

@app.route("/predict", methods=["POST"])
def predict():
    data = {"success": False}

    if request.method == "POST":
        # Check if an image was uploaded
        if request.files.get("image"):
            # Read the image
            image = request.files["image"].read()
            image = np.frombuffer(image, dtype=np.uint8)
            image = cv2.imdecode(image, cv2.IMREAD_COLOR)

            # Preprocess the image
            processed_image = preprocess_image(image)

            # Perform inference
            preds = model.predict(processed_image)
            predicted_class = (preds[0] > 0.5).astype(int)
            print('preds ', preds[0])
            # predicted_class = np.argmax(preds)
            print('predicted_class ', predicted_class)

            # Map the predicted class to its label
            label_mapping = {
                1: "Healthy",
                0: "Arsenic infected"
            }
            if predicted_class[0] == 1:
                predicted_label = 'Arsenic infected'

                # Extract features for severity prediction
                features = extract_features(processed_image)
                scaled_features = scaler.transform(features)
                pca_features = pca.transform(scaled_features)
                severity_label = kmeans.predict(pca_features)

                severity_mapping = {
                    0: "low",
                    1: "mid",
                    2: "severe"
                }
                severity = severity_mapping[severity_label[0]]

                # Update response with severity
                data["predictions"] = [
                    {"class_id": int(predicted_class[0]), "class_label": predicted_label, "severity": severity}
                ]
            else:
                predicted_label = 'Healthy'
                data["predictions"] = [
                    {"class_id": int(predicted_class[0]), "class_label": predicted_label}
                ]

            data["success"] = True
            print(data)

    # Return the JSON response
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True, port=8080)


