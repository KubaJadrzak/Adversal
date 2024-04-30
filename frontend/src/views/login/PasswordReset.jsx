import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { resetPasswordRequest } from '../../api/authApi'
import { Box, Card, TextField, Button, Link } from '@mui/material'
import './PasswordReset.css'
import useAlert from '../../components/alerts/useAlert'

function PasswordReset() {
  const { setAlert } = useAlert()
  const [login, setLogin] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await resetPasswordRequest({
        user: {
          email: login,
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
    <Card className='login-reset-card'>
      <form className='login-reset-form' onSubmit={handleSubmit}>
        <TextField
          required
          className='login-reset-form-element'
          id='Email'
          label='Email'
          onChange={(e) => setLogin(e.target.value)}
        ></TextField>
        <Link
          className='login-form-link'
          underline='hover'
          onClick={() => {
            navigate(`/login`)
          }}
        >
          Back to login
        </Link>
        <Box className='login-reset-form-button'>
          <Button variant='contained' type='submit'>
            Reset Password
          </Button>
        </Box>
      </form>
    </Card>
  )
}

export default PasswordReset
