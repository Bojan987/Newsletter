import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CustomTextInput from '../../../../components/FormsUI/CustomInputs/CustomTextInput'
import CustomSelect from '../../../../components/FormsUI/CustomInputs/CustomSelect'

const useStyles = makeStyles((theme) => ({
    addUserContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',

        '@media(max-width: 767px)': {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
    },

    first: {
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        '@media(max-width: 767px)': {
            width: '100%',
        },
    },
    second: {
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
    select: {
        width: '60%',
        height: '30px',
        border: '2px solid #cccccc',
        margin: '0',
        marginBottom: '10px',
        paddingLeft: '15px',
        background: 'white',
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

const UserInfo = ({ edit, user, names }) => {
    const classes = useStyles()

    return (
        <div
            className={classes.addUserContainer}
            style={{ borderBottom: edit ? 'none' : '1px solid #cccccc' }}
        >
            <div className={classes.first}>
                <div className={classes.labelsDiv}>
                    <label className={classes.label}>Ime</label>
                    <label className={classes.label}>Prezime</label>
                    <label className={classes.label}>Email</label>
                    <label className={classes.label}>Telefon</label>
                    <label className={classes.label}>Godina</label>
                    <label className={classes.label}>Drzava</label>
                    <label className={classes.label}>Grad</label>
                    <label className={classes.label}>Adresa</label>
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
                                /* defaultValue={
                                    user && user[name] ? user[name] : undefined
                                } */
                            />
                        )
                    })}
                </div>
            </div>
            <div className={classes.second}>
                <div className={classes.labelsDiv}>
                    <label className={classes.label}>Status</label>
                    <label className={classes.label}>Rola</label>
                    <label className={classes.label}>Pozicija</label>
                </div>
                <div className={classes.inputsDiv}>
                    <CustomSelect
                        name="accountStatus"
                        id="accountStatus"
                        className={classes.select}
                        /* defaultValue={
                            user && user.accountStatus
                                ? user.accountStatus
                                : undefined
                        } */
                    >
                        <option value="">Choose your status</option>
                        <option value="active">Aktivan</option>
                        <option value="inactive">Neaktivan</option>
                        <option value="deleted">Obrisan</option>
                    </CustomSelect>
                    <CustomSelect
                        name="role"
                        id="role"
                        className={classes.select}
                        //defaultValue={user && user.role ? user.role : undefined}
                    >
                        <option value="">Choose your role</option>
                        <option value="manager">Manager</option>
                        <option value="journalist">Novinar</option>
                        <option value="basic">Posetilac</option>
                        <option value="admin">Admin</option>
                    </CustomSelect>
                    <CustomTextInput
                        type="text"
                        placeholder="Direktor"
                        className={classes.input}
                        name="position"
                        id="position"
                        /* defaultValue={
                            user && user.position ? user.position : undefined
                        } */
                    />
                </div>
            </div>
        </div>
    )
}

export default UserInfo
