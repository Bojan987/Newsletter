import React from 'react'
import Title from '../../components/Cards/Title'
import { makeStyles } from '@material-ui/core/styles'

import ContactForm from './ContactForm'
import ContactInfo from './ContactInfo'

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        minHeight: '50vh',
        background: 'white !important',
        color: '#333333',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '3rem',
        '@media(max-width: 767px)': {
            flexDirection: 'column',
            alignItems: 'center',
            margin: '1rem auto',
        },
    },
}))

const Contact = () => {
    const classes = useStyles()

    return (
        <div>
            <Title title="title.contact" />
            <div className={classes.root}>
                <ContactForm />
                <ContactInfo />
            </div>
        </div>
    )
}

export default Contact
