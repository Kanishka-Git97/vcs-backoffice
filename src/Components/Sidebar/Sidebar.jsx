import React from 'react'
import './sidebar.scss'

// Importing Images
import logo from '../../Assets/logoicon.png'

// Importing Icons
import { AiOutlinePieChart, AiFillWechat} from 'react-icons/ai'
import { BsCalendarDate} from 'react-icons/bs'
import { FiUsers} from 'react-icons/fi'
import { MdOutlinePets, MdOutlineTextSnippet} from 'react-icons/md'
import { TbBusinessplan} from 'react-icons/tb'


// Importing Routing Component
import { Link } from 'react-router-dom'

const Sidebar = (props) => {
  return (
    <div className="sideBar">
      <div className="logoDiv flex">
        <img src={logo} alt="vcs-logo" />
      </div>
      <div className="menu">
        <ul className="navItem">
          <li className="navList">
            <Link to='/'><AiOutlinePieChart className="icon" color={props.index === '0' ? '#01565b' : null}/></Link>
          </li>
          <li className="navList">
            <Link to='/schedule'><BsCalendarDate className="icon" color={props.index === '1' ? '#01565b' : null}/></Link>
          </li>
          <li className="navList">
            <Link to='/chatroom'><AiFillWechat className="icon" color={props.index === '2' ? '#01565b' : null}/></Link>
          </li>
          <li className="navList">
            <Link to='/users'> <FiUsers className="icon" color={props.index === '3' ? '#01565b' : null}/></Link>
          </li>
          <li className="navList">
            <MdOutlinePets className="icon" color={props.index === '4' ? '#01565b' : null}/>
          </li>
          <li className="navList">
            <MdOutlineTextSnippet className="icon" color={props.index === '5' ? '#01565b' : null}/>
          </li>
          <li className="navList">
            <TbBusinessplan className="icon" color={props.index === '6' ? '#01565b' : null}/>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
