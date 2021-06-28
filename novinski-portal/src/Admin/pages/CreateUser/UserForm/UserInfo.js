import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CustomTextInput from '../../../../components/FormsUI/CustomInputs/CustomTextInput'
import CustomSelect from '../../../../components/FormsUI/CustomInputs/CustomSelect'
import { FormattedMessage } from 'react-intl'

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
                    <label className={classes.label}>
                        <FormattedMessage
                            id="admin.users.name"
                            default="default text"
                        />
                    </label>
                    <label className={classes.label}>
                        <FormattedMessage
                            id="admin.lastName"
                            default="default text"
                        />
                    </label>
                    <label className={classes.label}>
                        <FormattedMessage id="email" default="default text" />
                    </label>
                    <label className={classes.label}>
                        <FormattedMessage
                            id="admin.phone"
                            default="default text"
                        />
                    </label>
                    <label className={classes.label}>
                        <FormattedMessage
                            id="admin.age"
                            default="default text"
                        />
                    </label>
                    <label className={classes.label}>
                        <FormattedMessage
                            id="admin.country"
                            default="default text"
                        />
                    </label>
                    <label className={classes.label}>
                        <FormattedMessage
                            id="admin.city"
                            default="default text"
                        />
                    </label>
                    <label className={classes.label}>
                        <FormattedMessage
                            id="admin.address"
                            default="default text"
                        />
                    </label>
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
                    <label className={classes.label}>
                        {' '}
                        <FormattedMessage
                            id="admin.users.status"
                            default="default text"
                        />
                    </label>
                    <label className={classes.label}>
                        {' '}
                        <FormattedMessage
                            id="admin.users.role"
                            default="default text"
                        />
                    </label>
                    <label className={classes.label}>
                        {' '}
                        <FormattedMessage
                            id="admin.users.position"
                            default="default text"
                        />
                    </label>
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
                        <FormattedMessage
                            id="admin.choose.status"
                            default="default text"
                        >
                            {(message) => <option value="">{message}</option>}
                        </FormattedMessage>
                        <FormattedMessage
                            id="admin.active"
                            default="default text"
                        >
                            {(message) => (
                                <option value="active">{message}</option>
                            )}
                        </FormattedMessage>

                        <FormattedMessage
                            id="admin.inactive"
                            default="default text"
                        >
                            {(message) => (
                                <option value="inactive">{message}</option>
                            )}
                        </FormattedMessage>

                        <FormattedMessage
                            id="admin.deleted"
                            default="default text"
                        >
                            {(message) => (
                                <option value="deleted">{message}</option>
                            )}
                        </FormattedMessage>
                    </CustomSelect>
                    <CustomSelect
                        name="role"
                        id="role"
                        className={classes.select}
                        //defaultValue={user && user.role ? user.role : undefined}
                    >
                        <FormattedMessage
                            id="admin.choose.role"
                            default="default text"
                        >
                            {(message) => <option value="">{message}</option>}
                        </FormattedMessage>
                        <FormattedMessage
                            id="admin.manager"
                            default="default text"
                        >
                            {(message) => (
                                <option value="manager">{message}</option>
                            )}
                        </FormattedMessage>
                        <FormattedMessage
                            id="admin.journalist"
                            default="default text"
                        >
                            {(message) => (
                                <option value="journalist">{message}</option>
                            )}
                        </FormattedMessage>
                        <FormattedMessage
                            id="admin.visitor"
                            default="default text"
                        >
                            {(message) => (
                                <option value="visitor">{message}</option>
                            )}
                        </FormattedMessage>
                        <FormattedMessage id="admin" default="default text">
                            {(message) => (
                                <option value="admin">{message}</option>
                            )}
                        </FormattedMessage>
                    </CustomSelect>
                    <CustomTextInput
                        type="text"
                        placeholder="position"
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
