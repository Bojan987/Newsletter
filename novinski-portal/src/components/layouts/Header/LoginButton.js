import React from 'react'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import AppContext from '../../../context/AppContext'

const LoginButton = ({ windowWidth, cssId }) => {
    const ctx = React.useContext(AppContext)
    return (
        <Link
            className="login-link"
            id={cssId ? 'login-drawer' : ''}
            to="/login"
            style={{
                textTransform: 'uppercase',
                fontWeight: 'bolder',
                display: ctx.authHeader ? 'none' : 'block',
            }}
        >
            <Button variant="outlined" className="button" id="login-button">
                <FormattedMessage id="login" default="default text" />
            </Button>
        </Link>
    )
}

export default LoginButton
