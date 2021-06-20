import React from 'react'
import AppContext from './context/AppContext'
import { useCtx } from './util/context-hook'
import { useHeaderHook } from './util/header-hook'
import { useAuth } from './util/auth-hook'

import Container from '@material-ui/core/Container'
import Content from './Content'

function App() {
    const {
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
    } = useCtx()
    const { authHeader, useHandleAuthHeader } = useHeaderHook()
    const { token, user, login, logout } = useAuth()

    return (
        <Container maxWidth="lg">
            <AppContext.Provider
                value={{
                    clickedPost: clickedPost,
                    setClickedPost: (
                        title,
                        category,
                        author,
                        published,
                        views,
                        comments,
                        content
                    ) =>
                        setClickedPostHandler(
                            title,
                            category,
                            author,
                            published,
                            views,
                            comments,
                            content
                        ),
                    authors: authors,
                    setAuthors: (authors) => setAuthorsHandler(authors),
                    categories: categories,
                    setCategories: (categories) =>
                        setCategoriessHandler(categories),
                    modalOpen: modalOpen,
                    setModalOpen: (open) => setModalOpenHandler(open),
                    posts: posts,
                    setPosts: (posts) => setPostsHandler(posts),
                    authHeader: authHeader,
                    handleAuthHeader: useHandleAuthHeader,
                    deleteId: deleteId,
                    setDeleteId: (id) => setDeleteIdHandler(id),
                    token: token,
                    user: user,
                    login: login,
                    logout: logout,
                }}
            >
                <Content />
            </AppContext.Provider>
        </Container>
    )
}
export default App
