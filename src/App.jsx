import { useEffect, useState } from 'react'
import './App.css'
import weather_icon from './assets/weather_icon.png'
import cloud from './assets/clouds.jpg'
import WeatherStatus from './WeatherStatus'
import cloudyWeather from './assets/cloudy-weather.jpg'

function App() {
  const cloudyImage = cloudyWeather
  const normalImage = cloud

  const [city,setCity] = useState("")
  const [dataString, setDataString] = useState("")
  const [objectData,setObjectData] = useState()
  const [clearStatus,setClearStatus] = useState(false)
  const [cloudStatus, setCloudStatus] = useState(false)
  const [rainStatus, setRainStatus] = useState(false)
  const [snowStatus,setSnowStatus] = useState(false)
  const [mistStatus,setMistStatus] = useState(false)
  const [fogStatus,setFogStatus] = useState(false)
  const [cityString,setCityString] = useState("")
  const [temp,setTemp] = useState()

  //inline styles
  const styles = {
    primary:{
      minHeight: '100vh', // Ensure the div takes at least the full height of the viewport
      minWidth: '100vw', // Ensure the div takes at least the full width of the viewport
      backgroundSize: 'cover', // Cover the entire space of the div
      backgroundPosition: 'center', // Center the background image
      backgroundImage: `url(${cloudStatus ? cloudyImage : normalImage})`,
      backgroundRepeat: 'no-repeat', // Don't repeat the background image
      position: 'relative', // Ensures that the div is positioned correctly
    }
  }

  //function for retrieving data from weather API
  async function retrieveWeatherData(){
    const apiKey = "f9feb05a8b4638fdeb33885fdd00f5a4"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    try {
      const response = await fetch(url)
      if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const data = await response.json()
      const string = JSON.stringify(data)
      setDataString(`Weather in ${city} is: ${string}`)
      setObjectData(JSON.parse(string))
      console.log(data)
      console.log(`data type is ${typeof(data)}`)
    } catch (error) {
      console.error('Error fetching weather data:', error)
      setDataString("Error! Failed to get city data!")
      console.log(`object data is ${objectData}`)
      console.log(`data type is ${typeof(data)}`)
    }
    setCityString(city)
  }
  
  //retrieve weather data when enter key is pressed
  const onKeyPressedFunc = (e) => {
    if(e.key==='Enter'){
      retrieveWeatherData()
      setCityString(city)
    }
  }

  //convert temperature data from kelvin to celsius
  const getTempCelsius = (kelvin) =>{
    const celsius = kelvin - 273.15
    return parseInt(celsius)
  }

  useEffect(() => {
    try {
      const temp = objectData.main.temp
      const tempCelsius = getTempCelsius(temp)

      if(objectData.weather[0].main==='Clouds'){
        setCloudStatus(true)
        setClearStatus(false)
        setSnowStatus(false)
        setRainStatus(false)
        setMistStatus(false)
        setFogStatus(false)
        setTemp(tempCelsius)
      }
      else if(objectData.weather[0].main==='Clear'){
        setCloudStatus(false)
        setClearStatus(true)
        setRainStatus(false)
        setSnowStatus(false)
        setMistStatus(false)
        setFogStatus(false)
        setTemp(tempCelsius)
      }
      else if(objectData.weather[0].main==='Snow'){
        setSnowStatus(true)
        setClearStatus(false)
        setCloudStatus(false)
        setRainStatus(false)
        setMistStatus(false)
        setFogStatus(false)
        setTemp(tempCelsius)
      }
      else if(objectData.weather[0].main==='Rain'){
        setSnowStatus(false)
        setClearStatus(false)
        setCloudStatus(false)
        setRainStatus(true)
        setMistStatus(false)
        setFogStatus(false)
        setTemp(tempCelsius)
      }
      else if(objectData.weather[0].main==='Mist'){
        setSnowStatus(false)
        setClearStatus(false)
        setCloudStatus(false)
        setRainStatus(false)
        setMistStatus(true)
        setFogStatus(false)
        setTemp(tempCelsius)
      }
      else if(objectData.weather[0].main==='Fog'){
        setSnowStatus(false)
        setClearStatus(false)
        setCloudStatus(false)
        setRainStatus(false)
        setMistStatus(false)
        setFogStatus(true)
        setTemp(tempCelsius)
      }
    }
    catch(error){
      console.log(error)
      console.log(`the type of objectData is ${typeof(objectData)}`)
    }

  }, [dataString,objectData])
  

  return (
    <div className='primary' style={styles.primary}>
      <div className='main'>
        <h1><img src={weather_icon} alt="icon of a cloud"/>Weather App</h1>
        <div className='input-container'>
          <input type="text" onChange={(e)=>setCity(e.target.value)} defaultValue="Enter city name" onKeyDown={(e)=>onKeyPressedFunc(e)}/>
          <button onClick={retrieveWeatherData}>Fetch Data</button>
        </div>
      </div>
      <div className='paragraph'>
          <WeatherStatus isCloudy={cloudStatus} City={cityString} isRaining={rainStatus} isClear={clearStatus} isSnowing={snowStatus} isMisty={mistStatus} isFoggy={fogStatus} temp={temp}></WeatherStatus>
      </div>
      <footer>©Copyright Ben Weeks 2024</footer>
    </div>
  )
}

export default App