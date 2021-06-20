import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AddUserForm from './UserForm/AddUserForm'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        textAlign: 'center',
    },
}))

const CreateUser = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <AddUserForm />
        </div>
    )
}

export default CreateUser
