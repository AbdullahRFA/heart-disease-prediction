import Header from '../components/Header'
import Footer from '../components/Footer'

function PredictionPage() {
  return (
    <div className="app">

      <Header />

      <main className="app-content">
        <h2>Welcome</h2>

        <p>
          Our application will use a trained machine learning
          model to predict the possibility of heart disease.
        </p>
      </main>

      <Footer />

    </div>
  )
}

export default PredictionPage