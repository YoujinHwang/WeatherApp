import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton=({cities,selectedCity, setCity})=> {
    console.log("cities",cities);

    return (
        <div class="menu-container">
            <Button variant={`${selectedCity ==="" ?"outline-warning":"warning"}`} 
            onClick={()=>setCity("")}>Current Location</Button>
            
            {cities.map((item,index)=>(
                <Button variant={`${selectedCity == item ? "outline-warning" : "warning"}`} 
                key={index}
                onClick={()=>setCity(item)}
                >{item}</Button>
            ))}
        </div>
    )
}

export default WeatherButton;