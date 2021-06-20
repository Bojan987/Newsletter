import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import UserCard from './UserCard'
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

    leftComponent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        background: '#F2F2F2',
        padding: '2rem 0',
    },
    Title1: {
        marginTop: '12rem',
        marginBottom: '2rem',
        padding: '0px 5px',
        maxWidth: 500,
        overflow: 'hidden',
        extOverflow: 'ellipsis',
        display: '-webkit-box',
        '-webkit-line-clamp': 3,
        '-webkit-box-orient': 'vertical',
        textDecoration: 'none',
        textTransform: 'uppercase'
    },
}))

const PrimaryBigOne = ({ categoryData }) => {
    const classes = useStyles()

    const title = () => {
        return categoryData && categoryData.title
            ? categoryData.title
            : 'DONALD TRUMP FOR BBC BUILD THAT GOD DAMN WALL!'
    }

    return (
        <Paper className={classes.leftComponent} elevation={0}>
            <Typography
                component={Link}
                to={`/single-post/${categoryData && categoryData._id}`}
                variant="h3"
                color="primary"
                align="center"
                className={classes.Title1}
            >
                {title()}
            </Typography>
            <UserCard categoryData={categoryData} />
        </Paper>
    )
}

export default PrimaryBigOne
