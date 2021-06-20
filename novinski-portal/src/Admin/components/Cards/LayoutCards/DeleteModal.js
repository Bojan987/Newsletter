import React,{useEffect} from 'react'
import {Grid, Button, Typography} from '@material-ui/core'
import {axiosAuth as axios} from '../../../../util/axios-instance' 

const DeleteModal = ({id,close}) => {

    useEffect(()=>{
       
    },[])

    

    const handleLayoutDelete = async () => {
        try {
            await axios.delete(`layout/deleteLayout/${id}`)
            close()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Grid container spacing={4} >
                <Grid item xs={12}>
                    <Typography variant="h4" color="primary">
                        Brisanje layout-a
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        Da li ste sigurni da zelite da obrisete ovaj layout
                    </Typography>
                    <Typography>Ova Akcija se ne moze vratiti</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={3} alignItems='center'>
                        <Grid item xs={6}>
                        <Button  variant="outlined" fullWidth onClick={close}>Odustani</Button>
                        </Grid>
                        <Grid item xs={6}>
                        <Button variant="contained" color='primary' fullWidth onClick={handleLayoutDelete}> Obrisi </Button>
                        </Grid>
                    </Grid>
                    
                    
                </Grid>
            </Grid>
    )
}

export default DeleteModal
