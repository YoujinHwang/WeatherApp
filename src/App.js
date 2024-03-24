import { useEffect,useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";
import { Container } from "react-bootstrap";

//1. 앱이 실행되자마자 현재위치 기반의 날씨가 보인다.
//2. 날씨 정보에는 도시, 섭씨, 화씨 날씨 상태
//3. 5개의 버튼이 있다(1개는 현재 위치, 4개는 다른 도시)
//4. 도시 버튼을 클릭할 때마다 도시별 날씨가 나온다
//5. 현재 위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
//6. 데이터를 들고오는 동안 로딩 스피너가 돈다.

const App=()=> {

  const [weather, setWeather]=useState(null);
  const [city,setCity]=useState('');
  const [loading, setLoading]=useState(false);
  const cities=['paris','new york','tokyo','seoul'];
  const [apiError, setAPIError]=useState("");
  
  const getCurrentLocation=()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      const {latitude, longitude}=position.coords;
      getWeatherByCurrentLocation(latitude,longitude);
    });
  };
  
  const getWeatherByCurrentLocation=async(lat,lon)=> {
    try {
      let url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=710a2a7d653945ed66e1be4cfd597508&units=metric`;
      //setLoading(true);
      const response=await fetch(url);
      const data=await response.json();
      setWeather(data);
      setLoading(false);
    } catch(err) {
      setAPIError(err.message);
      setLoading(false);
    }
    
  };

  const getWeatherByCity=async ()=>{
    try {
      let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=710a2a7d653945ed66e1be4cfd597508&units=metric`
      //setLoading(true);
      const response=await fetch(url);
      const data=await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setAPIError(err.message);
      setLoading(false);
    }
    
  };


  useEffect(()=>{
    if(city==="") {
      setLoading(true);
      getCurrentLocation();
    } else {
      setLoading(true);
      getWeatherByCity();
    }
  },[city]);

  
  return (
    <>
    <Container className="vh-100">
      {loading?(
        <div className="container">
        <ClipLoader
          color="#f88c6b"
          loading={loading}
          size={150}
        />
        </div>)
        :!apiError?(
          <div className="container">
        
            <WeatherBox weather={weather}/>
            <WeatherButton cities={cities} setCity={setCity} selectedCity={city}/>
          </div>
        ):(
          apiError
        )}
    </Container>
    </>
  );
}

export default App;
