import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {Grid,Typography, Divider} from '@material-ui/core'
import SmallListAuthor from '../Cards/SmallListAuthor'
import PrimarySmall from '../Cards/PrimarySmall'
import Latest from '../Cards/Latest'
import CategoryBtn from '../FormsUI/Button/CategoryBtn'
import { axiosInstance as axios } from '../../util/axios-instance'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: '2rem',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    gridScroll: {
        overflowY: 'scroll',
        maxHeight: 530,
    },
    infoTitle: {
        fontWeight: 700,
        fontSize: '1rem',
        textTransform: 'uppercase',
        marginBottom: '2rem',
    },
}))

export default function SmallandScroll({ categoryId, categoryName }) {
    const classes = useStyles()
    const [posts, setPosts] = useState([])
    const [allposts, setAllPosts] = useState([])

   
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
            .slice(0, 4)
            .map((item) => <PrimarySmall post={item} key={item._id} id={item._id} />)
    }

    useEffect(() => {
        const postall = async () => {
            const { data } = await axios.get('/post/getPosts/')
            setAllPosts(data.postsPaginated)
        }

        postall()
    }, [categoryId])

    const filtered =
        allposts &&
        allposts.filter((item) => {
            return item.category.name === categoryName
        })

    const mainPosts = () => {
        return posts
            .filter((item) => item.main === true && item.main === true)
            .slice(0, 5)
            .map((item) => (
                <Grid item xs={12} key={item._id}>
                    <SmallListAuthor categoryData={item} id={item._id}/>
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
                <Grid item xs={12} sm={12} md={3} className={classes.gridScroll}>
                    {fourPosts()}
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <Grid container spacing={1}>
                       {mainPosts()}
                    </Grid>
                    <CategoryBtn categoryName={categoryName} categoryId={categoryId}/>
                </Grid>
                <Grid item xs={12} sm={12} md={5}>
                    <Latest categoryPosts={filtered} />
                </Grid>
            </Grid>
        </div>
    )
}
