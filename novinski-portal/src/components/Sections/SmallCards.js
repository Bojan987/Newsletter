import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid,Typography,Divider } from '@material-ui/core'
import PrimarySmall from '../Cards/PrimarySmall'
import ExchangeRate from '../Cards/ExchangeRate'
import { axiosInstance as axios } from '../../util/axios-instance'
import CategoryBtn from '../FormsUI/Button/CategoryBtn'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    infoTitle: {
        fontWeight: 700,
        fontSize: '1rem',
        textTransform: 'uppercase',
        marginBottom: '2rem',
    },
   
}))

export default function SmallCards({ categoryId, categoryName }) {
    const classes = useStyles()
    const [posts, setPosts] = useState([])
    const [currencytable, setCurrencyTable] = useState([])

    const fourPosts = () => {
        return posts
            .sort(() => Math.random() - 0.5)
            .slice(0, 6)
            .map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item._id}>
                    <PrimarySmall post={item} id={item._id}/>
                </Grid>
            ))
    }

    useEffect(() => {
        const postList = async () => {
            const { data } = await axios.get(
                '/post/getPrimaryPosts/' + categoryId
            )
            setPosts(data.primaryPosts)
        }

        postList()
    }, [categoryId])

    useEffect(() => {
        const currency = async () => {
            const { data } = await axios.get('/currencyRates')
            setCurrencyTable(data.currency)
        }
        currency()
    }, [])

    return (
        <div className={classes.root}>
            <Divider light />
            <Typography className={classes.infoTitle} color="primary">
                {categoryName}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs="auto" md={8} lg={8}>
                    <Grid container spacing={2}>
                        {fourPosts()}
                        </Grid>
                        <CategoryBtn categoryName={categoryName} categoryId={categoryId}/>
                    
                </Grid>

                <Grid item xs={12} md={4} lg={4}>
                    <Grid container>
                        <Grid item xs={12}>
                            <ExchangeRate rates={currencytable} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
