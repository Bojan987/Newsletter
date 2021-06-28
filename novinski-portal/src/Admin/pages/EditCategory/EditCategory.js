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
import { useParams } from 'react-router-dom'
import Loader from '../../components/Loader'

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
}))

const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    layout: Yup.string().required('Izaberite layout'),
    homeOrder: Yup.string().required('Izaberite redosled'),
})

const EditCategory = () => {
    const classes = useStyles()
    const { id } = useParams()
    const [singleCategory, setSingleCategory] = useState({})
    const [homeState, setHomeState] = useState(false)
    const [sidebarState, setSidebarState] = useState(true)
    const [initValues, setInitValues] = useState(false)

    const getSingleCategory = async (id) => {
        const response = await axios.get(`/category/getcategory/${id}`)
        const layouts = await axios.get('/layout/getLayouts')
        setSingleCategory(response.data.singleCategory)
        setHomeState(response.data.singleCategory.home)
        setSidebarState(response.data.singleCategory.sidebar)
        setInitValues({
            id: id,
            name: response.data.singleCategory.name,
            description: response.data.singleCategory.description,
            layout: response.data.singleCategory.layout._id,
            homeOrder: response.data.singleCategory.homeOrder,
            home: response.data.singleCategory.home,
            sidebar: response.data.singleCategory.sidebar,
            type: 'Kursna lista',
            layouts: layouts.data.layouts,
        })
    }

    useEffect(() => {
        getSingleCategory(id)
    }, [id])

    return (
        <Grid container className={classes.formContainer}>
            <Grid item xs={12}>
                <Container className={classes.container}>
                    <div className={classes.formWrapper}>
                        {initValues ? (
                            <Formik
                                enableReinitialize
                                initialValues={
                                    { ...initValues }
                                    //     {
                                    //     id: id,
                                    //     name: singleCategory.name,
                                    //     description: singleCategory.description,
                                    //     layout:
                                    //         singleCategory && singleCategory.layout
                                    //             ? singleCategory.layout._id
                                    //             : '',
                                    //     homeOrder:
                                    //         singleCategory && singleCategory.homeOrder
                                    //             ? singleCategory.homeOrder
                                    //             : '',
                                    //     home: homeState,
                                    //     sidebar: sidebarState,
                                    //     type: 'Kursna lista',
                                    // }
                                }
                                validationSchema={FORM_VALIDATION}
                                onSubmit={async (values) => {
                                    try {
                                        await axios.put(
                                            '/category/editcategory',
                                            {
                                                id: id,
                                                name: values.name,
                                                description: values.description,
                                                layout: values.layout,
                                                homeOrder: values.homeOrder,
                                                home: values.home,
                                                sidebar: values.sidebar,
                                            }
                                        )
                                        window.location = '/categories'
                                    } catch (error) {
                                        console.log(error.response.data)
                                    }
                                }}
                            >
                                {({ values }) => (
                                    <Form>
                                        <Grid
                                            container
                                            spacing={2}
                                            direction="column"
                                        >
                                            <Grid item xs={12} sm={7}>
                                                <TextfieldWrapper
                                                    name="name"
                                                    margin="normal"
                                                    style={{
                                                        fontFamily: 'Bitter',
                                                        fontWeight: '600',
                                                    }}
                                                    value={
                                                        singleCategory.name ||
                                                        ''
                                                    }
                                                />
                                                <TextfieldWrapper
                                                    name="description"
                                                    rows="12"
                                                    multiline={true}
                                                    margin="normal"
                                                    value={
                                                        singleCategory.description ||
                                                        ''
                                                    }
                                                />

                                                <Grid container spacing={1}>
                                                    <Grid item xs={11} sm={11}>
                                                        <Grid
                                                            container
                                                            alignItems="center"
                                                        >
                                                            <Grid
                                                                item
                                                                xs={6}
                                                                sm={6}
                                                            >
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
                                                                            Pocetna
                                                                            stranica:
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
                                                                            checked={
                                                                                homeState
                                                                            }
                                                                            onClick={() =>
                                                                                setHomeState(
                                                                                    !homeState
                                                                                )
                                                                            }
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                xs={6}
                                                                sm={6}
                                                            >
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
                                                                            Redosled:
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
                                                                                1,
                                                                                2,
                                                                                3,
                                                                                4,
                                                                                5,
                                                                                6,
                                                                                7,
                                                                                8,
                                                                                9,
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
                                                                    Layout:
                                                                </Typography>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                xs={9}
                                                                sm={9}
                                                            >
                                                                <SelectWrapper
                                                                    name="layout"
                                                                    options={
                                                                        values.layouts
                                                                    }
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid item xs={11} sm={11}>
                                                        <Grid
                                                            container
                                                            alignItems="center"
                                                        >
                                                            <Grid
                                                                item
                                                                xs={6}
                                                                sm={6}
                                                            >
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
                                                                            checked={
                                                                                sidebarState
                                                                            }
                                                                            onClick={() =>
                                                                                setSidebarState(
                                                                                    !sidebarState
                                                                                )
                                                                            }
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                xs={6}
                                                                sm={6}
                                                            >
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
                                                                            Tip:
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={9}
                                                                        sm={9}
                                                                    >
                                                                        <SelectWrapper
                                                                            name="type"
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
                                                                Odustani
                                                            </ExitButton>
                                                        </Link>
                                                    </Grid>
                                                    <Grid item>
                                                        <ButtonWrapper
                                                            style={{
                                                                margin: '0 7px',
                                                                borderRadius:
                                                                    '6px',
                                                            }}
                                                        >
                                                            Izmeni
                                                        </ButtonWrapper>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                )}
                            </Formik>
                        ) : (
                            <Loader />
                        )}
                    </div>
                </Container>
            </Grid>
        </Grid>
    )
}

export default EditCategory
