import React, { useState, useEffect } from 'react'

// Importing Component
import Sidebar from '../../Components/Sidebar/Sidebar'
import Header from '../../Components/Header/Header'

// Importing MUI
import { Box } from '@mui/system'
import { Button, Grid } from '@mui/material'
import { VideoRoom } from '../../Components/Video Room/VideoRoom'


// Importing Images
import bg from  '../../Assets/chatbg.svg'



export const ChatRoom = () => {

  const [isJoined, setIsJoined] = useState(false);
   

  return (
    <div className='container'>
        <Sidebar index="2"/>
        <div className="content">
        <Header title="Chat Room" tag="Let's Manage your Chats and Connect with Clients"/>
        <Box sx={{ flexGrow: 1}}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    {/* Left Side */}
                </Grid>
                <Grid item xs={8}>
                    {/* Right Side */}
                    {!isJoined && (
                       <div>
                         <Button size='small' variant='outlined' onClick={()=> setIsJoined(true)}>Join Room</Button>
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
