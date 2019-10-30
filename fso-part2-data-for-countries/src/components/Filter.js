import React from 'react';


const Filter = (props) => {
   
    return (
         <div>
            Find countries: <input 
                        value={props.filterName} 
                        onChange={props.onInputChange}
                            />
         </div>
     );
 };

 export default Filter;