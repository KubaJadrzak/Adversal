import React from "react"
import { useState } from "react"
import { styled } from '@mui/material/styles'
import { Card, Button, TextField, Avatar, Box } from '@mui/material'
import { deleteUserImage } from "../../api/userApi"
import './UserForm.css'

function PasswordChangeForm() {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('')


    return (
        <Card className='user-form-cart'>
            <form className="user-form" onSubmit={(e) => {
                e.preventDefault()
                handleSubmit({name, email, newImage})}}>
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