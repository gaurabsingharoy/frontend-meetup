import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import Header from './components/Header'
import Footer from './components/Footer'
import useFetch from './useFetch'
import { Link } from 'react-router-dom'
import Events from './components/Events'

function App() {
  return (
    <div className="bg-body-secondary">
      <Header/>
      <main className="container">
        <Events/>
      </main>
      <Footer/>
    </div>
  )
}

export default App
