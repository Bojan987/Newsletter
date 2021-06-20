import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import PrimaryBigOne from '../Cards/PrimaryBigOne'
import PrimaryBigTwo from '../Cards/PrimaryBigTwo'

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    infoTitle: {
        fontWeight: 700,
        fontSize: '1rem',
        textTransform: 'uppercase',
    },
    infoTitle2: {
        fontWeight: 700,
        fontSize: '1rem',
        textTransform: 'uppercase',
        marginBottom: '2rem',
    },
    bigWrapper: {
        padding: '2rem 0',
    },
    Title1: {
        marginTop: '7rem',
        marginBottom: '2rem',
    },
    Title2: {
        marginBottom: '1rem',
        marginTop: '15rem',
        padding: '1rem',
    },
    leanrmorebtn: {
        [theme.breakpoints.down('sm')]: {
            marginTop: '2rem',
        },
    },
}))

const PrimarySingleCategory = ({ data, name }) => {
    const classes = useStyles()

    const firstPost = data && data !== undefined ? data[0] : {}

    const secondPost = data && data !== undefined ? data[1] : {}

    return (
        <>
            <Typography className={classes.infoTitle} color="primary">
                {name}
            </Typography>
            <Box className={classes.bigWrapper}>
                <Grid container className={classes.container} spacing={3}>
                    <Grid item xs={12} md={8} className={classes.root}>
                        <PrimaryBigOne categoryData={firstPost} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PrimaryBigTwo categoryData={secondPost} />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default PrimarySingleCategory
