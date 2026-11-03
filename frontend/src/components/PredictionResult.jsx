function PredictionResult({ result }) {

  if (!result) {
    return null
  }

  return (
    <div className="prediction-result">

      <h3>Prediction Result</h3>

      {result.heart_disease ? (
        <p className="result-positive">
          The model predicts the presence of heart disease.
        </p>
      ) : (
        <p className="result-negative">
          The model predicts the absence of heart disease.
        </p>
      )}

      <p className="result-disclaimer">
        This is an educational machine learning prediction,
        not a medical diagnosis.
      </p>

    </div>
  )
}

export default PredictionResult