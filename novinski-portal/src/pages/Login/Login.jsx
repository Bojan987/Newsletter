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

const INITIAL_FORM_STATE = {
    email: '',
    password: '',
    remember: false,
}

const FORM_VALIDATION = Yup.object().shape({
    email: Yup.string().email('Invalid email.').required('Required'),
    password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    remember: Yup.boolean(),
})

const Login = () => {
    const classes = useStyles()
    const ctx = React.useContext(AppContext)
    const history = useHistory()

    const handleLogin = async (userInfo, { setErrors, resetForm }) => {
        try {
            const res = await axiosInstance.post(`/user/login`, userInfo)
            resetForm(INITIAL_FORM_STATE)
            const token = res.headers.authorization.split(' ')[1]
            ctx.login(token, res.data.user)
            localStorage.setItem('token', token)
            localStorage.setItem('role', res.data.user.role)
            localStorage.setItem('expiresAt',res.data.user.tokenExpires)
            
                
                history.push('/')
            
        } catch (err) {
            let error ="email"
            if(err.response.data.error){
              error = err.response.data.error.includes('password') ? "password" : "email"   
            }
            console.log(err.response)
            setErrors({
                [error]:
                    err.response && (err.response.data.error||err.response.data.message)
                        ? err.response.data.error ? err.response.data.error : err.response.data.message
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
                                            LOGIN
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextfieldWrapper
                                            name="email"
                                            label="Email"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextfieldWrapper
                                            name="password"
                                            label="Password"
                                            type="password"
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <CheckboxWrapper
                                            name="remember"
                                            label="Remember me"
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
                                            Forgot Password?
                                        </Link>{' '}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <ButtonWrapper disabled={isSubmitting} type='submit'>
                                            Submit Form
                                        </ButtonWrapper>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography
                                            align="center"
                                            variant="body2"
                                        >
                                            You don't have an account?{' '}
                                            <Link
                                                variant="body2"
                                                component={RouterLink}
                                                to="/register"
                                            >
                                                {' '}
                                                Register here!
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
