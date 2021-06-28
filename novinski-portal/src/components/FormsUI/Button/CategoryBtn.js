import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Button, Typography } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'

const useStyles = makeStyles((theme) => ({
    btnbox: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '1rem',
    },
}))

const CategoryBtn = ({ categoryName, categoryId }) => {
    const classes = useStyles()
    return (
        <Box className={classes.btnbox}>
            <Button
                component={Link}
                to={`/category/${categoryName}/${categoryId}`}
            >
                <Typography>
                    <FormattedMessage id="button.loadmore" default="default text" />
                </Typography>
            </Button>
        </Box>
    )
}

export default CategoryBtn
