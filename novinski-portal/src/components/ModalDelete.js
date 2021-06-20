import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import { Button, Typography } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import { axiosAuth } from '../util/axios-instance'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        borderRadius: '5px',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
        borderRadius: '10px',
        height: '150px',
        display: 'flex',
        flexDirection: 'column',
        placeContent: 'center flex-start',
    },
    btns: {
        display: 'flex',
        placeContent: 'center space-between',
        paddingTop: '2.5rem',
    },
    link: {
        textDecoration: 'none',
        color: '#909090',
        cursor: 'pointer',
    },
}))

export default function TransitionsModal({ id, handleUserDeleted }) {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    const [user, setUser] = React.useState(0)

    React.useEffect(() => {
        handleUserDeleted(user)
    }, [user])

    const handleModalChange = () => {
        setOpen(!open)
    }

    const handleDelete = async () => {
        try {
            await axiosAuth.delete(`/user/deleteAccount/${id}`)
            setUser(1)
            handleUserDeleted(user)
            setOpen(!open)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={classes.link}>
            <DeleteRoundedIcon onClick={handleModalChange} />

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleModalChange}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 350,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        {/* <h3 > */}
                        <Typography variant="h3" id="transition-modal-title">
                            <FormattedMessage
                                id="admin.users.modal.heading"
                                default="default text"
                            />
                        </Typography>
                        {/* </h3> */}
                        <div className={classes.btns}>
                            <Button
                                variant="outlined"
                                onClick={handleModalChange}
                            >
                                <FormattedMessage
                                    id="admin.users.modal.cancel"
                                    default="default text"
                                />
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleDelete}
                            >
                                <FormattedMessage
                                    id="admin.users.modal.confirm"
                                    default="default text"
                                />
                            </Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}
