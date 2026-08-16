import joblib
import numpy as np
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

# Load trained regression model
model = joblib.load("model.pkl")


@app.route("/")
def home():
  return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
  try:
    data = request.get_json()
    area = float(data.get("area"))
    bedrooms = int(data.get("bedrooms"))
    bathrooms = int(data.get("bathrooms"))
    location = int(data.get("location"))
    age = int(data.get("age"))

    features = np.array([[area, bedrooms, bathrooms, location, age]])
    prediction = model.predict(features)[0]

    return jsonify({
        "status": "success",
        "predicted_price": round(max(0, float(prediction)), 2),
    })
  except Exception as e:
    return jsonify({"status": "error", "message": str(e)}), 400


if __name__ == "__main__":
  app.run(debug=True, port=5000)