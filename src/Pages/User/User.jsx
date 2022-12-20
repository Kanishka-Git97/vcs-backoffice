import React from 'react'
import './user.scss'

// Importing Components
import Sidebar from '../../Components/Sidebar/Sidebar'
import Header from '../../Components/Header/Header'

//Importing MUI
import {Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, MenuItem, Chip} from '@mui/material'

//Importing Icons
import {AiOutlinePoweroff} from 'react-icons/ai'
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

const User = () => {
  return (
    <div className='container'>
        <Sidebar/>
        
        <div className="content">
        <Header title="User Management" tag="Let's Manage your Users"/>
        <Box sx={{ flexGrow:1 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              {/* Left  */}
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400, font: 6 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>User Name</TableCell>
                      <TableCell align="right">Full Name</TableCell>
                      <TableCell align="right">Access Level</TableCell>
                      <TableCell align="right">Status</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell scope="row">
                          {row.username}
                        </TableCell>
                        <TableCell align="right">{row.fullName}</TableCell>
                        <TableCell align="right">{row.level}</TableCell>
                        <TableCell align="right" sx={{ fontWeight:'700' }}><Chip label={row.status} color={row.status === 'Active' ? 'success' : 'default' } /></TableCell>
                        <TableCell align="right">
                          <Button variant="outlined" color={row.status === 'Active' ? 'error' : 'success'}>
                              <AiOutlinePoweroff/>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={4}>
              {/* Right  */}
              <div className="form-section">
                <div className="form-header">
                  <span className='form-title'>Add User</span><br/>
                  <span className='form-sub-title'>Create your Users with multiple access level.</span>
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
                    <TextField id="outlined-basic" label="Email" size='small' variant="outlined" sx={{ width: '100%' }}/>
                    <TextField id="outlined-basic" label="Full Name" size='small' variant="outlined" sx={{ width: '100%' }} />
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Access Level"
                      helperText="Please select user's Level"
                      size='small'
                      sx={{ width: '100%' }}
                    >
                      {levels.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField id="outlined-basic" label="Password" size='small' variant="outlined" type='password' sx={{ width: '100%' }}/>
                    <Button variant='outlined' size='small' sx={{ width: '100%' }}>Create User</Button>
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

export default User
