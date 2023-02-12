import React, {  useState } from 'react'
import './clinic.scss'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Header from '../../Components/Header/Header'
import { Box } from '@mui/system'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, TextField, Grid, IconButton,Button } from '@mui/material'
import { toast, ToastContainer } from 'react-toastify'

// Icon Importing
import {BsChevronExpand} from 'react-icons/bs'
import {CiEdit} from 'react-icons/ci'
import {AiOutlineDelete} from 'react-icons/ai'
import MapBox from '../../Components/Map Box/MapBox'
import { useEffect } from 'react'

// Data Sampling
function createClinic(id, name, long, lat, address, reg){
  return {id, name, long, lat, address, reg};
}

// Exporting Lat and Long
function exportLocation(array){
  if(array.length>0){
    console.log(array);
    const createLocation = (object) =>{
      console.log(object);
      return {long: object.long, lat: object.lat};
    }
    let arr = [];
    array.map((item)=>(
        arr.push(createLocation(item))
    ));
    return arr;
  }
 

}




const user = JSON.parse(sessionStorage.getItem('user'));

const Clinic = () => {
 
  // Handling Accordion 
  const [isExpanded, SetIsExpanded] = useState(false);

  // Form States
  const [business, setBusiness] = useState(null);
  const [reg,setReg] = useState(null);
  const [address,setAddress] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [clinics, setClinics] = useState([]);

  const handleAccordion = (panel) => (event, isExpanded) => {
    SetIsExpanded(isExpanded ? panel : false);
  }

  // Fetch Available Clinics
  const fetchAvailableClinics = async()=>{
    console.log(user);
    await fetch('http://localhost:8080/api/v1/clinic/get', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: user.id})
    }).then(response=>response.json()).then(data =>{
      console.log(data);
      let temp = [];
      for(var i =0; i<data.length; i++){
        var obj = createClinic(data[i].id, data[i].name, data[i].longitude, data[i].latitude, data[i].address, data[i].reg);
        temp = [...temp, obj];
      }
      setClinics(temp);
      
    })
  }

  // Handle ClinicSubmit 
  const handleClinicsSubmit = async()=>{
    const data ={
      address: address,
      doctor: user.id,
      lat: lat,
      long: long,
      name: business,
      reg: reg
    };

    // todo: need to validate
    // Submit for the server
    await fetch('http://localhost:8080/api/v1/clinic/register',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(response =>response.text()).then(data=>{
      console.log(data);
      if(data === 'Clinic Saved'){
        toast.success("Successfully Registered", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
      if(data === 'You are reach maximum Clinic Registration'){
        toast.warn(data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          fetchAvailableClinics();
      }
      if(data === 'Business Already Registered Under this License'){
        toast.warn(data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
    }).catch(error =>{
      toast.warn("Something Went Wrong : "+error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    })
  }
  
  useEffect(()=>{
    fetchAvailableClinics();
  },[]);

  return (
    <div className='container'>
        <Sidebar index="5"/>
        <div className='content'>
          <Header title="Clinics" tag="Let's Manage your Clinic and Update Latest Details" />
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                {/* Left Side */}
                {
                  clinics.map((clinic)=>(
                    <Accordion key={clinic.id} expanded={isExpanded === clinic.id} onChange={handleAccordion(clinic.id)}>
                      <AccordionSummary 
                      expandIcon={<BsChevronExpand/>}
                      aria-controls="1bh-content"
                      id='1-header'
                    >
                        <Avatar>{clinic.name.charAt(0)}</Avatar>
                        <div className="clinic-header"><span className='clinic-name'>{clinic.name}</span><br/><span className='address'>{clinic.address}</span></div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="clinic-details">
                          <div className="clinic-details-header">
                              <IconButton className='clinic-edit-btn' onClick={null}><CiEdit/></IconButton>
                              
                          </div>
                          <MapBox  width='400px' height='270px' radius='15px' locations={[{long: clinic.long, lat: clinic.lat}]}/>
                      </div>
                    </AccordionDetails>
                    </Accordion>
                  ))
                }
              </Grid>
              <Grid item xs={6}>
                {/* Right Side */}
                <div className="form-section">
                <div className="form-header">
                  <span className='form-title'>Add Clinic</span><br/>
                  <span className='form-sub-title'>Create your new Clinic and Publish.</span>
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
                    <TextField id="outlined-basic" label="Business Name" size='small' variant="outlined" sx={{ width: '100%' }} onChange={(e)=>setBusiness(e.target.value)}/>
                    <TextField id="outlined-basic" label="Business Registration No" size='small' variant="outlined" sx={{ width: '100%' }} onChange={(e)=>setReg(e.target.value)} />
                    <TextField id="outlined-basic" label="Address" size='small' variant="outlined" sx={{ width: '100%'}} onChange={(e)=>setAddress(e.target.value)} />
                   
                    <span className='form-sub-title'>Setup Your Location</span>
                    <Grid container>
                      <Grid item xs={6}>
                        <TextField id="outlined-basic" label="Longitude" size='small' variant="outlined" sx={{ width: '100%', mr:1 }} onChange={(e)=>setLong(e.target.value)}/>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField id="outlined-basic" label="Latitude" size='small' variant="outlined" sx={{ width: '100%', ml:1 }} onChange={(e)=>setLat(e.target.value)}/>
                      </Grid>
                    </Grid>
                    
                    <Button variant='outlined' size='small' sx={{ width: '100%' }} onClick={handleClinicsSubmit}>Publish your Clinic</Button>
                </Box>
                </div>
              </div>
              </Grid>
            </Grid>
          </Box>
        </div>
        <ToastContainer/>
        
    </div>
  )
}

export default Clinic
