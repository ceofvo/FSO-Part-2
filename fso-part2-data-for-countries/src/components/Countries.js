import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = (props) => {
    const [weather, setWeather] = useState([]);

    useEffect(() => {
        const params = {
            access_key: '9d77df11c7e0b5c5d94895b5913b234f',
            query: props.name
        } 
        axios
            .get('http://api.weatherstack.com/current', {params})
            .then(response => {
            const apiResponse = response.data;
            const weatherObject = {
                name: apiResponse.location.name,
                temperature: apiResponse.current.temperature,
                wind: apiResponse.current.wind_speed,
                direction: apiResponse.current.wind_dir,
                imageSrc: apiResponse.current.weather_icons[0],
                imageAlt: apiResponse.current.weather_descriptions[0]
            };
            setWeather(weatherObject);
        }).catch(error => {
            console.log(error);
        });
    }, [props.name]);   

    return (
        <div>
            <h3>Weather in {weather.name}</h3> 
            <p>Temperature: {weather.temperature} Celsius</p>
            <img src={weather.imageSrc} alt={weather.imageAlt} style={{width: 100}}/>
            <p>Wind: {weather.wind} kph direction {weather.direction}</p>
        </div>
    );
};


const Countries = ({ countries, filterName, onButtonClick }) => {
    const filterCountry = (arr, query) => {
        return arr.filter(el => el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    };
    const countryList = filterCountry(countries, filterName);

    if (countryList.length === 1) {            
            //get the list of languagues spoken in the country 
            let lang = countryList[0].languages.map((names)=> {
                return <li key={names.name}>{names.name}</li>
            });
        return ( 
                <div key={countryList[0].numericCode}> 
                    <h2>{countryList[0].name}</h2>
                    <p>Capital: {countryList[0].capital}</p>  
                    <p>Population: {countryList[0].population}</p>
                    <img src={countryList[0].flag} alt={countryList[0].name} />
                    <h3>Languagues</h3> <ul>{lang}</ul>
                    <Weather name={countryList[0].name}/> 
                </div>
        );
    } else if (countryList.length <= 10 ) {
        const displayList = countryList.map((country)=> { 
            return <div key={country.numericCode}>{country.name}<button onClick={onButtonClick} value={country.name}>Show</button></div>});       
        return (
                <div>
                    {displayList}
                </div>
              );
    } else if (countryList.length && filterName !== '') {
        return (
                <div><p>Too many matches, specify another filter</p></div>
                );
    } else {
        return (
                <div></div>
                );
    }
 };

 export default Countries;