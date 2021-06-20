import React from 'react'
import { useField } from 'formik'

const CustomSelect = ({ ...props }) => {
    const [field, meta] = useField(props)

    if (props.defaultValue) {
        delete field.value
    }
    return (
        <>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
                <div
                    style={{
                        color: 'red',
                        fontSize: '15px',
                        fontWeight: 'bolder',
                    }}
                >
                    {meta.error}
                </div>
            ) : null}
        </>
    )
}

export default CustomSelect
