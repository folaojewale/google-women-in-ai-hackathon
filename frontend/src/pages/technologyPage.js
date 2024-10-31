import React, { useState, useEffect } from 'react'
import '../css_Styles/search.css'
import NewsDetails from '../views/newsContentDetails'
import AiSuggestionDetails from '../components/aiSuggestBox'

function TechPage() {
  //state variables
  const [aiSuggestData, setAiSuggestData] = useState(null)
  const [newsData, setnewsData] = useState(null)
  const [error, setError] = useState(null)
  const [titles, setTitles] = useState([])

  // Fetch data automatically when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // GET request
        const response = await fetch(`http://localhost:4000/news/technology`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json'
          }
        })

        if (response.ok) {
          const json = await response.json()
          setnewsData(json)
          setError(null)

          const newsTitles = json.map(newsItem => newsItem.title)
          setTitles(newsTitles)
        } else {
          console.log('Failed to fetch data: ' + response.statusText)
        }
      } catch (error) {
        setError('An error occurred: ' + error.message)
      }
    }

    fetchData()
  }, []) // Empty dependency array ensures it runs only once when the component mounts

  useEffect(() => {
    if (titles.length > 0) { // Only run if titles array is not empty
      const fetchAISuggestions = async () => {
        try {
          const response = await fetch('http://localhost:4000/googleai/suggestions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ titles }) // Send titles in the request body
          })

          if (response.ok) {
            const json = await response.json()
            setAiSuggestData(json)
          } else {
            console.log('Failed to get AI suggestions: ' + response.statusText)
          }
        } catch (error) {
          console.error('An error occurred while fetching AI suggestions:', error.message)
        }
      }

      fetchAISuggestions()
    }
  }, [titles])

  return (
    <>
      <AiSuggestionDetails aiSuggestData={aiSuggestData} error={error} />
      <div className='layout'>
        {newsData && !error ? newsData.map(newsData => (
              <NewsDetails news={newsData} key={newsData.id} />
            )) : null}
      </div>
    </>
  )
}

export default TechPage