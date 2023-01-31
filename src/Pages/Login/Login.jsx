import React, { useState } from 'react'
import {Box, Grid, Typography, TextField, Button, Link, Paper} from '@mui/material'
import logo from '../../Assets/logoicon.png'
import { toast, ToastContainer } from 'react-toastify'


const Login = () => {
  //States   
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);


  const handleSubmit = async(event)=> {
    event.preventDefault();
    fetch('http://localhost:8080/api/v1/user/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: username, password: password})
    }).then(response=> response.json()).then(data=>{
        console.log(data);
        if(data.msg === 'Unauthorized Access'){
            toast.warning("Unauthorized Access", {
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
        else{       
            const user = data.data; 
            sessionStorage.setItem("user", JSON.stringify(user));
            sessionStorage.setItem("logged", true);
            // todo: navigate to Dashboard
            window.location.href = "http://localhost:3000/";
        }
    
    });
  }
  
  return (
    <div>
      <Grid container sx={{ width: '80vw', height: '80vh', mt: 4 }}>
        <Grid item xs={7} sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1523480717984-24cba35ae1ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGV0JTIwd2FsbHBhcGVyfGVufDB8fDB8fA%3D%3D&w=1000&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '15px'
          }}>
            
        </Grid>
        <Grid item xs={5} component={Paper} elevation={0} square>
                <Box sx={{ 
                     my: 8,
                     mx: 4,
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                 }}>  
                    <img src={logo} alt="logo" style={{ height: '50px', width: 'auto' }} />
                    <Typography component="h1" variant="h5">Login</Typography>
                    <Box component="form" noValidate sx={{ mt:1 }} onSubmit={(e)=>handleSubmit(e)}>
                        <TextField
                            onChange={(e)=> setUsername(e.target.value)}
                            margin="normal"
                            required 
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete='email'
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            onChange={(e)=>setPassword(e.target.value)}
                            required 
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            autoComplete='current-password'
                            autoFocus
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt:3, mb:2 }}>Login</Button>
                        <Grid container>
                            <Grid item>
                                <Link href="http://localhost:3000/register" variant='body2'>
                                    {"Don't have and account? Register"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                 </Box>
        </Grid>
      </Grid>
    <ToastContainer/>
    </div>
  )
}

export default Login

