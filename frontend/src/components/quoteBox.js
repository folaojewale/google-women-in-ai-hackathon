import '../css_Styles/quoteBox.css'
import React, { useState, useEffect } from 'react'

function QuoteBoxDetails() {
  // state variables
  const [quoteData, setQuoteData] = useState(null) // This holds the fetched data
  const [error, setError] = useState(null) // This handles errors

  // Fetch data automatically when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // GET request
        const response = await fetch(`http://localhost:4000/googleai`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json'
          }
        })

        if (response.ok) {
          const json = await response.json()
          setQuoteData(json)
          setError(null)
        } else {
          console.log('Failed to fetch data: ' + response.statusText)
        }
      } catch (error) {
        setError('An error occurred: ' + error.message)
      }
    }

    fetchData()
  }, []) // Empty dependency array ensures it runs only once when the component mounts

  return (
    <div className="quote-info">
      <div className="info">
        <strong>Gemini-1.5's Words of Wisdom</strong>
        {quoteData ? (
          <p>{quoteData.response}</p>
        ) : (
          <p> Generating...</p> // Default placeholder text
        )}
        {error && <p className="error">{error}</p>} {/* Display error if any */}
      </div>
    </div>
  )
}

export default QuoteBoxDetails
