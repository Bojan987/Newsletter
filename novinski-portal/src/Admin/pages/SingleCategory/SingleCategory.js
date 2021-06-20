import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Button from '@material-ui/core/Button'
import './SingleCategory.css'
import SingleCategoryCard from '../../../components/Cards/SingleCategoryCard'
import Modal from '../../../components/Modal'
import { Link } from 'react-router-dom'
import { axiosAuth as axios } from '../../../util/axios-instance'
import { useParams } from 'react-router-dom'
import Loader from '../../components/Loader'
import { deleteHook } from '../../util/delete-hook'
import AppContext from '../../../context/AppContext'
import { makeStyles } from '@material-ui/core/styles'

const AvatarIcon = styled(AccountCircleOutlinedIcon)`
    font-size: 70px;
`
const HomeButton = styled.p`
    cursor: pointer;
    color: ${(props) => (props.home ? 'green' : 'red')};
    font-family: 'Abel', sans-serif;
    width: 200px;
    font-size: 20px;
    user-select: none;
    // border-right: 2px solid #f2f2f2;
`
const SidebarButton = styled.p`
    cursor: pointer;
    color: ${(props) => (props.sidebar ? 'green' : 'red')};
    font-family: 'Abel', sans-serif;
    width: 200px;
    font-size: 20px;
    user-select: none;
    // border-right: 2px solid #f2f2f2;
`
const EditButton = styled(Button)`
    margin: 0 7px;
    background-color: #909090;
    color: white;
    border-radius: 6px;
    &:hover {
        color: white;
        background-color: #909090;
    }
`
const DeleteButton = styled(Button)`
    margin: 0 7px;
    background-color: #231f20;
    color: white;
    border-radius: 6px;
    &:hover {
        color: white;
        background-color: #231f20;
    }
`
const ExitButton = styled(Button)`
    margin: 0 7px 0 0;
    background-color: #909090;
    color: white;
    &:hover {
        color: white;
        background-color: #909090;
    }
`
const SaveButton = styled(Button)`
    margin: 0 0 0 7px;
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

const SingleCategory = () => {
    const classes = useStyles()
    const [home, setHome] = useState(false)
    const [sidebar, setSidebar] = useState(false)
    const [singleCategory, setSingleCategory] = useState({})
    const [author, setAuthor] = useState({})
    const [posts, setPosts] = useState([])
    const { id } = useParams()
    const context = useContext(AppContext)
    const [deleteItem, setDeleteItem] = useState('')

    const { rand, getModalStyle } = deleteHook()
    const [modalStyle] = React.useState(getModalStyle)

    const getSingleCategory = async (id) => {
        const response = await axios.get(`/category/getcategory/${id}`)
        setSingleCategory(response.data.singleCategory)
        setHome(response.data.singleCategory.home)
        setSidebar(response.data.singleCategory.sidebar)
        setAuthor(response.data.singleCategory.author)
        console.log(response.data.singleCategory)
    }

    const getPosts = async () => {
        const response = await axios.get('/post/getPosts')
        setPosts(
            response.data.postsPaginated
                .sort((a, b) => b.updatedAt > a.updatedAt)
                .map((post) => post)
        )
    }

    useEffect(() => {
        getSingleCategory(id)
        getPosts()
    }, [id])

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
            console.log(error.response.data)
        }
    }

    const onDeletePostClick = () => {
        setDeleteItem('post')
        console.log('post')
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

    const deleteCategory = async (id) => {
        try {
            const response = await axios.delete('/category/deleteCategory', {
                data: {
                    id: id,
                },
            })
            console.log(response)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const deleteCategoryBody = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">
                Da li ste sigurni da želite da obrišete kategoriju?
            </h2>
            <ExitButton
                onClick={() => {
                    context.setModalOpen(false)
                }}
            >
                Ne
            </ExitButton>
            <SaveButton onClick={() => deleteCategory(context.deleteId)}>
                Da
            </SaveButton>
        </div>
    )

    return (
        <>
            {singleCategory ? (
                <div className="root">
                    <div className="sc-left">
                        <div className="single-category-author">
                            <div className="author-avatar">
                                <AvatarIcon />
                            </div>
                            <div className="author-info">
                                <h1>{author.firstName}</h1>
                                <h3>{author.role}</h3>
                            </div>
                        </div>
                        <div className="single-category-content">
                            <h1>{singleCategory.name}</h1>
                            <p>{singleCategory.description}</p>
                        </div>
                        <div>
                            <div className="sp-buttons">
                                <HomeButton home={home ? 1 : 0}>
                                    POCETNA STRANICA
                                </HomeButton>
                                {/* <Divider orientation="vertical" /> */}
                                {home ? (
                                    <p className="asd">
                                        {singleCategory.homeOrder}
                                    </p>
                                ) : null}
                            </div>
                            <div className="sp-buttons">
                                <SidebarButton sidebar={sidebar ? 1 : 0}>
                                    SIDEBAR
                                </SidebarButton>
                                {/* <Divider orientation="vertical" /> */}
                                {sidebar ? (
                                    <p className="asd">Najnovije</p>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    {sidebar ? (
                        <div className="sc-right">
                            <h1 className="sc-right-title">Poslednje objave</h1>
                            {posts
                                .map((post) => {
                                    return (
                                        <SingleCategoryCard
                                            title={post.title}
                                            date={post.updatedAt.split('T')[0]}
                                            key={post._id}
                                            id={post._id}
                                            onDeleteClick={onDeletePostClick}
                                        />
                                    )
                                })
                                .slice(0, 4)}
                            <Link to="/posts" className="sc-right-link">
                                <span className="sc-right-button">
                                    <p>Pogledaj sve</p> <ArrowForwardIosIcon />
                                </span>
                            </Link>
                        </div>
                    ) : null}
                </div>
            ) : (
                <Loader />
            )}
            <div className="sc-buttons">
                <Link to="/edit-category">
                    <EditButton variant="outlined">Izmeni</EditButton>
                </Link>
                <DeleteButton
                    onClick={() => {
                        setDeleteItem('category')
                        context.setDeleteId(id)
                        context.setModalOpen(true)
                    }}
                    variant="outlined"
                >
                    Obrisi
                </DeleteButton>
            </div>
            <Modal
                body={
                    deleteItem === 'post'
                        ? deletePostBody
                        : deleteItem === 'category'
                        ? deleteCategoryBody
                        : null
                }
            />
        </>
    )
}

export default SingleCategory
