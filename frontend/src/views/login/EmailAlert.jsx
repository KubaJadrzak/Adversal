import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'
import Adversal from '../../assets/adversal-yellow.png'
import './Login.css'

function EmailAlert() {
  const navigate = useNavigate()

  return (
    <Box className='login-container'>
      <img src={Adversal} alt='logo' className='login-logo' />
      <Typography className='login-alert'>
        We've sent a password reset email to your address. Be sure to check your spam folder if you
        don't see it right away!
      </Typography>
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
    </Box>
  )
}

export default EmailAlert
