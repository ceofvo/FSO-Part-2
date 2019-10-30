import React from 'react';


const Notification = (props) => {
    if (props.message.status === "success") {
        return (
            <div className="success">
            {props.message.showMessage}
            </div>
        )
    } else if (props.message.status === "error") {
        return (    
        <div className="error">
            {props.message.showMessage}
        </div>
        )   
    } else {
        return null
    }
  }

  export default Notification;