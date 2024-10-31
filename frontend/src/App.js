import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' 
import Navbar from './components/navbar'
import QuoteBoxDetails from './components/quoteBox'
import HomePage from './pages/homePage'
import HealthPage from './pages/healthPage'
import OpportunitiesPage from './pages/opportunitiesPage'
import TechPage from './pages/technologyPage'


function App() {
  return (
    <>
      <Router>
          <Navbar />
          <QuoteBoxDetails />
          <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/health' element={<HealthPage />} />
              <Route path='/opportunities' element={<OpportunitiesPage />} />
              <Route path='/tech' element={<TechPage />} />
          </Routes>
      </Router>
    </>
  )
}

export default App
