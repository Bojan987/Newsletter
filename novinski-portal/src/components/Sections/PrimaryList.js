import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {Grid, Typography,Divider} from '@material-ui/core'
import PrimaryBigOne from '../Cards/PrimaryBigOne'
import SmallListAuthor from '../Cards/SmallListAuthor'
import { axiosInstance as axios } from '../../util/axios-instance'
import CategoryBtn from '../FormsUI/Button/CategoryBtn'

const useStyles = makeStyles((theme) => ({
    root: {
        
    },
    infoTitle: {
        fontWeight: 700,
        fontSize: '1rem',
        textTransform: 'uppercase',
        marginBottom: '1rem',
    },
    Allbtn: {
        textAlign: 'right',
    },
}))

export default function PrimaryList({ categoryName, categoryId }) {
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

    const mainPosts = posts.filter(
        (item) => item.main === true
    )
        
    return (
        <Grid item xs={12} md={6} className={classes.root}>
            <Divider light />
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography className={classes.infoTitle} color="primary">
                        {categoryName}
                    </Typography>
                    <PrimaryBigOne categoryData={mainPosts[0]} />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <SmallListAuthor categoryData={mainPosts[1]} />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <SmallListAuthor categoryData={mainPosts[2]} />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                <CategoryBtn categoryName={categoryName} categoryId={categoryId}/>
                </Grid>
            </Grid>
        </Grid>
    )
}
