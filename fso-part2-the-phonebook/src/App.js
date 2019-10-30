import React, { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm'; 
import Persons from './components/Persons';  
import Filter from './components/Filter';
import personService from './services/persons';
import Notification from './components/Notification';  

const App = () => {

  const [ persons, setPersons] = useState([]);
  const [ filters, setFilters] = useState([]);

  const [ newName, setNewName ] = useState('');
  const [ newPhone, setNewPhone ] = useState('');
  const [ filterName, setFilterName ] = useState('');
  const [ message, setMessage ] = useState([])

  useEffect(() => {
    personService
    .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
    })
    .catch(error => {
      setMessage( {showMessage : error.response.data.message, status: "error"} );
      setTimeout(() => {
        setMessage({showMessage : null, status: "null"})
      }, 5000)
    })
  }, []);

  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
  };
  const handlePhoneInputChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleFilterInputChange = (event) => {
    setFilterName(event.target.value);
    const newCopy = [...persons];
    const filterPerson = (arr, query) => {
        return arr.filter(el => el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    };
    setFilters(filterPerson(newCopy, filterName));
  };

  const handleDelete = (event) => {
    const id = parseInt(event.target.value, 10)
    const identity = persons.find(person => person.id === id);

    if( identity !== undefined) {
        const response= window.confirm(`Delete ${identity.name} ?`);
        if(response){
          const result = persons.filter(person => person.id !== id);
          personService
          .deleteOne(id)
            .then(response => {
              setPersons(result)
              setMessage( {showMessage : `${identity.name} deleted successfully`, status: "success"} );
              setTimeout(() => {
                setMessage({showMessage : null, status: "null"})
              }, 5000)
           })
          .catch(error => {
            setMessage( {showMessage : `Phone details of '${identity.name}' was already removed from server`, status: "error"} );
            setTimeout(() => {
              setMessage({showMessage : null, status: "null"})
            }, 5000)
            setPersons(persons.filter(p => p.id !== identity.id))
          })
        }
    }
};

const addName = (event) => {
    event.preventDefault();
    const result = persons.find((person) => person.name === newName);

    if( result !== undefined) {
        const response = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
        if(response){
          const changedNumber = { ...result, number: newPhone }
          personService
          .update(result.id, changedNumber)
            .then(response => {
              setPersons(persons.map(person => person.id !== result.id ? person : response));
              setNewName('');
              setNewPhone('');
              setMessage( {showMessage : `${result.name} updated`, status: "success"} );
              setTimeout(() => {
                setMessage({showMessage : null, status: "null"})
              }, 5000)
          })
          .catch(error => {
            setMessage( {showMessage : `Phone details of '${result.name}' was already removed from server`, status: "error"} );
            setTimeout(() => {
              setMessage({showMessage : null, status: "null"})
            }, 5000)
            setPersons(persons.filter(p => p.id !== result.id))
          })
        }
    }
    else {
        const personObject = {
            name: newName,
            number: newPhone,
        };

        personService
        .create(personObject)
          .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewPhone('');
          setMessage({showMessage : `Added ${personObject.name}`, status: "success"} );
          setTimeout(() => {
            setMessage({showMessage : null, status: "null"})
          }, 5000)
        })
    }
};


return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />

      <Filter  
        persons={persons}
        filterName={filterName}
        onFilterInputChange={handleFilterInputChange} />
        
      <h3>Add a new</h3>
      <PersonForm 
        persons={persons}
        newName={newName}
        newPhone={newPhone}
        onNameInputChange={handleNameInputChange}
        onPhoneInputChange={handlePhoneInputChange}
        onAddName={addName}
      />
     
      <h2>Numbers</h2>
      <Persons 
        persons={persons} 
        filters={filters} 
        filterName={filterName}
        onDelete={handleDelete} />
    </div>
  )
}

export default App;