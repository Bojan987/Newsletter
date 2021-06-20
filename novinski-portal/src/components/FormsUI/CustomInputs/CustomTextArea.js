import React from 'react'
import { useField } from 'formik'

const CustomTextArea = ({ ...props }) => {
    const [field, meta] = useField(props)
    return (
        <>
            <textarea className="text-area" {...field} {...props} />
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

export default CustomTextArea
