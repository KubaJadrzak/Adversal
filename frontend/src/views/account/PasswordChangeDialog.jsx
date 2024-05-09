import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, Box, Button, TextField } from '@mui/material'
import { changePassword } from '../../api/authApi'
import useAlert from '../../components/alerts/useAlert'
import './PasswordChangeDialog.css' // Import CSS for custom styling

function PasswordChangeDialog({ open, onClose, updateUser, loadData }) {
  const { setAlert } = useAlert()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (newPassword !== newPasswordConfirmation) {
      setError('New password and confirmation do not match')
      return
    }

    try {
      await changePassword({
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: newPasswordConfirmation,
      })
      setAlert('Password updated successfully!', 'success')
      onClose() // Close the dialog after successful password change
      loadData() // Refresh user data after password change
    } catch (error) {
      console.error('Error changing password:', error)
      setAlert('Failed to update password!', 'error')
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            margin='dense'
            label='Current Password'
            type='password'
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            required
            fullWidth
            margin='dense'
            label='New Password'
            type='password'
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value)
              setError('')
            }}
          />
          <TextField
            required
            fullWidth
            margin='dense'
            label='New Password Confirmation'
            type='password'
            value={newPasswordConfirmation}
            onChange={(e) => {
              setNewPasswordConfirmation(e.target.value)
              setError('')
            }}
            error={Boolean(error)}
            helperText={error}
          />
          <Box className='dialog-actions'>
            {/* Apply custom class for styling */}
            <Button onClick={onClose} variant='contained'>
              Cancel
            </Button>
            <Button variant='outlined' color='secondary' type='submit'>
              Change Password
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default PasswordChangeDialog
