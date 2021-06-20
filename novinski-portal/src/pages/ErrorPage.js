import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppContext from '../context/AppContext'
import { FormattedMessage } from 'react-intl'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '70vh',
        flexGrow: 1,
        background: 'white !important',
        color: '#333333',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: '800',
        color: '#231F20',
        '@media(max-width: 767px)': {
            fontSize: '1.5rem',
        },
        '@media(max-width: 385px)': {
            fontSize: '1.2rem',
        },
    },
    paragraph: {
        color: '#909090',
        fontSize: 18,
    },
    link: {
        textDecoration: 'none',
        color: '#333333 !important',
    },
}))

const ErrorPage = () => {
    const classes = useStyles()
    const ctx = React.useContext(AppContext)

    ctx.handleAuthHeader(true)

    return (
        <div className={classes.root}>
            <Typography variant="h1" className={classes.title}>
                <FormattedMessage id="error.title" default="default text" />
            </Typography>
            <p className={classes.paragraph}>
                <FormattedMessage id="error.para1" default="default text" />
                <Link to="/" className={classes.link}>
                    <FormattedMessage id="error.link" default="default text" />
                </Link>{' '}
                <FormattedMessage id="error.para2" default="default text" />
            </p>
        </div>
    )
}

export default ErrorPage
