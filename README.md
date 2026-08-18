# 🏛️ BharatValuation — AI-Powered Pan-India Real Estate Valuation Platform

An end-to-end Machine Learning web application designed to estimate residential property valuations across all **28 Indian States and 8 Union Territories**. Calibrated exclusively for the Indian real estate market, the system factors in regional base pricing indices, locality tiers, spatial dimensions, BHK configurations, and structural depreciation to generate instant property estimates formatted in Indian Rupees (₹ Lakhs & Crores).

---

## 🌟 Key Highlights

* **Pan-India Coverage:** Comprehensive regional base rate mapping across all 28 states and 8 union territories.
* **Locality Tier Dynamics:** Adaptive pricing multipliers for *Suburban (0.80x)*, *City Core (1.00x)*, and *Prime CBD / Ultra Luxury (1.45x)* sectors.
* **Machine Learning Engine:** Powered by an ensemble **Random Forest Regressor** trained on multi-variable synthetic real estate distributions.
* **Luxury Glassmorphism UI:** Tailored with an ambient **Midnight Navy Blue & Champagne Gold** aesthetic, featuring custom interactive selector cards and continuous circular architectural background animations.
* **Currency Calibrated (INR):** Outputs estimates with smooth cubic ease-out counters in formatted Indian numbering conventions (Lakhs / Crores).

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Backend & Routing** | Python 3.9+, Flask |
| **Machine Learning** | Scikit-Learn, NumPy, Pandas, Joblib |
| **Frontend** | HTML5, Modern CSS3 (Vanilla Glassmorphism & Keyframe Animations), Vanilla JavaScript (ES6+ Fetch API) |
| **Typography & Icons** | Google Fonts (*Cinzel*, *Plus Jakarta Sans*), FontAwesome 6 |

---

## 📁 Project Architecture

```text
house-price-prediction-system/
├── static/
│   ├── style.css             # Navy & Gold luxury styles, glassmorphism & orbital animations
│   └── script.js            # Asynchronous prediction handler & INR counter formatter
├── templates/
│   └── index.html            # Interactive valuation dashboard & state selector
├── app.py                    # Flask server exposing REST API endpoints
├── train_model.py            # Dataset synthesis & Random Forest training pipeline
├── model.pkl                 # Serialized multi-state regression model artifact
├── requirements.txt          # Production & development dependencies
└── README.md                 # Project documentation

## ⚡ Quickstart Guide
1. Clone repository:
   ```bash
   git clone [https://github.com/dangiritik/house-price-prediction-system.git](https://github.com/dangiritik/house-price-prediction-system.git)
   cd house-price-prediction-system
