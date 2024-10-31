import React, { createContext, useState } from 'react'

const defaultContextValue = {
  color: '#471d1d',
  setColor: () => {}, // No-op default function
}

export const ColorContext = createContext(defaultContextValue)

export const useColor = () => {
  const context = React.useContext(ColorContext)
  if (context === undefined) {
    throw new Error('useColor must be used within a ColorProvider')
  }
  return context
}

export const ColorProvider = ({ children }) => {
  const [color, setColor] = useState('#471d1d') // default color

  return (
    <ColorContext.Provider value={{ color, setColor }}>
      {children}
    </ColorContext.Provider>
  )
}