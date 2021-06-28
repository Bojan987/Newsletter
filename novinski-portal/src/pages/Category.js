import { React, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import { FormControl, Typography, Grid, NativeSelect } from '@material-ui/core'
import { Pagination, PaginationItem } from '@material-ui/lab'
import { FormattedMessage } from 'react-intl'
import { axiosInstance as axios } from '../util/axios-instance'

import Title from '../components/Cards/Title'
import MainNews from '../components/Cards/MainNews'
import PrimarySingleCategory from '../components/Sections/PrimarySingleCategory'
import PrimarySmallLayout from '../components/layouts/gridLayout/PrimarySmallLayout'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    sort_wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: '2rem 0',
    },
    margin_top: {
        marginTop: '2rem',
    },
    pagination_item: {
        borderRadius: 5,
    },
    loaderWrapper: {
        minHeight: '20vh',
        minWidth: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}))

const Category = () => {
    const classes = useStyles()
    const { id, name } = useParams()

    const [loading, setLoading] = useState(false)
    const [main, setMain] = useState({})
    const [primary, setPrimary] = useState([])
    const [posts, setPosts] = useState([])
    const [numberOfPosts, setNumberOfPosts] = useState(0)
    const [sort, setSort] = useState('latest')
    const [page, setPage] = useState(1)
    const [showPrimary, setShowPrimary] = useState(true)

    const limit = 12

    useEffect(() => {
        fetchPosts()
        //eslint-disable-next-line
    }, [page, sort, name])

    useEffect(() => {
        fetchPrimaryPosts()
        //eslint-disable-next-line
    }, [name])

    const fetchPrimaryPosts = async () => {
        setLoading(true)
        setPage(1)
        try {
            const res = await axios.get(`post/getPrimaryPosts/${id}`)
            console.log(res.data, 'primary')

            if (res.status === 200) {
                if (res.data.numOfPrimaryPosts !== 0) {
                    setMain(res.data.primaryPosts[0])
                    setPrimary(res.data.primaryPosts.slice(1, 3))
                    setShowPrimary(true)
                    setLoading(false)
                } else {
                    setShowPrimary(false)
                }
            }
        } catch (err) {
            setLoading(true)
        }
    }

    const fetchPosts = async () => {
        const latest = sort === 'latest' ? 'latest' : ''
        const visitsCounter = sort === 'visitsCounter' ? 'visitsCounter' : ''

        setLoading(true)

        try {
            const res = await axios.get('/post/getPosts', {
                params: {
                    category: id,
                    page,
                    limit,
                    latest,
                    visitsCounter,
                },
            })
            console.log(res.data)
            if (res.status === 200) {
                if (res.data.numberOfPosts !== 0) {
                    setPosts(res.data.postsPaginated)
                    setNumberOfPosts(res.data.numberOfPosts)
                    setLoading(false)
                } else {
                    setPosts(res.data.postsPaginated)
                    setNumberOfPosts(res.data.numberOfPosts)
                    setShowPrimary(false)
                }
            } else {
                setLoading(true)
            }
        } catch (err) {
            setLoading(true)
        }
    }

    const handleChange = (event) => {
        setSort(event.target.value)
    }

    const handlePaginationChange = (event, value) => {
        setPage(value)
        setShowPrimary(value > 1 ? false : true)
    }

    return (
        <div>
            <Title title={name} />
            {loading ? (
                <div className={classes.loaderWrapper}>
                    <CircularProgress />
                </div>
            ) : (
                <>
                    {showPrimary && (
                        <>
                            <MainNews
                                categoryMain={main}
                                isCategoryMain={true}
                            />
                            <PrimarySingleCategory data={primary} name={name} />
                        </>
                    )}

                    {numberOfPosts && (
                        <div className={classes.sort_wrapper}>
                            <Typography variant="caption">
                                <FormattedMessage
                                    id="sort.sortBy"
                                    default="default text"
                                />
                            </Typography>

                            <div>
                                <FormControl className={classes.formControl}>
                                    <NativeSelect
                                        value={sort}
                                        onChange={handleChange}
                                        name="sort"
                                    >
                                        <FormattedMessage
                                            id="sort.newest"
                                            default="default text"
                                        >
                                            {(message) => (
                                                <option value="latest">
                                                    {message}
                                                </option>
                                            )}
                                        </FormattedMessage>
                                        <FormattedMessage
                                            id="sort.views"
                                            default="default text"
                                        >
                                            {(message) => (
                                                <option value="visitsCounter">
                                                    {message}
                                                </option>
                                            )}
                                        </FormattedMessage>
                                    </NativeSelect>
                                </FormControl>
                            </div>
                        </div>
                    )}
                    <PrimarySmallLayout data={posts} />
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        className={classes.margin_top}
                    >
                        <Pagination
                            color="secondary"
                            variant="outlined"
                            shape="rounded"
                            count={Math.ceil(numberOfPosts / limit)}
                            page={page}
                            defaultPage={1}
                            onChange={handlePaginationChange}
                            renderItem={(item) => (
                                <PaginationItem
                                    {...item}
                                    className={classes.pagination_item}
                                />
                            )}
                        />
                    </Grid>
                </>
            )}
        </div>
    )
}

export default Category
