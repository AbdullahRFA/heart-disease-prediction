from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import HeartDiseaseInput, PredictionResponse
from app.services.prediction import predict_heart_disease
import os

# Create the FastAPI application
app = FastAPI(
    title="Heart Disease Prediction API",
    description="An API that predicts heart disease using a trained Machine Learning model.",
    version="1.0.0"
)

# Configure CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

frontend_url = os.getenv("FRONTEND_URL")

if frontend_url:
    origins.append(frontend_url.rstrip("/"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# -----------------------------------------
# 1. Health Check Endpoint
# -----------------------------------------

@app.get("/")
def welcome():
    return {
        "message": "Welcome to the Heart Disease Prediction API. Use /docs for API documentation."
    }

@app.get("/health")      #decorator to define a GET endpoint at the path "/health"
def health_check():
    return {
        "status": "healthy",
        "message": "Heart Disease Prediction API is running."
    }


# -----------------------------------------
# 2. API Information Endpoint
# -----------------------------------------

@app.get("/info")       #decorator to define a GET endpoint at the path "/info"
def get_api_info():
    return {
        "project": "Heart Disease Prediction",
        "model": "Logistic Regression",
        "framework": "FastAPI",
        "features": 13,
        "prediction_type": "Binary Classification"
    }


# -----------------------------------------
# 3. Heart Disease Prediction Endpoint
# -----------------------------------------

# decorator to define a POST endpoint at the path "/predict" with a response model of PredictionResponse

@app.post("/predict", response_model=PredictionResponse)    
def predict(patient: HeartDiseaseInput):

    # Convert validated patient data into a dictionary
    patient_data = patient.model_dump()

    # Generate prediction using our ML service
    result = predict_heart_disease(patient_data)

    # Return the prediction
    return PredictionResponse(
        heart_disease=result
    )