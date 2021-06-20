import React from 'react'

export const useHeaderHook = () => {
    const [authHeader, setAuthHeader] = React.useState(false)

    const useHandleAuthHeader = (bool) => {
        React.useEffect(() => {
            setAuthHeader(bool)
        }, [bool])
    }

    return { authHeader, useHandleAuthHeader }
}
