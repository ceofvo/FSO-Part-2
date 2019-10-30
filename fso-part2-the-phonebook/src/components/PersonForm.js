import React from 'react';


const PersonForm = (props) => {
    return (
         <div>
             <form onSubmit={props.onAddName}>
                <div>
                Name: <input 
                            value={props.newName} 
                            onChange={props.onNameInputChange}
                        />
                </div>
                <div>
                Number: <input 
                            value={props.newPhone} 
                            onChange={props.onPhoneInputChange}
                        />
                </div>
                <div>
                <button type="submit">Add</button>
                </div>
            </form>    
         </div>
     );
 };

 export default PersonForm;