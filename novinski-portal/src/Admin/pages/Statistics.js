import React, { useEffect, useState } from 'react'
import BoardCat from '../components/Cards/StatsBoard/BoardCat'
import BoardCom from '../components/Cards/StatsBoard/BoardCom'
import BoardPosts from '../components/Cards/StatsBoard/BoardPost'
import BoardUsers from '../components/Cards/StatsBoard/BoardUsers'
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
    console.log(stats)
    useEffect(() => {
        let componentMounted = true;
        const statistics = async () => {
            const { data } = await axios.get('/stats')
            if(componentMounted) {
                setStats(data)
              }
            
        }
        statistics()
        return () => {
            componentMounted = false;
           }
    }, [])

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
                <BoardUsers title="Korisnici" data={stats.USER_STATS}/>
                <BoardPosts title="Objave" data={stats.POST_STATS}/>
                <BoardCat title="Kategorije" data={stats.CATEGORY_STATS} />
                <BoardCom title="Komentari" data={stats.COMMENT_STATS} />
            </Box>
        </>
    )
}

export default Statistics
