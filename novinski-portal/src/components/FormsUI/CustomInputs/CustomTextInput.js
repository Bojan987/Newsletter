import React from 'react'
import { useField } from 'formik'

const CustomTextInput = ({ ...props }) => {
    const [field, meta] = useField(props)

    let style = {}
    props.label
        ? (style = {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
          })
        : (style = { textAlign: 'left' })

    if (props.defaultValue) {
        delete field.value
    }

    return (
        <div style={style}>
            {props.label && (
                <label
                    style={{
                        fontFamily: 'Abel',
                        fontWeight: '900',
                        color: '#333333',
                        marginRight: '10px',
                    }}
                >
                    {props.label}:
                </label>
            )}
            <input {...field} {...props} />
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
        </div>
    )
}

export default CustomTextInput
