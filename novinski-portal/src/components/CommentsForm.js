import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import TextfieldWrapper from './FormsUI/Textfield/TextfieldWrapper'
import { makeStyles } from '@material-ui/core/styles'
import CheckboxWrapper from './FormsUI/Checkbox/CheckboxWrapper'
import ButtonWrapper from './FormsUI/Button/ButtonWrapper'
import { FormattedMessage } from 'react-intl'

import { axiosAuth as axios } from '../util/axios-instance'

const useStyles = makeStyles((theme) => ({
    nameInput: {
        paddingRight: '10px',
    },
    mailInput: {
        paddingLeft: '10px',
    },
    formTypography: {
        color: '#231F20',
        fontFamily: "'Bitter', serif",
        fontWeight: '800',
    },
}))

const FORM_VALIDATION = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email.').required('Required'),
    content: Yup.string().required('Required.'),
    notifyAuthor: Yup.boolean(),
})

export const CommentsForm = ({ id }) => {
    const classes = useStyles()

    const sendComment = async (values) => {
        try {
            const response = await axios.post('/comment/createComment', {
                postId: values.postId,
                firstName: values.firstName,
                email: values.email,
                content: values.content,
                notifyAuthor: values.notifyAuthor,
            })

            console.log(response)
            window.location.reload()
        } catch (error) {
            console.log(error.response.data)
        }
    }

    return (
        <div>
            <div>
                <Formik
                    initialValues={{
                        postId: id,
                        firstName: '',
                        email: '',
                        content: '',
                        notifyAuthor: false,
                    }}
                    validationSchema={FORM_VALIDATION}
                    onSubmit={(values) => {
                        sendComment(values)
                    }}
                >
                    <Form>
                        <div style={{ display: 'flex' }}>
                            <TextfieldWrapper
                                className={classes.nameInput}
                                name="firstName"
                                label={
                                    <FormattedMessage
                                        id="firstName"
                                        default="default text"
                                    />
                                }
                                margin="normal"
                                style={{ paddingRight: '10px' }}
                            />

                            <TextfieldWrapper
                                name="email"
                                label={
                                    <FormattedMessage
                                        id="email"
                                        default="default text"
                                    />
                                }
                                margin="normal"
                                style={{ paddingLeft: '10px' }}
                            />
                        </div>
                        <TextfieldWrapper
                            name="content"
                            label={
                                <FormattedMessage
                                    id="comment"
                                    default="default text"
                                />
                            }
                            rows="12"
                            multiline={true}
                            margin="normal"
                        />
                        <CheckboxWrapper
                            name="notifyAuthor"
                            label={
                                <FormattedMessage
                                    id="notification"
                                    default="default text"
                                />
                            }
                        />
                        <ButtonWrapper>
                            <FormattedMessage
                                id="admin.post.publish"
                                default="default text"
                            />
                        </ButtonWrapper>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}
