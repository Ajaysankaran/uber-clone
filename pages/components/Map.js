import React, { useEffect } from 'react'
import tw from 'tailwind-styled-components'
import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken = process.env.ACCESS_TOKEN

const Map = (props) => {

    useEffect(() => {
        const map = new mapboxgl.Map({
          container: "map",
          style: 'mapbox://styles/mapbox/light-v10',
          center: [-99.29011, 39.39172],
          zoom: 5
        });

        if (props.pickupCoordinates) {
          addToMap(map, props.pickupCoordinates)
        }

        if (props.dropoffCoordinates) {
          addToMap(map, props.dropoffCoordinates)
        }

        if (props.pickupCoordinates && props.dropoffCoordinates) {
          map.fitBounds([
            props.pickupCoordinates,
            props.dropoffCoordinates
          ], {
            padding: 60
          })
        }

      }, [props.pickupCoordinates, props.dropoffCoordinates]);

      const addToMap = (map, coordinates) => {
        const marker1 = new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(map)
      }

    return <Wrapper id='map'>

    </Wrapper>
}

export default Map

const Wrapper = tw.div`
flex-1 h-1/2
`