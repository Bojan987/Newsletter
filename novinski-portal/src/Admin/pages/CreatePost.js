import React, { useState, useContext, useEffect } from 'react'
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
    const [file, setFile] = useState(null)
    const [key, setKey] = React.useState('')

    const getCategories = async () => {
        const response = await axios.get('/category/getcategorynames')
        const categories = response.data.categorys
        // setCategories([{_id: "Izaberite kategoriju", name: "Izaberite kategoriju"}, ...categories])
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

    // useEffect(() => {
    //     console.log(values.category)
    // }, [values.category])

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
            {({ setFieldValue }) => (
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
                                    {/* <TextEditorWrapper
                                        theme="snow"
                                        className="content-field"
                                        name="content"
                                    /> */}
                                    <ReactQuill
                                        name="content"
                                        theme="snow"
                                        className="content-field"
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
                                            <p>Kategorija: </p>
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
                                            <p>Tagovi:</p>
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
                                                // console.log(postCategoryId)
                                                if (!primary) {
                                                    const response =
                                                        await axios.get(
                                                            `/post/canBePrimary/`
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
                                        {/* </form> */}
                                        <p>
                                            Preporucena velicina: 1280px x 720px
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
                                                backgroundColor: '#231f20',
                                                color: 'white',
                                            }}
                                        >
                                            Objavi
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
