import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.model_selection import train_test_split

np.random.seed(42)
n_samples = 6000

# Base average price per sq.ft. (in ₹ INR) across all 28 States & 8 UTs
region_rates = {
    # 28 States
    0: 6200,  # Andhra Pradesh
    1: 4100,  # Arunachal Pradesh
    2: 4800,  # Assam
    3: 4500,  # Bihar
    4: 4200,  # Chhattisgarh
    5: 8800,  # Goa
    6: 6200,  # Gujarat
    7: 7800,  # Haryana
    8: 5600,  # Himachal Pradesh
    9: 4400,  # Jharkhand
    10: 9500,  # Karnataka
    11: 6400,  # Kerala
    12: 4900,  # Madhya Pradesh
    13: 13500,  # Maharashtra
    14: 4200,  # Manipur
    15: 4600,  # Meghalaya
    16: 3900,  # Mizoram
    17: 4100,  # Nagaland
    18: 5100,  # Odisha
    19: 5800,  # Punjab
    20: 5200,  # Rajasthan
    21: 4900,  # Sikkim
    22: 7600,  # Tamil Nadu
    23: 8400,  # Telangana
    24: 3800,  # Tripura
    25: 5600,  # Uttar Pradesh
    26: 5900,  # Uttarakhand
    27: 6100,  # West Bengal
    # 8 Union Territories
    28: 5400,  # Andaman and Nicobar Islands
    29: 9200,  # Chandigarh
    30: 4800,  # Dadra and Nagar Haveli and Daman and Diu
    31: 12800,  # Delhi (NCT)
    32: 5200,  # Jammu and Kashmir
    33: 4600,  # Ladakh
    34: 4300,  # Lakshadweep
    35: 6500,  # Puducherry
}

states = np.random.choice(range(36), n_samples)
areas = np.random.randint(450, 5000, n_samples)
bedrooms = np.random.randint(1, 6, n_samples)
bathrooms = np.random.randint(1, 5, n_samples)
locality_tier = np.random.choice(
    [0, 1, 2], n_samples, p=[0.3, 0.45, 0.25]
)  # 0: Outskirts, 1: City Hub, 2: Luxury/CBD
age = np.random.randint(0, 30, n_samples)

base_rates = np.array([region_rates[s] for s in states])
locality_multiplier = np.array([0.8, 1.0, 1.45])[locality_tier]

# Price calculation formula with real estate market weights
prices = (
    (areas * base_rates * locality_multiplier)
    + (bedrooms * 220000)
    + (bathrooms * 140000)
    - (age * 35000)
    + np.random.normal(0, 100000, n_samples)
)

df = pd.DataFrame({
    'state': states,
    'area': areas,
    'bedrooms': bedrooms,
    'bathrooms': bathrooms,
    'locality_tier': locality_tier,
    'age': age,
    'price': prices,
})

X = df[['state', 'area', 'bedrooms', 'bathrooms', 'locality_tier', 'age']]
y = df['price']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = RandomForestRegressor(n_estimators=150, random_state=42)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
print(f"R² Score: {r2_score(y_test, y_pred):.4f}")
print(f"MAE: ₹{mean_absolute_error(y_test, y_pred):,.2f}")

joblib.dump(model, 'model.pkl')
print('Pan-India 28 States + 8 UTs Model saved successfully to model.pkl')