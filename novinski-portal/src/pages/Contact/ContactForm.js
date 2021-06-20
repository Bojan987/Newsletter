import React from 'react'
import CustomTextInput from '../../components/FormsUI/CustomInputs/CustomTextInput'
import CustomTextArea from '../../components/FormsUI/CustomInputs/CustomTextArea'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import { axiosInstance as axios } from '../../util/axios-instance'

const useStyles = makeStyles(() => ({
    form: {
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        borderRight: '2px solid #cccccc',
        '@media(max-width: 1024px)': {
            width: '40%',
        },
        '@media(max-width: 767px)': {
            width: '95%',
            borderRight: 'none',
        },
    },
    input: {
        width: '100%',
        height: '40px',
        border: '2px solid #cccccc',
        margin: '10px auto',
        paddingLeft: '15px',
        '&:hover': {
            border: '2px solid #333333',
        },
    },
    textarea: {
        width: '100%',
        border: '2px solid #cccccc',
        margin: '10px auto',
        paddingLeft: '15px',
        paddingTop: '15px',
        '&:hover': {
            border: '2px solid #333333',
        },
    },
    submitButton: {
        display: 'block',
        width: '100%',
        height: '40px',
        color: 'white',
        background: '#231F20',
        border: '2px solid #231F20 !important',
        outline: 'none',
        marginTop: '10px',
        cursor: 'pointer',
        transition: 'all 300ms ease',
        fontFamily: 'Libre Franklin',
        '&:hover': {
            background: '#333333',
        },
    },
    success: {
        margin: '10px auto',
        textAlign: 'center',
        color: 'green',
        fontFamily: 'Abel',
    },
}))

const VALIDATION = Yup.object().shape({
    name: Yup.string().min(3, 'Too Short!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    message: Yup.string().min(5, 'Too Short!').required('Required'),
})

const ContactForm = () => {
    const classes = useStyles()
    const [successMsg, setSuccessMsg] = React.useState('')
    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                message: '',
            }}
            validationSchema={VALIDATION}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                resetForm()
                setSubmitting(false)
                axios
                    .post('/contactUs', {
                        name: values.name,
                        email: values.email,
                        message: values.message,
                    })
                    .then((data) => {
                        setSuccessMsg(data.data)
                        setTimeout(() => {
                            setSuccessMsg('')
                        }, 3000)
                    })
            }}
        >
            {(props) => (
                <Form className={classes.form}>
                    <CustomTextInput
                        type="text"
                        placeholder="Ime"
                        className={classes.input}
                        name="name"
                        id="name"
                    />
                    <CustomTextInput
                        type="text"
                        placeholder="Email adresa"
                        className={classes.input}
                        name="email"
                        id="email"
                    />

                    <CustomTextArea
                        name="message"
                        rows="9"
                        className={classes.textarea}
                        placeholder="Poruka"
                    />
                    <button className={classes.submitButton} type="submit">
                        {props.isSubmitting ? 'SUBMITING' : 'SUBMIT'}
                    </button>
                    <p className={classes.success}>{successMsg}</p>
                </Form>
            )}
        </Formik>
    )
}

export default ContactForm
