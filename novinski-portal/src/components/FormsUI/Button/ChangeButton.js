import React from 'react'
import { Button } from '@material-ui/core'
import { useField,useFormikContext } from 'formik';
import styled from 'styled-components'

const StyledButton = styled(Button)`
    background-color: white
`;

const ChangeButton = ({ name, value, children, ...otherProps }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);

    const handleSubmit = (value) => {
        setFieldValue(name, !value)
        console.log(!value)
    }

    const configButton = {
        onClick: handleSubmit,
        value,
        field,
        ...otherProps,
    }

    return <StyledButton {...configButton}>{children}</StyledButton>
}

export default ChangeButton