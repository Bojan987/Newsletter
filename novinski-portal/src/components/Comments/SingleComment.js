import { AccountCircleOutlined } from '@material-ui/icons'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import React, { useState } from 'react'
import styled from 'styled-components'
import Reply from './Reply'
import { makeStyles } from '@material-ui/core/styles'

import { axiosAuth as axios } from '../../util/axios-instance'
import AddReply from './AddReply'

const AvatarIcon = styled(AccountCircleOutlined)`
    font-size: 50px;
`
const Root = styled.div`
    margin: 35px 0;
`
const CommentBody = styled.div`
    display: flex;
`
const Author = styled.p`
    color: #231f20;
    font-family: 'Bitter', serif;
    margin: 0 0 0 15px;
    font-weight: 600;
`
const Comment = styled.p`
    color: #909090;
    margin: 5px 0 0 15px;
    font-family: 'Abel', serif;
    font-size: 18px;
`
const Ratings = styled.div`
    color: #909090;
    margin: 15px 0 0 0;
    display: flex;
    justify-content: end;
`
const Rate = styled.div`
    margin: 3px 0 0 25px;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-family: 'Abel';
`
const UpIcon = styled(ThumbUpIcon)`
    padding: 0 7px 0 0;
`
const DownIcon = styled(ThumbDownIcon)`
    padding: 0 7px 0 0;
`
const Replies = styled.div`
    margin: 0 0 0 65px;
    border-left: 1px solid black;
`

const useStyles = makeStyles((theme) => ({
    replyButton: {
        padding: '3px 0 0 0',
        cursor: 'pointer',
        fontFamily: 'Abel',
    },
    replyForm: {
        margin: '5px 0 20px 0',
    },
}))

const SingleComment = ({ id, firstName, lastName, content, replies }) => {
    const classes = useStyles()
    const [errorMessage, setErrorMessage] = useState('')
    const [replyState, setReplyState] = useState(false)

    const likeComment = async (id) => {
        try {
            const response = await axios.put('/comment/likes', { id: id })
            console.log(response)
        } catch (error) {
            setErrorMessage(error.response.data.error)
        }
    }

    const dislikeComment = async (id) => {
        try {
            const response = await axios.put('/comment/dislikes', { id: id })
            console.log(response)
        } catch (error) {
            setErrorMessage(error.response.data.error)
        }
    }

    return (
        <Root>
            <CommentBody>
                <div>
                    <AvatarIcon />
                </div>
                <div>
                    <Author>{`${firstName} ${lastName}`}</Author>
                    <Comment>{content}</Comment>
                </div>
            </CommentBody>
            <Ratings>
                <p
                    className={classes.replyButton}
                    onClick={() => setReplyState(!replyState)}
                >
                    Odgovori
                </p>
                <Rate onClick={() => likeComment(id)}>
                    <UpIcon /> <p>Podržavam</p>
                </Rate>
                <Rate onClick={() => dislikeComment(id)}>
                    <DownIcon /> Ne podržavam
                </Rate>
            </Ratings>
            <div className={classes.replyForm}>
                {replyState ? <AddReply id={id} /> : null}
            </div>
            {errorMessage.length > 0 &&
            errorMessage === 'Not authenticated.' ? (
                <p style={{ color: 'red' }}>
                    Morate biti ulogovani da biste ocenili komentar!
                </p>
            ) : (
                ''
            )}
            {replies.length > 0 ? (
                <Replies>
                    {replies.map((reply) => {
                        return (
                            <Reply
                                firstName={
                                    reply &&
                                    reply.author &&
                                    reply.author.firstName
                                        ? reply.author.firstName
                                        : 'Nepoznato'
                                }
                                lastName={
                                    reply &&
                                    reply.author &&
                                    reply.author.lastName
                                        ? reply.author.lastName
                                        : 'Nepoznato'
                                }
                                content={
                                    reply && reply.content ? reply.content : ''
                                }
                                key={reply && reply._id ? reply._id : ''}
                            />
                        )
                    })}
                </Replies>
            ) : null}
        </Root>
    )
}

export default SingleComment
