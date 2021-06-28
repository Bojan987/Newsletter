import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import LanguageBox from '../../components/LanguageBox'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { useHistory } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Route, Switch } from 'react-router-dom'
import SingleUser from '../pages/SingleUser'
import { useMediaQuery } from '@material-ui/core'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import CategoryIcon from '@material-ui/icons/Category'
import LayersIcon from '@material-ui/icons/Layers'
import PostAddIcon from '@material-ui/icons/PostAdd'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import CreateUser from '../pages/CreateUser/CreateUser'
import EditUser from '../pages/EditUser/EditUser'
import SingleCategory from '../pages/SingleCategory/SingleCategory'
import EditCategory from '../pages/EditCategory/EditCategory'
import CreateCategory from '../pages/CreateCategory/CreateCategory'
import Posts from '../pages/Posts/Posts'
import CreatePost from '../pages/CreatePost'
import EditPost from '../pages/EditPost'
import AdminSinglePost from '../pages/AdminSinglePost'

import AllUsers from '../pages/AllUsers'
import Categories from '../pages/Categories'
import LayoutPage from '../pages/LayoutPage'
import Statistics from '../pages/Statistics'
import AppContext from '../../context/AppContext'

const drawerWidth = 200

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    // drawer: {
    //   [theme.breakpoints.up('xl')]: {
    //     width: drawerWidth,
    //     flexShrink: 0,
    //   },
    // },
    appBar: {
        [theme.breakpoints.up(1600)]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        background: 'white',
        color: '#231F20',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        boxShadow: 'none',
    },
    adminTitle: {
        flexGrow: 1,
        color: '#666666',
        fontFamily: 'Limelight, cursive',
        textTransform: 'uppercase',
        fontSize: 14,
        '@media(max-width: 767px)': {
            fontSize: 12,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(1600)]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}))

function ResponsiveDrawer(props) {
    const { window } = props
    const classes = useStyles()
    const theme = useTheme()
    const [mobileOpen, setMobileOpen] = useState(false)
    const history = useHistory()
    const matches = useMediaQuery(theme.breakpoints.down(1600))
    const ctx = React.useContext(AppContext)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const handleLogout = () => {
        localStorage.clear()
        ctx.logout()
        history.push('/')
    }

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem
                    button
                    onClick={() => {
                        matches && handleDrawerToggle()
                        history.push('/')
                    }}
                >
                    <ListItemIcon>
                        <EqualizerIcon />{' '}
                    </ListItemIcon>
                    <ListItemText primary="STATISTICS" />
                </ListItem>
                <ListItem
                    button
                    onClick={() => {
                        matches && handleDrawerToggle()
                        history.push('/users')
                    }}
                >
                    <ListItemIcon>
                        <PeopleAltIcon />{' '}
                    </ListItemIcon>
                    <ListItemText primary="USERS" />
                </ListItem>{' '}
                <ListItem
                    button
                    onClick={() => {
                        matches && handleDrawerToggle()
                        history.push('/categories')
                    }}
                >
                    <ListItemIcon>
                        <CategoryIcon />{' '}
                    </ListItemIcon>
                    <ListItemText primary="CATEGORIES" />
                </ListItem>{' '}
                <ListItem
                    button
                    onClick={() => {
                        matches && handleDrawerToggle()
                        history.push('/layouts')
                    }}
                >
                    <ListItemIcon>
                        <LayersIcon />{' '}
                    </ListItemIcon>
                    <ListItemText primary="LAYOUTS" />
                </ListItem>{' '}
                <ListItem
                    button
                    onClick={() => {
                        matches && handleDrawerToggle()
                        history.push('/posts')
                    }}
                >
                    <ListItemIcon>
                        <PostAddIcon />{' '}
                    </ListItemIcon>
                    <ListItemText primary="POSTS" />
                </ListItem>
                <ListItem button onClick={handleLogout}>
                    <ListItemIcon>
                        <ExitToAppIcon />{' '}
                    </ListItemIcon>
                    <ListItemText primary="LOGOUT" />
                </ListItem>
            </List>
        </div>
    )

    const container =
        window !== undefined ? () => window().document.body : undefined

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        className={classes.adminTitle}
                    >
                        Belgrade Times
                    </Typography>
                    <LanguageBox/>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden lgUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden lgDown={matches} implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    <Route exact path="/" component={Statistics} />
                    <Route exact path="/users" component={AllUsers} />
                    <Route path="/categories" component={Categories} />
                    <Route path="/layouts" component={LayoutPage} />
                    <Route path="/users/:id" component={SingleUser} />
                    <Route
                        path="/single-category/:id"
                        component={SingleCategory}
                    />
                    <Route path="/edit-category/:id" component={EditCategory} />
                    <Route path="/create-category" component={CreateCategory} />
                    <Route path="/create-user" component={CreateUser} />
                    <Route path="/edit-user/:id" component={EditUser} />
                    <Route path="/posts" component={Posts} />
                    <Route path="/edit-post/:id" component={EditPost} />
                    <Route path="/create-post" component={CreatePost} />
                    <Route path="/view-post/:id" component={AdminSinglePost} />
                </Switch>
            </main>
        </div>
    )
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
}

export default ResponsiveDrawer
