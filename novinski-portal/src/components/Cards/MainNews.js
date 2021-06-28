import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Box, Button, Grid } from '@material-ui/core'
//import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

const useStyles = makeStyles((theme) => ({
    bigWrapper: {
        background: '#F2F2F2',
        padding: '2rem 2rem',
        margin: '2rem 0',
    },
    heroTitle: {
        borderBottom: '5px solid red',
        padding: '1rem',
    },
    rightText: {
        maxWidth: 350,
        textAlign: 'left',
        marginLeft: 'auto',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
            margin: '1rem 0',
        },
    },
    button: {
        textTransform: 'none',
        textAlign: 'right',
    },
    bottomContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '2rem',
    },
    infoTitle: {
        marginBottom: '2rem',
        textTransform: 'uppercase',
    },
    mainTitle: {
        maxWidth: 500,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        '-webkit-line-clamp': 3,
        '-webkit-box-orient': 'vertical',
    },
    midContainer: {
        marginBottom: '2rem',
    },
}))

const PrimaryBig = ({ mainNews, auth, categoryMain, isCategoryMain }) => {
    const classes = useStyles()

    const id = isCategoryMain
        ? categoryMain && categoryMain._id
        : mainNews && mainNews._id

    return (
        <Grid container className={classes.bigWrapper} >
            <Grid container>
                <Typography
                    variant="h6"
                    color="primary"
                    className={classes.infoTitle}
                >
                    {isCategoryMain
                        ? categoryMain && categoryMain.title
                        : mainNews && mainNews.category.name}
                </Typography>
            </Grid>
            <Grid
                container
                spacing={4}
                alignItems="center"
                className={classes.midContainer}
            >
                <Grid item xs={12} md={8}>
                    <Typography
                        variant="h1"
                        color="primary"
                        className={classes.mainTitle}
                    >
                        {isCategoryMain
                            ? categoryMain && categoryMain.title
                            : mainNews && mainNews.title}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box className={classes.rightText}>
                        <Typography variant="body2" color="primary">
                            {isCategoryMain
                                ? categoryMain && categoryMain.content
                                : mainNews && mainNews.content}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            {/* <Box className={classes.bottomContainer}> */}
            <Grid container spacing={4} justify="space-between" my={5}>
                <Grid item>{auth}</Grid>
                <Grid item>
                    <Button
                        component={Link}
                        to={`/single-post/${id}`}
                        variant="text"
                        color="primary"
                        className={classes.button}
                        endIcon={<ChevronRightOutlinedIcon />}
                    >
                        <Typography color="primary" align="right">
                            <FormattedMessage
                                id="mainnews.learnmore"
                                default="default text"
                            />
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default PrimaryBig
