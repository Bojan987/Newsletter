import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Typography } from '@material-ui/core'
import ButtonWrapper from '../../components/FormsUI/Button/ButtonWrapper'
import TextfieldWrapper from '../../components/FormsUI/Textfield/TextfieldWrapper'
import { useHistory } from 'react-router'
import { axiosInstance } from '../../util/axios-instance'
import { useIntl } from "react-intl";

const useStyles = makeStyles((theme) => ({
    formContainer: {
        minHeight: '70vh',
        alignItems: 'flex-start',
        justifyContent: 'center',
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
}

const FORM_VALIDATION = Yup.object().shape({
    email: Yup.string().email('Invalid email.').required('Required'),
})

const ForgotPassword = () => {
    const classes = useStyles()
    const history = useHistory()
    const intl = useIntl()

    const handleSubmit = async (data, { setErrors, resetForm }) => {
        try {
            const res = await axiosInstance.post('/user/reset', data)
            console.log('codeSent: ', res, data)

            resetForm(INITIAL_FORM_STATE)

            history.push(`/forgot-password-otp/${data.email}`)
        } catch (err) {
            let error = 'email'

            setErrors({
                [error]:
                    err.response && err.response.data.error
                        ? err.response.data.error
                        : err.message,
            })
        }
    }

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
                            onSubmit={handleSubmit}
                        >
                            <Form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="h2" align="center">
                                        {intl.formatMessage({ id: "forgotPassword.title",defaultMessage:'FORGOT PASSWORD' })}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextfieldWrapper
                                            name="email"
                                            label="Email"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <ButtonWrapper>
                                        {intl.formatMessage({ id: "sendOtp",defaultMessage:'COMFIRM' })}
                                        </ButtonWrapper>
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

export default ForgotPassword
