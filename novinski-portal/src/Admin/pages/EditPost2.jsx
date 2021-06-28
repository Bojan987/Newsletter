import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'
import ButtonWrapper from '../../components/FormsUI/Button/ButtonWrapper'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { makeStyles } from '@material-ui/core/styles'
import './styles.css'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { axiosAuth as axios } from '../../util/axios-instance'
import TextfieldWrapper from '../../components/FormsUI/Textfield/TextfieldWrapper'
import SelectWrapper from '../../components/FormsUI/Select/SelectWrapper'
import Loader from '../components/Loader'
import DeleteIcon from '@material-ui/icons/Delete'

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
const ExitButton = styled(Button)`
    margin: 0 7px;
    background-color: #909090;
    color: white;
    &:hover {
        color: white;
        background-color: #909090;
    }
`
/* const SaveButton = styled(Button)`
    margin: 0 7px;
    background-color: #231f20;
    color: white;
    &:hover {
        color: white;
        background-color: #231f20;
    }
` */
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
        width: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(1),
    },
    editor: {
        paddingTop: 20,
        height: 300,
    },
}))

const FORM_VALIDATION = Yup.object().shape({
    title: Yup.string().required('Required'),
    content: Yup.string().required('Required'),
    category: Yup.string().required('Izaberite kategoriju'),
})

