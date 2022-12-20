import React from 'react'
import'./dashpanel.scss'

//Importing components
import TopPanel from './TopPanel/TopPanel'
import BottomPanel from './BottomPanel/BottomPanel'

const Dashpanel = () => {
  return (
    <div className='body'>
        <TopPanel/>
        <BottomPanel/>
    </div>
  )
}

export default Dashpanel
