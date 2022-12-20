import React from 'react'
import './dashboard.css'

// Import Components
import Sidebar from '../../Components/Sidebar/Sidebar'
import Dashpanel from '../../Components/Dashpanel/Dashpanel'
import Account from '../../Components/Account Section/Account'

const Dashboard = () => {
  return (
    <div className='container'>
        <Sidebar/>
        <Dashpanel/>
        <Account/>
    </div>
  )
}

export default Dashboard
