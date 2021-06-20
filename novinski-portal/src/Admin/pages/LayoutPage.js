import React, { useEffect, useState } from 'react'
import LayoutCard from '../components/Cards/LayoutCards/LayoutCard'
import LayoutHeader from '../components/Cards/LayoutCards/LayoutHeader'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { FormControl, NativeSelect,Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { FormattedMessage } from 'react-intl'
import { makeStyles } from '@material-ui/core/styles'
import { axiosAuth as axios} from '../../util/axios-instance'


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
        marginTop: '2rem'
    },
    paper: {
        position: 'absolute',
        width: 600,
        backgroundColor: theme.palette.background.paper,

        boxShadow: theme.shadows[5],
        padding: '3rem'
    },
}))

const LayoutPage = () => {
    const classes = useStyles()
    const [sortBy, setSortBy] = useState('najnovije')
    // const [openDel, setOpenDel] = useState(false)
    // const [openEdit, setOpenEdit] = useState(false)
    // const [modalStyle] = useState(getModalStyle)
    const [layout, setLayout] = useState([])

    useEffect(() => {
        const layoutList = async() => {
            const {data} = await axios.get('layout/getLayouts/',{
                params: {
                    sort: sortBy
                }
            })
            setLayout(data.layouts)
        }
        layoutList()
    }, [sortBy])

    

    console.log(layout)

    const handleSort = (event) => {
        setSortBy(event.target.value)
    }


    const LayoutCardList = () => {
        return layout.map((item) => (
            <LayoutCard key={item._id} data={item}/>
        ))
    }
  
    return (
        <div>
            <Box>
                <Typography variant="h2" color="primary">
                    LAYOUTS
                </Typography>
            </Box>
            <Box className={classes.selectOp}>
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

                        <option value="updated">Najcitanije</option>
                    </NativeSelect>
                </FormControl>
            </Box>
            <LayoutHeader />
            {layout && LayoutCardList()}
            
            <div className={classes.fab}>
                <Fab color="secondary">
                    <AddIcon />
                </Fab>
            </div>
        </div>
    )
}

export default LayoutPage
