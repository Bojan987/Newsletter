import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import './SinglePost.css'
import { useParams } from 'react-router-dom'

//import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import { CommentsForm } from '../../components/CommentsForm'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import SingleComment from '../../components/Comments/SingleComment'
import ProfileCard from '../../components/Cards/ProfileCard'
import { axiosAuth as axios } from '../../util/axios-instance'
import { FormattedMessage } from 'react-intl'

const Root = styled.div`
    margin: auto;
    padding: 20px 0;
`

/* const AvatarIcon = styled(AccountCircleOutlinedIcon)`
    font-size: 60px;
` */

const useStyles = makeStyles((theme) => ({
    formTypography: {
        color: '#231F20',
        fontFamily: "'Bitter', serif",
        fontWeight: '800',
    },
    authorName: {
        margin: 0,
    },
    authorDescription: {
        margin: 0,
    },
    authorLink: {
        textDecoration: 'none',
    },
}))

const SinglePost = () => {
    const classes = useStyles()
    const { id } = useParams()
    const [singlePost, setSinglePost] = useState({})
    const [author, setAuthor] = useState({})
    const [comments, setComments] = useState([])
    const [errorState, setErrorState] = useState('')

    const getSinglePost = async (id) => {
        try {
            const response = await axios.get(`/post/getSinglePost?postId=${id}`)
            setSinglePost(response.data.post)
            setAuthor(response.data.post.author)
        } catch (error) {
            console.log(error)
        }
    }

    const getComments = async (id) => {
        try {
            const response = await axios.get(
                `/comment/getPostComments?postId=${id}`
            )
            setComments(response.data.comments)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSinglePost(id)
        getComments(id)
    }, [id])

    const savePost = async (id) => {
        try {
            const response = await axios.put('/user/addBookmark', {
                idPost: id,
            })
            console.log(response)
        } catch (error) {
            setErrorState(error.response.data.error)
        }
    }

    return (
        <Root>
            <div>
                <img
                    src={
                        singlePost.imageKey
                            ? `http://localhost:5000/images/${singlePost.imageKey}`
                            : singlePost.image
                    }
                    alt="post"
                    className="single-post-image"
                />
            </div>
            <h1 className="single-post-title">{singlePost.title}</h1>
            <div className="single-post-all">
                <div className="single-post-content">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: `${singlePost.content}`,
                        }}
                    />
                </div>
                <p className="single-post-tags">
                    <FormattedMessage id="tags" default="default text" />:{' '}
                    <b>
                        {singlePost.tags
                            ? singlePost.tags
                                  .map((tag) => ` #${tag} `)
                                  .filter(
                                      (value, index, array) =>
                                          array.indexOf(value) === index
                                  )
                            : ''}
                    </b>
                </p>
                {/* <div className="single-post-author">
                    <div className="author-avatar">
                        <AvatarIcon />
                    </div>
                    <div className="author-info">
                        <Link
                            to={`/public-profile/${author._id}`}
                            className={classes.authorLink}
                        >
                            <h4
                                className={classes.authorName}
                            >{`${author.firstName} ${author.lastName}`}</h4>
                            <p className={classes.authorDescription}>
                                {author.description}
                            </p>
                        </Link>
                        <div className="sp-social">
                            <SocialLinks />
                        </div>
                    </div>
                </div> */}
                {author && (
                    <ProfileCard
                        size="big"
                        data={author}
                        avatar={'avatar'}
                        publicProfile={true}
                    />
                )}
            </div>
            <div className="bookmarks">
                <p>
                    <FormattedMessage id="save.post" default="default text" />:
                </p>
                <p className="save-link" onClick={() => savePost(id)}>
                    <FormattedMessage id="save" default="default text" />
                </p>
                {errorState.length > 0 &&
                errorState === 'Not authenticated.' ? (
                    <p style={{ color: 'red' }}>
                        <FormattedMessage
                            id="post.warning"
                            default="default text"
                        />
                    </p>
                ) : errorState.length > 0 &&
                  errorState === 'You already bookmarked that post' ? (
                    <p style={{ color: 'red' }}>
                        <FormattedMessage
                            id="save.post.warning"
                            default="default text"
                        />
                    </p>
                ) : null}
            </div>
            <div className="comments-form">
                <Typography
                    variant="h4"
                    align="left"
                    className={classes.formTypography}
                >
                    <FormattedMessage id="add.comment" default="default text" />
                </Typography>
                <CommentsForm id={id} />
            </div>
            <div className="comments">
                <Typography
                    variant="h4"
                    align="left"
                    className={classes.formTypography}
                >
                    <FormattedMessage id="comments" default="default text" />
                </Typography>
                {comments.length > 0 ? (
                    comments.map((comment) => {
                        return (
                            <SingleComment
                                key={comment && comment._id}
                                firstName={
                                    comment &&
                                    comment.author &&
                                    comment.author.firstName
                                        ? comment.author.firstName
                                        : 'Nepoznato'
                                }
                                lastName={
                                    comment &&
                                    comment.author &&
                                    comment.author.lastName
                                        ? comment.author.lastName
                                        : 'Nepoznato'
                                }
                                content={
                                    comment && comment.content
                                        ? comment.content
                                        : ''
                                }
                                replies={comment && comment.replies}
                                id={comment && comment._id ? comment._id : ''}
                            />
                        )
                    })
                ) : (
                    <p style={{ fontFamily: 'Abel' }}>
                        <em>
                            <FormattedMessage
                                id="no.comments"
                                default="default text"
                            />
                        </em>
                    </p>
                )}
            </div>
        </Root>
    )
}

export default SinglePost
