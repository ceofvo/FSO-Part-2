import React from 'react';


const Persons = (props) => {
    let allpersons;
    if (props.filters && props.filters.length && props.filterName !== '') {
        allpersons =  props.filters.map((filter) =>
        <li key={filter.id}>{filter.name}  {filter.number} 
         <button onClick={props.onDelete} value={filter.id}>Delete</button></li>
        );
    } else {
        allpersons = props.persons.map((person) =>
        <li key={person.id}>{person.name}  {person.number} 
        <button onClick={props.onDelete} value={person.id}>Delete</button>
        </li>
        );
    }

    

    return (
         <div>
             <ul>
             {allpersons}
             </ul>
         </div>
     );
 };

 export default Persons;