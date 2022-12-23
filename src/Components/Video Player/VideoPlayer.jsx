import React, {useEffect, useRef} from 'react'
import User from '../../Pages/User/User'

// Importing MUI
import {Card, CardContent} from '@mui/material'

export const VideoPlayer = ({user}) => {
    const ref = useRef();
    useEffect(() =>{
        user.videoTrack.play(ref.current);
        user.audioTrack.play();
    },[])

  return (
    <div>
         <div className='own-screen' ref={ref} style={{ width: '300px', height: '200px' }}></div>
    </div>
  )
}
