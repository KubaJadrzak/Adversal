import React from "react"
import { useState } from "react"
import { styled } from '@mui/material/styles'
import { Card, Button, TextField, Avatar } from '@mui/material'
import './UserForm.css'

function UserForm({buttonMessage, data, handleSubmit}) {
    const [name, setName] = useState(data.name)
    const [email, setEmail] = useState(data.email)
    const [image, setImage] = useState('')

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

    return (
        <Card className='user-form-cart'>
            <form className="user-form" onSubmit={(e) => {
                e.preventDefault()
                handleSubmit({name, email, image})}}>
                {image == 0 ?
                <Avatar className='form-avatar' src={"http://localhost:3000" + data.image}/>:
                <Avatar className='form-avatar' src={URL.createObjectURL(image)}/>
                }
                <Button component="label" variant="contained" className='product-form-upload'>
                    Upload Image
                    <VisuallyHiddenInput type="file" onChange={e => setImage(e.target.files[0])}/>
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
                <Button variant="contained" type="submit">{buttonMessage}</Button>
            </form>
        </Card>
    )
}

export default UserForm