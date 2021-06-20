import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import SocialLinks from '../SocialLinks'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
        maxWidth: 580,
        border: '1px solid #ccc',
        height: 280,
        '@media(max-width:600px)': { 
            height: 'unset'
        },
        '@media(max-width:500px)': { 
            height: 'auto'
        },
    },
    media: {
        minHeight: 300,
        height: 'auto',
        minWidth: 200,
        '@media(min-width:1250px)': { 
            // minWidth: 200,
            // minHeight: 300
        },
        '@media(max-width:600px)': { 
            minWidth: 'unset',
            width: '100%'
        },
    },
    area: {
        display: 'flex',
        '@media(max-width:600px)': {
            flexDirection: 'column',
        },
    },
    title: {
        fontFamily: "'Bitter', serif",
        fontWeight: 800,
        color: '#231F20',
        padding: '0 15px 0 15px',
        textDecoration: 'none'
    },
    role: {
        color: '#909090',
        fontSize: 17,
        fontFamily: "'Abel', sans-serif",
        padding: '0 15px 0 15px',
        textDecoration: 'none'
    },
    text: {
        color: '#909090',
        fontFamily: "'Abel', sans-serif",
        padding: '8px 15px 0 15px',
        textDecoration: 'none'
    },
    content: {
        '@media(max-width:600px)': {
            height: 420
        },
        '@media(max-width:550px)': {
            height: 500
        },
        '@media(max-width:500px)': {
            height: 'unset'
        },
    },
    links: {
        padding: '10px 3px',
        height: 60,
        textDecoration: 'none'
    },
})

export default function AboutCard({ name, role, description }) {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardActionArea className={classes.area}>
                <CardMedia
                    className={classes.media}
                    image="/images/post_image.png"
                    title="Contemplative Reptile"
                />
                <CardContent className={classes.content}>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className={classes.title}
                    >
                        {name}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        className={classes.role}
                    >
                        {role}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        className={classes.text}
                    >
                        {description}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        className={classes.text}
                    >
                        Omiljene oblasti: Politika, Svet, Tehnologija
                    </Typography>
                    <div className={classes.links}>
                        <SocialLinks />
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
