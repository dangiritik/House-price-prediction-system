import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.model_selection import train_test_split

# Synthetic dataset mimicking real-world housing features
np.random.seed(42)
n_samples = 1500

areas = np.random.randint(500, 5000, n_samples)
bedrooms = np.random.randint(1, 6, n_samples)
bathrooms = np.random.randint(1, 5, n_samples)
locations = np.random.choice([0, 1, 2, 3], n_samples)  # 0: Suburban, 1: Urban, 2: Downtown, 3: Luxury
age = np.random.randint(0, 30, n_samples)

# Price formula: base + area*120 + bedrooms*15000 + bathrooms*10000 + location_factor - age*800 + noise
prices = (
    50000
    + (areas * 130)
    + (bedrooms * 18000)
    + (bathrooms * 12000)
    + (locations * 45000)
    - (age * 750)
    + np.random.normal(0, 15000, n_samples)
)

df = pd.DataFrame(
    {
        "area": areas,
        "bedrooms": bedrooms,
        "bathrooms": bathrooms,
        "location": locations,
        "age": age,
        "price": prices,
    }
)

X = df[["area", "bedrooms", "bathrooms", "location", "age"]]
y = df["price"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train Random Forest Regressor
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluation
y_pred = model.predict(X_test)
print(f"R² Score: {r2_score(y_test, y_pred):.4f}")
print(f"MAE: ${mean_absolute_error(y_test, y_pred):,.2f}")

# Save trained model
joblib.dump(model, "model.pkl")
print("Model successfully saved as model.pkl")