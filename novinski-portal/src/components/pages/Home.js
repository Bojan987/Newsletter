import React, { useEffect, useState } from 'react'
import News from '../Cards/MainNewsHome'
import PrimaryBig from '../Sections/PrimaryBig'
import AppContext from '../../context/AppContext'
import PrimarySmall from '../Sections/PrimarySmall'
import SmallandScroll from '../Sections/SmallandScroll'
import SmallCards from '../Sections/SmallCards'
import PrimaryList from '../Sections/PrimaryList'
import SmallLine from '../Sections/SmallLine'
import { axiosInstance as axios } from '../../util/axios-instance'
import Grid from '@material-ui/core/Grid'

const Home = () => {
    const ctx = React.useContext(AppContext)
    const [order, setOrder] = useState()

    ctx.handleAuthHeader(false)

    useEffect(() => {
        const homeorder = async () => {
            const { data } = await axios.get('/category/gethomecategory')
            setOrder(data.homeCategories)
        }
        homeorder()
    }, [])

    const components = {
        '60b411d80ef8be60e6d45174': PrimaryBig,
        '60b411d80ef8be60e6d45175': SmallandScroll,
        '60b411d80ef8be60e6d45176': PrimarySmall,
        '60b411d80ef8be60e6d45177': SmallCards,
        '60b411d80ef8be60e6d45178': PrimaryList,
        '60b411d80ef8be60e6d45179': SmallLine,
    }

    const homeLayout = () => {
        return order
            .sort((a, b) => a.homeOrder - b.homeOrder)
            .map((home) => {
                const TagName = components[home.layout._id]
                return (
                    <TagName
                        categoryId={home._id}
                        categoryName={home.name}
                        key={home.homeOrder}
                    />
                )
            })
    }
    //const Conm = components[orderBy[0].layout.name]

    return (
        <>  
           
            <Grid container spacing={2}>
            <News />
                {order && homeLayout()}
                </Grid>
        </>
    )
}

export default Home
