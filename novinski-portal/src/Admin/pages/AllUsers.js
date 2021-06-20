import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Grid,
    FormControl,
    NativeSelect,
} from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import { Pagination, PaginationItem } from '@material-ui/lab'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useHistory } from 'react-router-dom'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import DeleteModal from '../../components/ModalDelete'
import CircularProgress from '@material-ui/core/CircularProgress'

import { axiosAuth } from '../../util/axios-instance'

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '3rem',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    control: {
        padding: theme.spacing(2),
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
    link: {
        textDecoration: 'none',
        color: '#909090',
        cursor: 'pointer',
    },
    button_add: {
        fontSize: '3rem',
        marginRight: '3rem',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        borderRadius: '5px',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
        borderRadius: '10px',
        height: '150px',
        display: 'flex',
        flexDirection: 'column',
        placeContent: 'center flex-start',
    },
    btns: {
        display: 'flex',
        placeContent: 'center space-between',
        paddingTop: '2.5rem',
    },
    loaderWrapper: {
        minHeight: '20vh',
        minWidth: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}))

export default function AllUsers() {
    const classes = useStyles()
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down(960))
    const small = useMediaQuery(theme.breakpoints.down(650))

    const history = useHistory()

    const [loading, setLoading] = useState(false)
    const [numberOfUsers, setNumberOfUsers] = useState(0)
    const [users, setUsers] = useState([])
    const [userDeleted, setUserDeleted] = useState(0)

    const [page, setPage] = useState(1)
    const [roleSort, setRoleSort] = useState('all')
    const [sortBy, setSortBy] = useState('latest')
    const limit = 8

    useEffect(() => {
        fetchUsers()
        //eslint-disable-next-line
    }, [page, roleSort, sortBy, userDeleted])

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const res = await axiosAuth.get('/user/users', {
                params: {
                    role: roleSort,
                    sort: sortBy,
                    page,
                    limit,
                },
            })
            if (res.status === 200) {
                setUsers(res.data.usersPaginated)
                setNumberOfUsers(res.data.numberOfUsers)
                setLoading(false)
            }
        } catch (err) {
            setLoading(true)
        }
    }

    const handlePaginationChange = (event, value) => {
        setPage(value)
    }

    //TODO set up value in english
    const handleRoleSort = (event) => {
        setRoleSort(event.target.value)
    }
    const handleSort = (event) => {
        setSortBy(event.target.value)
    }

    const handleUserDeleted = (event) => {
        setUserDeleted(event)
    }

    return (
        <Grid
            container
            direction="column"
            xs={12}
            spacing={2}
            className={classes.root}
        >
            <Grid item xs={12}>
                <Grid container justify={matches ? 'center' : 'flex-start'}>
                    <Typography
                        variant="h3"
                        className={classes.title}
                        color="primary"
                    >
                        <FormattedMessage
                            id="admin.users"
                            default="default text"
                        />
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid
                    container
                    justify={matches ? 'center' : 'flex-end'}
                    alignItems="center"
                    wrap="nowrap"
                    spacing={1}
                >
                    <Grid item>
                        <Typography variant="body1">
                            <FormattedMessage
                                id="admin.users.role"
                                default="default text"
                            />
                        </Typography>
                    </Grid>

                    <Grid item>
                        <FormControl className={classes.formControl}>
                            <NativeSelect
                                value={roleSort}
                                onChange={handleRoleSort}
                                name="sort"
                            >
                                <option value="all">All</option>
                                <option value="admin">Admin</option>
                                <option value="manager">Manager</option>
                                <option value="journalist">Journalist</option>
                                <option value="visitor">Visitor</option>
                                {/* <FormattedMessage
                                    id="admin.users.role.admin"
                                    default="default text"
                                    tagName="option"
                                />
                                <FormattedMessage
                                    id="admin.users.role.manager"
                                    default="default text"
                                    tagName="option"
                                />
                                <FormattedMessage
                                    id="admin.users.role.journalist"
                                    default="default text"
                                    tagName="option"
                                />

                                <FormattedMessage
                                    id="admin.users.role.basic"
                                    default="default text"
                                    tagName="option"
                                /> */}
                            </NativeSelect>
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <Typography variant="body1">
                            <FormattedMessage
                                id="admin.users.sort"
                                default="default text"
                            />
                        </Typography>
                    </Grid>

                    <Grid item>
                        <FormControl className={classes.formControl}>
                            <NativeSelect
                                value={sortBy}
                                onChange={handleSort}
                                name="sort"
                            >
                                <option value="latest">Latest</option>
                                <option value="oldest">Oldest</option>
                                {/* <FormattedMessage
                                    id="sort.newest"
                                    default="default text"
                                    tagName="option"
                                />
                                <FormattedMessage
                                    id="sort.oldest"
                                    default="default text"
                                    tagName="option"
                                /> */}
                            </NativeSelect>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>

            {/*     ~~~ TABLE ~~~~ */}
            {loading ? (
                <div className={classes.loaderWrapper}>
                    <CircularProgress />
                </div>
            ) : (
                <>
                    <Grid item xs={12}>
                        <TableContainer
                            component={Paper}
                            className={classes.no_border}
                        >
                            <Table
                                aria-label="simple table"
                                size={matches ? 'small' : 'medium'}
                                padding={small ? 'none' : 'default'}
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">
                                            <Typography
                                                variant="h6"
                                                color="primary"
                                            >
                                                <FormattedMessage
                                                    id="admin.users.name"
                                                    default="default text"
                                                />
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography
                                                variant="h6"
                                                color="primary"
                                            >
                                                <FormattedMessage
                                                    id="admin.users.role"
                                                    default="default text"
                                                />
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography
                                                variant="h6"
                                                color="primary"
                                            >
                                                <FormattedMessage
                                                    id="admin.users.position"
                                                    default="default text"
                                                />
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography
                                                variant="h6"
                                                color="primary"
                                            >
                                                <FormattedMessage
                                                    id="admin.users.status"
                                                    default="default text"
                                                />
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography
                                                variant="h6"
                                                color="primary"
                                            >
                                                <FormattedMessage
                                                    id="admin.users.login"
                                                    default="default text"
                                                />
                                            </Typography>
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user._id}>
                                            <TableCell
                                                component="th"
                                                align="left"
                                            >
                                                <div
                                                    className={
                                                        classes.inner_name
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            classes.align_center
                                                        }
                                                    >
                                                        {`${user.firstName} ${user.lastName}`}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell align="left">
                                                {user.role}
                                            </TableCell>
                                            <TableCell align="left">
                                                {user.position}
                                            </TableCell>
                                            <TableCell align="left">
                                                {user.accountStatus}
                                            </TableCell>
                                            <TableCell align="left">
                                                {user.lastLogin}
                                            </TableCell>
                                            <TableCell></TableCell>
                                            <TableCell align="right">
                                                <div className={classes.icons}>
                                                    <AccountCircleOutlinedIcon
                                                        className={classes.link}
                                                        onClick={() => {
                                                            history.push(
                                                                `/users/${user._id}`
                                                            )
                                                        }}
                                                    />
                                                    <EditOutlinedIcon
                                                        className={classes.link}
                                                        onClick={() => {
                                                            history.push(
                                                                `/edit-user/${user._id}`
                                                            )
                                                        }}
                                                    />
                                                    <DeleteModal
                                                        className={classes.link}
                                                        id={user._id}
                                                        handleUserDeleted={
                                                            handleUserDeleted
                                                        }
                                                    />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                    <Grid container xs={12} justify="center" align="center">
                        <Pagination
                            color="secondary"
                            variant="outlined"
                            shape="rounded"
                            count={Math.ceil(numberOfUsers / limit)}
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
                    <Grid container xs={12} justify="flex-end" align="center">
                        <Link to="/create-user" className={classes.link}>
                            <AddCircleIcon
                                className={classes.button_add}
                                fontSize="large"
                            />
                        </Link>
                    </Grid>
                </>
            )}
        </Grid>
    )
}
