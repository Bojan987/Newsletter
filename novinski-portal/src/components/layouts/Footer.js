import React from 'react'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'
import AlarmIcon from '@material-ui/icons/Alarm'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import PhoneIcon from '@material-ui/icons/Phone'
import { Grid } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import AppContext from '../../context/AppContext'

import './Footer.css'
import SocialLinks from '../SocialLinks'
import CategoryList from '../CategoryList'

const useStyles = makeStyles(() => ({
    root: {
        borderTop: '2px solid #231f20',
        display: 'flex',
        flexDirection: 'column',
        placeContent: 'center',
        width: '100%',
        marginTop: '2em',
        padding: '1rem 0 0.2rem',
    },
    li: { textDecoration: 'none' },

    input: {
        margin: '0 !important',
        padding: ' 0 !important',
        width: '160px !important',
        height: '30px !important',
    },
    button: {
        color: 'white',
        backgroundColor: '#231F20',
        margin: '0 !important',
        padding: '0 !important',
        height: '30px !important',
        width: '100px !important',
    },

    title: {
        textAlign: 'center',
        color: '#909090',
        fontFamily: 'limeLight',
        textTransform: 'uppercase',
        '@media(max-width: 960px)': {
            margin: '1.5rem 0',
        },
    },

    copyright: {
        textAlign: 'center',
        color: '#909090',
    },
    padding_right: {
        paddingRight: '2rem',
    },
    padding_top_bottom: {
        padding: '1rem 0',
    },
    margin_top_bottom: {
        margin: '1rem 0',
    },
}))

const Footer = () => {
    const classes = useStyles()
    const ctx = React.useContext(AppContext)

    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down(960))

    const placeholder = (
        <FormattedMessage id="navmenu.item11" default="default text" />
    )
    let date = new Date().getFullYear()
    return (
        <footer className={classes.root}>
            {!ctx.authHeader && (
                <Grid container>
                    <Grid
                        container
                        alignItems="center"
                        justify="space-between"
                        className={matches ? classes.margin_top_bottom : ''}
                    >
                        <Grid item md={4} xs={12}>
                            <Grid
                                container
                                spacing={0}
                                wrap="nowrap"
                                justify={matches ? 'center' : 'flex-start'}
                                alignItems="center"
                            >
                                <Grid item>
                                    <form
                                        style={{ width: '160px' }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField
                                            className={classes.input}
                                            id="outlined-basic"
                                            label={placeholder}
                                            variant="outlined"
                                            name="email"
                                            size="small"
                                        />
                                    </form>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        className={classes.button}
                                    >
                                        <FormattedMessage
                                            id="navmenu.item12"
                                            default="default text"
                                        />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item md={4} xs={12}>
                            <Link to="/" className={classes.li}>
                                <Typography
                                    variant="h6"
                                    className={classes.title}
                                >
                                    Belgrade Times
                                </Typography>
                            </Link>
                        </Grid>

                        <Grid item md={4} xs={12}>
                            <Grid
                                container
                                justify={matches ? 'center' : 'flex-end'}
                                alignItems="center"
                            >
                                <SocialLinks />
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Footer bottom */}
                    <Grid
                        container
                        alignItems="center"
                        justify="space-between"
                        className={matches ? '' : classes.padding_top_bottom}
                    >
                        <Grid
                            item
                            md={6}
                            xs={12}
                            className={matches ? classes.margin_top_bottom : ''}
                        >
                            <Grid
                                container
                                justify={matches ? 'center' : 'flex-start'}
                                alignItems="center"
                            >
                                <CategoryList isFooter={true} />
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                            className={matches ? classes.margin_top_bottom : ''}
                        >
                            <Grid
                                container
                                row="column"
                                alignItems="center"
                                justify={matches ? 'center' : 'flex-end'}
                                className={classes.copyright}
                            >
                                <Grid item xs={12}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        justify={
                                            matches ? 'center' : 'flex-end'
                                        }
                                    >
                                        <Grid item xs={1}>
                                            <AlarmIcon />
                                        </Grid>
                                        <Grid item xs={3}>
                                            00-24h
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        justify={
                                            matches ? 'center' : 'flex-end'
                                        }
                                    >
                                        <Grid item xs={1}>
                                            <PhoneIcon />
                                        </Grid>
                                        <Grid item xs={3}>
                                            011290819
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        justify={
                                            matches ? 'center' : 'flex-end'
                                        }
                                    >
                                        <Grid item xs={1}>
                                            <LocationOnIcon />
                                        </Grid>
                                        <Grid item xs={3}>
                                            Bulevar Maršala Tolbuhina 11090,
                                            Beograd
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )}

            <div className={classes.copyright}>
                Copyright &copy; {date} Thinksmart
            </div>
        </footer>
    )
}
export default Footer
