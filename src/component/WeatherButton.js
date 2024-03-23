import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton=({cities})=> {
    console.log("cities",cities);
    //const [city,setCity]=useState('')

    // const searchByCity=(cityName)=>{
    //     setCity(cityName)
    //     let url=``
    //     let res=await fetch(url)
    //     let data=await res.json()
    // };
    return (
        <div>
            <Button variant="warning">Current Location</Button>
            
            {cities.map((item,index)=>(
                <Button variant="warning" key={index}>{item}</Button>
            ))}
        </div>
    )
}

export default WeatherButton;