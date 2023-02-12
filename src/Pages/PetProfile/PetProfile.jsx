import { Box, Grid, TextField,MenuItem, IconButton, Button, Dialog, DialogActions, Typography, Card, CardContent, CardMedia, Chip, Tooltip, DialogContent, DialogTitle, DialogContentText, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import React, {useState, useEffect} from 'react'
import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { toast, ToastContainer } from 'react-toastify'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as tip, Legend} from 'recharts';

// Icon
import {FaWeight, FaHandHoldingMedical} from 'react-icons/fa'
import {MdOutlineExpandMore} from 'react-icons/md'



const genders = [
    {value: 'Male', label: 'Male'},
    {value: 'Female', label: 'Female'},
  ];
  const animal = [
    {value: 'Dog', label: 'Dog'},
    {value: 'Cat', label: 'Cat'},
    {value: 'Fish', label: 'Fish'},
    {value: 'Bird', label: 'Bird'},
    {value: 'Rabbit', label: 'Rabbit'},
    {value: 'Hamster', label: 'Hamster'},
    {value: 'Guinea Pig', label: 'Guinea Pig'},
    {value: 'Turtle', label: 'Turtle'},
    {value: 'Snake', label: 'Snake'},
    {value: 'Horse', label: 'Horse'},
    {value: 'Goat', label: 'Goat'},
    {value: 'Pig', label: 'Pig'}
  ];


