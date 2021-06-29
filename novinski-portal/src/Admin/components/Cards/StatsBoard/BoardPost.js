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

const BoardPosts = ({ title, data }) => {
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
                                <Typography variant="h5">
                                    Kategorije:
                                </Typography>
                            </ListItem>

                            <List component="div" disablePadding>
                                {data &&
                                    data.overview &&
                                    data.overview.byCateg.map((child, i) => (
                                        <ListItem
                                            key={i}
                                            className={classes.nested}
                                        >
                                            <Typography variant="h5">
                                                {child[0]}:
                                            </Typography>
                                            {child[1]}
                                        </ListItem>
                                    ))}
                            </List>
                            <ListItem className={classes.listitemwrap}>
                                <Typography variant="h5">
                                    Objavljeno:
                                </Typography>
                            </ListItem>

                            <List component="div" disablePadding>
                                <ListItem className={classes.nested}>
                                    <Typography variant="h5">Danas:</Typography>
                                    {data && data.published.today}
                                </ListItem>
                                <ListItem className={classes.nested}>
                                    <Typography variant="h5">Ove nedelje</Typography>
                                    {data && data.published.thisWeek}
                                </ListItem>
                                <ListItem className={classes.nested}>
                                    <Typography variant="h5">Ovog meseca</Typography>
                                    {data && data.published.thisMonth}
                                </ListItem>
                                <ListItem className={classes.nested}>
                                    <Typography variant="h5">Ove godine</Typography>
                                    {data && data.published.thisYear}
                                </ListItem>
                            </List>
                        </div>
                    </List>
                </Box>
            </Box>
        </Draggable>
    )
}

export default BoardPosts
