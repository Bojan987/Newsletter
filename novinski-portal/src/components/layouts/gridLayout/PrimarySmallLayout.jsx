import { Grid } from '@material-ui/core'
import React from 'react'
import PrimarySmall from '../../Cards/PrimarySmall'

const PrimarySmallLayout = ({ data, profile,handleDelete,publicProfile }) => {
    return (
        <Grid container spacing={5}>
            {data.map((el, idx) => {
                return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                        <PrimarySmall post={el} profile={profile} id={el._id} handleDelete={handleDelete} publicProfile={publicProfile}/>
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default PrimarySmallLayout
