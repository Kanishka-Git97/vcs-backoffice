import React, { useState, useEffect } from 'react'
import './virtualroom.css'

// Importing Component
import Sidebar from '../../Components/Sidebar/Sidebar'
import Header from '../../Components/Header/Header'

// Importing MUI
import { Box } from '@mui/system'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, Grid, TextField, IconButton } from '@mui/material'
import { VideoRoom } from '../../Components/Video Room/VideoRoom'


// Importing Images
import bg from  '../../Assets/chatbg.svg'

// Importing Icons
import {BsChevronExpand, BsShare} from 'react-icons/bs'
import {IoIosSend} from 'react-icons/io'

export const VirtualRoom = () => {

  const [isJoined, setIsJoined] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded)=> {
    setIsExpanded(isExpanded ? panel : false);
}

// Data Sampling
function createPet(id, pet, type, sex, lastComment, lastUpdate){
  return {id, pet, type, sex, lastComment, lastUpdate};
}

const pets = [
  createPet(1, 'Shaggy', 'Dog', 'Male', 'Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam.', '2022-Nov-22'),
  createPet(2, 'Kitty', 'Cat', 'Female', 'Nulla facilisi. Phasellus sollicitudin nulla', '2022-Oct-20')
];


  return (
    <div className='container'>
        <Sidebar index="2"/>
        <div className="content">
        <Header title="Virtual Room" tag="Connect with your client and take your Clinic to the Digital"/>
        <Box sx={{ flexGrow: 1}}>
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    {/* Left Side */}
                    {pets.map((pet)=>(
                        <Accordion key={pet.id} expanded={isExpanded === pet.id} onChange={handleChange(pet.id)}>
                        <AccordionSummary
                          expandIcon={<BsChevronExpand/>}
                          aria-controls="1bh-content"
                          id="1-header"
                        >
                          <Avatar>{pet.pet.charAt(0)}</Avatar>
                          <div className='pet-header'><span className='pet-name'>{pet.pet}</span><br /><span className='animal'>{pet.type}</span><span className='divider'> | </span><span className='gender'>{pet.sex}</span></div>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div className='details-section'>
                            <span className="pet-details">
                            {pet.lastComment}
                            </span>
                            <br />
                            <span className="date">Last comment : {pet.lastUpdate}</span>
                          </div>
                          <div className='comment-section'>
                              <TextField label="Comment" variant='outlined' size='small' />
                              <IconButton className='send-btn'><IoIosSend/></IconButton>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                    
                </Grid>
                <Grid item xs={7}>
                    {/* Right Side */}
                    {!isJoined && (
                       <div>
                         <Button size='small' variant='outlined' onClick={()=> setIsJoined(true)} endIcon={<BsShare/>}>Join Room</Button>
                         <img src={bg}/>
                       </div>
                    )}
                    {isJoined &&(
                        <VideoRoom/>
                    )}
                    
                </Grid>
            </Grid>
        </Box>
        </div>
    </div>
  )
}
