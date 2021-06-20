import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import UserPassword from './UserPassword'
import UserSubmitButton from './UserSubmitButton'

const VALIDATION = Yup.object().shape({
    password: Yup.string().min(8, 'Too Short!').required('Required'),
    repeatPassword: Yup.string().min(8, 'Too Short!').required('Required'),
})

const EditPasswordForm = ({ submitPassword, passwordMsg }) => {
    return (
        <div>
            <Formik
                initialValues={{
                    password: '',
                    repeatPassword: '',
                }}
                validationSchema={VALIDATION}
                onSubmit={(values) => {
                    console.log(values)
                    submitPassword(values)
                }}
            >
                <Form>
                    <UserPassword names={['password', 'repeatPassword']} />
                    <UserSubmitButton edit message={passwordMsg} password />
                </Form>
            </Formik>
        </div>
    )
}

export default EditPasswordForm
