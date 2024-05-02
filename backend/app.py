from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np
import cv2
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the pre-trained model
model = load_model('C:/Users/Lenovo/ai-based_tool_for_preliminary_diagnosis_of_dermatological_manifestations/backend/my_model20.h5')

# Define a function to preprocess the image
def preprocess_image(image):
    image = cv2.resize(image, (224, 224))
    image = image.astype("float") / 255.0
    image = np.expand_dims(image, axis=0)
    return image

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
            predicted_class = np.argmax(preds)

            # Map the predicted class to its label
            label_mapping = {
                0: "Acne and Rosacea Photos",
                1: "Actinic Keratosis Basal Cell Carcinoma and other Malignant Lesions",
                2: "Malignant Lesions",
                3: "Atopic Dermatitis Photos",
                4: "Bullous Disease Photos",
                5: "Cellulitis Impetigo and other Bacterial Infections",
                6: "Eczema Photos",
                7: "Exanthems and Drug Eruptions",
                8: "Hair Loss Photos Alopecia and other Hair Diseases",
                9: "Herpes HPV and other STDs Photos",
                10: "Light Diseases and Disorders of Pigmentation",
                11: "Lupus and other Connective Tissue diseases",
                12: "Melanoma Skin Cancer Nevi and Moles",
                13: "Nail Fungus and other Nail Disease",
                14: "Poison Ivy Photos and other Contact Dermatitis",
                15: "Psoriasis pictures Lichen Planus and related diseases",
                16: "Scabies Lyme Disease and other Infestations and Bites",
                17: "Seborrheic Keratoses and other Benign Tumors",
                18: "Systemic Disease",
                19: "Tinea Ringworm Candidiasis and other Fungal Infections",
                20: "Urticaria Hives",
                21: "Vascular Tumors",
                22: "Vasculitis Photos",
                23: "Warts Molluscum and other Viral Infections",
            }
            predicted_label = label_mapping.get(int(predicted_class), "Unknown")

            # Update the response data
            data["predictions"] = [{"class_id": int(predicted_class), "class_label": predicted_label}]
            data["success"] = True

    # Return the JSON response
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True, port=8080)


