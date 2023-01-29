import { Box, Grid, StepLabel, Stepper, Step, StepContent, TextField, MenuItem, Button, Avatar, Typography, IconButton} from '@mui/material'
import React, {useState} from 'react'
import side from '../../Assets/bow-wow-gourmet-dog-treats-are-healthy-natural-low-4.png'
import {MdAddCircleOutline, MdRemoveCircleOutline, MdOutlineCastForEducation} from 'react-icons/md'
import {TbFileCertificate} from 'react-icons/tb'
import logo from '../../Assets/logoicon.png'
import './register.css'
import { useRef } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Timeline, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator, TimelineConnector, TimelineContent } from '@mui/lab'
import MapBox from '../../Components/Map Box/MapBox'

const titles = [
  {value: 'Doc', label: 'Doc'},
  {value: 'Mr', label: 'Mr'},
  {value: 'Ms', label: 'Ms'}
];
const locations = [{long: 54.37585762735543, lat: 24.45677614934833}, {long: 34.37585762735543, lat: 44.45677614934833}]

const Register = () => {
  // States
  const [activeStep, setActiveStep] = useState(0);
  const [avatar, setAvatar] = useState(null);
  const [educationalInfo, setEducationalInfo] = useState([{institute: "", degree: "", year: ""}]);

  // Refs---------> Personal Information


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
    input.accept = 'image/*'
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

  // Handle Add More Education Button 
  const handleAddMoreEducation = (index) => {
    var info = educationalInfo[index];
    if(info.institute === ""|| info.degree === "" || info.year === ""){
      console.log("Required field are Missing");
      return toast.warn('Required field are Missing', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });;
    }
    console.log(JSON.stringify(educationalInfo));
    setEducationalInfo([...educationalInfo, {institute: "", degree: "", year: ""}]);
  }

  // Handle Remove Education Button 
  const handleRemoveEducation = (index) =>{
    console.log(index);
    var tempData = [...educationalInfo];
    tempData.splice(index, 1);
    setEducationalInfo(tempData);
  }

  // Handle Onchange on Educational Information
  const handleOnChangeEducation = (event, index, value) => {
    
    const tempData = [...educationalInfo];
    if(value === 'institute'){
      tempData[index].institute = event.target.value;
    }
    if(value === 'degree'){
      tempData[index].degree = event.target.value;
    }
    if(value === 'year'){
      tempData[index].year = event.target.value;
    }
    setEducationalInfo(tempData);
  }

  return (
    <div className='container'>
      <div className="content">
        <Grid container>
          <Grid item><img src={logo} alt="" style={{ height: '50px', width: 'auto' }} /></Grid>
          <Grid item sx={{ ml:1 }}><h1>Hi! 👋 "Join the community, create your profile today!"</h1></Grid>  
        </Grid>
        <Typography sx={{ mb:2, mt:2 }} variant='h3'>Register</Typography>
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
                      <Step key="educational-info">
                        <StepLabel>Educational Information</StepLabel>
                        <StepContent>
                          <Typography sx={{ mb:2, fontSize: 12 }}>If you have any questions or issues with the form, please contact our human resources department at 555-555-5555 or email us at hr@example.com</Typography>
                          <Grid container>
                            <Grid item xs={8}>
                              <Grid container>
                                {
                                  educationalInfo.map((info, index)=>(
                                    <>
                                      <Grid item xs={4}>
                                        <TextField id='institute' onChange={(event)=> handleOnChangeEducation(event, index, 'institute')}  label='School' size='small' variant='outlined' sx={{ mr:1 }}  />
                                      </Grid>
                                      <Grid item xs={4}>
                                      <TextField id='degree' onChange={(event)=> handleOnChangeEducation(event, index, 'degree')} label='Degree' size='small' variant='outlined' sx={{ mr:1 }}  />
                                      </Grid>
                                      <Grid item xs={2}>
                                      <TextField id='year' onChange={(event)=> handleOnChangeEducation(event, index, 'year')}  label='Year' size='small' variant='outlined' sx={{ mr:1 }}  />
                                      </Grid>
                                      <Grid item xs={2} sx={{ mb:2 }}>
                                        {
                                          educationalInfo.length < index +2 ? <IconButton onClick={()=> handleAddMoreEducation(index)}><MdAddCircleOutline/></IconButton> : <IconButton onClick={()=> handleRemoveEducation(index)}><MdRemoveCircleOutline/></IconButton>
                                        }
                                      {/* <IconButton onClick={()=> handleAddMoreEducation(index)}><MdAddCircleOutline/></IconButton> */}
                                      </Grid>
                                    </>
                                  ))
                                }
                              </Grid>
                            </Grid>
                            <Grid item xs={4}>
                                <Timeline position='alternate'>
                                  {
                                    educationalInfo.map((info, index)=>(
                                      <TimelineItem>
                                        <TimelineOppositeContent sx={{ m: 'auto 0' }}
                                          align='right'
                                          variant='body2'
                                          color='text.secondary'
                                        >
                                          {info.year}
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                          <TimelineConnector/>
                                          <TimelineDot>
                                            
                                          </TimelineDot>
                                        </TimelineSeparator>
                                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                                          <Typography component='span'>
                                            {info.institute}
                                          </Typography>
                                          <Typography sx={{ fontSize: 8 }}>{info.degree}</Typography>
                                        </TimelineContent>
                                      </TimelineItem>
                                    ))
                                  }
                                </Timeline>
                            </Grid>

                          </Grid>
                          <IconButton>
                            <input hidden type="file"  />
                            <TbFileCertificate/>
                          </IconButton>
                          <Grid container>
                            <Grid item>
                            <Button variant='outlined' size='small' sx={{ mt:1, mr: 1 }} onClick={handleBackButton}>Back</Button>
                            </Grid>
                            <Grid item>
                            <Button variant='outlined' size='small' sx={{ mt:1, mr:1 }} onClick={handleNextButton}>Next</Button>
                            </Grid>
                          </Grid>
                        </StepContent>
                      </Step>
                      <Step key="business-info">
                        <StepLabel>Business Information</StepLabel>
                        <StepContent>
                          <Typography sx={{ fontSize: '12px', textAlign: 'justify' }}>
                          Unleash the potential of your business by registering with ease and confidence. Our streamlined business registration process ensures that all necessary information is gathered and submitted in a timely manner. Trust us to handle the paperwork and legal requirements, so you can focus on growing your business. Join the ranks of successful entrepreneurs by registering today!
                          </Typography>
                          <Grid container>
                            <Grid item xs={8} >
                              <Grid container sx={{ mt:2 }}>
                                <Grid item xs={6} >
                                  <TextField id='business-name'  label='Business Name' size='small' variant='outlined' sx={{ mr:1 }}  />
                                </Grid>
                                <Grid item xs={6}>
                                  <TextField id='business-reg'  label='Registration Number' size='small' variant='outlined' sx={{ mr:1 }}  />
                                </Grid>
                              </Grid>
                              <Grid container sx={{ mt:2 }}>
                                <Grid item xs={12}>
                                  <TextField id='business-address'  label='Address' size='small' variant='outlined' sx={{ width: '95.2%', mr:1 }}  />
                                </Grid>
                              </Grid>
                              <Typography sx={{ mt:2, fontSize: '12px' }}>Please Provide Clinic Location for Setup your Clinic</Typography>
                              <Grid container sx={{ mt:2 }}>
                                <Grid item xs={6}>
                                <TextField id='long'  label='Longitude' size='small' variant='outlined' sx={{ mr:1 }}  />
                                </Grid>
                                <Grid item xs={6}>
                                <TextField id='lat'  label='Latitude' size='small' variant='outlined' sx={{ mr:1 }}  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid container xs={4}>
                                <Grid item>
                                  <MapBox width='200px' height='200px' radius='15px' locations={locations}/>
                                </Grid>
                            </Grid>
                          </Grid>
                          <Grid container>
                            <Grid item>
                            <Button variant='outlined' size='small' sx={{ mt:1, mr: 1 }} onClick={handleBackButton}>Back</Button>
                            </Grid>
                            <Grid item>
                            <Button variant='outlined' size='small' sx={{ mt:1, mr:1 }} onClick={null}>Complete</Button>
                            </Grid>
                          </Grid>
                        </StepContent>
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
      <ToastContainer/>
    </div>
  )
}

export default Register
