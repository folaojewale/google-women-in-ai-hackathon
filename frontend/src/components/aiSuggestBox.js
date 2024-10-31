import '../css_Styles/quoteBox.css'
import React from 'react'

function AiSuggestionDetails({ aiSuggestData, error }) { // Accept props from parent
  return (
    <div className="lquote-info">
      <div className="info">
        <strong>Gemini-1.5's Suggestions</strong>
        {aiSuggestData ? (
          <p>{aiSuggestData.response}</p>
        ) : (
          <p> Generating...</p> // Default placeholder text
        )}
        {error && <p className="error">{error}</p>} {/* Display error if any */}
      </div>
    </div>
  )
}

export default AiSuggestionDetails
