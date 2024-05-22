import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { resetPasswordRequest } from '../../api/authApi'
import { Box, TextField, Button } from '@mui/material'
import useAlert from '../../components/alerts/useAlert'
import Adversal from '../../assets/adversal-yellow.png'
import './Login.css'

function PasswordResetRequest() {
  const { setAlert } = useAlert()
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await resetPasswordRequest({
        user: {
          email: email,
        },
      })

      navigate('/login/email')
      setAlert('Password reset request sent!', 'success')
    } catch (error) {
      console.error('Password reset error:', error)
      setAlert('Password reset request failed!', 'error')
    }
  }

  return (
    <Box className='login-container'>
      <img src={Adversal} alt='logo' className='login-logo' />
      <form className='login-form' onSubmit={handleSubmit}>
        <TextField
          required
          className='login-form-element'
          id='Email'
          label='Email'
          onChange={(e) => setEmail(e.target.value)}
        ></TextField>
        <Button
          className='login-form-button'
          variant='outlined'
          color='secondary'
          onClick={() => {
            navigate(`/login`)
          }}
        >
          Back to login
        </Button>
        <Button className='login-form-button' variant='contained' type='submit'>
          Reset Password
        </Button>
      </form>
    </Box>
  )
}

export default PasswordResetRequest
