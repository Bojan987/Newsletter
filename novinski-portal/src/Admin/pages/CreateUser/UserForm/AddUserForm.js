import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Typography } from '@material-ui/core'
import UserPassword from './UserPassword'
import UserSocial from './UserSocial'
import UserInfo from './UserInfo'
import UserSubmitButton from './UserSubmitButton'
import { axiosAuth as axios } from '../../../../util/axios-instance'
import { FormattedMessage } from 'react-intl'

const useStyles = makeStyles((theme) => ({
    formContainer: {
        width: '100%',
    },
    formTitle: {
        textAlign: 'left',
        color: '#333333',
        fontWeight: '800',
        margin: '1rem 0',
        marginLeft: '3rem',
        '@media(max-width: 767px)': {
            marginLeft: 0,
        },
    },

    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    submitButton: {
        display: 'block',
        width: '15%',
        height: '40px',
        color: 'white',
        background: '#231F20',
        border: '2px solid #231F20 !important',
        outline: 'none',
        padding: '0',
        cursor: 'pointer',
        transition: 'all 300ms ease',
        '&:hover': {
            background: '#333333',
        },
        '@media(max-width: 650px)': {
            width: '100%',
        },
    },
}))

const VALIDATION = Yup.object().shape({
    firstName: Yup.string().min(3, 'Too Short!').required('Required'),
    lastName: Yup.string().min(3, 'Too Short!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phone: Yup.string(),
    age: Yup.string(),
    country: Yup.string(),
    city: Yup.string(),
    address: Yup.string(),
    status: Yup.string(),
    role: Yup.string(),
    position: Yup.string(),
    facebook: Yup.string(),
    instagram: Yup.string(),
    twitter: Yup.string(),
    linkedin: Yup.string(),
    password: Yup.string().min(8, 'Too Short!').required('Required'),
    repeatPassword: Yup.string().min(8, 'Too Short!').required('Required'),
})

const UserForm = () => {
    const classes = useStyles()
    const [createMsg, setCreatedMsg] = React.useState('')

    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                age: '',
                country: '',
                city: '',
                address: '',
                accountStatus: '',
                role: '',
                position: '',
                facebook: '',
                instagram: '',
                twitter: '',
                linkedin: '',
                password: '',
                repeatPassword: '',
            }}
            validationSchema={VALIDATION}
            onSubmit={(values, { resetForm }) => {
                if (values.password !== values.repeatPassword) {
                    alert('Passwords do NOT match!')
                    resetForm()
                    return
                }

                let userObj = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password,
                    role: values.role,
                    accountStatus: values.accountStatus,
                    description: values.position,
                    country: values.country,
                    city: values.city,
                    address: values.address,
                    phone: values.phone,
                    age: values.age,
                    confirmPassword: values.repeatPassword,
                    socialAccounts: [
                        { name: 'facebook', link: values.facebook },
                        { name: 'instagram', link: values.instagram },
                        { name: 'twitter', link: values.twitter },
                        { name: 'linkedin', link: values.linkedin },
                    ],
                }
                axios.post('/user/createUser', userObj).then((data) => {
                    setCreatedMsg(data.data.message)
                })
                resetForm()
                setTimeout(() => {
                    setCreatedMsg('')
                }, 3000)
            }}
        >
            <Form>
                <div className={classes.fornContainer}>
                    <Typography variant="h4" className={classes.formTitle}>
                        <FormattedMessage
                            id="admin.add.user"
                            default="default text"
                        />
                    </Typography>
                    <UserInfo
                        names={[
                            'firstName',
                            'lastName',
                            'email',
                            'phone',
                            'age',
                            'country',
                            'city',
                            'address',
                        ]}
                    />
                    <Typography variant="h4" className={classes.formTitle}>
                        <FormattedMessage
                            id="admin.social"
                            default="default text"
                        />
                    </Typography>
                    <UserSocial
                        names={['facebook', 'instagram', 'twitter', 'linkedin']}
                    />
                    <Typography variant="h4" className={classes.formTitle}>
                        <FormattedMessage
                            id="admin.password"
                            default="default text"
                        />
                    </Typography>
                    <UserPassword names={['password', 'repeatPassword']} />
                    <UserSubmitButton message={createMsg} />
                </div>
            </Form>
        </Formik>
    )
}

export default UserForm
