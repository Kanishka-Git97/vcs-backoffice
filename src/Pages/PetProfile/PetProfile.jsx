import { Box, Grid, TextField,MenuItem, IconButton, Button } from '@mui/material'
import React from 'react'
import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/Sidebar/Sidebar'

// Importing Icons
import {AiOutlineUserAdd, AiOutlineCloseCircle} from 'react-icons/ai'

const genders = [
    {value: 'Male', label: 'Male'},
    {value: 'Female', label: 'Female'},
  ];
  const animal = [
    {value: 'Dog', label: 'Dog'},
    {value: 'Cat', label: 'Cat'},
    {value: 'Fish', label: 'Fish'},
    {value: 'Bird', label: 'Bird'},
    {value: 'Rabbit', label: 'Rabbit'},
    {value: 'Hamster', label: 'Hamster'},
    {value: 'Guinea Pig', label: 'Guinea Pig'},
    {value: 'Turtle', label: 'Turtle'},
    {value: 'Snake', label: 'Snake'},
    {value: 'Horse', label: 'Horse'},
    {value: 'Goat', label: 'Goat'},
    {value: 'Pig', label: 'Pig'}
  ];
const PetProfile = () => {
  return (
    <div className='container'>
        <Sidebar index="4" />
        <div className="content">
            <Header title="Pet Profile" tag="Overview of your Client's Pets" />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        {/* Left Side */}
                        <Grid container>
                            <Grid item xs={6}></Grid>
                            <Grid item xs={6}></Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        {/* Right Side */}
                        <div className="form-section">
                <div className="form-header">
                  <span className='form-title'>Edit Profile</span><br/>
                  <span className='form-sub-title'>Edit your Pet details if necessary</span>
                </div>
                <div className="form-content">
                <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <Grid container>
                      <Grid item xs={5} sx={{ mr:2 }}>
                        <TextField id="outlined-basic" label="Pet Name" size='small' variant="outlined" sx={{ width: '100%' }} />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField id="outlined-basic" label="Date of Birth" size='small' type='date' variant="outlined" sx={{ width: '100%' }}  InputLabelProps={{shrink: true}}/>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={6} sx={{ mr:1 }}>
                        <TextField id="outlined-basic" label="Breed" size='small' variant="outlined" sx={{ width: '100%' }} />
                      </Grid>
                      <Grid item xs={5} sx={{ ml:1 }}>
                        <TextField id="outlined-basic" label="Type" size='small' variant="outlined" sx={{ width: '100%' }} select>
                        {animal.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                         ))}
                        </TextField>
                      </Grid>
                    </Grid>
                   
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Sex"
                      helperText="Please select pet's gender"
                      size='small'
                      sx={{ width: '100%' }}
                     
                    >
                      {genders.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                   
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Pet Owner"
                     
                      size='small'
                      sx={{ width: '100%' }}
                    >
                      {/* {owners.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.firstName + ' ' + option.lastName}
                        </MenuItem>
                      ))} */}
                    </TextField>
                    <Button variant='outlined' size='small' sx={{ width: '100%' }} type='submit'>Update Pet Profile</Button>
                </Box>
                </div>
              </div>
                    </Grid>
                </Grid>
            </Box>
        </div>
    </div>
  )
}

export default PetProfile
