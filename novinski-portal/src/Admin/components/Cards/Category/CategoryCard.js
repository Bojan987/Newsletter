import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import moment from 'moment'

import AppContext from '../../../../context/AppContext'

const useStyles = makeStyles({
    root: {
        width: '100%',

        borderRadius: '10px',
        padding: '1rem 1rem',
        marginTop: 10,
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
        marginLeft: 'auto',
    },
    container: {
        maxWidth: 800,
    },
    link: {
        textDecoration: 'none',
        color: '#231F20',
        cursor: 'pointer',
    },
})

const CategoryCard = ({ data }) => {
    const classes = useStyles()
    const context = useContext(AppContext)

    const deleteCategory = (id) => {
        context.setDeleteId(id)
        context.setModalOpen(true)
    }

    return (
        <Card className={classes.root}>
            <Grid container>
                <Grid item xs={8} md={8} sm={8}>
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
                                    {data.author.firstName}{' '}
                                    {data.author.lastName}
                                </Typography>
                            </Box>
                            <Box className={classes.column}>
                                <Typography
                                    variant="h5"
                                    color="secondary"
                                    className={classes.postTitle}
                                >
                                    {moment(data.createdAt).format(
                                        'MMMM Do YY, h a'
                                    )}
                                </Typography>
                            </Box>
                            <Box className={classes.column}>
                                <Typography
                                    variant="h5"
                                    color="secondary"
                                    className={classes.postTitle}
                                >
                                    {moment(data.updatedAt).format(
                                        'MMMM Do YY, h a'
                                    )}
                                </Typography>
                            </Box>
                            <Box className={classes.column}>
                                <Typography
                                    variant="h5"
                                    color="secondary"
                                    className={classes.postTitle}
                                >
                                    35
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={4} md={4} sm={12}>
                    <Grid container>
                        <DeleteIcon
                            className={classes.icons}
                            onClick={() => deleteCategory(data._id)}
                        />
                        <Link to={`/edit-category/${data._id}`} >
                            <EditIcon className={classes.link}/>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    )
}

export default CategoryCard
