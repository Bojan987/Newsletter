import React from 'react'
import EditPasswordForm from './EditPasswordForm'
import EditSocialForm from './EditSocialForm'
import EditUserInfoForm from './EditUserInfoForm'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    formTitle: {
        textAlign: 'left',
        color: '#333333',
        fontWeight: '800',
        margin: '1rem 0',
        marginLeft: '3rem',
        '@media(max-width: 767px)': {
            marginLeft: 0,
        },
    },
}))

const EditUserForm = ({
    user,
    infoFormik,
    passwordFormik,
    socialFormik,
    infoMsg,
    socialMsg,
    passwordMsg,
}) => {
    const classes = useStyles()

    return (
        <div>
            <Typography
                variant="h4"
                className={classes.formTitle}
                style={{ borderTop: '1px solid #cccccc', paddingTop: '1rem' }}
            >
                Osnovne informacije
            </Typography>
            <EditUserInfoForm
                user={user}
                submitInfo={infoFormik}
                infoMsg={infoMsg}
            />
            <Typography variant="h4" className={classes.formTitle}>
                Društvene mreže
            </Typography>
            <EditSocialForm
                user={user}
                submitSocial={socialFormik}
                socialMsg={socialMsg}
            />
            <Typography variant="h4" className={classes.formTitle}>
                Lozinka
            </Typography>
            <EditPasswordForm
                submitPassword={passwordFormik}
                passwordMsg={passwordMsg}
            />
        </div>
    )
}

export default EditUserForm
