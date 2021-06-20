import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import Box from '@material-ui/core/Box'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: 'max-content',
        alignItems: 'center',
        background: 'inherit',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        padding: '.3rem 1rem',
    },
    username: {
        textDecoration: 'none',
    },
}))

const UserCard = ({ small, firstname, lastname, date, categoryData }) => {
    const classes = useStyles()

    const author = () => {
        return categoryData && categoryData.author
            ? `${categoryData.author.firstName} ${categoryData.author.lastName}`
            : `${firstname} ${lastname}`
    }

    const dateCreated = () => {
        return new Date(categoryData.createdAt).toLocaleDateString('en-gb', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
    }

    return (
        <Card className={classes.root} elevation={0}
        component={Link}
            to={`/public-profile/${categoryData && categoryData.author._id}`}
            style={{textDecoration: 'none'}}
        >
            <AccountCircleOutlinedIcon
                style={small ? { fontSize: 30 } : { fontSize: 50 }}
            />
            <div className={classes.details}>
                <Box className={classes.cardContent}>
                    <Typography
                        
                        variant="h5"
                        className={classes.username}
                    >
                        {author()}
                    </Typography>

                    <Typography variant="subtitle2" color="textSecondary">
                        {categoryData ? dateCreated() : date}
                    </Typography>
                </Box>
            </div>
        </Card>
    )
}

export default UserCard
