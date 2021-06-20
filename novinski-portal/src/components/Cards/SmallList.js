import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import CardActionArea from '@material-ui/core/CardActionArea'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
    },
    media: {
        height: 100,
        minWidth: 90,
        maxWidth: 120,
    },
    postDetails: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        textAlign: 'left',
        marginLeft: '1rem',
    },
    postTitle: {
        padding: '2rem 0',
        marginRight: '15px',
        maxWidth: 200,

        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '60vw',
        },
    },
    mainTitle: {
        maxWidth: 500,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        '-webkit-line-clamp': 3,
        '-webkit-box-orient': 'vertical',
    },
    smallTitle: {
        maxWidth: 500,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        '-webkit-line-clamp': 3,
        '-webkit-box-orient': 'vertical',
    },
    cardwidth: {
        width: 120,
    },
}))

const SmallList = ({ postsmall, id }) => {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardActionArea
                className={classes.cardwidth}
                component={Link}
                to={`/single-post/${id}`}
            >
                <CardMedia
                    component="img"
                    image={postsmall.image}
                    title="Post image"
                    className={classes.media}
                />
            </CardActionArea>
            <CardActionArea component={Link} to={`/single-post/${id}`}>
                <Box className={classes.postDetails}>
                    <Typography
                        variant="h4"
                        color="primary"
                        className={classes.postTitle}
                    >
                        {postsmall ? postsmall.title : null}
                    </Typography>
                </Box>
            </CardActionArea>
        </Card>
    )
}

export default SmallList
