import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { Button, Grid, Modal } from '@material-ui/core'

import EditModal from './EditModal'
import DeleteModal from './DeleteModal'
import moment from 'moment'

function rand() {
    return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
    const top = 50 + rand()
    const left = 50 + rand()

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: '1rem',
        borderRadius: '10px',
    },
    wrapperTitle: {
        display: 'flex',
        maxWidth: 800,
    },
    column: {
        flex: '1 0 100px',
        paddingLeft: 10,
    },
    icons: {
        marginRight: '1rem',
    },
    container: {
        maxWidth: 800,
        alignItems: 'center',
    },
    media: {
        height: 80,
    },
    paper: {
        position: 'absolute',
        width: 600,
        backgroundColor: theme.palette.background.paper,

        boxShadow: theme.shadows[5],
        padding: '3rem',
    },
}))

const LayoutCard = ({data}) => {
    const classes = useStyles()
    const [modalStyle] = useState(getModalStyle)
    const [openDel, setOpenDel] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)

    const handleOpen = () => {
        setOpenDel(true)
    }

    const handleClose = () => {
        setOpenDel(false)
    }

    const handleOpenEdit = () => {
        setOpenEdit(true)
    }
    const handleCloseEdit = () => {
        setOpenEdit(false)
    }

    return (
        <>
            <Card className={classes.root}>
                <Grid container alignItems="center">
                    <Grid item xs={1} md={1} sm={1}>
                        <CardMedia
                            //image={data.image}
                            image={`http://localhost:5000/images/${data.image}`}
                            title="Post image"
                            className={classes.media}
                        />
                    </Grid>
                    <Grid item xs={7} md={7} sm={7}>
                        <Box className={classes.container}>
                            <Box className={classes.wrapperTitle}>
                                <Box className={classes.column}>
                                    <Typography
                                        variant="h5"
                                        color="secondary"
                                        className={classes.postTitle}
                                    >
                                        {data.name}
                                    </Typography>
                                </Box>
                                <Box className={classes.column}>
                                    <Typography
                                        variant="h5"
                                        color="secondary"
                                        className={classes.postTitle}
                                    >
                                       {data.author.firstName} {data.author.lastName}
                                    </Typography>
                                </Box>
                                <Box className={classes.column}>
                                    <Typography
                                        variant="h5"
                                        color="secondary"
                                        className={classes.postTitle}
                                    >
                                        {moment(data.createdAt).format("MMMM Do YY, h a")}
                                    </Typography>
                                </Box>
                                <Box className={classes.column}>
                                    <Typography
                                        variant="h5"
                                        color="secondary"
                                        className={classes.postTitle}
                                    >
                                        {moment(data.updatedAt).format("MMMM Do YY, h a")}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4} sm={4}>
                        <Grid container direction="row-reverse">
                            <Grid item>
                                <Button>
                                    <DeleteIcon onClick={handleOpen} />
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button onClick={handleOpenEdit}>
                                    <EditIcon />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
            <div>
                <Modal open={openDel} onClose={handleClose}>
                    <div style={modalStyle} className={classes.paper}>
                        <DeleteModal id={data._id} close={handleClose}/>
                    </div>
                </Modal>
                <Modal open={openEdit} onClose={handleCloseEdit}>
                    <div style={modalStyle} className={classes.paper}>
                        <EditModal id={data._id} close={handleCloseEdit} />
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default LayoutCard
