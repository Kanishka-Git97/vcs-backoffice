import React from 'react'
import './sidebar.scss'

// Importing Images
import logo from '../../Assets/logoicon.png'

// Importing Icons
import { AiOutlinePieChart} from 'react-icons/ai'
import { BsCalendarDate} from 'react-icons/bs'
import { FiUsers} from 'react-icons/fi'
import { MdOutlinePets, MdOutlineTextSnippet} from 'react-icons/md'
import { TbBusinessplan} from 'react-icons/tb'

const Sidebar = () => {
  return (
    <div className="sideBar">
      <div className="logoDiv flex">
        <img src={logo} alt="vcs-logo" />
      </div>
      <div className="menu">
        <ul className="navItem">
          <li className="navList">
            <AiOutlinePieChart className="icon"/>
          </li>
          <li className="navList">
            <BsCalendarDate className="icon"/>
          </li>
          <li className="navList">
            <FiUsers className="icon"/>
          </li>
          <li className="navList">
            <MdOutlinePets className="icon"/>
          </li>
          <li className="navList">
            <MdOutlineTextSnippet className="icon"/>
          </li>
          <li className="navList">
            <TbBusinessplan className="icon"/>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
