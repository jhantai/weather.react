import React, {useEffect, useState} from "react";
import Header from "./components/header/header";
import Main from "./components/main/main";
import Footer from "./components/footer/footer";
import './App.css';


function App() {

  const API_KEY = '317147e078c54d6c882102156230710'
  const [city, SetCity] = useState('')
  const [weather, setWeather] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [gradus,setGradus] = useState("")
  const [ wind_kph,setWind_kph] = useState("")
  const [ wind_degree,setWind_degree] = useState("")
  const [errorText  , setErrorText]  = useState("")

  const defaultState = () => {
    setWeather(null)
    setIsActive (false)
    SetCity("")
    setGradus('')
    setWind_kph('')
    setWind_degree('')
    setErrorText ('')
  }

  const getWeather = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`)
      const data = await response.json()

      if (response.status === 200) {
        setWeather(data)
        setIsLoading(false)
        setIsActive(true)
        setGradus("°C🌡")
        setWind_kph("Wind_kph")
        setWind_degree('wind_degree')
        setErrorText('')
        setWeather(data)
      } else if(response.status === 400 ) {
        defaultState()
        setErrorText('В запросе синтаксическая ошибка')
      } else {
        defaultState()
        setErrorText('Произошла неизвестная ошибка')
      }
    } catch (e) {
      defaultState()
      setErrorText('Сервер недоступен!')
    } }

  const resetWeather = async ()  => {
    defaultState()
  }

  // useEffect(() => {
  //   (async () => {
  //     setIsLoading(true)
  //     try {
  //       const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Bishkek&aqi=no`)
  //       const data = await response.json()
  //       setWeather(data)
  //       setIsActive(true)
  //     } catch (e) {
  //       alert('Сервер недоступен или отключен')
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   })()
  // }, []);


  return (
      <div className="App">
        <Header/>
        <Main
            SetCity={SetCity}
            getWeather={getWeather}
            weather={weather}
            isLoading={isLoading}
            isActive={isActive}
            resetWeather={resetWeather}
            gradus = {gradus}
            wind_kph = {wind_kph}
            wind_degree = {wind_degree}
            errorText = {errorText}
        />
        <Footer />
      </div>
  );
}

export default App;
