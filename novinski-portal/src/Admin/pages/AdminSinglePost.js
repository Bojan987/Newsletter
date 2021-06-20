import React, { useState, useContext, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import 'react-quill/dist/quill.snow.css'
import styled from 'styled-components'
import AppContext from '../../context/AppContext'
import './styles.css'
import { Link, useParams } from 'react-router-dom'
import { axiosAuth as axios } from '../../util/axios-instance'
import Modal from '../../components/Modal'
import SocialLinks from '../../components/SocialLinks'
import { deleteHook } from '../util/delete-hook'
import { makeStyles } from '@material-ui/core/styles'

const Left = styled.div`
    flex: 70%;
    padding: 30px;
    border-right: 2px solid #f2f2f2;
`
const Right = styled.div`
    flex: 30%;
`

const Root = styled.div`
    font-family: 'Abel', sans-serif;
    display: flex;
`

const MainButton = styled(Button)`
    outline: none;
    color: ${(props) => (props.main ? 'green' : 'red')};
`

const PrimaryButton = styled(Button)`
    backgound-color: white;
    outline: none;
    color: ${(props) => (props.primary ? 'green' : 'red')};
`

const LightButton = styled(Button)`
    backgound-color: white;
    outline: none;
    color: ${(props) => (props.light ? 'green' : 'red')};
`
const EditButton = styled(Button)`
    margin: 0 7px;
    background-color: #909090;
    color: white;
    &:hover {
        color: white;
        background-color: #909090;
    }
`
const DeleteButton = styled(Button)`
    margin: 0 7px;
    background-color: #231f20;
    color: white;
    &:hover {
        color: white;
        background-color: #231f20;
    }
`

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        fontFamily: "'Abel', sans-serif",
    },
}))

const SinglePost = () => {
    const classes = useStyles()
    const [main, setMain] = useState(false)
    const [primary, setPrimary] = useState(false)
    const [light, setLight] = useState(false)
    const context = useContext(AppContext)
    const [singlePost, setSinglePost] = useState({})
    const [postAuthor, setPostAuthor] = useState('')
    const [postCategory, setPostCategory] = useState('')
    const [role, setRole] = useState('')
    const [numOfComm, setNumOfComm] = useState(0)
    const { id } = useParams()
    const { ExitButton, SaveButton, rand, getModalStyle } = deleteHook()
    const [modalStyle] = React.useState(getModalStyle)

    const getSinglePost = async (id) => {
        const response = await axios.get(`/post/getSinglePost?postId=${id}`)
        setSinglePost(response.data.post)
        console.log(response.data.post)
        setPostAuthor(
            response.data.post.author.firstName +
                ' ' +
                response.data.post.author.lastName
        )
        setPostCategory(response.data.post.category.name)
        setRole(response.data.post.author.role)
        setMain(response.data.post.main)
        setPrimary(response.data.post.primary)
        setLight(response.data.post.light)
    }

    const getComments = async (id) => {
        const response = await axios.get(
            `/comment/getPostComments?postId=${id}`
        )
        setNumOfComm(response.data.comments.length)
    }

    useEffect(() => {
        getSinglePost(id)
        getComments(id)
    }, [id])

    const openDeleteModal = (id) => {
        // context.setDeleteId(id)
        // context.setModalOpen(true)
        console.log(id)
    }

    const deletePost = async (id) => {
        try {
            const response = await axios.delete('/post/deletePost', {
                data: {
                    id: id,
                },
            })
            console.log(response)
            window.location.reload()
        } catch (error) {
            console.log(error.response.data.error)
        }
    }

    const deletePostBody = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">
                Da li ste sigurni da želite da obrišete objavu?
            </h2>
            <ExitButton
                onClick={() => {
                    context.setModalOpen(false)
                }}
            >
                Ne
            </ExitButton>
            <SaveButton onClick={() => deletePost(context.deleteId)}>
                Da
            </SaveButton>
        </div>
    )

    return (
        <Root>
            <form>
                <div className="display-flex admin-single-post">
                    <Left>
                        <div className="left-first-row">
                            <div className="display-flex">
                                <div>
                                    <AccountCircleOutlinedIcon fontSize="large" />
                                </div>
                                <div className="author-info">
                                    <h3>{postAuthor}</h3>
                                    <div class="asp-social">
                                        <SocialLinks />
                                    </div>
                                </div>
                                <div className="author-role">{role}</div>
                            </div>
                            <Link to={`/single-post/${id}`}>
                                <Button>POGLEDAJ NA SAJTU</Button>
                            </Link>
                        </div>
                        <div>
                            <div className="admin-single-post-title">
                                {singlePost.title}
                            </div>
                            <div className="admin-single-post-content">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: `${singlePost.content}`,
                                    }}
                                />
                            </div>
                        </div>
                    </Left>
                    <Right>
                        <div className="right-first-div">
                            <div className="display-flex">
                                <p>Kategorija: </p>
                                <p className="category-field">{postCategory}</p>
                            </div>
                            <div className="display-flex">
                                <p>Tagovi: &nbsp;&nbsp;</p>
                                <p>
                                    {singlePost.tags
                                        ? singlePost.tags
                                              .map((tag) => ` #${tag} `)
                                              .filter(
                                                  (value, index, array) =>
                                                      array.indexOf(value) ===
                                                      index
                                              )
                                        : ''}
                                </p>
                            </div>
                            <div className="display-flex">
                                <p>Komentari: </p>
                                <p className="comment-field">{numOfComm}</p>
                            </div>
                        </div>
                        <div className="right-second-div">
                            <MainButton main={main ? 1 : 0}>MAIN</MainButton>
                            <PrimaryButton primary={primary ? 1 : 0}>
                                PRIMARY
                            </PrimaryButton>
                            <LightButton light={light ? 1 : 0}>
                                LIGHT
                            </LightButton>
                        </div>
                        <div className="right-third-div">
                            <div>
                                <img
                                    src={singlePost.image}
                                    style={{ width: '300px' }}
                                    alt="alt"
                                />
                            </div>
                        </div>
                        <div className="right-buttons">
                            <Link to={`/edit-post/${id}`}>
                                <EditButton variant="outlined">
                                    Izmeni
                                </EditButton>
                            </Link>
                            <Button
                                variant="outlined"
                                onClick={() => openDeleteModal(id)}
                            >
                                Obriši
                            </Button>
                        </div>
                    </Right>
                </div>
            </form>
            <Modal body={deletePostBody} />
        </Root>
    )
}

export default SinglePost
