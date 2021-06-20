import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import UserCard from './UserCard'
import CardActionArea from '@material-ui/core/CardActionArea'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    media: {
        minWidth: 90,
        height: 100,
    },
    postDetails: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        marginLeft: '1rem',
        maxWidth: '20vw',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '60vw',
        },
        [theme.breakpoints.up('lg')]: {
            maxWidth: '10vw',
        },
    },
    postTitle: {
        textDecoration: 'none'
    },
    cardwidth: {
        width: 120,
    },
}))

const SmallListAuthor = ({ categoryData }) => {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardActionArea
                className={classes.cardwidth}
                component={Link}
                to={`/single-post/${categoryData && categoryData._id}`}
            >
                <CardMedia
                    component="img"
                    image={
                        categoryData && categoryData.image
                            ? categoryData.image
                            : null
                    }
                    title="Post image"
                    className={classes.media}
                />
            </CardActionArea>
            <CardActionArea
               
            >
                <Grid container>
                    <Grid item className={classes.postDetails}>
                        <Typography
                         component={Link}
                         to={`/single-post/${categoryData && categoryData._id}`}
                            variant="h4"
                            color="primary"
                            className={classes.postTitle}
                            noWrap
                        >
                            {categoryData && categoryData.title
                                ? categoryData.title
                                : null}
                        </Typography>

                        <UserCard small categoryData={categoryData} />
                    </Grid>
                </Grid>
            </CardActionArea>
        </Card>
    )
}

export default SmallListAuthor
