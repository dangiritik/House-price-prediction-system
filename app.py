import joblib
import numpy as np
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

# Load trained Random Forest Regressor
model = joblib.load("model.pkl")


@app.route("/")
def home():
  return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
  try:
    data = request.get_json()

    state = int(data.get("state"))
    area = float(data.get("area"))
    bedrooms = int(data.get("bedrooms"))
    bathrooms = int(data.get("bathrooms"))
    locality_tier = int(data.get("locality_tier"))
    age = int(data.get("age"))

    features = np.array(
        [[state, area, bedrooms, bathrooms, locality_tier, age]]
    )
    predicted_val = model.predict(features)[0]

    return jsonify({
        "status": "success",
        "predicted_price": round(max(300000, float(predicted_val)), 2),
    })
  except Exception as e:
    return jsonify({"status": "error", "message": str(e)}), 400


if __name__ == "__main__":
  app.run(debug=True, port=5000)