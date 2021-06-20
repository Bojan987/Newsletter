import React, { useState } from 'react'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/core/styles'
import AppContext from '../../../context/AppContext'
import {useHistory} from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        '@media(max-width: 767px)': {
            margin: '10px auto 20px auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '@media(max-width: 767px)': {
            display: 'none',
        },
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        paddingLeft: `calc(10px + ${theme.spacing(3)}px)`,
        transition: theme.transitions.create('width'),
        height: '10px',
        width: '10ch',
        border: '2px solid  #cccccc',
        borderRadius: 2,
        '@media(max-width: 767px)': {
            width: '12ch',
            margin: '0 auto',
        },
        '@media(max-width: 400px)': {
            width: '8ch',
        },
    },
}))

const HeaderSearch = ({ check, windowWidth }) => {
    const ctx = React.useContext(AppContext)
    const classes = useStyles()
    const history = useHistory()
    const [search,setSearch] = useState('')

    const handleChange = (e)=>{
       setSearch(e.target.value)
       
    } 

    const handleEnter = (e)=>{
        
        if(e.key ==='Enter') {
            ctx.searchPosts = search.trim()
            history.push('/search-page')
        }
    }
    const searchCheck = ctx.authHeader
        ? 'none'
        : windowWidth < 768
        ? 'none'
        : 'block'

    return (
        <div
            className={classes.search}
            id="search-input"
            style={{
                display: check ? searchCheck : 'block',
            }}
        >
            <div className={classes.searchIcon}>
                <SearchIcon style={{ padding: '0', color: '#909090' }} />
            </div>
            <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                size="small"
                value = {search}
                onChange={handleChange}
                onKeyUp={handleEnter}
            />
        </div>
    )
}

export default HeaderSearch
