// eslint-disable-next-line
/* import React, { useContext } from 'react'
import styled from 'styled-components'
import AppContext from '../../context/AppContext'
import Button from '@material-ui/core/Button' */

export const deleteHook = () => {
    function rand() {
        return Math.round(Math.random() * 20) - 10
    }

    function getModalStyle() {
        const top = 50 + rand()
        const left = 50 + rand()

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        }
    }

    return {
        rand,
        getModalStyle,
    }
}
