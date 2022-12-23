import React, {forwardRef, useState} from 'react'
import './pets.scss'
// Importing Images
import bg from '../../Assets/bg.webp'

// Importing Component
import Sidebar from '../../Components/Sidebar/Sidebar'
import Header from '../../Components/Header/Header'

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
function createData(id, name, dob, breed, sex, owner){
  const action = <div style={{ display:'flex' }}><IconButton><CiEdit/></IconButton><IconButton><IoMdMore/></IconButton></div>;
  return {id, name, dob, breed, sex, owner, action};
}

const rows = [
  createData(1, 'Shaggy','2021-May-25', 'Labrado', 'Male', 'Sandini Kaveesha'),
  createData(2, 'Kittiy','2021-Mar-25', 'Persian', 'Female', 'Sandini Kaveesha'),
];

export const Pets = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
                  >
                    <TextField id="outlined-basic" label="Pet Name" size='small' variant="outlined" sx={{ width: '100%' }}/>
                    <TextField id="outlined-basic" label="Breed" size='small' variant="outlined" sx={{ width: '100%' }} />
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Sex"
                      helperText="Please select pet's gender"
                      size='small'
                      sx={{ width: '100%' }}
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
                     
                      size='small'
                      sx={{ width: '100%' }}
                    >
                      {genders.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <IconButton onClick={handleOpen} className='add-btn'><AiOutlineUserAdd/></IconButton>
                    </div>
                    <Button variant='outlined' size='small' sx={{ width: '100%' }}>Create Pet</Button>
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
    </div>
  )
}
