import React, {  useState } from 'react'
import './clinic.scss'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Header from '../../Components/Header/Header'
import { Box } from '@mui/system'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, TextField, Grid, IconButton,Button } from '@mui/material'

// Icon Importing
import {BsChevronExpand} from 'react-icons/bs'
import {CiEdit} from 'react-icons/ci'
import {AiOutlineDelete} from 'react-icons/ai'
import MapBox from '../../Components/Map Box/MapBox'

// Data Sampling
function createClinic(id, name, long, lat, address, reg, phone, description){
  return {id, name, long, lat, address, reg, phone, description};
}

// Exporting Lat and Long
function exportLocation(array){
  const createLocation = (object) =>{
    return {long: object.long, lat: object.lat};
  }
  let arr = [];
  array.map((item)=>(
      arr.push(createLocation(item))
  ));
  return arr;

}

const clinics =[
  createClinic(1, 'My VET',54.6785, 45.2456, 'Nupe Junction, Matara', 'BHV654789907HBV', '+94234564321', 'clinic, an organized medical service offering diagnostic, therapeutic, or preventive outpatient services. Often, the term covers an entire medical teaching centre, including the hospital and the outpatient facilities. The medical care offered by a clinic may or may not be connected with a hospital.'),
  createClinic(2, 'VET Express',34.6785, 45.2456, 'Kamburupitiya, Matara', 'CFV652345907HBV', '+94234326754', 'clinic, an organized medical service offering diagnostic, therapeutic, or preventive outpatient services. Often, the term covers an entire medical teaching centre, including the hospital and the outpatient facilities. The medical care offered by a clinic may or may not be connected with a hospital.')
];


const Clinic = () => {
 
  // Handling Accordion 
  const [isExpanded, SetIsExpanded] = useState(false);

  const handleAccordion = (panel) => (event, isExpanded) => {
    SetIsExpanded(isExpanded ? panel : false);
  }

  

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
                              <IconButton className='clinic-edit-btn'><AiOutlineDelete color='red'/></IconButton>
                          </div>
                          <div className='clinic-details-content'>{clinic.description}</div>
                      </div>
                    </AccordionDetails>
                    </Accordion>
                  ))
                }
                <div className='map-content'>
                  <MapBox  width='425px' height='270px' radius='15px' locations={exportLocation(clinics)}/>
                </div>
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
                    <TextField id="outlined-basic" label="Business Name" size='small' variant="outlined" sx={{ width: '100%' }}/>
                    <TextField id="outlined-basic" label="Business Registration No" size='small' variant="outlined" sx={{ width: '100%' }} />
                    <TextField id="outlined-basic" label="Address" size='small' variant="outlined" sx={{ width: '100%' }} />
                    <TextField id="outlined-basic" label="Phone Number" size='small' variant="outlined" sx={{ width: '100%' }} />
                    <span className='form-sub-title'>Setup Your Location</span>
                    <Grid container>
                      <Grid item xs={6}>
                        <TextField id="outlined-basic" label="Longitude" size='small' variant="outlined" sx={{ width: '100%', mr:1 }}/>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField id="outlined-basic" label="Latitude" size='small' variant="outlined" sx={{ width: '100%', ml:1 }}/>
                      </Grid>
                    </Grid>
                    <TextField id="outlined-basic" label="Description" size='small' variant="outlined" sx={{ width: '100%' }} />
                    <Button variant='outlined' size='small' sx={{ width: '100%' }}>Publish your Clinic</Button>
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

export default Clinic
