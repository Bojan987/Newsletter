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
import { FormattedMessage } from 'react-intl'

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
    border-radius: 5px;
    padding: 3px 27px;
    background-color: #909090;
    color: white;
    &:hover {
        color: white;
        background-color: #909090;
    }
`

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
    const { id } = useParams()
    const [numOfComm, setNumOfComm] = useState(0)
    const [key, setKey] = React.useState('')
    const [initValues, setInitValues] = useState(false)
    const [imgKey, setImgKey] = useState(null)
    const [image, setImage] = useState(null)

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
            noTranslate: true,
        }))
        setSinglePost(response.data.post)
        if (response.data.post.imageKey) {
            setImgKey(response.data.post.imageKey)
        }
        setImage(response.data.post.image)
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

    useEffect(() => {
        getData(id)
    }, [id])

    const uploadImage = async (event) => {
        try {
            const selectedFile = event.target.files[0]
            const fileData = new FormData()
            fileData.append('image', selectedFile, selectedFile.name)
            const response = await axios.post('/images/uploadImage', fileData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            setKey(response.data.imageKey)
        } catch (error) {
            console.log(error.response)
        }
    }

    return (
        <>
            {initValues ? (
                <Formik
                    initialValues={{ ...initValues }}
                    validationSchema={FORM_VALIDATION}
                    onSubmit={async (values) => {
                        try {
                            const response = await axios.put(
                                `/post/editPost/${id}`,
                                {
                                    postId: values.id,
                                    author: values.author,
                                    title: values.title,
                                    content: values.content,
                                    category: values.category,
                                    tags: values.tags
                                        .split(' ')
                                        .map((tag) => tag.substring(1)),
                                    main: values.main,
                                    primary: values.primary,
                                    light: values.light,
                                    imageKey: key,
                                }
                            )
                            console.log(response)
                            window.location = '/posts'
                        } catch (error) {
                            console.log(error.response.data.error)
                        }
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
                                                        <FormattedMessage
                                                            id="admin.posts.author"
                                                            default="default text"
                                                        />
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
                                                        <FormattedMessage
                                                            id="read.post"
                                                            default="default text"
                                                        />
                                                    </Button>
                                                </Link>
                                            </div>
                                            <div>
                                                <TextfieldWrapper
                                                    id="outlined-size-normal"
                                                    name="title"
                                                    variant="outlined"
                                                    className="title-field"
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
                                                    <p>
                                                        <FormattedMessage
                                                            id="admin.posts.category"
                                                            default="default text"
                                                        />
                                                        :{' '}
                                                    </p>
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
                                                    <p>
                                                        <FormattedMessage
                                                            id="admin.posts.tags"
                                                            default="default text"
                                                        />
                                                        : &nbsp;&nbsp;
                                                    </p>
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
                                                        <FormattedMessage
                                                            id="admin.posts.comments"
                                                            default="default text"
                                                        />
                                                        :{' '}
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
                                                            const response =
                                                                await axios.get(
                                                                    '/post/canBeMain'
                                                                )
                                                            console.log(
                                                                response
                                                            )
                                                            if (response.data) {
                                                                setFieldValue(
                                                                    'main',
                                                                    true
                                                                )
                                                            }
                                                        } else {
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
                                                            const response =
                                                                await axios.get(
                                                                    `/post/canBePrimary/${values.category}`
                                                                )
                                                            console.log(
                                                                response
                                                            )

                                                            if (response.data) {
                                                                setFieldValue(
                                                                    'primary',
                                                                    true
                                                                )
                                                            }
                                                        } else {
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
                                                    }}
                                                    name="light"
                                                >
                                                    LIGHT
                                                </LightButton>
                                            </div>
                                            <div className="right-third-div">
                                                <div>
                                                    {key && key.length > 0 ? (
                                                        <div key={key}>
                                                            <img
                                                                src={`http://localhost:5000/images/${key}`}
                                                                style={{
                                                                    width: '300px',
                                                                }}
                                                                alt="img"
                                                            />
                                                        </div>
                                                    ) : imgKey &&
                                                      imgKey.length > 0 ? (
                                                        <div key={imgKey}>
                                                            <img
                                                                src={`http://localhost:5000/images/${imgKey}`}
                                                                style={{
                                                                    width: '300px',
                                                                }}
                                                                alt="img"
                                                            />
                                                        </div>
                                                    ) : image ? (
                                                        <img
                                                            alt="img"
                                                            src={image}
                                                            style={{
                                                                width: '300px',
                                                            }}
                                                        />
                                                    ) : (
                                                        <img
                                                            alt="img"
                                                            src="/images/site_image.png"
                                                            style={{
                                                                width: '300px',
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                                <label htmlFor="upload-photo">
                                                    <input
                                                        style={{
                                                            display: 'none',
                                                        }}
                                                        id="upload-photo"
                                                        name="upload-photo"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={uploadImage}
                                                    />

                                                    <Button
                                                        style={{
                                                            width: 'unset',
                                                            padding: '4px 27px',
                                                            borderRadius: '5px',
                                                            boxShadow: 'none',
                                                            backgroundColor:
                                                                '#231f20',
                                                            color: 'white',
                                                        }}
                                                        component="span"
                                                    >
                                                        <FormattedMessage
                                                            id="button.upload"
                                                            default="default text"
                                                        />
                                                    </Button>
                                                </label>
                                                <p>
                                                    <FormattedMessage
                                                        id="image.size.recommendation"
                                                        default="default text"
                                                    />
                                                </p>
                                            </div>
                                            <div className="right-buttons">
                                                <Link to="/posts">
                                                    <ExitButton variant="outlined">
                                                        <FormattedMessage
                                                            id="admin.users.modal.cancel"
                                                            default="default text"
                                                        />
                                                    </ExitButton>
                                                </Link>
                                                <ButtonWrapper
                                                    style={{
                                                        width: 'unset',
                                                        padding: '4px 27px',
                                                        borderRadius: '5px',
                                                        backgroundColor:
                                                            '#231f20',
                                                        color: 'white',
                                                        boxShadow: 'none',
                                                    }}
                                                >
                                                    <FormattedMessage
                                                        id="button.save"
                                                        default="default text"
                                                    />
                                                </ButtonWrapper>
                                            </div>
                                        </Right>
                                    </div>
                                </Form>
                            )}
                        </Root>
                    )}
                </Formik>
            ) : (
                <Loader />
            )}
        </>
    )
}

export default EditPost
