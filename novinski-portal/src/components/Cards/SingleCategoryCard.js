import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import postImage from '../../images/single_post_image.png'
import Box from '@material-ui/core/Box'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import AppContext from '../../context/AppContext'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
    root: {
        width: '100%',
        display: 'flex',
        margin: '10px 0',
        boxShadow: 'none',
        border: '1px solid #F2F2F2',
    },
    media: {
        width: 170,
        '@media(max-width:500px)': {
            display: 'none',
        },
    },
    actions: {
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'end',
        margin: 'auto',
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
    },
    postDate: {
        color: '#909090',
        fontSize: 13,
    },
})

const SingleCategoryCard = (props) => {
    const classes = useStyles()
    const context = useContext(AppContext)

    const time = (published) => {
        const dateTime = published.split(' ')
        const dateArr = dateTime[0].split('-')
        return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`
    }

    const deletePost = (id) => {
        context.setDeleteId(id)
        context.setModalOpen(true)
    }

    return (
        <Card className={classes.root}>
            <CardMedia
                image={postImage}
                title="Post image"
                className={classes.media}
            />
            <CardActionArea>
                <Box className={classes.postDetails}>
                    <Typography
                        variant="h4"
                        color="primary"
                        className={classes.postTitle}
                    >
                        {props.title.slice(0, 20)}...
                    </Typography>
                    <Typography
                        variant="h4"
                        color="primary"
                        className={classes.postDate}
                    >
                        {time(props.date)}
                    </Typography>
                </Box>
            </CardActionArea>
            <CardActions className={classes.actions}>
                <Link to={`/edit-post/${props.id}`}>
                    <Button
                        size="small"
                        color="primary"
                        style={{ color: '#909090' }}
                    >
                        <EditIcon />
                    </Button>
                </Link>
                <Button
                    size="small"
                    color="primary"
                    style={{ color: '#909090' }}
                    onClick={() => {
                        deletePost(props.id)
                        // console.log(props.id)
                        props.onDeleteClick()
                    }}
                >
                    <DeleteIcon />
                </Button>
            </CardActions>
        </Card>
    )
}

export default SingleCategoryCard
