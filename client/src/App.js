import React from 'react'
import {ThemeProvider} from '@mui/material/styles'
import theme1 from './utils/theme'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <ThemeProvider theme={theme1}>
      <Navbar />
      <Footer />
    </ThemeProvider>
  )
}

export default App