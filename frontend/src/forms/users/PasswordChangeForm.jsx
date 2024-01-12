import React from "react"
import { useState } from "react"
import { Card, Button, TextField } from '@mui/material'
import { changePassword } from "../../api/authApi"
import './UserForm.css'

function PasswordChangeForm() {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('')

    const handleSubmit = async () => {
        try {
            // Check if newPassword and newPasswordConfirmation match
            if (newPassword !== newPasswordConfirmation) {
                // Handle mismatch error
                console.error('New password and confirmation do not match');
                return;
            }

            // Make a request to change the password
            await changePassword({
                current_password: currentPassword,
                password: newPassword,
                password_confirmation: newPasswordConfirmation,
            });

            // Optionally, you can reset the form or show a success message
        } catch (error) {
            // Handle errors (e.g., show an error message to the user)
            console.error('Error changing password:', error);
        }
    };


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