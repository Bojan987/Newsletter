import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles } from '@material-ui/core/styles'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import styled from 'styled-components'
import './styles.css'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import ButtonWrapper from '../../components/FormsUI/Button/ButtonWrapper'
import { axiosAuth as axios } from '../../util/axios-instance'
import TextfieldWrapper from '../../components/FormsUI/Textfield/TextfieldWrapper'
import SelectWrapper from '../../components/FormsUI/Select/SelectWrapper'
import Loader from '../components/Loader'
import Alert from '../components/Alert'
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
    padding: 3px 27px;
    border-radius: 5px;
    margin: 0 7px;
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
        minWidth: 100,
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

const CreatePost = () => {
    const classes = useStyles()
    const [main, setMain] = useState(false)
    const [primary, setPrimary] = useState(false)
    const [light, setLight] = useState(false)
    const [categories, setCategories] = useState([])
    const [alert, setAlert] = useState(false)
    const [key, setKey] = React.useState('')

    const getCategories = async () => {
        const response = await axios.get('/category/getcategorynames')
        const categories = response.data.categorys
        setCategories(categories)
    }

    useEffect(() => {
        getCategories()
    }, [])

    const closeAlert = () => {
        setAlert(false)
    }

    const createPost = async (values) => {
        try {
            const response = await axios.post('/post/createPost', {
                title: values.title,
                content: values.content,
                category: values.category,
                tags: values.tags.split(' ').map((tag) => tag.substring(1)),
                main: values.main,
                primary: values.primary,
                light: values.light,
                imageKey: values.image,
                image: '/images/site_image.png',
            })
            console.log(response)
            window.location = '/posts'
        } catch (error) {
            console.log(error)
        }
    }

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
        <Formik
            initialValues={{
                title: '',
                content: '',
                category: '',
                tags: '',
                main: false,
                primary: false,
                light: false,
            }}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => {
                // values.category !== 'Izaberite kategoriju'
                //     ? createPost(values)
                //     : setAlert(true)
                createPost({ ...values, image: key })
            }}
        >
            {({ setFieldValue, values }) => (
                <Root>
                    {!categories ? (
                        <Loader />
                    ) : (
                        <form>
                            <div className="display-flex create-post-content">
                                <Left>
                                    <div>
                                        <TextfieldWrapper
                                            id="outlined-size-normal"
                                            name="title"
                                            variant="outlined"
                                            className="title-field"
                                        />
                                    </div>
                                    <ReactQuill
                                        name="content"
                                        theme="snow"
                                        id="content-field"
                                        onChange={(content) => {
                                            setFieldValue('content', content)
                                        }}
                                        className={classes.editor}
                                    />
                                </Left>
                                <Right>
                                    <div className="right-first-div">
                                        <div
                                            className="display-flex"
                                            style={{ alignItems: 'center' }}
                                        >
                                            <p>
                                                <FormattedMessage
                                                    id="admin.posts.category"
                                                    default="default text"
                                                />
                                                :{' '}
                                            </p>
                                            <FormControl
                                                className={classes.formControl}
                                                style={{ width: '100%' }}
                                            >
                                                <SelectWrapper
                                                    name="category"
                                                    variant="outlined"
                                                    className="category-field"
                                                    options={categories}
                                                    label="Izaberite kategoriju"
                                                    onChange={(event) =>
                                                        console.log(
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                        </div>
                                        <div
                                            className="display-flex"
                                            style={{ alignItems: 'center' }}
                                        >
                                            <p>
                                                <FormattedMessage
                                                    id="admin.posts.tags"
                                                    default="default text"
                                                />
                                                :
                                            </p>
                                            <TextfieldWrapper
                                                name="tags"
                                                variant="outlined"
                                                className="tags-field"
                                                placeholder="#svet #nafta..."
                                                style={{ margin: '8px' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="right-second-div">
                                        <MainButton
                                            main={main ? 1 : 0}
                                            onClick={async () => {
                                                if (!main) {
                                                    const response =
                                                        await axios.get(
                                                            '/post/canBeMain'
                                                        )
                                                    console.log(response)
                                                    if (response.data) {
                                                        setMain(true)
                                                        setFieldValue(
                                                            'main',
                                                            true
                                                        )
                                                    }
                                                } else {
                                                    setMain(false)
                                                    setFieldValue('main', false)
                                                }
                                            }}
                                            name="main"
                                            style={{
                                                color: main ? 'green' : 'red',
                                            }}
                                        >
                                            MAIN
                                        </MainButton>
                                        <PrimaryButton
                                            primary={primary ? 1 : 0}
                                            onClick={async () => {
                                                try {
                                                    if (!primary) {
                                                        const response =
                                                            await axios.get(
                                                                `/post/canBePrimary/${values.category}`
                                                            )
                                                        console.log(response)

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
                                                } catch (error) {
                                                    console.log(error)
                                                }
                                            }}
                                            name="primary"
                                        >
                                            PRIMARY
                                        </PrimaryButton>
                                        <LightButton
                                            light={light ? 1 : 0}
                                            onClick={() => {
                                                setFieldValue('light', !light)
                                                setLight(!light)
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
                                                            width: '300px',
                                                        }}
                                                        alt="Post pic"
                                                    />
                                                </div>
                                            ) : (
                                                <img
                                                    alt="img"
                                                    src="/images/site_image.png"
                                                />
                                            )}
                                        </div>
                                        <label htmlFor="upload-photo">
                                            <input
                                                style={{ display: 'none' }}
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
                                                    backgroundColor: '#231f20',
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
                                                boxShadow: 'none',
                                                backgroundColor: '#231f20',
                                                color: 'white',
                                            }}
                                        >
                                            <FormattedMessage
                                                id="admin.post.publish"
                                                default="default text"
                                            />
                                        </ButtonWrapper>
                                    </div>
                                </Right>
                            </div>
                        </form>
                    )}
                    <Alert open={alert} close={closeAlert} />
                </Root>
            )}
        </Formik>
    )
}

export default CreatePost
