import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Typography } from '@material-ui/core'
import ButtonWrapper from '../../components/FormsUI/Button/ButtonWrapper'
import CheckboxWrapper from '../../components/FormsUI/Checkbox/CheckboxWrapper'
import TextfieldWrapper from '../../components/FormsUI/Textfield/TextfieldWrapper'
import { Link as RouterLink } from 'react-router-dom'
import { Link } from '@material-ui/core'
import AppContext from '../../context/AppContext'
import { useHistory } from 'react-router-dom'
import { axiosInstance } from '../../util/axios-instance'
import { useIntl } from "react-intl";

const useStyles = makeStyles((theme) => ({
    formContainer: {
        minHeight: '70vh',
        alignItems: 'flex-start',
        justifyContent: 'center',
        position: 'relative',
    },
    formWrapper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(8),
    },
    alignAll: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
}))



const Login = () => {

    const intl=useIntl()
    
    const classes = useStyles()
    const ctx = React.useContext(AppContext)
    const history = useHistory()

    const INITIAL_FORM_STATE = {
        email: '',
        password: '',
        remember: false,
    }
    
    const FORM_VALIDATION = Yup.object().shape({
        email: Yup.string().email(intl.formatMessage({ id: "invalidEmail" })).required('Required'),
        password: Yup.string()
            .required(intl.formatMessage({ id: "noPassword" }))
            .min(8, intl.formatMessage({ id: "invalidPassword" }))
            .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
        remember: Yup.boolean(),
    })

    const handleLogin = async (userInfo, { setErrors, resetForm }) => {
        try {
            const res = await axiosInstance.post(`/user/login`, userInfo)
            resetForm(INITIAL_FORM_STATE)
            console.log(res.data)
            const token = res.headers.authorization.split(' ')[1]
            ctx.login(token, res.data?.user)
            localStorage.setItem('token', token)
            localStorage.setItem('role', res.data.user.role)
            localStorage.setItem('expiresAt',res.data.user.tokenExpires)
            
                setTimeout(() => {
                    
                    history.push('/')
                }, 500);
            
        } catch (err) {
            let error ="email"
            if(err.response.data && err.response.data.error){
              error = err.response.data.error.includes('password') ? "password" : "email"   
            }
            console.log(err.response)
            setErrors({
                [error]:
                    err.response && (err.response?.data.error||err.response?.data.message)
                        ? err.response?.data.error ? err.response?.data.error : err.response?.data.message
                        : err.message,
            })
        }
    }

    ctx.handleAuthHeader(true)

    return (
        <Grid container className={classes.formContainer}>
            <Grid item xs={12}>
                <Container maxWidth="xs">
                    <div className={classes.formWrapper}>
                        <Formik
                            initialValues={{
                                ...INITIAL_FORM_STATE,
                            }}
                            validationSchema={FORM_VALIDATION}
                            onSubmit={handleLogin}
                        >
                            {({ isSubmitting}) => (
                            <Form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="h2" align="center">
                                            {intl.formatMessage({ id: "login.title",defaultMessage:'LOGIN' })}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextfieldWrapper
                                            name="email"
                                            label={intl.formatMessage({ id: "email" })}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextfieldWrapper
                                            name="password"
                                            label={intl.formatMessage({ id: "password" })}
                                            type="password"
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <CheckboxWrapper
                                            name="remember"
                                            label={intl.formatMessage({ id: "rememberMe" })}
                                        />
                                    </Grid>

                                    <Grid
                                        item
                                        xs={6}
                                        className={classes.alignAll}
                                    >
                                        <Link
                                            variant="body2"
                                            component={RouterLink}
                                            to="/forgot-password"
                                        >
                                            {' '}
                                            {intl.formatMessage({ id: "forgotPassword" })}
                                        </Link>{' '}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <ButtonWrapper disabled={isSubmitting} type='submit'>
                                            {intl.formatMessage({ id: "loginSubmit" })}
                                        </ButtonWrapper>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography
                                            align="center"
                                            variant="body2"
                                        >
                                            {intl.formatMessage({ id: "noRegister" })}
                                            <Link
                                                variant="body2"
                                                component={RouterLink}
                                                to="/register"
                                            >
                                                {' '}
                                                {intl.formatMessage({ id: "registerHere" })}
                                            </Link>{' '}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Form>
                            )}
                        </Formik>
                    </div>
                </Container>
            </Grid>
        </Grid>
    )
}

export default Login
