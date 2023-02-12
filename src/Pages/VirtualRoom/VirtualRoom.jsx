import React, { useState, useEffect } from 'react'
import './virtualroom.css'

// Importing Component
import Sidebar from '../../Components/Sidebar/Sidebar'
import Header from '../../Components/Header/Header'
import { toast, ToastContainer } from 'react-toastify'
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
// get user 
const user = JSON.parse(sessionStorage.getItem('user'));
// fetch appointment 
const appointment = JSON.parse(sessionStorage.getItem('appointment'));

// Data Sampling
async function createPet(id, pet, type, sex){
      let lastComment;
      let lastUpdate;
        let comment = {};
        await fetch('http://localhost:8080/api/v1/medical/getall', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({pet: id})
        }).then(response => response.json()).then(data =>{
          if(data.length > 0){
            comment = data;
            lastComment = comment[0].comment;
            lastUpdate = comment[0].date;
          }
          else{
            lastComment = "No Comments Available";
            lastUpdate = "-";
          }
          
        });
        

  return {id, pet, type, sex, lastComment, lastUpdate};
}

// const pets = [
//   createPet(1, 'Shaggy', 'Dog', 'Male'),
//   createPet(2, 'Kitty', 'Cat', 'Female')
// ];

// States 
const [pets, setPets] = useState([]);
const [comment, setComment] = useState();

// Fetch Pets Details
const fetchPetDetails = async()=>{
  console.log(appointment);
  await fetch('http://localhost:8080/api/v1/pet/getforappointment',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({client: appointment.client, doctor: user.id})
  }).then(response => response.json()).then(async data => {
    if(data.length > 0){
      let result = [];
      for(var i = 0; i < data.length; i++){
        var pet = data[i];
        var obj = await createPet(pet.id, pet.name, pet.type, pet.sex);
        result = [...result,obj];
        console.log(obj);
      }
      setPets(result);
    }
  })
}

// Handle Comment Submit
const handleCommentSubmit = async(pet)=>{
  const today = new Date(); 
  const date = today.getFullYear() + '/' + (today.getMonth() + 1).toString().padStart(2, '0') + '/' + today.getDate().toString().padStart(2, '0');
  await fetch('http://localhost:8080/api/v1/medical/add', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({date: date, comment: comment, pet: pet})
  }).then(response=>{
    if(response.status === 200){
      toast.success("Successfully Added New Medical Record", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        setComment(undefined);
        fetchPetDetails();
    }
    else{
      toast.warn("Something Went Wrong", {
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
  })
}

useEffect(()=>{
 fetchPetDetails();
},[]);

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
                              <TextField label="Comment" variant='outlined' size='small' onChange={(e)=>setComment(e.target.value)} value={comment}/>
                              <IconButton className='send-btn' onClick={()=>handleCommentSubmit(pet.id)}><IoIosSend/></IconButton>
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
        <ToastContainer/>
    </div>
  )
}
