import React, { useEffect, useState } from 'react'
import BoardCat from '../components/Cards/StatsBoard/BoardCat'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { axiosAuth as axios } from '../../util/axios-instance'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
}))

const Statistics = () => {
    const classes = useStyles()
    const [stats, setStats] = useState([])

    useEffect(()=> {
        const statistics = async() => {
            const {data} = await axios.get('/stats')
            setStats(data.CATEGORY_STATS)
        }
        statistics()
    },[])

    console.log(stats)

    return (
        <>
            <Box>
                <Typography variant="h2" color="primary">
                    STATISTIKA
                </Typography>
            </Box>
            <Box className={classes.container}>
                {/* <Board title="Korisnici" data={Korisnici} />
                <Board title="Objave" data={Objave} /> */}
                <BoardCat title="Kategorije" data={stats} />
                {/* <Board title="komentari" data={Komentari} /> */}
            </Box>
        </>
    )
}

export default Statistics
