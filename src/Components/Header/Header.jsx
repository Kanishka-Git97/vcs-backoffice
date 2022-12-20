import React from 'react'
import './header.scss'

//Importing Icons
import {AiOutlineSearch} from 'react-icons/ai'

const Header = (props) => {
  return (
    <div className="topDiv flex">
        <div className="titleTxt">
          <span className="title">
            {props.title}
          </span>
          <p>{props.tag}</p>
        </div>

        <div className="searchInput flex">
          <AiOutlineSearch className='icon'/>
          <input type="text" placeholder="Search"/>
        </div>     
    </div>
  )
}

export default Header
