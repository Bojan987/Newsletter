import { AccountCircleOutlined } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'

const AvatarIcon = styled(AccountCircleOutlined)`
    font-size: 50px;
`
const Root = styled.div`
    display: flex;
    padding: 0 0 20px 15px;
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
    font-family: 'Abel';
    font-size: 17px;
`

const Reply = ({ firstName, lastName, content }) => {
    return (
        <Root>
            <div>
                <AvatarIcon />
            </div>
            <div>
                <Author>{`${firstName} ${lastName}`}</Author>
                <Comment>{content}</Comment>
            </div>
        </Root>
    )
}

export default Reply
