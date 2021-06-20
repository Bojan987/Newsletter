import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CustomTextInput from '../../../../components/FormsUI/CustomInputs/CustomTextInput'

const useStyles = makeStyles((theme) => ({
    socialContainer: {
        display: 'flex',
        flexDirection: 'row',
    },

    first: {
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        '@media(max-width: 767px)': {
            width: '100%',
        },
    },

    labelsDiv: {
        width: '10%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '5px',
        marginLeft: '3rem',
        marginRight: '1rem',
        '@media(max-width: 767px)': {
            marginLeft: '1rem',
            marginRight: '2rem',
        },
        '@media(max-width: 450px)': {
            marginRight: '3rem',
        },
    },
    label: {
        textAlign: 'left',
        marginBottom: '20px',
        fontWeight: 'bolder',
        color: '#333333',
        fontFamily: 'Bitter',
        '@media(max-width: 767px)': {
            fontSize: '13px',
            marginBottom: '22px',
        },
    },
    inputsDiv: {
        width: '90%',
        marginLeft: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    input: {
        width: '60%',
        height: '30px',
        border: '2px solid #cccccc',
        marginBottom: '10px',
        paddingLeft: '15px',
        '&:hover': {
            border: '2px solid #333333',
        },

        '@media(max-width: 1000px)': {
            width: '80%',
        },
        '@media(max-width: 767px)': {
            width: '90%',
        },
    },
}))

const UserSocial = ({ edit, names }) => {
    const classes = useStyles()

    return (
        <div
            className={classes.socialContainer}
            style={{ borderBottom: edit ? 'none' : '1px solid #cccccc' }}
        >
            <div className={classes.first}>
                <div className={classes.labelsDiv}>
                    <label className={classes.label}>Facebook</label>
                    <label className={classes.label}>Instagram</label>
                    <label className={classes.label}>Twitter</label>
                    <label className={classes.label}>LinkendIn</label>
                </div>
                <div className={classes.inputsDiv}>
                    {names.map((name) => {
                        return (
                            <CustomTextInput
                                type="text"
                                placeholder={name}
                                className={classes.input}
                                name={name}
                                id={name}
                                key={name + Math.random()}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default UserSocial
