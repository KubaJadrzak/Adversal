import React from "react"
import { useState } from "react"
import { styled } from '@mui/material/styles'
import { Card, Button, TextField, Avatar, Box } from '@mui/material'
import { deleteUserImage } from "../../api/userApi"
import './UserForm.css'

function UserForm({buttonMessage, data, handleSubmit}) {
    const [name, setName] = useState(data.name)
    const [email, setEmail] = useState(data.email)
    const [image, setImage] = useState(data.image || '')
    const [newImage, setNewImage] = useState('')

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      })

    const handleDeleteImage = async () => {
        deleteUserImage(data.id)
        setImage('')
        setNewImage('')
    }
    const handleDeleteNewImage = () => {
        setNewImage('')
    }

    return (
        <Card className='user-form-cart'>
            <form className="user-form" onSubmit={(e) => {
                e.preventDefault()
                handleSubmit({name, email, newImage})}}>
                {(newImage == 0 && image == '') &&
                <Box className='user-form-avatar-container'>
                    <Avatar className='user-form-avatar' src={"http://localhost:3000" + image}/>
                </Box>
                }
                {(newImage != 0 && image == '') &&
                    <Box className='user-form-avatar-container'>
                        <Avatar className='user-form-avatar' src={URL.createObjectURL(newImage)}/>
                        <Button className="user-form-button" variant='contained' onClick={handleDeleteNewImage}>Delete Image</Button>
                    </Box>
                }
                {(newImage == 0 && image != '') &&
                    <Box className='user-form-avatar-container'>
                        <Avatar className='user-form-avatar' src={"http://localhost:3000" + image}/>
                        <Button className="user-form-button" variant='contained' onClick={handleDeleteImage}>Delete Image</Button>
                    </Box>
                }
                {(newImage != 0 && image!= '') &&
                    <Box className='user-form-avatar-container'>
                        <Avatar className='user-form-avatar' src={URL.createObjectURL(newImage)}/>
                        <Button className="user-form-button" variant='contained' onClick={handleDeleteImage}>Delete Image</Button>
                    </Box>
                }
                <Button component="label" variant="contained" className="user-form-button" >
                    Upload Image
                    <VisuallyHiddenInput type="file" onChange={e => setNewImage(e.target.files[0])}/>
                </Button>
                <TextField
                    required
                    className="user-form-element"
                    id="name"
                    label="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                ></TextField>
                <TextField
                    required
                    className="user-form-element"
                    id="email"
                    label="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                >
                </TextField>
                <Button className="user-form-button" variant="contained" type="submit">{buttonMessage}</Button>
            </form>
        </Card>
    )
}

export default UserForm