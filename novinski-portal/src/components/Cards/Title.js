import React from 'react'
import Typography from '@material-ui/core/Typography'
import { FormattedMessage } from 'react-intl'
import './Title.css'

const Title = ({ title }) => {
    return (
        <div className="title-holder">
            <Typography variant="h1">
                {/* {title} */}
                <FormattedMessage id={title} default="default text" />
            </Typography>
        </div>
    )
}

export default Title
