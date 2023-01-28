import { Box, Grid, StepLabel, Stepper, Step, StepContent, TextField, MenuItem, Button, Avatar, Typography} from '@mui/material'
import React, {useState} from 'react'
import side from '../../Assets/bow-wow-gourmet-dog-treats-are-healthy-natural-low-4.png'
import './register.css'

const titles = [
  {value: 'Doc', label: 'Doc'},
  {value: 'Mr', label: 'Mr'},
  {value: 'Ms', label: 'Ms'}
];


const Register = () => {
  // States
  const [activeStep, setActiveStep] = useState(0);
  const [avatar, setAvatar] = useState(null);

  // Handle Next Button
  const handleNextButton = () =>{
    setActiveStep((activeStep)=> activeStep + 1);
  }

  // Handle Back Button
  const handleBackButton = () =>{
    setActiveStep((activeStep)=> activeStep - 1);
  }

  // Profile Input
  const openFileDialog = () =>{
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = handleInputSelection
    input.click();
  }

  // handleInput File Selection 
  const handleInputSelection = (event) =>{
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) =>{
      setAvatar(event.target.result);
    };
    reader.readAsDataURL(file);
  }
  return (
    <div className='container'>
      <div className="content">
       
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={10}>
                  {/* Registration Stepper */}
                   <Box sx={{ minWidth: 400 }} >
                    <Stepper activeStep={activeStep} orientation="vertical">
                      <Step key="personal-info">
                        <StepLabel>Personal Information</StepLabel>
                        <StepContent>
                          <Typography sx={{ mb:2, fontSize: 12 }}>Sign up and be a part of something great! Our community is made up of passionate, like-minded individuals and by registering, you'll have the opportunity to connect and collaborate with them and Expand your Service.</Typography>
                          <Avatar variant='rounded' sx={{ mb:1, height: 100, width: 100 }} onClick={openFileDialog} src={avatar}>
                            
                          </Avatar>
                          
                          <Grid container>
                            <Grid item xs={2}>
                            <TextField
                              id="select-title"
                              select
                              label="Title"
                              size='small'
                              sx={{ width: '100%' }}
                            >
                              {titles.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                            </Grid>
                            <Grid item xs={5}>
                              <TextField id='first-name' label='First Name' size='small' variant='outlined' sx={{ width: '100%', ml: 2 }}/>
                            </Grid>
                            <Grid item xs={5}>
                              <TextField id='last-name' label='Last Name' size='small' variant='outlined' sx={{ width: '100%', ml: 3 }}/>
                            </Grid>
                          </Grid>
                          <Grid container sx={{ mt: 2 }}>
                            <Grid item xs={5}>
                              <TextField id='nic' label='NIC Number' size='small' variant='outlined' sx={{ width: '100%' }}/>
                            </Grid>
                            <Grid item xs={7}>
                            <TextField id='address' label='Home Address' size='small' variant='outlined' sx={{ width: '100%', ml: 3 }}/>
                            </Grid>
                          </Grid>
                          <Grid container sx={{ mt:2 }}>
                            <Grid item xs={3}>
                            <TextField id='m-tel' label='Mobile Number' size='small' variant='outlined' sx={{ width: '100%' }}/>
                            </Grid>
                            <Grid item xs={3}>
                            <TextField id='l-tel' label='Land Number' size='small' variant='outlined' sx={{ width: '100%', ml: 2 }}/>
                            </Grid>
                            <Grid item xs={6}>
                            <TextField id='email' label='Email Address' size='small' variant='outlined' sx={{ width: '100%', ml: 3 }}/>
                            </Grid>
                          </Grid>
                          <Button variant='outlined' size='small' sx={{ mt:2 }} onClick={handleNextButton}>Next</Button>
                        </StepContent>
                      </Step>
                      <Step key="billing-address">
                        <StepLabel>Billing Address</StepLabel>
                        <StepContent>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta nihil vel amet earum beatae, quos, libero distinctio magnam unde obcaecati atque, cum magni illum ad tenetur quasi nemo aliquid corporis.
                          <Button variant='outlined' size='small' sx={{ mt:2 }} onClick={handleBackButton}>Back</Button>
                        </StepContent>
                      </Step>
                      <Step key="educational-info">
                        <StepLabel>Educational Information</StepLabel>
                        <StepContent>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta nihil vel amet earum beatae, quos, libero distinctio magnam unde obcaecati atque, cum magni illum ad tenetur quasi nemo aliquid corporis.</StepContent>
                      </Step>
                      <Step key="experience-info">
                        <StepLabel>Experience Information</StepLabel>
                        <StepContent>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta nihil vel amet earum beatae, quos, libero distinctio magnam unde obcaecati atque, cum magni illum ad tenetur quasi nemo aliquid corporis.</StepContent>
                      </Step>
                      <Step key="business-info">
                        <StepLabel>Business Information</StepLabel>
                        <StepContent>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta nihil vel amet earum beatae, quos, libero distinctio magnam unde obcaecati atque, cum magni illum ad tenetur quasi nemo aliquid corporis.</StepContent>
                      </Step>
                    </Stepper>
                   </Box>
                </Grid>
                <Grid item xs={2}>
                  {/* Right Side */}
                  <img src={side} alt='side-banner' style={{ height: '350px', width: 'auto' }}/>
                </Grid>
            </Grid>
        </Box>
      </div>
    </div>
  )
}

export default Register
