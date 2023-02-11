import React from 'react'
import MapBox from '../../Map Box/MapBox'
import './bottom.scss'

const locations = [{long: 54.37585762735543, lat: 24.45677614934833}, {long: 34.37585762735543, lat: 44.45677614934833}]

const BottomPanel = () => {
  return (
    <div className='bottom-section'>
      <MapBox width='500px' height='270px' radius='15px' locations={locations}/>
    </div>
  )
}

export default BottomPanel

