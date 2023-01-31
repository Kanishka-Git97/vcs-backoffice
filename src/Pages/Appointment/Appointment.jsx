import React from 'react'
import './appointment.scss'
import {useNavigate} from 'react-router-dom'
// Importing Components
import Sidebar from '../../Components/Sidebar/Sidebar'
import Header from '../../Components/Header/Header'

// Importing MUI
import { Avatar, Box, Button, Card, CardContent, Chip, Grid, IconButton } from '@mui/material'
import { Container } from '@mui/system'

// Importing Icons 
import {MdOutlineAddIcCall} from 'react-icons/md'

// Sample Data
function createTimeSlot(id, date, time, client, location, img, msg, type){
  return {id, date, time, client, location, img, msg, type}
}

const rows = [
  createTimeSlot(1, "2022-Dec-20", "9.00 AM", "Sandini Kaveesha", "Galle", "", "ascertain the momentary value of (an analogue signal) many times a second so as to convert the signal to digital form.", "Online"),
  createTimeSlot(1, "2022-Dec-20", "10.00 AM", "Purna Kanishka", "Matara", "", "ascertain the momentary value of (an analogue signal) many times a second so as to convert the signal to digital form.", "Physical")
];



const Appointment = () => {
  const navigate = useNavigate();
  const NavigateTo = ()=> navigate('/virtualroom');
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
                    {rows.map((row)=>(
                      <Card sx={{ margin:2 }} className="tile">
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
                              <Button size='small' variant='outlined' onClick={NavigateTo}>Attend</Button>
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
