import React, {useEffect, useState} from 'react'

// Importing MUI
import {Avatar, Button, Card, CardContent, CardHeader, IconButton} from '@mui/material'
// Importing Agora 
import AgoraRTC from 'agora-rtc-sdk-ng'
import { VideoPlayer } from '../Video Player/VideoPlayer';

// Importing Icons
import {BsVolumeMute} from 'react-icons/bs'
import {MdOutlineCallEnd} from 'react-icons/md'

// Configuring Channel 
const APP_ID = '3092980034824e83af91edb032c2e44f';
const TOKEN = '007eJxTYJDyWn5e7rhyaocEb/J3nTnT9+fZPpil0+qWVzbxTOiMGQsUGEyTU8wsExNNzBJNzE3MzZIsTM2TTRINUhITLVJSLC2MdxxemNwQyMjwcGU3KyMDBIL4zAxlycUMDAAL+x+7';
const CHANNEL = 'vcs';

const client = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8'
});


export const VideoRoom = () => {
    const [users, setUsers] = useState([]);
    const [localTracks, setLocalTracks] = useState([]);
    const handleUserJoined = async (user, mediaType) =>{
      await client.subscribe(user, mediaType);

      if(mediaType === 'video'){
        setUsers((previousUsers)=> [...previousUsers, user]);
      }

      if(mediaType === 'audio'){
        // 
      }
    }
    const handleUserLeft = (user) =>{
        setUsers((previousUsers)=>previousUsers.filter((u) => u.uid !== user.uid))
    }

    useEffect(() =>{
        client.on('user-published', handleUserJoined);
        client.on('user-left', handleUserLeft);

        client.join(APP_ID, CHANNEL, TOKEN, null)
            .then((uid)=>
               Promise.all([ AgoraRTC.createMicrophoneAndCameraTracks(), uid])
            ).then(([tracks, uid]) => {
                const [audioTrack, videoTrack] = tracks;
                setLocalTracks(tracks);
                setUsers((previousUsers)=>[...previousUsers,{uid, videoTrack, audioTrack},]);
                client.publish(tracks);
            });

            return ()=>{
                for (let localTrack of localTracks) {
                    localTrack.stop();
                    localTrack.close();
                }
                client.off('user-published', handleUserJoined);
                client.off('user-left', handleUserLeft);
                client.unpublish(localTracks).then(()=>client.leave());
            }

    },[]);


  return (
    <>
    <div style={{ display: 'flex' }}>
       
       {users.map((user)=>(
           <Card key={user.uid} sx={{ minWidth: 338, marginLeft: 1, backgroundColor: '#D7D7D7' }}>
               <CardHeader
                   avatar={<Avatar sx={{ bgcolor: '#D4170E' }}>P</Avatar>}
                   title = "Dr. Purna Kanishka"
               />
               <CardContent>
                   <VideoPlayer key={user.uid} user={user}/>
               </CardContent>   
                   
           </Card>
       ))}
       
   </div>
   <div className="btn-set">
       <IconButton><BsVolumeMute/></IconButton>
       <IconButton><MdOutlineCallEnd/></IconButton>
   </div>
    </>
  )
}
