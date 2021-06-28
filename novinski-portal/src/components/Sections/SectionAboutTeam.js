import React from 'react'
import AboutCard from '../Cards/AboutCard'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
//import { Link } from 'react-router-dom'

const useStyles = makeStyles({
    root: {
        margin: '60px 0',
    },
    item: {
        padding: '20px 10px',
        flexBasis: 'unset',
        margin: 'auto',
        '@media(max-width:500px)': {
            maxWidth: '70%',
        },
        '@media(max-width:400px)': {
            maxWidth: '100%',
        },
    },
})

const SectionAboutTeam = ({ team }) => {
    const classes = useStyles()
    return (
        <Grid container className={classes.root} justify="space-between">
            {team.map((user) => {
                return (
                    <Grid
                        key={user._id}
                        item
                        xl={6}
                        xs={6}
                        lg={6}
                        sm={12}
                        className={classes.item}
                    >
                        {/* <Link to={``} style={{textDecoration: 'none'}}> */}
                        <AboutCard
                            name={`${user.firstName} ${user.lastName}`}
                            role={user.position}
                            description={user.description}
                        />
                        {/* </Link> */}
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default SectionAboutTeam
