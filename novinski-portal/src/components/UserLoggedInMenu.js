import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import { makeStyles } from '@material-ui/core'
import AppContext from '../context/AppContext'

const useStyles = makeStyles({
    link: {
        textDecoration: 'none',
        cursor: 'pointer',
    },
})

export default function SimpleMenu() {
    const ctx = React.useContext(AppContext)
    const classes = useStyles()
    const history = useHistory()

    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        localStorage.clear()
        ctx.logout()
        setAnchorEl(null)
        history.push('/')
    }

    return (
        <div>
            <AccountCircleOutlinedIcon
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className={classes.link}
            ></AccountCircleOutlinedIcon>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <Link to="/my-profile" className={classes.link}>
                        My Profile
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    )
}
