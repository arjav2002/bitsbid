import React from 'react'
import {Box} from '@mui/material'
import { Favorite} from '@mui/icons-material'

const Footer = () => {
  return (
    <footer style={{color: "#ececec", position: "fixed", bottom:0}}>
        <Box sx={{
            height:40,
            width:'100vw',
            backgroundColor:'#FD5602',
            paddingTop:1
            
        }}>
          <div align="center">
            Made with&nbsp;
            <Favorite sx={{
              marginBottom:-0.5
            }}/>
            &nbsp;by Arjav, Aayush, Nayan, Yash & Ayush
          </div>
        </Box>
    </footer>
        
  )
}

export default Footer