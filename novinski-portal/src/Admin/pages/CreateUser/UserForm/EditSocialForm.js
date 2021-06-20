import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import UserSocial from './UserSocial'
import UserSubmitButton from './UserSubmitButton'

const VALIDATION = Yup.object().shape({
    facebook: Yup.string(),
    instagram: Yup.string(),
    twitter: Yup.string(),
    linkedin: Yup.string(),
})

const EditSocialForm = ({ user, submitSocial, socialMsg }) => {
    return (
        <div>
            <Formik
                initialValues={{
                    facebook:
                        user.socialAccounts.length !== 0 &&
                        user.socialAccounts[0]
                            ? user.socialAccounts[0].link
                            : '',
                    instagram:
                        user.socialAccounts.length !== 0 &&
                        user.socialAccounts[1]
                            ? user.socialAccounts[1].link
                            : '',
                    twitter:
                        user.socialAccounts.length !== 0 &&
                        user.socialAccounts[2]
                            ? user.socialAccounts[2].link
                            : '',
                    linkedin:
                        user.socialAccounts.length !== 0 &&
                        user.socialAccounts[3]
                            ? user.socialAccounts[3].link
                            : '',
                }}
                validationSchema={VALIDATION}
                onSubmit={(values) => {
                    submitSocial(values)
                }}
            >
                <Form>
                    <UserSocial
                        edit
                        names={['facebook', 'instagram', 'twitter', 'linkedin']}
                    />
                    <UserSubmitButton edit message={socialMsg} />
                </Form>
            </Formik>
        </div>
    )
}

export default EditSocialForm
