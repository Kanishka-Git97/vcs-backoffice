import { Box, Grid } from '@mui/material'
import React from 'react'
import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/Sidebar/Sidebar'

const PetProfile = () => {
  return (
    <div className='container'>
        <Sidebar index="4" />
        <div className="content">
            <Header title="Pet Profile" tag="Overview of your Client's Pets" />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        {/* Left Side */}
                    </Grid>
                    <Grid item xs={2}>
                        {/* Right Side */}
                    </Grid>
                </Grid>
            </Box>np
        </div>
    </div>
  )
}

export default PetProfile
