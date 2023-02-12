import React from 'react'
import './certificate.scss'

// Importing Components
import Sidebar from '../../Components/Sidebar/Sidebar'
import Header from '../../Components/Header/Header'
import jsPDF from "jspdf";
import axios from "axios";


//Importing MUI
import {Grid, Box,  Accordion, AccordionDetails, AccordionSummary, Avatar,  Button, TextField, MenuItem, IconButton, Typography, Chip} from '@mui/material'
import {BsChevronExpand} from 'react-icons/bs'
//Importing Icons
import {AiOutlineSafetyCertificate} from 'react-icons/ai'
import {FcCancel} from 'react-icons/fc'
import { useState, useEffect } from 'react'
//Sample Data
function createData(username, fullName, level, status, protein) {
  return { username , fullName, level, status, protein };
}

const rows = [
  createData('Sampth@email.com', 'Sampath Lakmal', 'Cashier', 'Active'),
  createData('Sandini@email.com', 'Sandini Kaveesha', 'Ref', 'Deactivated')
];

const levels = [
  {
    value: 'cashier',
    label: 'Cashier',
  },
  {
    value: 'assistant',
    label: 'Assistant',
  },
  {
    value: 'doctor',
    label: 'Doctor',
  }
];
// Logged User
const user = JSON.parse(sessionStorage.getItem('user'));



const Certificate = () => {

  // States
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [level,setLevel] = useState(null);
  const [password, setPassword] = useState(null);
  const [requests, setRequests] = useState([]);
  const [isExpanded, SetIsExpanded] = useState(false);
  const [medicalLog, setMedicalLog] = useState(null);


  const handleAccordion = (panel) => (event, isExpanded) => {
    SetIsExpanded(isExpanded ? panel : false);
  }

// Data Sampling
async function createRequestSlot(request){
    let requestSlot = {};
    requestSlot = request;
    let customer = {};
    let pet = {};
    let medical = {};
    // Client Fetching
  await  fetch('http://localhost:8080/api/v1/client/get', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id: request.client})
  }).then(response => response.json()).then(data => {
     console.log(data);
     customer = data;
  });
   // Pet Fetching
   await  fetch('http://localhost:8080/api/v1/pet/get', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id: request.pet})
  }).then(response => response.json()).then(data => {
     console.log(data);
     pet = data;
  });

 




    return {requestSlot, customer, pet, medical};
}


// Handle Available Requests 
const handleAvailableRequest = async()=>{
    fetch('http://localhost:8080/api/v1/certificate/all', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({doctor: user.id})
      }).then(response=> response.json()).then(async data=>{
        if(data.length > 0){
          let list = [];
          for(var i=0; i<data.length; i++){
            var item = await createRequestSlot(data[i]);
            list = [...list, item];
          }
          setRequests(list);
        }
  
      })
}
function _handleEmail (pet, customer, medical){
    const now = new Date().getTime();
        
        const startTime =           customer.firstName + ' ' + customer.lastName;
        const endTime =             customer.email;

        console.log(startTime, 123);

        // create a new pdf
        const doc = new jsPDF();
        
        // doc title
        doc.setFontSize(28)
        doc.text(20, 25, `Medical Certification`);

        // sub title (Room Name)
        doc.setFontSize(14);
        doc.text(20, 35,`Pet Name: ${pet.name} | ${pet.breed}`);

        // meta data (checkin ID / start / end)
        doc.setTextColor(150);
        doc.setFontSize(10);
        
        doc.text(140, 28, 'Pet:');
        doc.text(155, 28, startTime);
        doc.text(140, 34, 'Email:');
        doc.text(155, 34, endTime);
        doc.text(140, 40, 'Address:');
        doc.text(155, 40, `${customer.address}`);

        doc.line(10, 45, 200, 45) // horizontal line

        // checkin data
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        var textWidth = doc.getStringUnitWidth(`${medical}`);
        var lines = doc.splitTextToSize(`${medical}`, textWidth);
        var xPos = 20;
        var yPos = 60;
        for (var i = 0; i < lines.length; i++) {
            doc.text(xPos, yPos, lines[i]);
            yPos += 12;
          }

        // list names
        doc.setFontSize(12);
        doc.setTextColor(150);
        doc.text(20, 80, 'Name');
        doc.text(90, 80, 'Sign');
        doc.text(150, 80, 'Date');

        doc.setDrawColor(128, 128, 128) // draw red lines
        doc.line(10, 85, 200, 85) // horizontal line

        let startList = 95;
        let counter = 0;
        doc.setFontSize(12);
        // this.createMemberList().forEach(member => {
        //     counter++;
        //     doc.setTextColor(0, 0, 0);
        //     doc.text(20, startList, member.name);

        //     // set attendence status
        //     member.attended ? doc.setTextColor(102, 187, 106) : doc.setTextColor(239, 83, 80);
        //     doc.text(90, startList, member.attended ? 'Yes' : 'No');

        //     // set attendence time if checked in
        //     doc.setTextColor(0, 0, 0);
        //     doc.text(150, startList, member.attended ? member.checkedin_at : 'N/A');
        //     startList += 10;

        //     // add new page if needed
        //     if (counter % 25 === 0) {
        //         doc.addPage();
        //         startList = 20;
        //     }
        // });
        

        doc.save('a.pdf');
    
}

useEffect(()=>{
    handleAvailableRequest();
   },[]);

   

  return (
    <div className='container'>
        <Sidebar index="6"/>
        
        <div className="content">
        <Header title="Request Management " tag="Let's Manage your Users requests"/>
        <Box sx={{ flexGrow:1 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
             {/* Left Side */}
             {
                  requests.map((request)=>(
                    <Accordion key={request.requestSlot.id} expanded={isExpanded === request.requestSlot.id} onChange={handleAccordion(request.requestSlot.id)}>
                      <AccordionSummary 
                      expandIcon={<BsChevronExpand/>}
                      aria-controls="1bh-content"
                      id='1-header'
                    >
                        <Avatar>{request.customer.firstName.charAt(0)}</Avatar>
                        <div className="clinic-header"><span className='clinic-name'>{request.customer.firstName} {request.customer.lastName}</span><br/><span className='address'>{request.customer.email}</span><br /><span className='clinic-name'>{request.pet.name} || {request.pet.breed}</span><br /><br /><Chip label={request.requestSlot.status} /></div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="clinic-details">
                          <div className="clinic-details-header">
                              <IconButton className='clinic-edit-btn' onClick={()=>_handleEmail(request.pet, request.customer, medicalLog)}><AiOutlineSafetyCertificate/></IconButton>
                              <IconButton className='clinic-edit-btn' onClick={null}><FcCancel/></IconButton>
                              
                          </div>
                          <div className='clinic-details-content'>
                          <TextField id="outlined-basic" label="Pet Name" size='small' variant="outlined" sx={{ width: '100%' }} onChange={(e)=>setMedicalLog(e.target.value)}/>
                           {/* <Grid container>
                            <Grid item xs={4}>
                                <Typography>Pet Name: {request.pet.name}</Typography>
                                <Typography>Breed: {request.pet.breed}</Typography>
                                <Typography>Breed: {request.pet.type}</Typography>
                                <Typography>Breed: {request.pet.dob}</Typography>
                                <Typography>Last Medical Record: {request.medical.comment}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                               
                            </Grid>
                           </Grid> */}


                          </div>
                      </div>
                    </AccordionDetails>
                    </Accordion>
                  ))
                }
            </Grid>
            <Grid item xs={4}>
              {/* Right  */}
              
              
            </Grid>
          </Grid>
        </Box>
        </div>
       
    </div>
  )
}

export default Certificate
