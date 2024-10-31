import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import '../css_Styles/search.css'
import NewsDetails from '../views/newsContentDetails'
import AiSuggestionDetails from '../components/aiSuggestBox'


function HomePage() {
  //state variables
  const [aiSuggestData, setAiSuggestData] = useState(null)
  const [newsData, setnewsData] = useState(null)
  const [error, setError] = useState(null)
  const [titles, setTitles] = useState([])


  //handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    const inputElement = e.target.querySelector('input[name="name"]')
    const searchTerm = inputElement.value

    //fetches data
    const data = await fetchData(searchTerm)

    //check if it was successful
    if(data){
      setnewsData(data)
      setError(null)

      const newsTitles = data.map(newsItem => newsItem.title)
      setTitles(newsTitles)
    } else{
      setError("No result(s) found")
    }
  }

  const fetchData = async (searchTerm) => {
    try {
      //GET request
      const response = await fetch(`http://localhost:4000/news?search=${searchTerm}}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        }
      })

      //check HTTP response
      if (response.ok){
        const json = await response.json()
        console.log(json)
        return json
      } else{
        console.log('Failed to fetch data: ' + response.statusText)
      }
      //catch exceptions 
    } catch(error){
      setError('An error occurred: ' + error.message)
    }
    return null
  }

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

      <div className='searchBox_div'>
      <center><h2>What type of news are you looking for?</h2></center> 

          <form className="searchBox" onSubmit={handleSubmit}>
              <input type="text" placeholder="Search.." name="name" autocomplete="off"/>
              <button type="submit"><FontAwesomeIcon icon={faSearch}/></button>
          </form>
      </div>
      <div className='layout'>
        {newsData && !error ? newsData.map(newsData => (
              <NewsDetails news={newsData} key={newsData.id} />
            )) : null}
      </div>
    </>
  )
}

export default HomePage