const EditPost = () => {
    const classes = useStyles()
    const [singlePost, setSinglePost] = useState({})
    // eslint-disable-next-line
    const [main, setMain] = useState(false)
    // eslint-disable-next-line
    const [primary, setPrimary] = useState(false)
    // eslint-disable-next-line
    const [light, setLight] = useState(false)
    const { id } = useParams()
    // eslint-disable-next-line
    const [categories, setCategories] = useState([])
    // eslint-disable-next-line
    const [authors, setAuthors] = useState([])
    // eslint-disable-next-line
    const [postCategoryId, setPostCategoryId] = useState('')
    const [numOfComm, setNumOfComm] = useState(0)
    const [file, setFile] = useState(null)
    const [key, setKey] = React.useState('')
    const [initValues, setInitValues] = useState(false)

    const getData = async (id) => {
        const response = await axios.get(`/post/getSinglePost?postId=${id}`)
        const categoryNames = await axios.get('/category/getcategorynames')
        const postComments = await axios.get(
            `/comment/getPostComments?postId=${id}`
        )
        const journalistsDetails = await axios.get('/user/getJournalists')
        const authors = journalistsDetails.data.journalists.map((j) => ({
            _id: j._id,
            name: `${j.firstName} ${j.lastName}`,
            noTranslate:true
        }))
        setPostCategoryId(response.data.post.category._id)
        setMain(response.data.post.main)
        setPrimary(response.data.post.primary)
        setLight(response.data.post.light)
        // const posts = await axios.get('/post/getPosts')
        setSinglePost(response.data.post)
        const tagsFormated = response.data.post.tags
            .map((tag) => `#${tag}`)
            .join(' ')
        setInitValues({
            author: response.data.post.author._id,
            title: response.data.post.title,
            content: response.data.post.content,
            category: response.data.post.category._id,
            tags: tagsFormated,
            main: response.data.post.main,
            primary: response.data.post.primary,
            light: response.data.post.light,
            id: id,
            categories: categoryNames.data.categorys,
            numOfComments: postComments.data.comments.length,
            authors: authors,
        })
    }

    // eslint-disable-next-line
    const getCategories = async () => {
        const response = await axios.get('/category/getcategorynames')
        setCategories(response.data.categorys)
    }

    const getComments = async (id) => {
        const response = await axios.get(
            `/comment/getPostComments?postId=${id}`
        )
        setNumOfComm(response.data.comments.length)
    }

    const deleteComments = async (id) => {
        try {
            console.log(id)
            const response = await axios.delete('/comment/deleteForPost', {
                data: {
                    postId: id,
                },
            })
            console.log(response)
            getComments(id)
        } catch (error) {
            console.log(error.response.data.error)
        }
    }

    // eslint-disable-next-line
    const getJournalists = async () => {
        const response = await axios.get('/user/getJournalists')
        const authors = response.data.journalists.map((j) => ({
            _id: j._id,
            name: `${j.firstName} ${j.lastName}`,
        }))
        setAuthors(authors)
    }

    useEffect(() => {
        getData(id)
        // getComments(id)
        // getCategories()
        // getJournalists()
        // eslint-disable-next-line
    }, [])

    const handleSelectFile = (e) => {
        const file = e.target.files[0]
        setFile(file)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('image', file)

        try {
            const response = await axios.post('/images/uploadImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log(response)
            setKey(response.data.imageKey)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {initValues && (
                <Formik
                    // enableReinitialize
                    // initialValues={{
                    //     postId: id,
                    //     author:
                    //         singlePost && singlePost.author && singlePost.author._id
                    //             ? singlePost.author._id
                    //             : '',
                    //     title: singlePost.title ? singlePost.title :'',
                    //     content:
                    //         singlePost && singlePost.content ? singlePost.content : '',
                    //     category:
                    //         singlePost && singlePost.category && singlePost.category._id
                    //             ? singlePost.category._id
                    //             : '',
                    //     tags: singlePost.tags
                    //         ? singlePost.tags.map((tag) => `#${tag}`).join(' ')
                    //         : '',
                    //     main: main ? main : false,
                    //     primary: primary ? primary : false,
                    //     light: light ? light : false,
                    // }}
                    initialValues={{ ...initValues }}
                    validationSchema={FORM_VALIDATION}
                    onSubmit={async (values) => {
                        console.log(values)
                        // try {
                        //     const response = await axios.put(`/post/editPost/${id}`, {
                        //         ...values,
                        //         tags: values.tags
                        //             .split(' ')
                        //             .map((tag) => tag.substring(1)),
                        //         imageKey: key,
                        //     })
                        //     console.log(response)
                        //     window.location = '/posts'
                        // } catch (error) {
                        //     console.log(error.response.data.error)
                        // }
                    }}
                >
                    {({ setFieldValue, values }) => (
                        <Root>
                            {!singlePost ? (
                                <Loader />
                            ) : (
                                <Form>
                                    <div className="display-flex edit-post-content">
                                        <Left>
                                            <div className="left-first-row">
                                                <div
                                                    className="display-flex"
                                                    style={{
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <p className="label">
                                                        Autor:
                                                    </p>
                                                    <FormControl
                                                        className={
                                                            classes.formControl
                                                        }
                                                        variant="outlined"
                                                    >
                                                        <SelectWrapper
                                                            variant="outlined"
                                                            className="category-field"
                                                            name="author"
                                                            options={
                                                                values.authors
                                                            }
                                                            value={
                                                                values.author
                                                            }
                                                        />
                                                    </FormControl>
                                                </div>
                                                <Link to={`/single-post/${id}`}>
                                                    <Button>
                                                        POGLEDAJ NA SAJTU
                                                    </Button>
                                                </Link>
                                            </div>
                                            <div>
                                                <TextfieldWrapper
                                                    id="outlined-size-normal"
                                                    name="title"
                                                    variant="outlined"
                                                    className="title-field"
                                                    // value={singlePost.title || ''}
                                                    value={values.title}
                                                />
                                            </div>
                                            <Field name="content">
                                                {({ field }) => (
                                                    <ReactQuill
                                                        value={field.value}
                                                        onChange={field.onChange(
                                                            field.name
                                                        )}
                                                        className={
                                                            classes.editor
                                                        }
                                                    />
                                                )}
                                            </Field>
                                        </Left>
                                        <Right>
                                            <div className="right-first-div">
                                                <div
                                                    className="display-flex"
                                                    style={{
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <p>Kategorija: </p>
                                                    <FormControl
                                                        className={
                                                            classes.formControl
                                                        }
                                                    >
                                                        {singlePost &&
                                                        singlePost.category &&
                                                        singlePost.category
                                                            .name ? (
                                                            <SelectWrapper
                                                                variant="outlined"
                                                                className="category-field"
                                                                name="category"
                                                                options={
                                                                    values.categories
                                                                }
                                                                value={
                                                                    values.category
                                                                }
                                                            />
                                                        ) : null}
                                                    </FormControl>
                                                </div>
                                                <div
                                                    className="display-flex"
                                                    style={{
                                                        alignItems: 'baseline',
                                                    }}
                                                >
                                                    <p>Tagovi: &nbsp;&nbsp;</p>
                                                    <FormControl
                                                        className={
                                                            classes.formControl
                                                        }
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                    >
                                                        <TextfieldWrapper
                                                            name="tags"
                                                            variant="outlined"
                                                            className="tags-field"
                                                            placeholder="#svet #nafta..."
                                                            value={values.tags}
                                                        />
                                                    </FormControl>
                                                </div>
                                                <div
                                                    className="display-flex"
                                                    style={{
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'space-between',
                                                    }}
                                                >
                                                    <p>
                                                        Komentari:{' '}
                                                        <span className="comment-field">
                                                            {numOfComm}
                                                        </span>
                                                    </p>
                                                    <span
                                                        onClick={() =>
                                                            deleteComments(id)
                                                        }
                                                    >
                                                        <DeleteIcon />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="right-second-div">
                                                <MainButton
                                                    main={values.main ? 1 : 0}
                                                    onClick={async (event) => {
                                                        event.preventDefault()
                                                        if (!values.main) {
                                                            const response = await axios.get(
                                                                '/post/canBeMain'
                                                            )
                                                            console.log(
                                                                response
                                                            )
                                                            if (response.data) {
                                                                setMain(true)
                                                                setFieldValue(
                                                                    'main',
                                                                    true
                                                                )
                                                            }
                                                        } else {
                                                            setMain(false)
                                                            setFieldValue(
                                                                'main',
                                                                false
                                                            )
                                                        }
                                                    }}
                                                    name="main"
                                                    value={values.main}
                                                    // style={{
                                                    //     color: values.main ? 'green' : 'red',
                                                    // }}
                                                >
                                                    MAIN
                                                </MainButton>
                                                <PrimaryButton
                                                    primary={
                                                        values.primary ? 1 : 0
                                                    }
                                                    onClick={async (event) => {
                                                        event.preventDefault()

                                                        if (!values.primary) {
                                                            const response = await axios.get(
                                                                `/post/canBePrimary/${values.category}`
                                                            )
                                                            console.log(
                                                                response
                                                            )

                                                            if (response.data) {
                                                                setPrimary(true)
                                                                setFieldValue(
                                                                    'primary',
                                                                    true
                                                                )
                                                            }
                                                        } else {
                                                            setPrimary(false)
                                                            setFieldValue(
                                                                'primary',
                                                                false
                                                            )
                                                        }
                                                    }}
                                                    name="primary"
                                                >
                                                    PRIMARY
                                                </PrimaryButton>
                                                <LightButton
                                                    light={values.light ? 1 : 0}
                                                    onClick={async (event) => {
                                                        setFieldValue(
                                                            'light',
                                                            !values.light
                                                        )
                                                        setLight(!values.light)
                                                    }}
                                                    name="light"
                                                >
                                                    LIGHT
                                                </LightButton>
                                            </div>
                                            <div className="right-third-div">
                                                <div>
                                                    {key.length > 0 ? (
                                                        <div
                                                            key={key}
                                                            // onClick={handleRemove}
                                                        >
                                                            <img
                                                                src={`http://localhost:5000/images/${key}`}
                                                                style={{
                                                                    width:
                                                                        '300px',
                                                                }}
                                                                alt="S3 Fetched"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <img
                                                            alt="img"
                                                            src="/images/site_image.png"
                                                        />
                                                    )}
                                                </div>
                                                {/* <form onSubmit={handleSubmit}> */}
                                                <input
                                                    onChange={handleSelectFile}
                                                    type="file"
                                                    accept="image/*"
                                                />
                                                <button onClick={handleSubmit}>
                                                    Upload
                                                </button>
                                                <p>
                                                    Preporucena velicina: 1280px
                                                    x 720px
                                                </p>
                                            </div>
                                            <div className="right-buttons">
                                                <Link to="/posts">
                                                    <ExitButton variant="outlined">
                                                        Odustani
                                                    </ExitButton>
                                                </Link>
                                                <ButtonWrapper
                                                    style={{
                                                        width: 'unset',
                                                        padding: '6px 20px',
                                                        backgroundColor:
                                                            '#231f20',
                                                        color: 'white',
                                                    }}
                                                >
                                                    Sacuvaj
                                                </ButtonWrapper>
                                            </div>
                                        </Right>
                                    </div>
                                </Form>
                                // )}
                                // </>
                            )}
                        </Root>
                    )}
                </Formik>
            )}
        </>
    )
}

export default EditPost
