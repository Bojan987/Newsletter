import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

import { LangContext } from '../intl/IntlWrapper'

import './LanguageBox.css'

const useStyles = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 50,
        '@media(max-width: 767px)': {
            minWidth: 75,
        },
    },
}))

export default function ControlledOpenSelect() {
    const classes = useStyles()
    const langctx = React.useContext(LangContext)
    const [open, setOpen] = React.useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <div>
            <FormControl
                className={classes.formControl}
                size="small"
                margin="none"
                id="lang-select"
            >
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={langctx.locale}
                    onChange={langctx.changeLangHandler}
                    defaultValue={langctx.locale}
                    IconComponent={KeyboardArrowDownIcon}
                    style={{ color: '#909090' }}
                >
                    <MenuItem value="en-US">ENG</MenuItem>
                    <MenuItem value="sr-RS">SRB</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}
