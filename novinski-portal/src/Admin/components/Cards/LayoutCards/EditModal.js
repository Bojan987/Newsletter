import React, { useState, useRef} from 'react'
import { Grid, Button, Typography, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import spimg from '../../../../images/no_image.png'
import { axiosAuth as axios} from '../../../../util/axios-instance'


const useStyles = makeStyles({
    // btn:{
    //     padding: '4px auto'
    // }
})

const EditModal = ({ close, id }) => {
    const classes = useStyles()
    const fileInputRef = useRef(null)
    const [layoutName, setLayoutName] = useState('')
    const [image, setImage] = useState({ preview: '', raw: '' })
    //const [uploaded, setUploaded] = useState(false)

    const handleLayoutName = (e) => {
        setLayoutName(e.target.value)
    }

    const ImageLoad = (e) => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0],
            })
        }
    }

    const handleClick = (event) => {
        fileInputRef.current.click()
    }

    const handleUpload = async (e) => { 
        const formData = new FormData()
        formData.append('image', image.raw)
       const response = await axios.post(`/images/uploadImage`, formData) //key

       console.log(response)
        await axios.put(`/layout/editLayout/${id}`, {
                image: response.data.imageKey,
                name: layoutName
        })
        close()
    }



    return (
        <Grid container spacing={4}>
            <Grid item xs={6}>
                <Grid container spacing={4}>
                    <Grid item xs>
                        <Typography variant="h4" color="primary">
                            Izmena layout-a
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            placeholder="Naziv"
                            margin="normal"
                            inputProps={{ minLength: 5 }}
                            value={layoutName}
                            onChange={handleLayoutName}
                        />
                    </Grid>
                    <Grid item>
                        <input
                            ref={fileInputRef}
                            onChange={ImageLoad}
                            type="file"
                            style={{ display: 'none' }}
                            // multiple={false}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClick}
                        >
                            Upload
                        </Button>
                        <Typography>Preporucena velicina 256x256px</Typography>
                    </Grid>

                    <Grid item>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    className={classes.btn}
                                    onClick={close}
                                >
                                    Odustani
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    color="primary"
                                    className={classes.btn}
                                    disabled={!image.preview && !layoutName}
                                   onClick={handleUpload}
                                >
                                    Izmeni
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <img
                    src={image.preview ? image.preview : spimg}
                    alt="bla"
                    style={{ width: '100%' }}
                />
            </Grid>
        </Grid>
    )
}

export default EditModal
