import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {Grid,Typography,Divider} from '@material-ui/core'
import SmallList from '../Cards/SmallList'
import { axiosInstance as axios } from '../../util/axios-instance'
import CategoryBtn from '../FormsUI/Button/CategoryBtn'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: '1rem'
    },
    infoTitle: {
        fontWeight: 700,
        fontSize: '1rem',
        textTransform: 'uppercase',
        marginBottom: '2rem',
    },

    Allbtn: {
        textAlign: 'right',
    },
  
}))

export default function SmallLine({ categoryName, categoryId }) {
    const classes = useStyles()

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await axios.get(
                '/post/getPrimaryPosts/60b411d80ef8be60e6d4517e'
            )
            setPosts(data.primaryPosts)
        }
        fetchPosts()
    }, [])

    //const filtering = posts.filter(item => item.main === true).slice(0,4)

    const filterMain = () => {
        return posts
            .filter((item) => item.main === true)
            .slice(0, 4)
            .map((item) => (
                <Grid item xs={12} sm={12} md={6} lg={6} key={item._id}>
                    <SmallList postsmall={item} id={item._id}/>
                </Grid>
            ))
    }

    // const fetchPrimaryPosts = async () => {
    //     const res = await axios.get(`post/getPrimaryPosts/${id}`)
    //     console.log(res.data)
    //     setMain(res.data.primaryPosts[0])
    //     setPrimary(res.data.primaryPosts.slice(1, 3))
    // }

    return (
        <div className={classes.root}>
            <Divider light />
            <Typography className={classes.infoTitle} color="primary">
                {categoryName}
            </Typography>

            <Grid container spacing={2}>
                <Grid container spacing={3}>
                    {filterMain()}
                    <Grid item xs={12} sm={12} md={12}>
                    <CategoryBtn categoryName={categoryName} categoryId={categoryId}/>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
