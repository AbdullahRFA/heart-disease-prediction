from pathlib import Path

import joblib
import pandas as pd


# Find the backend directory
BASE_DIR = Path(__file__).resolve().parents[2]

# Build the path to the trained ML model
MODEL_PATH = BASE_DIR / "model" / "heart_model.joblib"

# Load the trained model
model = joblib.load(MODEL_PATH)


# Keep the same feature order used during model training
FEATURE_NAMES = [
    "age",
    "sex",
    "cp",
    "trestbps",
    "chol",
    "fbs",
    "restecg",
    "thalach",
    "exang",
    "oldpeak",
    "slope",
    "ca",
    "thal"
]


def predict_heart_disease(patient_data: dict) -> bool:
    """
    Predict whether a patient has heart disease.

    Args:
        patient_data: Dictionary containing 13 patient features.

    Returns:
        True if heart disease is predicted, otherwise False.
    """

    # Convert patient information into a Pandas DataFrame
    patient_df = pd.DataFrame(
        [patient_data],
        columns=FEATURE_NAMES
    )

    # Generate the prediction
    prediction = model.predict(patient_df)[0]

    # Return a Boolean result
    return bool(prediction)