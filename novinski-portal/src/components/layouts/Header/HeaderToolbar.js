import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import AppContext from '../../../context/AppContext'

import './HeaderToolbar.css'

import CategoryList from '../../CategoryList'

import SocialLinks from '../../SocialLinks'
import Drawer from './HeaderDrawer'
import HeaderSearch from './HeaderSearch'
import HeaderInfo from './HeaderInfo'
// import { Container } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        background: 'white !important',
        color: '#333333',
        boxShadow: 'none',
        borderBottom: '2px solid #333333',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    toolbar: {
        display: 'flex',
        placeContent: 'center space-between',
        borderBottom: '2px solid #cccccc',
        '@media(max-width: 767px)': {
            borderBottom: 'none !important',
            paddingBottom: 0,
        },
        
    },
    
    nav: {
        display: 'flex',
        placeContent: 'center space-around',
        listStyle: 'none',
    },
    li: { color: '#f2f2f2', marginRight: '10px', textDecoration: 'none' },
    title: {
        flexGrow: 1,
        color: '#666666',
        fontFamily: 'Limelight, cursive',
        textTransform: 'uppercase',
        fontSize: 14,
        '@media(max-width: 767px)': {
            fontSize: 12,
        },
    },
}))

export default function HeaderToolbar() {
    const ctx = React.useContext(AppContext)
    const classes = useStyles()
    const [isDrawer, setIsDrawer] = React.useState(false)
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)

    const handleDrawer = () => {
        setIsDrawer(!isDrawer)
    }

    const getWidth = (e) => {
        setWindowWidth(window.innerWidth)
    }

    React.useEffect(() => {
        window.addEventListener('resize', getWidth)
    }, [windowWidth])

    return (
        <AppBar
            position={windowWidth > 767 ? 'static' : 'fixed'}
            className={classes.root}
        >
            <Toolbar
                className={classes.toolbar}
                style={{
                    borderBottom: ctx.authHeader ? 'none' : '2px solid #cccccc',
                }}
            >
                <HeaderSearch check={true} windowWidth={windowWidth} />
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    id="burger-btn"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleDrawer}
                >
                    <MenuIcon />
                </IconButton>
                <Drawer
                    isDrawer={isDrawer}
                    setIsDrawer={setIsDrawer}
                    handleDrawer={handleDrawer}
                    windowWidth={windowWidth}
                />

                <div className="social-holder">
                    <SocialLinks headerClass={true} />
                </div>
                <div className="title-div">
                    <Link
                        to="/"
                        style={{
                            marginRight: '0',
                            textDecoration: 'none',
                        }}
                    >
                        <Typography variant="h6" className={classes.title}>
                            Belgrade Times
                        </Typography>
                    </Link>
                </div>

                <HeaderInfo windowWidth={windowWidth} />
            </Toolbar>
            {!ctx.authHeader && (
                <nav className="nav-horizontal">
                    <CategoryList isMobile={false} />
                </nav>
            )}
        </AppBar>
    )
}
