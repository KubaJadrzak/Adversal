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

  const handleExampleLogin = async () => {
    setLogin('john.doe@example.com')
    setPassword('password123')
    try {
      await loginUser({
        user: {
          email: 'john.doe@example.com',
          password: 'password123',
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
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        ></TextField>
        <TextField
          required
          className='login-form-element'
          id='password'
          label='Password'
          type='password'
          value={password}
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
        This is a personal project, created for self-learning purposes. While the registration is
        fully operational, you can use below button to login with example user data.
      </Typography>
      <Button
        className='login-form-button'
        variant='contained'
        color='primary'
        onClick={handleExampleLogin}
      >
        Login with Example User
      </Button>
    </Box>
  )
}

export default Login
