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
                handleSubmit()}}>
                <TextField
                    required
                    className="user-form-element"
                    id="current password"
                    label="Current Password"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                ></TextField>
                <TextField
                    required
                    className="user-form-element"
                    id="new password"
                    label="New Password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                ></TextField>
                <TextField
                    required
                    className="user-form-element"
                    id="new password confirmation"
                    label="New Password Confirmation"
                    value={newPasswordConfirmation}
                    onChange={e => setNewPasswordConfirmation(e.target.value)}
                >
                </TextField>
                <Button variant="contained" type="submit">CHANGE PASSWORD</Button>
            </form>
        </Card>
    )
}

export default PasswordChangeForm