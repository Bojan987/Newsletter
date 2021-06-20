import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { FormattedMessage } from 'react-intl'

import NavUl from './NavUl'
import CategoryList from './CategoryList'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    mobile: {
        display: 'flex',
        flexDirection: 'column',
        placeContent: 'center center',
    },
}))

export default function SimpleAccordion({ handleDrawer }) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>
                        <FormattedMessage
                            id="accordion.links"
                            default="default text"
                        />
                    </Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.mobile}>
                    <div className="nav-vertical">
                        <NavUl isMobile handleDrawer={handleDrawer} />
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>
                        <FormattedMessage
                            id="accordion.categories"
                            default="default text"
                        />
                    </Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.mobile}>
                    <div className="nav-vertical-categories">
                        <CategoryList isMobile handleDrawer={handleDrawer} />
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}
