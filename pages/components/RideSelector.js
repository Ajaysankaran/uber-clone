import React, { useEffect, useState } from "react";
import tw from 'tailwind-styled-components'
import { carList } from '../data/carList'

const RideSelector = ({ pickupCoordinates, dropoffCoordinates }) => {
    const [rideDuration, setRideDuration] = useState(0)

    // get the duration
    useEffect(() => {
        if (pickupCoordinates && dropoffCoordinates && pickupCoordinates[0] && dropoffCoordinates[0]) {
            console.log(pickupCoordinates, dropoffCoordinates)
            fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?access_token=${process.env.ACCESS_TOKEN}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.routes && data.routes[0]) {
                        setRideDuration(data.routes[0].duration / 100)   
                    }
                })
        }
    }, [pickupCoordinates, dropoffCoordinates])

    return (
        <Wrapper>
            <Title>Choose a ride, or swipe up for more</Title>
            <CarList>
                {rideDuration != 0 && carList.map((car, index) =>
                    <Car key={index}>
                        <CarImage src={car.imgUrl} />
                        <CarDetails>
                            <Service>{car.service}</Service>
                            <Time>5 min away</Time>
                        </CarDetails>
                        <Price>{'$' + (rideDuration * car.multiplier).toFixed(2)}</Price>
                    </Car>
                )}
            </CarList>
        </Wrapper>
    )
}

export default RideSelector;

const Wrapper = tw.div`
flex-1 overflow-y-scroll flex flex-col
`
const Title = tw.div`
text-gray-500 text-center text-xs py-1 border-b
`

const CarList = tw.div`
overflow-y-scroll
`
const Car = tw.div`
flex p-4 items-center
`

const CarImage = tw.img`
h-14 mr-3
`

const CarDetails = tw.div`
flex-1
`

const Service = tw.div`
font-medium
`

const Time = tw.div`
text-xs text-blue-500
`

const Price = tw.div`
text-sm
`