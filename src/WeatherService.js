const API_KEY = 'd40a55a02d345464455a97c290745be6'
const IconURL = (iconID) =>`http://openweathermap.org/img/wn/${iconID}@2x.png`
// const IconURL = (iconID) =>`https://www.weatherbit.io/static/img/icons/${iconID}.png`

const get_Formatted_weatherData = async(city, units = 'metric') => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`

    const data = await fetch(URL).then((res)=> res.json()).then((data) => data);

    const{weather, 
        main:{temp,feels_like,temp_min, temp_max,pressure, humidity},
        wind:{speed},
        sys: {country},
        name,
        } = data;

        const {description, icon} = weather[0]

        return{
            description,
            iconURL: IconURL(icon), 
            temp, feels_like, temp_min, temp_max,pressure,humidity, speed,country, name,
        }
}
export {get_Formatted_weatherData};