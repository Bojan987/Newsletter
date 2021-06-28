import React, { useState, useEffect, useContext } from 'react'
import CategoryCard from '../components/Cards/Category/CategoryCard'
import CategoryHeader from '../components/Cards/Category/CategoryHeader'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { FormControl, NativeSelect, Grid, Fab } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import { Pagination, PaginationItem } from '@material-ui/lab'
import Button from '@material-ui/core/Button'

import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'

import { Link } from 'react-router-dom'

import AppContext from '../../context/AppContext'
import Modal from '../../components/Modal'

import { deleteHook } from '../util/delete-hook'
import { axiosAuth as axios } from '../../util/axios-instance'

import styled from 'styled-components'

const ExitButton = styled(Button)`
    margin: 0 7px 0 0;
    background-color: #909090;
    color: white;
    &:hover {
        color: white;
        background-color: #909090;
    }
`
const SaveButton = styled(Button)`
    margin: 0 0 0 7px;
    background-color: #231f20;
    color: white;
    &:hover {
        color: white;
        background-color: #231f20;
    }
`

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    control: {
        padding: theme.spacing(2),
    },
    table: {
        // minWidth: 650,
        minWidth: 'min-content',
    },
    title: {
        fontWeight: 'bold',
    },
    inner_name: {
        display: 'flex',
        placeContent: 'center space-evenly',
    },
    no_border: {
        border: 'none ',
        boxShadow: 'none',
        width: '100%',
    },
    align_center: {
        alignSelf: 'center',
    },
    margin_right: {
        marginRight: '0.5rem',
        fontSize: '2.5rem',
    },
    icons: {
        display: 'flex',
        placeContent: 'center space-evenly',
    },
    pagination_item: {
        borderRadius: 5,
    },
    item_on_click: {
        color: 'white',
        backgroundColor: 'white',
    },
    selectOp: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 10,
        padding: '1rem 0',
    },
    form: {
        marginLeft: 5,
        marginRight: 30,
    },
    paginationMargin: {
        marginTop: '2rem',
    },
    fab: {
        display: 'flex',
        justifyContent: 'flex-end',
        textDecoration: 'none',
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        fontFamily: "'Abel', sans-serif",
    },
    link: {
        textDecoration: 'none',
        color: '#909090',
        cursor: 'pointer',
    },
}))

const Categories = () => {
    const classes = useStyles()
    // eslint-disable-next-line
    const [maxPost, setMaxPosts] = useState(0)
    const [category, setCategory] = useState([])
    const [page, setPage] = useState(1)
    const [sortBy, setSortBy] = useState('Najnovije')
    const [limit, setLimit] = useState(5)

    const context = useContext(AppContext)
    const { getModalStyle } = deleteHook()
    const [modalStyle] = React.useState(getModalStyle)

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const { data } = await axios.get('/category/getcategorys', {
                    params: {
                        page: page,
                        sort: sortBy,
                        limit: limit,
                    },
                })
                setCategory(data.categorys)
            } catch (error) {
                console.log(error)
            }
        }

        fetchCategory()
    }, [page, limit, sortBy])

    

    useEffect(() => {
        let componentMounted = true;
        const maxPosts = async () => {
            try {
            const { data } = await axios.get('/category/getcategorys')
            if(componentMounted) {
                setMaxPosts(data.categorys)
              }
            
        } catch (error) {
            console.log(error)
        }
        }

        maxPosts()
        return () => {
            componentMounted = false;
           }
    }, [])

    const handlePaginationChange = (event, value) => {
        setPage(value)
    }
    const handleChange = (event) => {
        setLimit(event.target.value)
    }

    const handleSort = (event) => {
        setSortBy(event.target.value)
    }

    const deleteCategory = async (id) => {
        try {
            const response = await axios.delete('/category/deleteCategory', {
                data: {
                    id: id,
                },
            })
            console.log(response)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const deleteCategoryBody = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">
                Da li ste sigurni da želite da obrišete kategoriju?
            </h2>
            <ExitButton
                onClick={() => {
                    context.setModalOpen(false)
                }}
            >
                Ne
            </ExitButton>
            <SaveButton onClick={() => deleteCategory(context.deleteId)}>
                Da
            </SaveButton>
        </div>
    )

    return (
        <div>
            <Box>
                <Typography variant="h2" color="primary">
                    Kategorije
                </Typography>
            </Box>
            <Box className={classes.selectOp}>
                <Typography>Prikazi</Typography>
                <FormControl className={classes.form}>
                    <NativeSelect value={limit} onChange={handleChange}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                    </NativeSelect>
                </FormControl>

                <Typography>Sortiraj</Typography>
                <FormControl className={classes.form}>
                    <NativeSelect
                        value={sortBy}
                        onChange={handleSort}
                        name="sort"
                    >
                        <FormattedMessage
                            id="sort.newest"
                            default="default text"
                            tagName="option"
                        />

                        <option value="latest">Najnovije</option>
                        <option value="byvalue">Prikazi</option>
                    </NativeSelect>
                </FormControl>
            </Box>

            <CategoryHeader />
            {category &&
                category.map((item, i) => <CategoryCard key={i} data={item} />)}

            <Grid
                container
                justify="center"
                spacing={2}
                className={classes.paginationMargin}
            >
                <Grid item>
                    <Pagination
                        color="secondary"
                        variant="outlined"
                        shape="rounded"
                        count={Math.ceil(8 / limit)}
                        page={page}
                        defaultPage={page}
                        onChange={handlePaginationChange}
                        renderItem={(item) => (
                            <PaginationItem
                                {...item}
                                className={classes.pagination_item}
                                color="primary"
                            />
                        )}
                    />
                </Grid>
            </Grid>
            <div className={classes.fab}>
                <Link to={'/create-category'}>
                    <Fab color="secondary">
                        <AddIcon />
                    </Fab>
                </Link>
            </div>
            <Modal body={deleteCategoryBody} />
        </div>
    )
}

export default Categories
