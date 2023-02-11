import React, {forwardRef, useEffect, useRef, useState} from 'react'
import './pets.scss'
// Importing Images
import bg from '../../Assets/bg.webp'

// Importing Component
import Sidebar from '../../Components/Sidebar/Sidebar'
import Header from '../../Components/Header/Header'
import { toast, ToastContainer } from 'react-toastify'

// Importing MUI
import {Box, Grid, TextField, Button, MenuItem, IconButton, Dialog, Slide, AppBar, Toolbar, Paper, TableContainer, TableHead, TableCell, TableBody, TableRow, Table, TablePagination} from '@mui/material'

// Importing Icons
import {AiOutlineUserAdd, AiOutlineCloseCircle} from 'react-icons/ai'
import {CiEdit} from 'react-icons/ci'
import {IoMdMore} from 'react-icons/io'

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
  
  
  
  
  

// Fetching the Doctor
const user = JSON.parse(sessionStorage.getItem('user'));

//Setting Model
const Transition = forwardRef(function Transition(props, ref){
  return <Slide direction='up' ref={ref} {...props}/>;
})

//Setup Pets Table
const columns = [
  {id: 'name', label: 'Pet Name'},
  {id: 'dob', label: 'Date of Birth'},
  {id: 'breed', label: 'Breed'},
  {id: 'sex', label: 'Sex'},
  {id: 'owner', label: 'Owner'},
  {id: 'action', label: 'Action'},
];

// Sample Data
async function createData(id, name, dob, breed, sex, owner){
  let customer = {};
  
  await fetch('http://localhost:8080/api/v1/client/get', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id: owner})
  }).then(response => response.json()).then(data => {
    customer = data; 
  })

  if(customer){
    owner = customer.firstName + ' ' + customer.lastName;
  }
  const action = <div style={{ display:'flex' }}><IconButton><CiEdit/></IconButton><IconButton><IoMdMore/></IconButton></div>;
  return {id, name, dob, breed, sex, owner, action};
}



