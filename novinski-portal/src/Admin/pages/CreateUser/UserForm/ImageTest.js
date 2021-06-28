import React from 'react'
import { axiosAuth as axios } from '../../../../util/axios-instance'

const ImageTest = () => {
    const [file, setFile] = React.useState(null)
    const [key, setKey] = React.useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('image', file)

        axios
            .post('/images/uploadImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((data) => {
                console.log(data)
                setKey(data.data.imageKey)
            })
    }

    const handleRemove = () => {
        axios
            .post(`/images/${key}`, {
                userId: '60bde39b75145a8eada9074f',
                modelName: 'user',
            })
            .then((data) => {
                console.log(data)
                setKey('')
            })
    }

    const handleSelectFile = (e) => {
        const file = e.target.files[0]
        setFile(file)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleSelectFile}
                    type="file"
                    accept="image/*"
                ></input>
                <button type="submit">SUBMIT</button>
            </form>
            {key.length > 0 && (
                <div key={key} onClick={handleRemove}>
                    <img
                        src={`http://localhost:5000/images/${key}`}
                        alt="Fetch from S3"
                    />
                </div>
            )}
        </div>
    )
}

export default ImageTest
