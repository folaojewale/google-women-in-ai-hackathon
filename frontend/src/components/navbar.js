import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
// import { faAnglesLeft, faMoon, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../css_Styles/navbar.css'
import { useColor } from '../context/ColorContext'


const Navbar = () => {

  // React Router hook to get the current location
  const location = useLocation()

  // Check if the current page is the homepage ("/")
  const homepage = location.pathname === '/'

  const { setColor } = useColor()
  const [isColourChanged, setIsColourChanged] = useState(
    localStorage.getItem('isColourChanged') === 'true'
  )
  
  useEffect(() => {
    const rootStyle = getComputedStyle(document.documentElement)
    if (!isColourChanged) {
      localStorage.setItem('primary', rootStyle.getPropertyValue('--primary').trim())
      localStorage.setItem('secondary', rootStyle.getPropertyValue('--secondary').trim())
      localStorage.setItem('background', rootStyle.getPropertyValue('--lightBG').trim())
      localStorage.setItem('button', rootStyle.getPropertyValue('--buttonColour').trim())
      localStorage.setItem('titleText', rootStyle.getPropertyValue('--lightText').trim())
    }
  }, []) // Empty dependency array to run only on component mount
  
  //change Colour function
  const change = () => {
    const rootStyle = getComputedStyle(document.documentElement)
    let newIsColourChanged = !isColourChanged // Calculate the new state first
  
    if (!newIsColourChanged) {
      const darkPrimary = rootStyle.getPropertyValue('--darkPrimary').trim()
      const darkSecondary = rootStyle.getPropertyValue('--darkSecondary').trim()
      const darkBG = rootStyle.getPropertyValue('--darkBG').trim()
      const darkButtonColour = rootStyle.getPropertyValue('--darkButtonColour').trim()
      const darkTitle = rootStyle.getPropertyValue('--darkText').trim()
      setColor('#a7e2f2')

      document.documentElement.style.setProperty('--primary', darkPrimary)
      document.documentElement.style.setProperty('--secondary', darkSecondary)
      document.documentElement.style.setProperty('background', darkBG)
      document.documentElement.style.setProperty('--buttonColour', darkButtonColour)
      document.documentElement.style.setProperty('--lightText', darkTitle)
    } else {
      document.documentElement.style.setProperty('--primary', localStorage.getItem('primary'))
      document.documentElement.style.setProperty('--secondary', localStorage.getItem('secondary'))
      document.documentElement.style.setProperty('background', localStorage.getItem('background'))
      document.documentElement.style.setProperty('--buttonColour', localStorage.getItem('button'))
      document.documentElement.style.setProperty('--lightText', localStorage.getItem('titleText'))
      setColor('#0000FF')
    }
  
    setIsColourChanged(newIsColourChanged)
    localStorage.setItem('isColourChanged', newIsColourChanged)
  }
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Equal4Me</h1>
        </Link>
        <nav className='left'>
          <Link to="/opportunities">
            <h1>Opportunities</h1>
          </Link>

          <Link to="/health">
            <h1>Health</h1>
          </Link>

          <Link to="/tech">
            <h1>Technology</h1>
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar