import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AddUserForm from './UserForm/AddUserForm'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        textAlign: 'center',
    },
}))

const CreateUser = () => {
    const classes = useStyles()
    const [isLoading, setIsLoading] = React.useState(true)

    setTimeout(() => {
        setIsLoading(false)
    }, 500)
    return (
        <>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <div className={classes.root}>
                    <AddUserForm />
                </div>
            )}
        </>
    )
}

export default CreateUser
