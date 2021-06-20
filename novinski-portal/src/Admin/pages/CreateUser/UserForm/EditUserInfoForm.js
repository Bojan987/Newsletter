import React from 'react'
import UserInfo from './UserInfo'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import UserSubmitButton from './UserSubmitButton'

const VALIDATION = Yup.object().shape({
    firstName: Yup.string().min(3, 'Too Short!'),
    lastName: Yup.string().min(3, 'Too Short!'),
    email: Yup.string().email('Invalid email'),
    phone: Yup.number(),
    age: Yup.number(),
    country: Yup.string(),
    city: Yup.string(),
    address: Yup.string(),
    status: Yup.string(),
    role: Yup.string(),
    position: Yup.string(),
})

const EditUserInfoForm = ({ user, submitInfo, infoMsg }) => {
    return (
        <div>
            <Formik
                initialValues={{
                    firstName: user.firstName ? user.firstName : '',
                    lastName: user.lastName ? user.lastName : '',
                    email: user.email ? user.email : '',
                    phone: user.phone ? user.phone : '',
                    age: user.age ? user.age : '',
                    country: user.country ? user.country : '',
                    city: user.city ? user.city : '',
                    address: user.address ? user.address : '',
                    accountStatus: user.accountStatus ? user.accountStatus : '',
                    role: user.role ? user.role : '',
                    position: user.position ? user.position : '',
                }}
                validationSchema={VALIDATION}
                onSubmit={(values) => {
                    submitInfo(values)
                }}
            >
                <Form>
                    <UserInfo
                        edit
                        user={user}
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
                    <UserSubmitButton edit message={infoMsg} />
                </Form>
            </Formik>
        </div>
    )
}

export default EditUserInfoForm
