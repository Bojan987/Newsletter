import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import { Link } from 'react-router-dom'
import AppContext from '../../../../context/AppContext'
import './Post.css'

import { axiosAuth as axios } from '../../../../util/axios-instance'

const useStyles = makeStyles({
    root: {
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'row',
        height: 80,
        color: '#909090',
        border: '2px solid #F2F2F2',
        borderRadius: 10,
        boxShadow: 'none',
        margin: '10px 0',
        '@media(max-width:1000px)': {
            height: 'unset',
            flexDirection: 'column',
        },
        '@media(max-width:650px)': {
            width: '100%',
            margin: 'auto',
        },
        '@media(max-width:500px)': {
            width: '100%',
            margin: 'auto',
        },
    },
    lbl: {
        backgroundColor: 'inherit',
        color: 'black',
        pointerEvents: 'none',
        alignItems: 'baseline',
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'row',
        border: 'none',
        height: 50,
        boxShadow: 'none',
        margin: '10px 0',
        '@media(max-width:800px)': {
            display: 'none',
        },
    },
    media: {
        display: 'flex',
        justifyContent: 'flex-start',
        '&:active': {
            backgroundColor: 'white',
        },
        '@media(max-width:800px)': {
            flexDirection: 'row',
        },
        '@media(max-width:650px)': {
            flexDirection: 'column',
        },
    },
    image: {
        width: '10%',
        height: '100%',
        objectFit: 'fill',
        '@media(max-width:800px)': {
            width: '100%',
        },
    },
    content: {
        display: 'flex',
        justifyContent: 'flex-start',
        width: '90%',
        '@media(max-width:1000px)': {
            width: '100%',
            justifyContent: 'space-between',
        },
        '@media(max-width:800px)': {
            flexDirection: 'column',
            width: '90%',
        },
    },
    labelContent: {
        display: 'flex',
        justifyContent: 'flex-start',
        width: '90%',
        height: 40,
        '@media(max-width:1000px)': {
            width: '100%',
            justifyContent: 'space-between',
        },
        '@media(max-width:800px)': {
            flexDirection: 'column',
            width: '90%',
        },
    },
    typography: {
        width: '20%',
        '@media(max-width:800px)': {
            width: '100%',
        },
    },
    hiddenActions: {
        '@media(max-width:1000px)': {
            display: 'none',
        },
    },
})

export default function ImgMediaCard(props) {
    const classes = useStyles()
    const context = useContext(AppContext)
    const [com, setCom] = useState(0)

    const deletePost = (id) => {
        context.setDeleteId(id)
        context.setModalOpen(true)
    }

    const getNumOfComm = async (id, label) => {
        if (!label) {
            try {
                const response = await axios.get(
                    `/comment/getPostComments?postId=${id}`
                )
                setCom(response.data.nummOfComm)
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        getNumOfComm(props.id, props.label)
        // eslint-disable-next-line
    }, [])

    return (
        <Card className={props.label ? classes.lbl : classes.root}>
            <CardActionArea className={classes.media}>
                {props.label ? (
                    <div style={{ width: '10%' }}></div>
                ) : (
                    <CardMedia
                        component="img"
                        alt={!props.alt ? null : 'no image'}
                        image={
                            props.imageKey
                                ? `http://localhost:5000/images/${props.imageKey}`
                                : props.image
                        }
                        // image={`http://localhost:5000/images/${props.image}`}
                        title="no image"
                        className={classes.image}
                    />
                )}
                <CardContent
                    className={
                        props.label ? classes.labelContent : classes.content
                    }
                >
                    <Typography
                        gutterBottom
                        variant="body1"
                        component="p"
                        className="post-title"
                    >
                        <Link to={`/view-post/${props.id}`} className="link">
                            {props.title.length > 30
                                ? `${props.title.slice(0, 70)}...`
                                : props.title}
                        </Link>
                    </Typography>
                    <Typography
                        gutterBottom
                        variant="body1"
                        component="p"
                        className="post-category"
                    >
                        {props.category}
                    </Typography>
                    <Typography
                        gutterBottom
                        variant="body1"
                        component="p"
                        className="post-author"
                    >
                        {props.author}
                    </Typography>
                    <Typography
                        gutterBottom
                        variant="body1"
                        component="p"
                        className="post-published"
                    >
                        {props.published}
                    </Typography>
                    <Typography
                        gutterBottom
                        variant="body1"
                        component="p"
                        className="post-views"
                    >
                        {props.views}
                        <Typography
                            gutterBottom
                            variant="body1"
                            component="span"
                            className="comm-views-label"
                        >
                            pregleda
                        </Typography>
                    </Typography>
                    <Typography
                        gutterBottom
                        variant="body1"
                        component="p"
                        className="post-comments"
                    >
                        {!props.label ? com : props.comments}
                        <Typography
                            gutterBottom
                            variant="body1"
                            component="span"
                            className="comm-views-label"
                        >
                            komentara
                        </Typography>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={props.label ? classes.hiddenActions : null}>
                <Link to={`/edit-post/${props.id}`}>
                    <Button
                        size="small"
                        color="primary"
                        style={{ color: '#909090' }}
                    >
                        {!props.label ? <EditIcon /> : null}
                    </Button>
                </Link>
                <Button
                    size="small"
                    color="primary"
                    style={{ color: '#909090' }}
                    onClick={() => {
                        deletePost(props.id)
                    }}
                >
                    {!props.label ? <DeleteIcon /> : null}
                </Button>
            </CardActions>
        </Card>
    )
}
