import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    toolbar: {
        display: 'flex',
        placeContent: 'center space-between',
    },
    navHorizontal: {
        display: 'flex',
        placeContent: 'center center',
        listStyle: 'none',
        margin: 0,
        padding: 0,
    },
    navMobile: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        listStyle: 'none',
        margin: 0,
        padding: 0,
    },
    liHorizontal: { marginRight: 0 },
    liMobile: { margin: '0.5rem auto' },

    linkHorizontal: {
        color: '#333333',
        textDecoration: 'none',
        padding: '1rem',
        fontWeight: 'bold',
    },
    linkMobile: {
        textDecoration: 'none',
        fontFamily: 'Libre Franklin, san serif',
        color: '#333333',
    },
}))

const NavUl = ({ isMobile, handleDrawer }) => {
    const classes = useStyles()

    const li = isMobile ? classes.liMobile : classes.liHorizontal
    const link = isMobile ? classes.linkMobile : classes.linkHorizontal

    return (
        <div>
            <ul
                className={isMobile ? classes.navMobile : classes.navHorizontal}
            >
                <li className={li}>
                    <Link to="/about" className={link} onClick={handleDrawer}>
                        <FormattedMessage
                            id="navul.item1"
                            default="default text"
                        />
                    </Link>
                </li>
                <li className={li}>
                    <Link to="/contact" className={link} onClick={handleDrawer}>
                        <FormattedMessage
                            id="navul.item2"
                            default="default text"
                        />
                    </Link>
                </li>
                {/* <li className={li}>
                    <Link
                        to="/category"
                        className={link}
                        onClick={handleDrawer}
                    >
                        <FormattedMessage
                            id="navul.item3"
                            default="default text"
                        />
                    </Link>
                </li>
                <li className={li}>
                    <Link
                        to="/search-page"
                        className={link}
                        onClick={handleDrawer}
                    >
                        <FormattedMessage
                            id="navul.item4"
                            default="default text"
                        />
                    </Link>
                </li>
                <li className={li}>
                    <Link
                        to="/single-post"
                        className={link}
                        onClick={handleDrawer}
                    >
                        <FormattedMessage
                            id="navul.item5"
                            default="default text"
                        />
                    </Link>
                </li>
                <li className={li}>
                    <Link
                        to="/public-profile"
                        className={link}
                        onClick={handleDrawer}
                    >
                        <FormattedMessage
                            id="navul.item6"
                            default="default text"
                        />
                    </Link>
                </li> */}
            </ul>
        </div>
    )
}

export default NavUl