function PetProfile() {
  // States
  const [open, setOpen] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [weight, setWeight] = useState(null);
  const [weightLog, setWeightLog] = useState([]);
  const [comment, setComment] = useState(null);
  const [medicalLog, setMedicalLog] = useState([]);
  let pet = JSON.parse(sessionStorage.getItem('pet'));

  // Form State
  const [name, setName] = useState(pet.name);
  const [dob, setDob] = useState(pet.dob);
  const [breed, setBreed] = useState(pet.breed);
  const [type, setType] = useState(pet.type);
  const [sex, setSex] = useState(pet.sex);
  const [owner, setOwner] = useState(pet.client);

  const handleClickOpen = (type) => {
    if(type === 'comment'){
      setOpenComment(true);
    }
    else{
      setOpen(true);
    }
    
  };

  const handleClose = () => {
      setOpenComment(false);
      setOpen(false);

  };

  // Handle Weight Submit
  const handleWeightSubmit = async() => {
    const today = new Date(); 
    const date = today.getFullYear() + '/' + (today.getMonth() + 1).toString().padStart(2, '0') + '/' + today.getDate().toString().padStart(2, '0');
    await fetch('http://localhost:8080/api/v1/weight/add', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({date: date, weight: weight, pet: pet.id})
    }).then(response=>{
      if(response.status === 200){
        toast.success("Successfully Added New Weight", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          fetchWeights();
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
    
    setOpen(false);
  }

  // Handle Comment Submit
  const handleCommentSubmit = async() => {
    const today = new Date(); 
    const date = today.getFullYear() + '/' + (today.getMonth() + 1).toString().padStart(2, '0') + '/' + today.getDate().toString().padStart(2, '0');
    await fetch('http://localhost:8080/api/v1/medical/add', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({date: date, comment: comment, pet: pet.id})
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
          fetchMedicals();
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
    
    setOpenComment(false);
  }

  // Fetch Weight Record 
  const fetchWeights = async() => {
    // todo: fetch data
    await fetch('http://localhost:8080/api/v1/weight/getall', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({pet: pet.id})
    }).then(response => response.json()).then(data => {
     let log = [];
     for(var i =0; i<data.length; i++){
      log = [...log,data[i]];
     }
     setWeightLog(log);
     console.log(weightLog);
    })
    
  }

  // Fetch Medical Record 
  const fetchMedicals = async() => {
    // todo: fetch data
    await fetch('http://localhost:8080/api/v1/medical/getall', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({pet: pet.id})
    }).then(response => response.json()).then(data => {
     let log = [];
     for(var i =0; i<data.length; i++){
      log = [...log,data[i]];
     }
     setMedicalLog(log);
     console.log(medicalLog);
    })
    
  }

  // Handle Update 
  const handlePetUpdate = async(e)=>{
    e.preventDefault();
    var temp = pet;
    temp.name = name;
    temp.dob = dob;
    temp.breed = breed;
    temp.sex = sex;
    temp.type = type;
    console.log(temp);
    // Update server 
    fetch('http://localhost:8080/api/v1/pet/update', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(temp)
    }).then(response => response).then(data =>{
      if(data.status === 200){
        toast.success("Successfully Updated", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          // petRegistrationFrom.reset(); 
          // todo: need to refresh form 
          window.location.href='http://localhost:3000/pets';
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
    console.log(temp);
  }

  useEffect(()=>{
    fetchWeights();
    fetchMedicals();
  },[])


  
  return (
    <div className='container'>
      <Sidebar index="4" />
      <div className="content">
        <Header title="Pet Profile" tag="Overview of your Client's Pets" />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              {/* Left Side */}
              <Grid container>
                <Grid item xs={12} component='div'>
                  <div>
                  <Card sx={{ display: 'flex',  }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '250px' }}>
                      <CardContent sx={{ flex: '1 0 auto' }}>
                       <Box sx={{ display:'flex', flexDirection: 'row' }}>
                        <Box> <Typography component='div' sx={{ fontSize: 18, fontWeight: 'bold' }}>
                          {pet.name}
                        </Typography>
                        <Typography sx={{ fontSize: 12 }} color="text.secondary" component='div'>
                          {pet.breed}
                        </Typography>
                        <Chip label="Owner"/></Box>
                       </Box>
                      </CardContent>
                    </Box>
                    <CardMedia component='img'  sx={{ width: 151, height: 151, borderRadius:'50%', m:1  }} image="https://images.unsplash.com/photo-1611003228941-98852ba62227?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFieSUyMGRvZ3xlbnwwfHwwfHw%3D&w=1000&q=80" alt={pet.name}></CardMedia>
                  </Card>
                  </div>
                  <Box sx={{ display: 'flex', flexDirection: 'row', mt:2 }}>
                    <Tooltip 
                     title= "Update Weight of Animal"
                    >
                      <IconButton
                         size="small"
                         sx={{ m:2 }}
                         onClick={()=>handleClickOpen('weight')}
                      >
                        <FaWeight/>
                      </IconButton>
                    </Tooltip>
                    <Tooltip 
                     title= "Update Medical Record of Animal"
                    >
                      <IconButton
                         size="small"
                         sx={{ m:2 }}
                         onClick={()=>handleClickOpen('comment')}
                      >
                        <FaHandHoldingMedical/>
                      </IconButton>
                    </Tooltip>
                  </Box>
                  {/* Wight Add Dialog */}
                  <Dialog
                      
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="responsive-dialog-title"
                    >
                      <DialogTitle id="responsive-dialog-title">
                        {"Need to Add Recent Weight Reading for "+ pet.name+ " ?" }
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Let update recent weight record of your pet. For, Keeping Your Pet's Health on Track with Our Medical Record Form.
                        </DialogContentText>
                        <TextField onChange={(e)=> setWeight(e.target.value)} size='small' sx={{ width: '100%', mt:2 }} label='Weight (Kg)'/>
                      </DialogContent>
                      <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                          Disagree
                        </Button>
                        <Button onClick={handleWeightSubmit} autoFocus>
                          Agree
                        </Button>
                      </DialogActions>
                    </Dialog>
                    {/* Comment Add Dialog */}
                    <Dialog
                      
                      open={openComment}
                      onClose={handleClose}
                      aria-labelledby="responsive-dialog-title"
                    >
                      <DialogTitle id="responsive-dialog-title">
                        {"Need to Add Recent Medical Remark for "+ pet.name+ " ?" }
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Let update recent medical record of your pet. For, Keeping Your Pet's Health on Track with Our Medical Record Form.
                        </DialogContentText>
                        <TextField onChange={(e)=> setComment(e.target.value)} size='small' sx={{ width: '100%', mt:2 }} label='Comment'/>
                      </DialogContent>
                      <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                          Disagree
                        </Button>
                        <Button onClick={handleCommentSubmit} autoFocus>
                          Agree
                        </Button>
                      </DialogActions>
                    </Dialog>
                    {/* Weight Chart */}
                    <div className='weightChart'>
                      <Typography sx={{ fontSize: 18, fontWeight: 'bold', m:1 }}>Weight Chart ⚖️</Typography>
                      <LineChart
                        width={550}
                        height={200}
                        data = {weightLog}
                        margin={{ 
                          top: 5, right: 0, left:0, bottom: 5
                         }}
                      >
                        <CartesianGrid strokeDasharray={"3 3"} />
                        <XAxis dataKey="date" />
                        <YAxis/>
                        <tip/>
                        <Legend/>
                        <Line type="monotone" dataKey={"weight"} stroke="#D40A00" dot={true} />
                      </LineChart>
                    </div>

                </Grid>
              </Grid>
              {/* Medical Reposts */}
              <div>
                <Typography sx={{ fontSize: 18, fontWeight: 'bold', m:1 }}>Medical Record</Typography>

                {
                  medicalLog.map((item)=>{
                    return (
                      <Accordion sx={{ backgroundColor: '#24292E', color: '#ffffff' }}>
                        <AccordionSummary
                          expandIcon={<MdOutlineExpandMore color='#ffffff' />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography> ⭕  {item.date}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            {item.comment}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })
                }
                
              </div>
            </Grid>
            <Grid item xs={4}>
              {/* Right Side */}
              <div className="form-section">
                <div className="form-header">
                  <span className='form-title'>Edit Profile</span><br />
                  <span className='form-sub-title'>Edit your Pet details if necessary</span>
                </div>
                <div className="form-content">
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handlePetUpdate}
                  >
                    <Grid container>
                      <Grid item xs={5} sx={{ mr: 2 }}>
                        <TextField id="outlined-basic" value={name}  label="Pet Name" size='small' variant="outlined" sx={{ width: '100%' }} InputLabelProps={{ shrink: true }} onChange={(e)=>setName(e.target.value)}/>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField id="outlined-basic" label="Date of Birth" size='small' type='date' variant="outlined" sx={{ width: '100%' }} InputLabelProps={{ shrink: true }} value={dob} onChange={(e)=>setDob(e.target.value)}/>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={6} sx={{ mr: 1 }}>
                        <TextField id="outlined-basic" label="Breed" size='small' variant="outlined" sx={{ width: '100%' }} InputLabelProps={{ shrink: true }} value={breed} onChange={(e)=>setBreed(e.target.value)} />
                      </Grid>
                      <Grid item xs={5} sx={{ ml: 1 }}>
                        <TextField id="outlined-basic" label="Type" size='small' variant="outlined" sx={{ width: '100%' }} select value={type} onChange={(e)=>setType(e.target.value)}>
                          {animal.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                    </Grid>

                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Sex"
                      helperText="Please select pet's gender"
                      size='small'
                      sx={{ width: '100%' }}
                      value={sex}
                      onChange={(e)=>setSex(e.target.value)}

                    >
                      {genders.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <Button variant='outlined' size='small' sx={{ width: '100%' }} type='submit'>Update Pet Profile</Button>
                  </Box>
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default PetProfile
