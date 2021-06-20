import React from 'react'

export default React.createContext({
    clickedPost: {},
    setClickedPost: (
        title,
        category,
        author,
        published,
        views,
        comments,
        content
    ) => {},
    authors: [],
    setAuthors: (authors) => {},
    categories: [],
    setcategories: (categories) => {},
    modalOpen: false,
    setModalOpen: (open) => {},
    posts: [],
    setPosts: (posts) => {},
    authHeader: false,
    handleAuthHeader: () => {},
    deleteId: "",
    setDeleteId: (id) => {},
    token: null,
    user: {},
    login: () => {},
    logout: () => {},
    notification: '',
    setNotification: () => {},
})
