import { Box, Grid, StepLabel, Stepper, Step, StepContent, TextField, MenuItem, Button, Avatar, Typography, IconButton} from '@mui/material'
import React, {useState} from 'react'
import side from '../../Assets/bow-wow-gourmet-dog-treats-are-healthy-natural-low-4.png'
import {MdAddCircleOutline, MdRemoveCircleOutline} from 'react-icons/md'
import logo from '../../Assets/logoicon.png'
import './register.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Timeline, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator, TimelineConnector, TimelineContent } from '@mui/lab'
import MapBox from '../../Components/Map Box/MapBox'



const titles = [
  {value: 'Doc', label: 'Doc'},
  {value: 'Mr', label: 'Mr'},
  {value: 'Ms', label: 'Ms'}
];
const locations = [{long: 79.861244, lat: 6.927079}]

const User = {
  level: 'Doctor',
  title: null,
  firstName: null,
  lastName: null,
  nic: null,
  homeAddress: null,
  mobileNumber: null,
  email: null,
  educationalInfo: null,
  business: null,
  reg: null,
  address: null,
  lat: null,
  long: null,
  password: null,
  physicalRate: null,
  onlineRate: null,
  img: null,
}



const Register = () => {
  // States
  const [activeStep, setActiveStep] = useState(0);
  // Profile Image
  const [avatar, setAvatar] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  // Educational Details 
  const [educationalInfo, setEducationalInfo] = useState([{institute: "", degree: "", year: ""}]);
  // Business Location 
  const [location, setLocation] = useState(locations);
  // Lat and Long
  const [lat, setLat] = useState();
  const [long, setLong] = useState();


  // Handle Location States 
  const handleLocationState = (event) =>{
    
    if(event.target.id === "lat"){
      setLat(event.target.value);
      if(lat != null  && long != null){
        setLocation([{long: long, lat: lat}]);
      }
      User.lat = event.target.value;
    }
    if(event.target.id === "long"){
      setLong(event.target.value);
      if(lat != null  && long != null){
        setLocation([{long: long, lat: lat}]);
      }
      User.long = event.target.value;
    }
    console.log("Lat:"+ lat + "Long:" + long);
  }



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
    const reader1 = new FileReader();
    reader1.readAsArrayBuffer(file);
    reader1.onload = (event) =>{
      const byteArray = new Uint8Array(reader1.result);
      const base64Image = btoa(byteArray.reduce((data, byte)=> data + String.fromCharCode(byte), ''));
      setBase64Image(base64Image);
    }
  }

  // Handle Add More Education Button 
  const handleAddMoreEducation = (index) => {
    let info = educationalInfo[index];
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
    let tempData = [...educationalInfo];
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

  // Handle Data Submitted event
  const handleDataSubmit = async()=>{
    // Setup User Model 
    User.educationalInfo = educationalInfo;
    User.img = base64Image;
    // todo: Need to validate the data and notify the user

    // todo: need send data to the server
    fetch('http://localhost:8080/api/v1/user/register',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(User)
    }).then(()=>{
      toast.success("Successfully registered", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }).catch(err=>{
      toast.error(err.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    });
   
    // todo: need to notify the user
    console.log(JSON.stringify(User));
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
                              onChange={(event)=> User.title = event.target.value}
                              id="select-title"
                              select
                              label="Title"
                              size='small'
                              value={User.title}
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
                              <TextField id='first-name' value={User.firstName} label='First Name' size='small' onChange={(event)=> User.firstName = event.target.value} variant='outlined' sx={{ width: '100%', ml: 2 }}/>
                            </Grid>
                            <Grid item xs={5}>
                              <TextField id='last-name' value={User.lastName} label='Last Name' size='small' onChange={(event)=>User.lastName = event.target.value} variant='outlined' sx={{ width: '100%', ml: 3 }}/>
                            </Grid>
                          </Grid>
                          <Grid container sx={{ mt: 2 }}>
                            <Grid item xs={5}>
                              <TextField id='nic' value={User.nic} label='NIC Number' onChange={(event)=> User.nic = event.target.value} size='small' variant='outlined' sx={{ width: '100%' }}/>
                            </Grid>
                            <Grid item xs={7}>
                            <TextField id='address' value={User.homeAddress} label='Home Address' onChange={(event)=> User.homeAddress = event.target.value} size='small' variant='outlined' sx={{ width: '100%', ml: 3 }}/>
                            </Grid>
                          </Grid>
                          <Grid container sx={{ mt:2 }}>
                            <Grid item xs={3}>
                            <TextField id='m-tel' value={User.mobileNumber} label='Mobile Number' onChange={(event)=> User.mobileNumber = event.target.value} size='small' variant='outlined' sx={{ width: '100%' }}/>
                            </Grid>
                            <Grid item xs={6}>
                            <TextField id='email' value={User.email} label='Email Address' onChange={(event)=> User.email = event.target.value} size='small' variant='outlined' sx={{ width: '100%', ml: 3 }}/>
                            </Grid>
                          </Grid>
                          <Grid container>
                        <Typography sx={{ fontSize: '12px', textAlign: 'justify', mt: 2 }}>
                          Setup your Login Details, Our team will contact you soon and when your details are verified, you can login with these credentials.
                        </Typography>
                            <Grid item xs={8} >
                              <Grid container sx={{ mt:2 }}>
                                <Grid item xs={6} >
                                  <TextField id='password' onChange={(event)=> User.password = event.target.value}  label='Password' size='small' variant='outlined' sx={{ mr:1 }}  />
                                </Grid>
                                <Grid item xs={6}>
                                  <TextField id='confirm-password'  label='Confirm Password' size='small' variant='outlined' sx={{ mr:1 }}  />
                                </Grid>
                              </Grid>
                             
                              <Typography sx={{ mt:2, fontSize: '12px' }}>Please Provide Session Rates for your Service</Typography>
                              <Grid container sx={{ mt:2 }}>
                                <Grid item xs={6}>
                                  <TextField id='physical-rate'  label='Physical Session Rate' value={User.physicalRate} onChange={(event)=>User.physicalRate = event.target.value} size='small' variant='outlined' sx={{ mr:1 }}  />
                                </Grid>
                                <Grid item xs={6}>
                                  <TextField id='online-rate'  label='Online Session Rate' value={User.onlineRate} onChange={(event)=> User.onlineRate = event.target.value} size='small' variant='outlined' sx={{ mr:1 }}  />
                                </Grid>
                              </Grid>
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
                                        <TextField id='institute' onChange={(event)=> handleOnChangeEducation(event, index, 'institute')}  value={educationalInfo[index].institute} label='School' size='small' variant='outlined' sx={{ mr:1 }}  />
                                      </Grid>
                                      <Grid item xs={4}>
                                      <TextField id='degree' onChange={(event)=> handleOnChangeEducation(event, index, 'degree')} label='Degree' value={educationalInfo[index].degree} size='small' variant='outlined' sx={{ mr:1 }}  />
                                      </Grid>
                                      <Grid item xs={2}>
                                      <TextField id='year' onChange={(event)=> handleOnChangeEducation(event, index, 'year')} value={educationalInfo[index].year} label='Year' size='small' variant='outlined' sx={{ mr:1 }}  />
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
                                      <TimelineItem key={info.degree}>
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
                                  <TextField id='business-name' value={User.business} onChange={(event)=> User.business = event.target.value}  label='Business Name' size='small' variant='outlined' sx={{ mr:1 }}  />
                                </Grid>
                                <Grid item xs={6}>
                                  <TextField id='business-reg' value={User.reg} onChange={(event)=> User.reg = event.target.value} label='Registration Number' size='small' variant='outlined' sx={{ mr:1 }}  />
                                </Grid>
                              </Grid>
                              <Grid container sx={{ mt:2 }}>
                                <Grid item xs={12}>
                                  <TextField id='business-address' value={User.address} onChange={(event)=> User.address = event.target.value}  label='Address' size='small' variant='outlined' sx={{ width: '95.2%', mr:1 }}  />
                                </Grid>
                              </Grid>
                              <Typography sx={{ mt:2, fontSize: '12px' }}>Please Provide Clinic Location for Setup your Clinic</Typography>
                              <Grid container sx={{ mt:2 }}>
                                <Grid item xs={6}>
                                <TextField id='long'  label='Longitude' value={User.long} onBlur={(event)=>handleLocationState(event)} size='small' variant='outlined' sx={{ mr:1 }}  />
                                </Grid>
                                <Grid item xs={6}>
                                <TextField id='lat'  label='Latitude' value={User.lat} onBlur={(event)=>handleLocationState(event)} size='small' variant='outlined' sx={{ mr:1 }}  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid container xs={4}>
                                <Grid item>
                                  <MapBox width='200px' height='200px' radius='15px' locations={location}/>
                                </Grid>
                            </Grid>
                          </Grid>
                          <Grid container>
                            <Grid item>
                            <Button variant='outlined' size='small' sx={{ mt:1, mr: 1 }} onClick={handleBackButton}>Back</Button>
                            </Grid>
                            <Grid item>
                            <Button variant='outlined' size='small' sx={{ mt:1, mr:1 }} onClick={handleDataSubmit}>Complete</Button>
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
