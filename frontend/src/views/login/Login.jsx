import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, TextField, Button, Divider, Typography } from '@mui/material'
import { loginUser } from '../../api/authApi'
import useAlert from '../../components/alerts/useAlert'
import Adversal from '../../assets/adversal-yellow.png'

import './Login.css'

function Login() {
  const { setAlert } = useAlert()
  const navigate = useNavigate()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await loginUser({
        user: {
          email: login,
          password: password,
        },
      })
      navigate('/account?view=profile')
    } catch (error) {
      console.error('Failed to login!', error)
      setAlert('Failed to login! Invalid email or password', 'error')
    }
  }

  return (
    <Box className='login-container'>
      <form className='login-form' onSubmit={handleSubmit}>
        <img src={Adversal} alt='logo' className='login-logo' />
        <TextField
          required
          className='login-form-element'
          id='email'
          label='Email'
          onChange={(e) => setLogin(e.target.value)}
        ></TextField>
        <TextField
          required
          className='login-form-element'
          id='password'
          label='Password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        ></TextField>
        <Button className='login-form-button' variant='contained' type='submit'>
          Login
        </Button>
        <Button
          className='login-form-button'
          variant='outlined'
          color='secondary'
          type='button'
          onClick={() => {
            navigate(`/login/reset`)
          }}
        >
          Forgot password?
        </Button>
        <Button
          className='login-form-button'
          variant='outlined'
          color='secondary'
          onClick={() => {
            navigate(`/login/signup`)
          }}
        >
          Create an account
        </Button>
      </form>
      <Box className='login-form-divider'>
        <Divider />
        <Divider />
      </Box>

      <Button
        className='login-form-button'
        variant='outlined'
        color='secondary'
        onClick={() => {
          navigate(`/`)
        }}
      >
        Back to shop
      </Button>
      <Typography>
        This is a personal project, created for self-learning purposes. You can login using an
        example account with email: <b>john.doe@example.com </b> and password: <b>password123</b>
      </Typography>
    </Box>
  )
}

export default Login
