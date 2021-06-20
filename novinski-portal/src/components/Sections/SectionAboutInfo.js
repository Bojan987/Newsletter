import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    item: {
        padding: theme.spacing(2),
        overflow: 'hidden',
        marginTop: '20px',
        '@media(max-width:960px)': { 
            textAlign: 'center'
        },
    },
    aboutText: {
        fontSize: 16,
        color: '#909090',
        padding: '0 0 10px 20px',
        fontFamily: "'Abel', sans-serif"
    }
}))

const SectionAboutInfo = () => {
    const classes = useStyles()

    return (
        <Grid container className={classes.root} spacing={3}>
            <Grid item xs={12} md={6} className={classes.item}>
                <img src="/images/about.png" alt="about" style={{width: '100%'}} />
            </Grid>
            <Grid item xs={12} md={6} className={classes.item}>
                <Typography className={classes.aboutText}>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using.
                </Typography>
                <Typography className={classes.aboutText}>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using.
                </Typography>
                <Typography className={classes.aboutText}>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using.
                </Typography>
            </Grid>
        </Grid>
    )
}

export default SectionAboutInfo
