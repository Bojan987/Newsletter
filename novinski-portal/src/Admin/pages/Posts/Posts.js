import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import { NativeSelect } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Button from '@material-ui/core/Button'
import { axiosAuth as axios } from '../../../util/axios-instance'

import Post from '../../components/Cards/Post/Post'
import Modal from '../../../components/Modal'
import Loader from '../../components/Loader'
import { Pagination, PaginationItem } from '@material-ui/lab'

import './Posts.css'
import AppContext from '../../../context/AppContext'

const Content = styled.div`
    margin: 50px;
`
const AddButton = styled(Button)`
    background-color: white;
    float: right;
    color: #909090;

    &:hover {
        background-color: white;
    }
`

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 100,
    },
    selectEmpty: {
        marginTop: theme.spacing(1),
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        fontFamily: "'Abel', sans-serif",
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
    },
    paginationItem: {
        borderRadius: 5,
    },
}))

const PostNav = styled(Post)`
    border: white;
    color: black;
    background-color: #fafafa;
`

function rand() {
    return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
    const top = 50 + rand()
    const left = 50 + rand()

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    }
}

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

const Posts = () => {
    const classes = useStyles()
    const context = useContext(AppContext)
    const [sortMethod, setSortMethod] = useState('latest')
    const [posts, setPosts] = useState([])
    //eslint-disable-next-line
    const [modalStyle] = React.useState(getModalStyle)
    const [totalPosts, setTotalPosts] = useState(0)

    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [category, setCategory] = useState('')

    const [categories, setCategories] = useState([])

    const getTime = (dateTime) => {
        const splitted = dateTime.split('T')
        const date = splitted[0].split('-')
        const newDate = `${date[2]}.${date[1]}.${date[0]}.`
        const time = splitted[1].split(':')
        const newTime = `${time[0]}:${time[1]}`
        return `${newDate} u ${newTime}`
    }

    // const sortFunction = () => {
    //     let sortedArray = []
    //     sortMethod === 'comments'
    //         ? (sortedArray = posts.sort(
    //               (a, b) => b.numOfComments > a.numOfComments
    //           ))
    //         : sortMethod === 'views'
    //         ? (sortedArray = posts.sort((a, b) => b.visits > a.visits))
    //         : (sortedArray = posts.sort((a, b) => b.updatedAt > a.updatedAt))

    //     setShowPosts(renderSorted)
    // }

    useEffect(() => {
        const authors = posts
            .map((post) => post.author.firstName + ' ' + post.author.lastName)
            .filter((value, index, array) => array.indexOf(value) === index)
        const categories = posts
            .map((post) => post.category.name)
            .filter((value, index, array) => array.indexOf(value) === index)
        context.setAuthors(authors)
        context.setCategories(categories)
        context.setPosts(posts)
        // eslint-disable-next-line
    }, [posts])

    const handleRowsPerPage = (event) => {
        setRowsPerPage(event.target.value)
    }

    const handleSort = (event) => {
        setSortMethod(event.target.value)
    }

    const getPosts = async (page, limit, category, sort) => {
        const response = await axios.get(
            `/post/getPosts?page=${page}&limit=${limit}&category=${category}&${sort}=true`
        )
        console.log(response.data.postsPaginated)
        setPosts(response.data.postsPaginated)
        setTotalPosts(response.data.numberOfPosts)
    }

    const getCategories = async () => {
        const response = await axios.get('/category/getcategorynames')
        setCategories(response.data.categorys)
    }

    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
        getPosts(currentPage, rowsPerPage, category, sortMethod)
    }, [currentPage, category, rowsPerPage, category, sortMethod])

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

    const body = (
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
        <div className="wrapper">
            <div>
                {posts.length === 0 ? (
                    <Loader />
                ) : (
                    <Content>
                        <div className="filter-methods-div">
                            <h2 className="posts-page-title">OBJAVE</h2>
                            <div className="filter-methods">
                                <div className="display-flex">
                                    <p>Prikaži:</p>
                                    <FormControl
                                        className={classes.formControl}
                                        variant="outlined"
                                    >
                                        <NativeSelect
                                            onChange={handleRowsPerPage}
                                            defaultValue={5}
                                            variant="outlined"
                                        >
                                            <option value={5}>5</option>
                                            <option value={10}>10</option>
                                            <option value={15}>15</option>
                                        </NativeSelect>
                                    </FormControl>
                                </div>
                                <div className="display-flex">
                                    <p>Sortiraj:</p>
                                    <FormControl
                                        className={classes.formControl}
                                        variant="outlined"
                                    >
                                        <NativeSelect
                                            onChange={handleSort}
                                            defaultValue="najnovije"
                                        >
                                            <option value="latest">
                                                NAJNOVIJE
                                            </option>
                                            <option value="visitsCounter">
                                                BROJ POSETA
                                            </option>
                                        </NativeSelect>
                                    </FormControl>
                                </div>
                                <div className="display-flex">
                                    <p>Kategorija:</p>
                                    <FormControl
                                        className={classes.formControl}
                                        variant="outlined"
                                    >
                                        <NativeSelect
                                            defaultValue=""
                                            onChange={(event) =>
                                                setCategory(event.target.value)
                                            }
                                        >
                                            <option value="">SVE</option>
                                            {categories.map((category) => {
                                                return (
                                                    <option
                                                        key={category._id}
                                                        value={category._id}
                                                    >
                                                        {category.name}
                                                    </option>
                                                )
                                            })}
                                        </NativeSelect>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                        <PostNav
                            category="Kategorija"
                            title="Naziv"
                            comments="Komentari"
                            author="Autor"
                            published="Objavljeno"
                            views="Posete"
                            image=""
                            label={true}
                            alt={false}
                        />
                        {posts.map((post) => {
                            return (
                                <Post
                                    key={post._id}
                                    category={post.category.name}
                                    title={post.title}
                                    comments={post.numOfComments}
                                    author={`${post.author.firstName} ${post.author.lastName}`}
                                    published={getTime(post.createdAt)}
                                    views={post.visits}
                                    id={post._id}
                                    content={post.content}
                                    image={post.image}
                                    imageKey={post.imageKey && post.imageKey}
                                    label={false}
                                />
                            )
                        })}
                    </Content>
                )}

                <Pagination
                    className={classes.pagination}
                    count={Math.ceil(totalPosts / rowsPerPage)}
                    page={currentPage}
                    color="secondary"
                    variant="outlined"
                    defaultPage={currentPage}
                    renderItem={(item) => (
                        <PaginationItem
                            {...item}
                            className={classes.paginationItem}
                        />
                    )}
                    onChange={(e, value) => {
                        setCurrentPage(value)
                    }}
                />

                <Link to="/create-post">
                    <AddButton>
                        <AddCircleIcon fontSize="large" />
                    </AddButton>
                </Link>
            </div>
            <Modal body={body} />
        </div>
    )
}

export default Posts