import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PrimarySmall from '../Cards/PrimarySmall'
import PrimaryBigOne from '../Cards/PrimaryBigOne'
import PrimaryBigTwo from '../Cards/PrimaryBigTwo'
import { Divider, Typography, Grid } from '@material-ui/core'

import CategoryBtn from '../FormsUI/Button/CategoryBtn'

import { axiosInstance as axios } from '../../util/axios-instance'

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    infoTitle: {
        fontWeight: 700,
        fontSize: '1rem',
        textTransform: 'uppercase',
    },
    infoTitle2: {
        fontWeight: 700,
        fontSize: '1rem',
        textTransform: 'uppercase',
        
    },
    bigWrapper: {
        padding: '2rem 0',
    },
    Title1: {
        marginTop: '7rem',
        marginBottom: '2rem',
    },
    Title2: {
        marginBottom: '1rem',
        marginTop: '15rem',
        padding: '1rem',
    },
    leanrmorebtn: {
        [theme.breakpoints.down('sm')]: {
            marginTop: '2rem',
        },
    },
    fourCards: {
        [theme.breakpoints.down('sm')]: {
            marginTop: '2rem',
        },
    },
    btnbox: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '1rem'
    },
}))

const PrimaryBig = ({
    onlyPrimary,
    categoryPrimary,
    isCategoryPrimary,
    categoryId,
    categoryName,
}) => {
    const classes = useStyles()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const postList = async () => {
            const { data } = await axios.get(
                '/post/getPrimaryPosts/' + categoryId
            )
            setPosts(data.primaryPosts)
        }

        postList()
    }, [categoryId])

    const fourPosts = () => {
        return posts
            .sort(() => Math.random() - 0.5)
            .slice(2, 6)
            .map((item) => (
                <Grid item xs={12} sm={6} md={3} key={item._id}>
                    <PrimarySmall post={item} id={item._id}/>
                </Grid>
            ))
    }

    const firstPost = posts[0]
    

    const secondPost = posts[1]

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Divider light />
                <Typography className={classes.infoTitle} color="primary">
                    {categoryName}
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Grid container className={classes.container} spacing={3}>
                    <Grid item xs={12} md={8} className={classes.root}>
                        <PrimaryBigOne categoryData={firstPost} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PrimaryBigTwo categoryData={secondPost} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container spacing={2}>
                    {fourPosts()}
                </Grid>
            </Grid>

            <Grid item xs={12}>
            <CategoryBtn categoryName={categoryName} categoryId={categoryId}/>
            </Grid>
        </Grid>
    )
}

export default PrimaryBig
