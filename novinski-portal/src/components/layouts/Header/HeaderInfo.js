import React, { useEffect, useState } from 'react'
import LocationInfo from '../../LocationInfo'
import LoginButton from './LoginButton'
import LanguageBox from '../../LanguageBox'
import { useHistory } from 'react-router'
import UserLoggedInMenu from '../../UserLoggedInMenu'

const HeaderInfo = ({ windowWidth }) => {
    const [token,setToken] = useState(localStorage.getItem('token'))
    const history=useHistory()

    useEffect(() => {
        const unlisten = history.listen(() => {
           
            if (history.location.pathname ==='/') setToken(localStorage.getItem('token'))
            setToken(localStorage.getItem('token'))
            if(localStorage.getItem('expiresAt')){
                const date=new Date();
                const expires = new Date(localStorage.getItem('expiresAt'));
                
                date>expires && localStorage.clear()
            }
          });
          
          return () => {
            unlisten();
          };
    },[history])
    
    

// const HeaderInfo = ({ windowWidth }) => {
//     const [isLoggedIn, setIsLoggedIn] = React.useState(false)

//     const token = localStorage.getItem('token')

//     React.useEffect(() => {
//         token && setIsLoggedIn(true)
//     }, [token])

    return (
        <div className="info">
            <div className="loc-nonmobile">
                <LocationInfo />
            </div>
            <div className="lang-nonmobile">
                <LanguageBox />
            </div>
            {token ? (
                <UserLoggedInMenu />
            ) : (
                <LoginButton windowWidth={windowWidth} />
            )}
        </div>
    )
}

export default HeaderInfo
