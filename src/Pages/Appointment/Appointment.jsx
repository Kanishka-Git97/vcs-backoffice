import React, { useEffect } from 'react'
import './appointment.scss'
import {useNavigate} from 'react-router-dom'
// Importing Components
import Sidebar from '../../Components/Sidebar/Sidebar'
import Header from '../../Components/Header/Header'

// Importing MUI
import { Avatar, Box, Button, Card, CardContent, Chip, Grid} from '@mui/material'
import { Container } from '@mui/system'
import { useState } from 'react'




// Sample Data
async function createTimeSlot(id, date, time, client, type, msg, appointment){
  var clinetId = client;
  let customer={}; 
  // Date Formatting
  const newDate = new Date(date);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

 
  const monthName = monthNames[newDate.getMonth()];
  const formattedDate = newDate.getFullYear() + "-" + monthName + "-" + newDate.getDate();
  date = formattedDate;

  // Client Fetching
  await  fetch('http://localhost:8080/api/v1/client/get', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id: clinetId})
  }).then(response => response.json()).then(data => {
     console.log(data);
     const name = data.firstName;
     customer = data;
    //  return name;
     client = name;
     
  });

  if(customer && customer.firstName){
    client = customer.firstName + ' ' + customer.lastName;
  }
  console.log(client);


  return {id, date, time, client, type, msg, appointment}
}



// Logged User
const user = JSON.parse(sessionStorage.getItem('user'));



const Appointment = () => {
  // Routing
  const navigate = useNavigate();
  const NavigateTo = (appointment)=>{
    sessionStorage.setItem('appointment', JSON.stringify(appointment));
    navigate('/virtualroom');
  };

  // States
  const [appointments, setAppointments] = useState([]);


  // Handle Available Appointment
  const handleAvailableAppointment = async()=>{
    fetch('http://localhost:8080/api/v1/appointment/appointments', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({doctor: user.id})
    }).then(response=> response.json()).then(async data=>{
      if(data.length > 0){
        let list = [];
        for(var i=0; i<data.length; i++){
          var item = await createTimeSlot(data[i].id,data[i].date, data[i].time,data[i].client, data[i].type, data[i].remark, data[i] );
          list = [...list, item];
        }
        setAppointments(list);
      }

    })
  }
  
 useEffect(()=>{
  handleAvailableAppointment();
 },[]);




  return (
    <div className='container'>
      <Sidebar index="1"/>
      <div className="content">
        <Header title="Appointments" tag="Let's manage your client's appointment" />
        <Box sx={{flex:1}}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
                <div className="left-section">
                  <div className="section-header">
                    <span className="section-title">Schedule</span><br />
                    <span className="section-sub-title">Manage your today's client appointments </span>
                  </div>

                  <div className="schedule-content">
                    {appointments.map((row)=>(
                      <Card sx={{ margin:2 }} className="tile" key={row.id}>
                        <CardContent>
                          <Grid container spacing={3}>
                            <Grid item xs={1}>
                              <Avatar>{row.client.charAt(0)}</Avatar>
                            </Grid>
                            <Grid item xs={8}>
                              <Container>
                                <span className='tile-time'>{row.time}</span>
                                <span> | </span>
                                <span className='tile-date'>{row.date}</span>
                                <span className="tile-type"><Chip size='small' label={row.type}/></span>
                                <p className='tile-name'>{row.client}</p>
                                <p className='tile-msg'>{row.msg}</p>
                              </Container>
                            </Grid>
                            <Grid item xs={3}>
                              <Button size='small' variant='outlined' onClick={()=>NavigateTo(row.appointment)}>Attend</Button>
                              <Button size='small' sx={{ mt:1 }} variant='outlined' onClick={NavigateTo}>Reschedule</Button>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    ))}
                </div>

                </div>
                
            </Grid>
            <Grid item xs={4}>

            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  )
}

export default Appointment
