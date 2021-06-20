import React from 'react'
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
} from '@material-ui/core'
import { useField, useFormikContext } from 'formik'

const CheckboxWrapper = ({ name, label, ...otherProps }) => {
    const { setFieldValue } = useFormikContext()
    const [field, meta] = useField(name)

    const handleChange = (evt) => {
        const { checked } = evt.target
        setFieldValue(name, checked)
    }

    const configCheckbox = {
        ...field,
        onChange: handleChange,
        ...otherProps
    }

    const configFormControl = {}
    if (meta && meta.touched && meta.error) {
        configFormControl.error = true
    }

    return (
        <FormControl {...configFormControl}>
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox {...configCheckbox} color="primary" />}
                    label={label}
                />
            </FormGroup>
        </FormControl>
    )
}

export default CheckboxWrapper
