import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'


const useStyles = makeStyles({
    root: {
        width: '100%',
        boxShadow: 'none',
        border: 'none',
        padding: '1rem 0rem',
    },
    wrapper: {
        display: 'flex',
    },
    column: {
        flex: '1 0 100px',
        paddingLeft: 10,
    },
    container: {
        maxWidth: 800,
    },
})

const CategoryHeader = () => {
    const classes = useStyles()
    return (
        <Card className={classes.root} elevetion={0}>
            <Grid container>
                <Grid item md={1} sm={1}>
                    <Typography></Typography>
                </Grid>
                <Grid item md={7} sm={7}>
                    <Box className={classes.container}>
                        <Box className={classes.wrapper}>
                            <Box className={classes.column}>
                                <Typography
                                    variant="h5"
                                    color="secondary"
                                    className={classes.postTitle}
                                >
                                    Naziv
                                </Typography>
                            </Box>
                            <Box className={classes.column}>
                                <Typography
                                    variant="h5"
                                    color="secondary"
                                    className={classes.postTitle}
                                >
                                    Autor
                                </Typography>
                            </Box>
                            <Box className={classes.column}>
                                <Typography
                                    variant="h5"
                                    color="secondary"
                                    className={classes.postTitle}
                                >
                                    Kreirano
                                </Typography>
                            </Box>
                            <Box className={classes.column}>
                                <Typography
                                    variant="h5"
                                    color="secondary"
                                    className={classes.postTitle}
                                >
                                    Poslednja izmena
                                </Typography>
                            </Box>
                            
                        </Box>
                    </Box>
                </Grid>
                <Grid item md={4} sm={12}></Grid>
            </Grid>
        </Card>
    )
}

export default CategoryHeader
