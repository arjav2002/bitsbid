import React from 'react'
import { AppBar, Button, Grid, IconButton, Tab, Tabs, Toolbar, Typography, Box, Autocomplete, TextField } from '@mui/material'
import logo from '../../logo_fin.png'
import { AccountCircle } from '@mui/icons-material'

const Navbar = () => {
    return (
        <>
            <AppBar color="primary">
                <Toolbar>

                    <img src={logo} width='120' height='50' alt="logo here"/>
                    {/* <Typography color='secondary'>Bitsbid</Typography> */}
                    <Box style={{flex:1}}></Box>

                    <Autocomplete
                        size='small'
                        sx={{
                            width:500,
                            marginRight:4,
                        }}
                        id="free-solo-demo"
                        freeSolo
                        options={top100Films.map((option) => option.title)}
                        renderInput={(params) => <TextField hint='Search' {...params} color='secondary' />}
                    />  
                    <Button variant='contained' color ='secondary' sx={{
                        marginRight:2,
                    }}>
                        Sell
                    </Button>
                    <IconButton size='large'>
                        <AccountCircle/>
                    </IconButton>
                </Toolbar>                
            </AppBar>
        </>
    )
}

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
]

export default Navbar