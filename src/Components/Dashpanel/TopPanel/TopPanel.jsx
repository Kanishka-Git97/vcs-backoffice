import React from 'react'
import Header from '../../Header/Header'
import './top.scss'



const TopPanel = () => {
  return (
    <div className='top'>
       <Header title="Work Productivity" tag="Let's Check your Progress"/>
       <div className="cardDiv flex">
          <div className="cards">
            <div className="card yellowCard flex">
              <div className="date">
                <span>Mon</span>
                <h3>18</h3>
              </div>

              <div className="precentage">
                <span className="text">Productive</span>
                <div className="flex">
                  <span className="line"></span>
                  <span className="pctg">80%</span>
                </div>
              </div>

              <div className="time">
                <span className="text">Productive Time</span>
                <h2>5h 12m</h2>
              </div>

              <div className="workTime">
                <span className="text">Time at Work</span>
                <h2>5h 45m</h2>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default TopPanel
