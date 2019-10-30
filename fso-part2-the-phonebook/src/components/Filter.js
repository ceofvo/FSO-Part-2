import React from 'react';


const Filter = (props) => {
   
    return (
         <div>

            Filter shown with: <input 
                        value={props.filterName} 
                        onChange={props.onFilterInputChange}
                    />

         </div>
     );
 };

 export default Filter;