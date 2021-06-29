import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Box, List, ListItem } from '@material-ui/core'
import Draggable from 'react-draggable'

const useStyles = makeStyles((theme) => ({
    BoardWrap: {
        width: 300,
        textAlign: 'center',
        border: '1px solid #F2F2F2',
        borderRadius: '10px',
        margin: '1rem',
        cursor: 'grab',
    },
    nested: {
        paddingLeft: theme.spacing(7),
        display: 'flex',
        justifyContent: 'space-between',
    },
    listitemwrap: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    paper: {
        borderRadius: 20,
    },
    title: {
        padding: '1rem',
        background: '#231F20',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        color: 'white',
    },
}))

const BoardUsers = ({ title, data }) => {
    const classes = useStyles()

    return (
        <Draggable>
            <Box className={classes.BoardWrap}>
                <Typography
                    variant="h5"
                    color="secondary"
                    className={classes.title}
                >
                    {title}
                </Typography>

                <Box>
                    <List className={classes.root}>
                        <div>
                            <ListItem className={classes.listitemwrap}>
                                <Typography variant="h5">Ukupno:</Typography>
                                {data && data.total ? data.total : null}
                            </ListItem>
                            <ListItem className={classes.listitemwrap}>
                                <Typography variant="h5">Blokirani:</Typography>
                                {data && data.status ? data.status[0].count : null}
                            </ListItem>
                            <ListItem className={classes.listitemwrap}>
                                <Typography variant="h5">Neaktivni:</Typography>
                                {data && data.status ? data.status[1].count : null}
                            </ListItem>
                            <ListItem className={classes.listitemwrap}>
                                <Typography variant="h5">Aktivni:</Typography>
                                {data && data.status ? data.status[2].count : null}
                            </ListItem>
                            <ListItem className={classes.listitemwrap}>
                                <Typography variant="h5">Deaktivirani:</Typography>
                                {data && data.status ? data.status[3].count : null}
                            </ListItem>
                            <ListItem className={classes.listitemwrap}>
                                <Typography variant="h5">Obrisani:</Typography>
                                {data && data.status ? data.status[4].count : null}
                            </ListItem>
                            

                            
                            <ListItem className={classes.listitemwrap}>
                                <Typography variant="h5">
                                    Registrovani:
                                </Typography>
                            </ListItem>

                            <List component="div" disablePadding>
                                <ListItem className={classes.nested}>
                                    <Typography variant="h5">Danas:</Typography>
                                    {data && data.registered.today}
                                </ListItem>
                                <ListItem className={classes.nested}>
                                    <Typography variant="h5">Ove nedelje</Typography>
                                    {data && data.registered.thisWeek}
                                </ListItem>
                                <ListItem className={classes.nested}>
                                    <Typography variant="h5">Ovog meseca</Typography>
                                    {data && data.registered.thisMonth}
                                </ListItem>
                                <ListItem className={classes.nested}>
                                    <Typography variant="h5">Ove godine</Typography>
                                    {data && data.registered.thisYear}
                                </ListItem>
                            </List>
                        </div>
                    </List>
                </Box>
            </Box>
        </Draggable>
    )
}

export default BoardUsers