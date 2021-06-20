import React from 'react'

import './UserSubmitBtn.css'

const UserSubmitButton = ({ edit, message, password }) => {
    const editStyles = {
        borderBottom: edit ? (password ? 'none' : '1px solid #cccccc') : 'none',
        paddingBottom: edit ? '20px' : '0',
        marginBottom: edit ? '20px ' : '0',
    }

    return (
        <div className="buttonContainer" style={editStyles}>
            <p className="notification">{message}</p>
            <button className="submitButton" type="submit">
                Submit
            </button>
        </div>
    )
}

export default UserSubmitButton
