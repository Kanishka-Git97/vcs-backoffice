import React from 'react'
import {BiChevronRight, BiEdit} from 'react-icons/bi'
import {BsThreeDotsVertical} from 'react-icons/bs'
import './account.scss'

const user = JSON.parse(sessionStorage.getItem('user'));

const Account = () => {
  return (
    <div className='account'>
      <div className='icons flex'>
        <BiChevronRight className='icon'/>
        <BsThreeDotsVertical className='icon'/>
      </div>

      <div className='accountDetails'>
        <div className='img'>
        <img src={`data:image/jpeg;base64,${user.img}`} alt="profile-pic" />
          <span className='name'>{user.firstName} {user.lastName}</span>
          <button className='btn flex'>
            <BiEdit className='icon'/>
            Edit Profile
          </button>
        </div>
        <div className="hours">
          <span className="title">Working Hours</span>
          <div className="hoursCard flex">
            <div className="right bg">
              <span>Work Starts</span>
              <h6>09:00 am</h6>
            </div>
            <div className="left noBg">
              <span>Work Ends</span>
              <h6>08:00 pm</h6>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  )
}

export default Account
