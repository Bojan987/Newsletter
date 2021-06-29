import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import { Container, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextfieldWrapper from '../../../components/FormsUI/Textfield/TextfieldWrapper'
import CheckboxWrapper from '../../../components/FormsUI/Checkbox/CheckboxWrapper'
import SelectWrapper from '../../../components/FormsUI/Select/SelectWrapper'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ButtonWrapper from '../../../components/FormsUI/Button/ButtonWrapper'
import * as Yup from 'yup'
import { axiosAuth as axios } from '../../../util/axios-instance'
import { FormattedMessage } from 'react-intl'

const ExitButton = styled(Button)`
    margin: 0 7px;
    background-color: #909090;
    color: white;
    border-radius: 6px;
    &:hover {
        color: white;
        background-color: #909090;
    }
`
const useStyles = makeStyles((theme) => ({
    formContainer: {
        padding: '30px 0',
    },
    container: {
        paddingLeft: 0,
        paddingRight: 0,
    },
    titleColor: {
        color: '#231F20',
    },
    ccTitle: {
        color: '#231F20',
        padding: '30px 0 0 0',
    },
}))

const INITIAL_FORM_STATE = {
    name: '',
    description: '',
    layout: '',
    homeOrder: 1,
    home: false,
    sidebar: false,
    type: '',
}

const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    layout: Yup.string().required('Izaberite layout!'),
})

