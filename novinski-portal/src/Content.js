import React, { useEffect } from 'react'
//import AppContext from "./context/AppContext";
import Main from './components/layouts/Main'
import HeaderToolbar from './components/layouts/Header/HeaderToolbar'
import Footer from './components/layouts/Footer'
import SideBar from './Admin/Layout/SideBar'
import { useHistory } from 'react-router'

const Content = () => {
    // const ctx = React.useContext(AppContext)
    const role = localStorage.getItem('role')
    const history = useHistory()

    useEffect(() => {
        const unlisten = history.listen(() => {
            if (localStorage.getItem('expiresAt')) {
                const date = new Date()
                const expires = new Date(localStorage.getItem('expiresAt'))

                if (date > expires) localStorage.clear()
            }
        })

        return () => {
            history.push('/')
            unlisten()
        }
    }, [history])
    return (
        <>
            {role === 'admin' ? (
                <>
                    <SideBar />
                </>
            ) : (
                <>
                    <HeaderToolbar />
                    <Main />
                    <Footer />
                </>
            )}
        </>
    )
}

export default Content
