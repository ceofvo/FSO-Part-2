import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Countries from './components/Countries';  
import Filter from './components/Filter';  

const App = () => {

  const [ countries, setCountries] = useState([]);
  const [ filterName, setFilterName ] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, []);


  const handleInputChange = (event) => {
    setFilterName(event.target.value);
  };

  const handleButtonClick = (event) => {
    setFilterName(event.target.value);
  };

return (
    <div>
      <h2>Data for countries</h2>
      <Filter  
        filterName={filterName}
        onInputChange={handleInputChange} />
           
      <Countries countries={countries} filterName={filterName} onButtonClick={handleButtonClick}/>
    </div>
  )
}

export default App;