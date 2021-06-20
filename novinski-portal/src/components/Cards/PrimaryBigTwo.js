import React from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import UserCard from './UserCard'


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    rightComponent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#F2F2F2',
        height: '100%',
        [theme.breakpoints.down('sm')]: {
            paddingTop: 40,
            paddingBottom: 10,
        },
    },
    Title2: {
        marginTop: '15rem',
        marginBottom: '1rem',
        padding: '0 10px 0 10px',
        maxWidth: 500,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        '-webkit-line-clamp': 3,
        '-webkit-box-orient': 'vertical',
        textDecoration: 'none',
        textTransform: 'uppercase'
        
    },
    // mainTitle: {
    //     maxWidth: 500,
    //     overflow: 'hidden',
    //     textOverflow: 'ellipsis',
    //     display: '-webkit-box',
    //     '-webkit-line-clamp': 3,
    //     '-webkit-box-orient': 'vertical',
    // },
}))

const PrimaryBigTwo = ({ categoryData }) => {
    const classes = useStyles()

    const title = () => {
        return categoryData && categoryData.title
            ? categoryData.title
            : 'DONALD TRUMP FOR BBC BUILD THAT GOD DAMN WALL!'
    }

    return (
        <Paper className={classes.rightComponent} elevation={0}>
            <Typography
             component={Link}
             to={`/single-post/${categoryData && categoryData._id}`}
                variant="h4"
                color="primary"
                align="center"
                className={classes.Title2}
            >
                {title()}
            </Typography>

            <UserCard categoryData={categoryData} />
        </Paper>
    )
}

export default PrimaryBigTwo
