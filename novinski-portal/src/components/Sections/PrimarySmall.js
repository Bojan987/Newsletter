import React, { useState, useEffect } from 'react'
import { axiosInstance as axios } from '../../util/axios-instance'
import { makeStyles } from '@material-ui/core/styles'
import {Grid,Typography,Divider} from '@material-ui/core'
import SmallList from '../Cards/SmallList'
import PrimaryBigOne from '../Cards/PrimaryBigOne'
import CategoryBtn from '../FormsUI/Button/CategoryBtn'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: '2rem',
    },
    infoTitle: {
        fontWeight: 700,
        fontSize: '1rem',
        textTransform: 'uppercase',
        marginBottom: '2rem',
    },
    Allbtn: {
        marginTop: '1rem',
        marginLeft: 'auto',
    },

}))

export default function PrimarySmall({ categoryId, categoryName }) {
    const classes = useStyles()
    const [posts, setPosts] = useState([])

    // const fourPosts = () => {
    //     return posts
    //         .sort(() => Math.random() - 0.5)
    //         .slice(0, 4)
    //         .map((item) => <PrimarySmall post={item} key={item.id} />)
    // }

    useEffect(() => {
        const postList = async () => {
            const { data } = await axios.get(
                '/post/getPrimaryPosts/' + categoryId
            )
            setPosts(data.primaryPosts)
        }

        postList()
    }, [categoryId])

    const firstPost = posts[0]

    const fourPosts = () => {
        return posts.slice(2, 6).map((item) => (
            <Grid item xs={12} sm={12} md={12} key={item._id}>
                <SmallList postsmall={item} id={item._id}/>
            </Grid>
        ))
    }

    return (
        <div className={classes.root}>
            <Divider light />
            <Typography className={classes.infoTitle} color="primary">
                {categoryName}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={8} className={classes.root}>
                    <PrimaryBigOne categoryData={firstPost} />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <Grid container spacing={1}>
                        {fourPosts()}
                        <Grid item className={classes.Allbtn}>
                        <CategoryBtn categoryName={categoryName} categoryId={categoryId}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
