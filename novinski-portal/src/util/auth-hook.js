import { useState, useCallback } from 'react'

export const useAuth = () => {
    const [token, setToken] = useState('')
    const [user, setUser] = useState({})

    const login = useCallback((token, user) => {
        setToken(token)
        setUser(user)
    }, [])

    const logout = useCallback(() => {
        setToken('')
        setUser({})
    }, [])

    return { token, user, login, logout }
}
