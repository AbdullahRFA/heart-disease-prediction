
from pydantic import BaseModel, Field


class HeartDiseaseInput(BaseModel):
    """
    Schema for validating patient information
    received from the frontend.
    """

    age: int = Field(ge=1, le=120, description="Patient age in years")

    sex: int = Field(ge=0, le=1, description="Sex: 0 or 1")

    cp: int = Field(ge=0, le=3, description="Chest pain type")

    trestbps: int = Field(ge=1, description="Resting blood pressure")

    chol: int = Field(ge=1, description="Serum cholesterol")

    fbs: int = Field(ge=0, le=1, description="Fasting blood sugar")

    restecg: int = Field(ge=0, le=2, description="Resting ECG result")

    thalach: int = Field(ge=1, description="Maximum heart rate achieved")

    exang: int = Field(ge=0, le=1, description="Exercise-induced angina")

    oldpeak: float = Field(ge=0, description="ST depression")

    slope: int = Field(ge=0, le=2, description="Slope of peak exercise ST segment")

    ca: int = Field(ge=0, le=4, description="Number of major vessels")

    thal: int = Field(ge=0, le=3, description="Thalassemia category")


class PredictionResponse(BaseModel):
    """
    Schema for the heart disease prediction response.
    """

    heart_disease: bool
