import React, { useEffect, useState } from 'react'
import MainNews from './MainNews'
import UserCard from './UserCard'
import { axiosInstance as axios } from '../../util/axios-instance'

const News = () => {
    const [mainNews, setMainNews] = useState()

    useEffect(() => {
        const main = async () => {
            const { data } = await axios.get('/post/getMainPost')
            setMainNews(data.mainPost)
        }

        main()
    }, [])

    const dateCreated = () => {
        const dejt = new Date(mainNews.createdAt).toLocaleDateString('en-gb', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
        return dejt
    }

    const author = () => {
        return mainNews && mainNews.author ? (
            <UserCard
                categoryData={mainNews}
                firstname={mainNews.author.firstName}
                lastname={mainNews.author.lastName}
                date={dateCreated()}
            />
        ) : null
    }
    return <MainNews auth={author()} mainNews={mainNews} />
}

export default News
