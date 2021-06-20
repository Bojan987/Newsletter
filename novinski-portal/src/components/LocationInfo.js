import React from 'react'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import axios from 'axios'

const LocationInfo = () => {
    const [city, setCity] = React.useState('')
    const [temp, setTemp] = React.useState('')

    const fetchLocation = async () => {

        try {
            
            let latitude
            let longitude
    
            const res = await axios.get('https://geolocation-db.com/json/')
            setCity(res.data.city)
            longitude = res.data.longitude
            latitude = res.data.latitude
    
            const weather = await axios.get(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,daily,hourly&appid=1c991d24d0cd49c462d60dcb3c10a85b&units=metric`
            )
            setTemp(parseInt(weather.data.current.temp))
        } catch (error) {
            console.log(error)
        }

    }

    React.useEffect(() => {
        fetchLocation()
    }, [])

    return (
        <div className="geo-weather">
            <WbSunnyIcon style={{ color: '#909090' }} />
            <span className="loc">{temp}</span>
            <LocationOnIcon style={{ color: '#909090' }} />
            <span className="loc">{city}</span>
        </div>
    )
}

export default LocationInfo
