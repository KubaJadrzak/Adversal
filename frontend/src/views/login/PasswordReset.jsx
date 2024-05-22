import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { resetPassword } from '../../api/authApi'
import { Box, TextField, Button } from '@mui/material'
import useAlert from '../../components/alerts/useAlert'
import Adversal from '../../assets/adversal-yellow.png'
import './Login.css'

function PasswordReset() {
  const { setAlert } = useAlert()
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const navigate = useNavigate()

  function extractTokenFromURL() {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get('reset_token')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== passwordConfirmation) {
      console.error('Passwords do not match')
      return
    }

    const resetToken = extractTokenFromURL()

    if (!resetToken) {
      console.error('Reset token not found')
      return
    }

    try {
      await resetPassword({
        user: {
          reset_password_token: resetToken,
          password: password,
          password_confirmation: passwordConfirmation,
        },
      })
      navigate('/login')
      setAlert('Password reset successfully!', 'success')
    } catch (error) {
      console.error('Error resetting password:', error)
      setAlert('Error resetting password!', 'error')
    }
  }

  return (
    <Box className='login-container'>
      <form className='login-form' onSubmit={handleSubmit}>
        <img src={Adversal} alt='logo' className='login-logo' />
        <TextField
          required
          className='login-form-element'
          id='password'
          label='New Password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        ></TextField>
        <TextField
          required
          className='login-form-element'
          id='confirm password'
          label='Confirm New Password'
          type='password'
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        ></TextField>
        <Button
          className='login-form-button'
          variant='outlined'
          color='secondary'
          type='button'
          onClick={() => {
            navigate(`/login`)
          }}
        >
          Back to login
        </Button>
        <Button className='login-form-button' variant='contained' type='submit'>
          Change Password
        </Button>
      </form>
    </Box>
  )
}

export default PasswordReset