const CreateCategory = () => {
    const classes = useStyles()
    const [layouts, setLayouts] = useState([])

    const getLayouts = async () => {
        const response = await axios.get('/layout/getLayouts')
        setLayouts(response.data.layouts)
    }

    useEffect(() => {
        getLayouts()
    }, [])

    const createCategory = async (values) => {
        try {
            const response = await axios.post('/category/createCategory', {
                name: values.name,
                description: values.description,
                layout: values.layout,
                homeOrder: values.homeOrder,
                home: values.home,
                sidebar: values.sidebar,
            })
            console.log(response)
            window.location = '/categories'
        } catch (error) {
            console.log(error.response.data)
        }

        // console.log(values)
    }

    return (
        <Grid container className={classes.formContainer}>
            <Grid item xs={12}>
                <Container className={classes.container}>
                    <div className={classes.formWrapper}>
                        <Formik
                            initialValues={{
                                ...INITIAL_FORM_STATE,
                            }}
                            validationSchema={FORM_VALIDATION}
                            onSubmit={(values) => {
                                createCategory(values)
                            }}
                        >
                            <Form>
                                <Typography
                                    variant="h2"
                                    className={classes.titleColor}
                                >
                                    <FormattedMessage
                                        id="admin.categories.add"
                                        default="default text"
                                    />
                                </Typography>
                                <Grid container spacing={2} direction="column">
                                    <Grid item xs={12} sm={7}>
                                        <Grid container alignItems="flex-start">
                                            <Grid item xs={2}>
                                                <Typography
                                                    variant="h5"
                                                    className={classes.ccTitle}
                                                >
                                                    <FormattedMessage
                                                        id="admin.posts.name"
                                                        default="default text"
                                                    />
                                                    :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <TextfieldWrapper
                                                    name="name"
                                                    margin="normal"
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container alignItems="flex-start">
                                            <Grid item xs={2}>
                                                <Typography
                                                    variant="h5"
                                                    className={classes.ccTitle}
                                                >
                                                    <FormattedMessage
                                                        id="description"
                                                        default="default text"
                                                    />
                                                    :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <TextfieldWrapper
                                                    name="description"
                                                    rows="12"
                                                    multiline={true}
                                                    margin="normal"
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} sm={12}>
                                                <Grid
                                                    container
                                                    alignItems="center"
                                                >
                                                    <Grid item xs={2} sm={2}>
                                                        <Typography
                                                            variant="h5"
                                                            className={
                                                                classes.titleColor
                                                            }
                                                        >
                                                            Layout:
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={9} sm={9}>
                                                        <SelectWrapper
                                                            name="layout"
                                                            options={layouts}
                                                            label="Izaberite layout"
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={11} sm={11}>
                                                <Grid
                                                    container
                                                    alignItems="center"
                                                >
                                                    <Grid item xs={6} sm={6}>
                                                        <Grid
                                                            container
                                                            alignItems="center"
                                                        >
                                                            <Grid
                                                                item
                                                                xs={9}
                                                                sm={9}
                                                            >
                                                                <Typography
                                                                    variant="h5"
                                                                    className={
                                                                        classes.titleColor
                                                                    }
                                                                >
                                                                    <FormattedMessage
                                                                        id="admin.categories.home"
                                                                        default="default text"
                                                                    />
                                                                    :
                                                                </Typography>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                xs={3}
                                                                sm={3}
                                                            >
                                                                <CheckboxWrapper
                                                                    name="home"
                                                                    className={
                                                                        classes.checkbox
                                                                    }
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={6} sm={6}>
                                                        <Grid
                                                            container
                                                            alignItems="center"
                                                            justify="flex-end"
                                                        >
                                                            <Grid
                                                                item
                                                                xs={7}
                                                                sm={7}
                                                            >
                                                                <Typography
                                                                    variant="h5"
                                                                    className={
                                                                        classes.titleColor
                                                                    }
                                                                >
                                                                    <FormattedMessage
                                                                        id="admin.categories.homeOrder"
                                                                        default="default text"
                                                                    />
                                                                    :
                                                                </Typography>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                xs={5}
                                                                sm={5}
                                                            >
                                                                <SelectWrapper
                                                                    name="homeOrder"
                                                                    options={[
                                                                        1, 2, 3,
                                                                        4, 5, 6,
                                                                        7, 8, 9,
                                                                    ]}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={11} sm={11}>
                                                <Grid
                                                    container
                                                    alignItems="center"
                                                >
                                                    <Grid item xs={6} sm={6}>
                                                        <Grid
                                                            container
                                                            alignItems="center"
                                                        >
                                                            <Grid
                                                                item
                                                                xs={7}
                                                                sm={7}
                                                            >
                                                                <Typography
                                                                    variant="h5"
                                                                    className={
                                                                        classes.titleColor
                                                                    }
                                                                >
                                                                    Sidebar:
                                                                </Typography>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                xs={5}
                                                                sm={5}
                                                            >
                                                                <CheckboxWrapper
                                                                    name="sidebar"
                                                                    className={
                                                                        classes.checkbox
                                                                    }
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={6} sm={6}>
                                                        <Grid
                                                            container
                                                            alignItems="center"
                                                        >
                                                            <Grid
                                                                item
                                                                xs={3}
                                                                sm={3}
                                                            >
                                                                <Typography
                                                                    variant="h5"
                                                                    className={
                                                                        classes.titleColor
                                                                    }
                                                                >
                                                                    <FormattedMessage
                                                                        id="admin.categories.type"
                                                                        default="default text"
                                                                    />
                                                                    :
                                                                </Typography>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                xs={9}
                                                                sm={9}
                                                            >
                                                                <SelectWrapper
                                                                    name="type"
                                                                    label="Izaberite"
                                                                    options={[
                                                                        'Kursna lista',
                                                                        'Najnovije',
                                                                    ]}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Grid
                                            container
                                            alignItems="center"
                                            justify="flex-end"
                                        >
                                            <Grid item>
                                                <Link to="/categories">
                                                    <ExitButton variant="outlined">
                                                        <FormattedMessage
                                                            id="admin.users.modal.cancel"
                                                            default="default text"
                                                        />
                                                    </ExitButton>
                                                </Link>
                                            </Grid>
                                            <Grid item>
                                                <ButtonWrapper
                                                    style={{
                                                        margin: '0 7px',
                                                        borderRadius: '6px',
                                                        padding: '6px 15px',
                                                        boxShadow: 'none',
                                                    }}
                                                >
                                                    <FormattedMessage
                                                        id="button.save"
                                                        default="default text"
                                                    />
                                                </ButtonWrapper>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Form>
                        </Formik>
                    </div>
                </Container>
            </Grid>
        </Grid>
    )
}

export default CreateCategory
