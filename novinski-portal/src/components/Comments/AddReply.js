import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import TextfieldWrapper from '../FormsUI/Textfield/TextfieldWrapper'
import ButtonWrapper from '../FormsUI/Button/ButtonWrapper'
import { axiosAuth as axios } from '../../util/axios-instance'

const FORM_VALIDATION = Yup.object().shape({
    content: Yup.string().required('Required'),
})

const AddReply = ({ id }) => {
    const [errorMessage, setErrorMessage] = useState('')

    return (
        <div>
            <Formik
                initialValues={{
                    content: '',
                }}
                validationSchema={FORM_VALIDATION}
                onSubmit={async (values) => {
                    try {
                        const response = await axios.put(
                            '/comment/replyToComment',
                            {
                                idComment: id,
                                content: values.content,
                            }
                        )
                        window.location.reload()
                        console.log(response)
                    } catch (error) {
                        setErrorMessage(error.response.data.error)
                    }
                }}
            >
                <Form>
                    <TextfieldWrapper
                        name="content"
                        rows="2"
                        multiline={true}
                        margin="normal"
                    />
                    <ButtonWrapper>POŠALJI</ButtonWrapper>
                    {errorMessage.length > 0 &&
                    errorMessage === 'Not authenticated.' ? (
                        <p style={{ color: 'red' }}>
                            Morate biti ulogovani da biste odgovorili na
                            komentar!
                        </p>
                    ) : (
                        ''
                    )}
                </Form>
            </Formik>
        </div>
    )
}

export default AddReply
