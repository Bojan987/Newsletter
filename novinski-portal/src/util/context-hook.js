// eslint-disable-next-line
import { useState } from 'react'

export const useCtx = () => {
    const [clickedPost, setClickedPost] = useState({
        title: '',
        category: '',
        author: '',
        published: '',
        views: '',
        comments: '',
        content: '',
    })
    const [authors, setAuthors] = useState([])
    const [categories, setCategories] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [posts, setPosts] = useState([])
    const [deleteId, setDeleteId] = useState("")

    const setClickedPostHandler = (
        title,
        category,
        author,
        published,
        views,
        comments,
        content
    ) => {
        setClickedPost({
            title: title,
            category: category,
            author: author,
            published: published,
            views: views,
            comments: comments,
            content: content,
        })
    }

    const setAuthorsHandler = (authors) => {
        setAuthors(authors)
    }
    const setCategoriessHandler = (categories) => {
        setCategories(categories)
    }
    const setModalOpenHandler = (open) => {
        setModalOpen(open)
    }
    const setPostsHandler = (posts) => {
        setPosts(posts)
    }
    const setDeleteIdHandler = (id) => {
        setDeleteId(id)
    }

    return {
        clickedPost,
        authors,
        categories,
        modalOpen,
        posts,
        deleteId,
        setClickedPostHandler,
        setAuthorsHandler,
        setCategoriessHandler,
        setModalOpenHandler,
        setPostsHandler,
        setDeleteIdHandler
    }
}