export const Pets = () => {

  // States
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [petName, setPetName] = useState(null);
  const [breed, setBreed] = useState(null);
  const [sex, setSex] = useState(null);
  const [owner, setOwner] = useState(null);
  const [owners, setOwners] = useState([]);
  const [dob, setDob] = useState(null);
  const [type, setType] = useState(null);
  const [rows, setRows] = useState([]);

  // References 
  const petRegistrationFrom = useRef();

  const fetchOwners =  async()=>{
      fetch('http://localhost:8080/api/v1/client/get_by_doctor',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({doctor: user.id })
      }).then(response => response.json()).then(data => {
        console.log(data);
        setOwners(data);
      })
  }

  const fetchPets = async()=>{
    fetch('http://localhost:8080/api/v1/pet/get_by_doctor', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({doctor: user.id})
    }).then(response => response.json()).then(async data => {
      // implement response 
      let pets = [];
      for(var i= 0; i<data.length; i++) {
        var pet = await createData(data[i].id, data[i].name, data[i].dob, data[i].breed, data[i].sex, data[i].client);
        pets = [...pets, pet];
      }
      setRows(pets);
      console.log(pets);
    })
  }

  const handleOpen = ()=>{
    setOpen(true);
  }
  const handleClose = () =>{
    setOpen(false);
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  // Pet Registration Handle
  const handlePetRegistration = (event) => {
    event.preventDefault();
    // todo: sending Model 
    const data = {
      name: petName,
      breed: breed,
      sex: sex,
      doctor: user.id,
      client: owner,
      dob: dob,
      type: type,
      remark: ""
    }
    console.log(data);
    // todo: validate
    // todo: send
    fetch('http://localhost:8080/api/v1/pet/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(response => response).then(data =>{
      if(data.status === 200){
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
          // petRegistrationFrom.reset(); 
          // todo: need to refresh form 
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
    // todo: validate response
    // todo: update the table
  }

  useEffect(()=>{
    fetchOwners();
    fetchPets();
  },[]);


  return (
    <div className='container'>
      <Sidebar index="4"/>
      <div className="content">
        <Header title="Pet's Management" tag="Let's Manage registered pets" />
        <Box sx={{ flexGrow:1 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              {/* Left Side */}
              <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 400 }}>
                  <Table stickyHeader size='medium'>
                    <TableHead>
                      <TableRow>
                        {columns.map((column)=>(
                          <TableCell key={column.id}>{column.label}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row)=>{
                        return(
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                            {columns.map((column)=>{
                              const value = row[column.id];
                              return(
                                <TableCell key={column.id}>
                                  {column.format && typeof value === 'number' ? column.format(value) : value}
                                </TableCell>
                              )
                            })}
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page ={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
                  
         
              </Paper>
            </Grid>
            <Grid item xs={4}>
              {/* Right Side */}
              <div className="form-section">
                <div className="form-header">
                  <span className='form-title'>Add Pet</span><br/>
                  <span className='form-sub-title'>Create pet and assign for client.</span>
                </div>
                <div className="form-content">
                <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handlePetRegistration}
                    ref={petRegistrationFrom}
                  >
                    <Grid container>
                      <Grid item xs={5} sx={{ mr:2 }}>
                        <TextField id="outlined-basic" label="Pet Name" size='small' variant="outlined" sx={{ width: '100%' }} onChange={(e)=>setPetName(e.target.value)}/>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField id="outlined-basic" label="Date of Birth" size='small' type='date' variant="outlined" sx={{ width: '100%' }} onChange={(e)=>setDob(e.target.value)} InputLabelProps={{shrink: true}}/>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={6} sx={{ mr:1 }}>
                        <TextField id="outlined-basic" label="Breed" size='small' variant="outlined" sx={{ width: '100%' }} onChange={(e)=>setBreed(e.target.value)}/>
                      </Grid>
                      <Grid item xs={5} sx={{ ml:1 }}>
                        <TextField id="outlined-basic" label="Type" size='small' variant="outlined" sx={{ width: '100%' }} onChange={(e)=>setType(e.target.value)} select>
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
                      onChange={(e)=>setSex(e.target.value)}
                    >
                      {genders.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <div className="customer-section">
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Pet Owner"
                      onChange={(e)=>setOwner(e.target.value)}
                      size='small'
                      sx={{ width: '100%' }}
                    >
                      {owners.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.firstName + ' ' + option.lastName}
                        </MenuItem>
                      ))}
                    </TextField>
                    <IconButton onClick={handleOpen} className='add-btn'><AiOutlineUserAdd/></IconButton>
                    </div>
                    <Button variant='outlined' size='small' sx={{ width: '100%' }} type='submit'>Create Pet</Button>
                </Box>
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
      {/* Add Client Form */}
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} className="customer-add">
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton edge="start" color='inherit' onClick={handleClose} aria-label='Close' >
                        <AiOutlineCloseCircle/>
              </IconButton>
              <p className="form-title" style={{ fontWeight: 'bold' }}>
                Add New Client to the System
              </p>
            </Toolbar>
          </AppBar>
          <Box sx={{ flexGrow:1 }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                {/* Left Side */}
               <center> <img src={bg} alt="background"  style={{ marginTop: '5rem', width: '500px' }} /></center>
              </Grid>
              <Grid item xs={4}>
                {/* Right Side */}
                <div className="form-section" style={{ display: 'grid', margin: '1rem', marginRight: '5rem', marginTop: '7rem' }}>
                <div className="form-header">
                  <span className='form-title' style={{ fontSize: '24px', fontWeight: 'bold' }}>Create Client</span><br/>
                  <span className='form-sub-title' style={{ fontSize: '10px' }}>Create new Customer for System</span>
                </div>
                <div className="form-content" style={{ marginTop: '1rem' }}>
                <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField id="outlined-basic" label="Full Name" size='small' variant="outlined" sx={{ width: '100%' }}/>
                    <TextField id="outlined-basic" label="Address" size='small' variant="outlined" sx={{ width: '100%' }} />
                    <TextField id="outlined-basic" label="Email" size='small' variant="outlined" sx={{ width: '100%' }} />
                    <TextField id="outlined-basic" label="Mobile" size='small' variant="outlined" sx={{ width: '100%' }} />
                    
                    <Button variant='outlined' size='small' sx={{ width: '100%' }}>Register Customer</Button>
                </Box>
                </div>
              </div>
              </Grid>
             
            </Grid>
          </Box>
      </Dialog>
      <ToastContainer/>
    </div>
  )
}
