import React from 'react'
// Map Component Import
import 'mapbox-gl/dist/mapbox-gl.css'
import Map, {Marker, NavigationControl} from 'react-map-gl'

const MapBox = (props) => {
  
  return (
    <div className='map-box'>
      <Map
        // mapboxAccessToken= {process.env.MAP_BOX_ACCESS_TOKEN}
        mapboxAccessToken = 'pk.eyJ1IjoicHVybmE5NyIsImEiOiJjbGM3amtwOWgxaTRpM29wZ2M2cmxuNDdnIn0.gaHCkPiEoMkrCcb1eNsA0g'
        style={{ 
            width: props.width,
            height: props.height,
            borderRadius: props.radius
         }}
         initialViewState={{ 
            longitude: props.locations[0].long,
            latitude: props.locations[0].lat,
            zoom: '7'
            
          }}
      
        mapStyle='mapbox://styles/mapbox/streets-v12'
      >
        {

            props.locations.map((location)=>(
              <Marker
                  longitude={location.long}
                  latitude= {location.lat}
                  
              />
)) 
        }
        <NavigationControl
            position='bottom-right'
        />
      </Map>
    </div>
  )
}

export default MapBox
