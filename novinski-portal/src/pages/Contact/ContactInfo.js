import React from 'react'
import AlarmIcon from '@material-ui/icons/Alarm'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import PhoneIcon from '@material-ui/icons/Phone'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    info: {
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'flex-start',
        padding: '2rem',
        '@media(max-width: 1024px)': {
            width: '40%',
        },
        '@media(max-width: 767px)': {
            width: '95%',
            borderRight: 'none',
        },
    },
    infoHolder: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        color: '#909090',
    },
    infoParagraph: {
        marginLeft: '10px',
    },
}))

const ContactInfo = () => {
    const classes = useStyles()
    return (
        <div className={classes.info}>
            <div className={classes.infoHolder}>
                <AlarmIcon style={{ fontSize: '2rem' }} />
                <p className={classes.infoParagraph}>00-24h</p>
            </div>

            <div className={classes.infoHolder}>
                <PhoneIcon style={{ fontSize: '2rem' }} />
                <p className={classes.infoParagraph}>011290819</p>
            </div>

            <div className={classes.infoHolder}>
                <LocationOnIcon style={{ fontSize: '2rem' }} />
                <p className={classes.infoParagraph}>
                    Bulevara Marsala Tulbuhina 11090, Beograd
                </p>
            </div>
        </div>
    )
}

export default ContactInfo
