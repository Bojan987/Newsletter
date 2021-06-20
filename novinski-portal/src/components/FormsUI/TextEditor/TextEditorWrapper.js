import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useField, useFormikContext } from 'formik'
import styled from 'styled-components'

const TextEditor = styled(ReactQuill)`
    padding-top: 20px;
    height: 300px;
`

const TextEditorWrapper = ({ name, value, ...otherProps }) => {
    const { setFieldValue } = useFormikContext()
    const [field, meta] = useField(name)

    const configTextfield = {
        ...field,
        ...otherProps,
    }

    if (meta && meta.touched && meta.error) {
        configTextfield.error = true
        configTextfield.helperText = meta.error
    }

    return (
        <TextEditor
            {...configTextfield}
            onChange={(content) => setFieldValue(name, content)}
        />
    )
}

export default TextEditorWrapper
