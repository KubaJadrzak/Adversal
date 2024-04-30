import React from 'react'
import { useState } from 'react'
import { Card, Button, TextField } from '@mui/material'
import { changePassword } from '../../api/authApi'
import { useNavigate } from 'react-router-dom'
import './UserForm.css'
import useAlert from '../../components/alerts/useAlert'

function PasswordChangeForm() {
  const navigate = useNavigate()
  const { setAlert } = useAlert()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (newPassword !== newPasswordConfirmation) {
        console.error('New password and confirmation do not match')
        return
      }

      await changePassword({
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: newPasswordConfirmation,
      })
      navigate(`/account/profile`)
      setAlert('Password updated successfully!', 'success')
    } catch (error) {
      console.error('Error changing password:', error)
      setAlert('Failed to update password!', 'error')
    }
  }

  return (
    <Card className='user-form-cart'>
      <form className='user-form' onSubmit={handleSubmit}>
        <TextField
          required
          className='user-form-element'
          id='current password'
          label='Current Password'
          type='password'
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        ></TextField>
        <TextField
          required
          className='user-form-element'
          id='new password'
          label='New Password'
          type='password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        ></TextField>
        <TextField
          required
          className='user-form-element'
          id='new password confirmation'
          label='New Password Confirmation'
          type='password'
          value={newPasswordConfirmation}
          onChange={(e) => setNewPasswordConfirmation(e.target.value)}
        ></TextField>
        <Button variant='contained' type='submit'>
          CHANGE PASSWORD
        </Button>
      </form>
    </Card>
  )
}

export default PasswordChangeForm
