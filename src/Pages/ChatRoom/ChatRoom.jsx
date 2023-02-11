import './chatroom.css'
import React from 'react'
import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/Sidebar/Sidebar'

// Importing MUI
import { Avatar, Box, Grid, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'

// Sample Data 
const data = [
    {id: "1", name:  "Sandini Kaveesha", lastChat: "Thank you Doctor for the Help", date: "2022-12-30", time: "9.34 AM"},
    {id: "1", name:  "Jagath Pathirana", lastChat: "Can you Send Your Number?", date: "2022-12-30", time: "8.04 AM"},
];


const ChatRoom = () => {
  return (
    <div className='container'>
        <Sidebar index="2" />
        <div className="content">
            <Header title="Chat Room" tag="Let's Manage your Chats and Connect with Clients"/>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        {/* Left Side */}
                        <div className="chat-header">
                            <div className="chat-header-title">
                                Chats
                            </div>
                            <div className="chat-header-sub-title">Most Recent Chat and Requests</div>
                        </div>
                        <div className="chat-list">
                            <List sx={{ width: '100%' }} component='nav'>
                                {data.map((chat)=>(
                                    <ListItem alignItems='flex-start' button divider>
                                        <ListItemAvatar><Avatar>{chat.name.charAt(0)}</Avatar></ListItemAvatar>
                                        <ListItemText
                                        primary={chat.name}
                                        secondary={chat.lastChat}
                                        ></ListItemText>
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </Grid>
                    {/* Right Side Need to Implement Chat section //todo: chat Engine */}
                </Grid>
            </Box>
        </div>
    </div>
  )
}

export default ChatRoom
