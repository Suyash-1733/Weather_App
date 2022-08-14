import { useEffect, useState } from 'react';
import './App.css';
import sunny from "./Assets/sunny.jpg"
import winter from "./Assets/winter.jpg"
import rainy from "./Assets/rainy.jpg"
import Discription from './Components/Discription';
import {get_Formatted_weatherData} from './WeatherService'

function App() {

  const[city, setCity] = useState('Paris')

  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric")
  const [bg, setBg] = useState()

  useEffect(()=>{
    const fetchWeatherData = async() =>{
      const data = await get_Formatted_weatherData(city, units)
      // console.log(data);
      setWeather(data);

      const threshold = units ==='metric' ? 20:60;
      // const maxhum = units === 'metric' ? 100;
      if(data.temp<=threshold) setBg(winter);
      // else if (data.humidity =100) setBg(rainy);
      else setBg(sunny);
    }
    
    fetchWeatherData();
  },[units,city])

  const changeUnits = (e) =>{
    const button = e.currentTarget;
    const CurrentUnit= button.innerText.slice(1)
    const isCelsius = CurrentUnit === '°F';
    button.innerText = isCelsius ? '°F' : '°C'
    setUnits(isCelsius ? 'metric' : 'imperial');
    // console.log(CurrentUnit);
  }

  const enterKeyPressed =(e) =>{
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value)
      // e.currentTarget.blur()
    }
  }

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className='overlay'>
        {
        weather &&(
          <div className="container">
          <div className="section section__inputs">
            <input onKeyDown={enterKeyPressed} type="text" name='city' placeholder='Enter city...'/>
            <button onClick={(e) =>changeUnits(e)}>°F</button>
          </div>

          <div className="section section__temperature">
            <div className="icon">
              <h3>{`${weather.name}, ${weather.country}`}</h3>
              <img src={weather.iconURL} alt="" />
              <h3>{weather.description}</h3>
            </div>
            <div className="temperature">
              <h1>{`${weather.temp} °${units==='metric' ? 'C': 'F'}`}</h1>
            </div>
          </div>
          <Discription weather = {weather} units={units}/>
        </div>
        )}
      </div>
    </div>
  );
}

export default App;
