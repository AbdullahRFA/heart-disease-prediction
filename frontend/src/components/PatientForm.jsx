
import { useState } from 'react'

import { predictHeartDisease } from '../services/predictionService'
import PredictionResult from './PredictionResult'

function PatientForm() {

  // Store all 13 patient input values
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: ''
  })

  // Store prediction result
  const [result, setResult] = useState(null)

  // Track API request status
  const [loading, setLoading] = useState(false)

  // Store error messages
  const [error, setError] = useState('')


  // Update form data whenever an input changes
  function handleChange(event) {
    const { name, value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }))

    // Clear previous result when the user changes an input
    setResult(null)
    setError('')
  }


  // Handle form submission
  async function handleSubmit(event) {
    event.preventDefault()

    setLoading(true)
    setError('')
    setResult(null)

    try {

      // Convert form values from strings to numbers
      const patientData = {
        age: Number(formData.age),
        sex: Number(formData.sex),
        cp: Number(formData.cp),
        trestbps: Number(formData.trestbps),
        chol: Number(formData.chol),
        fbs: Number(formData.fbs),
        restecg: Number(formData.restecg),
        thalach: Number(formData.thalach),
        exang: Number(formData.exang),
        oldpeak: Number(formData.oldpeak),
        slope: Number(formData.slope),
        ca: Number(formData.ca),
        thal: Number(formData.thal)
      }

      // Send patient data to FastAPI
      const prediction = await predictHeartDisease(patientData)

      // Store the prediction response
      setResult(prediction)

    } catch (err) {

      // Display an error if the API request fails
      setError(err.message || 'Something went wrong.')

    } finally {

      // Stop loading whether the request succeeds or fails
      setLoading(false)

    }
  }


  return (
    <section className="patient-form-section">

      <h2>Patient Information</h2>

      <p>
        Please provide the following information to generate
        a machine learning prediction.
      </p>

      <form onSubmit={handleSubmit}>

        {/* 1. Age */}
        <div className="form-group">
          <label htmlFor="age">Age (years)</label>

          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="1"
            max="120"
            required
          />
        </div>


        {/* 2. Sex */}
        <div className="form-group">
          <label htmlFor="sex">Sex</label>

          <select
            id="sex"
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            required
          >
            <option value="">Select sex</option>
            <option value="0">Female</option>
            <option value="1">Male</option>
          </select>
        </div>


        {/* 3. Chest Pain Type */}
        <div className="form-group">
          <label htmlFor="cp">Chest Pain Type</label>

          <select
            id="cp"
            name="cp"
            value={formData.cp}
            onChange={handleChange}
            required
          >
            <option value="">Select chest pain type</option>
            <option value="0">0 - Typical angina</option>
            <option value="1">1 - Atypical angina</option>
            <option value="2">2 - Non-anginal pain</option>
            <option value="3">3 - Asymptomatic</option>
          </select>
        </div>


        {/* 4. Resting Blood Pressure */}
        <div className="form-group">
          <label htmlFor="trestbps">
            Resting Blood Pressure (mm Hg)
          </label>

          <input
            type="number"
            id="trestbps"
            name="trestbps"
            value={formData.trestbps}
            onChange={handleChange}
            min="1"
            required
          />
        </div>


        {/* 5. Cholesterol */}
        <div className="form-group">
          <label htmlFor="chol">
            Serum Cholesterol (mg/dl)
          </label>

          <input
            type="number"
            id="chol"
            name="chol"
            value={formData.chol}
            onChange={handleChange}
            min="1"
            required
          />
        </div>


        {/* 6. Fasting Blood Sugar */}
        <div className="form-group">
          <label htmlFor="fbs">
            Fasting Blood Sugar
          </label>

          <select
            id="fbs"
            name="fbs"
            value={formData.fbs}
            onChange={handleChange}
            required
          >
            <option value="">Select fasting blood sugar</option>
            <option value="0">0 - False (120 mg/dl or less)</option>
            <option value="1">1 - True (above 120 mg/dl)</option>
          </select>
        </div>


        {/* 7. Resting ECG */}
        <div className="form-group">
          <label htmlFor="restecg">Resting ECG Result</label>

          <select
            id="restecg"
            name="restecg"
            value={formData.restecg}
            onChange={handleChange}
            required
          >
            <option value="">Select ECG result</option>
            <option value="0">0 - Normal</option>
            <option value="1">1 - ST-T wave abnormality</option>
            <option value="2">2 - Left ventricular hypertrophy</option>
          </select>
        </div>


        {/* 8. Maximum Heart Rate */}
        <div className="form-group">
          <label htmlFor="thalach">
            Maximum Heart Rate Achieved
          </label>

          <input
            type="number"
            id="thalach"
            name="thalach"
            value={formData.thalach}
            onChange={handleChange}
            min="1"
            required
          />
        </div>


        {/* 9. Exercise-Induced Angina */}
        <div className="form-group">
          <label htmlFor="exang">
            Exercise-Induced Angina
          </label>

          <select
            id="exang"
            name="exang"
            value={formData.exang}
            onChange={handleChange}
            required
          >
            <option value="">Select an option</option>
            <option value="0">0 - No</option>
            <option value="1">1 - Yes</option>
          </select>
        </div>


        {/* 10. ST Depression */}
        <div className="form-group">
          <label htmlFor="oldpeak">ST Depression (oldpeak)</label>

          <input
            type="number"
            id="oldpeak"
            name="oldpeak"
            value={formData.oldpeak}
            onChange={handleChange}
            min="0"
            step="any"
            required
          />
        </div>


        {/* 11. Slope */}
        <div className="form-group">
          <label htmlFor="slope">
            Slope of Peak Exercise ST Segment
          </label>

          <select
            id="slope"
            name="slope"
            value={formData.slope}
            onChange={handleChange}
            required
          >
            <option value="">Select slope</option>
            <option value="0">0 - Upsloping</option>
            <option value="1">1 - Flat</option>
            <option value="2">2 - Downsloping</option>
          </select>
        </div>


        {/* 12. Number of Major Vessels */}
        <div className="form-group">
          <label htmlFor="ca">Number of Major Vessels (ca)</label>

          <select
            id="ca"
            name="ca"
            value={formData.ca}
            onChange={handleChange}
            required
          >
            <option value="">Select number of vessels</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>


        {/* 13. Thalassemia */}
        <div className="form-group">
          <label htmlFor="thal">Thalassemia (thal)</label>

          <select
            id="thal"
            name="thal"
            value={formData.thal}
            onChange={handleChange}
            required
          >
            <option value="">Select thal category</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>


        {/* Submit Button */}
        <button
          type="submit"
          className="predict-button"
          disabled={loading}
        >
          {loading ? 'Predicting...' : 'Predict Heart Disease'}
        </button>


        {/* Error Message */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}


        {/* Loading Message */}
        {loading && (
          <p className="loading-message">
            Analyzing patient information...
          </p>
        )}


        {/* Prediction Result */}
        <PredictionResult result={result} />

      </form>

    </section>
  )
}

export default PatientForm
