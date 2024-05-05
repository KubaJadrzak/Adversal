import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, TextField, Button } from '@mui/material'
import { signupUser } from '../../api/authApi'
import Adversal from '../../assets/adversal-yellow.png'
import './Login.css'

function SignUp() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent default form submission behavior

    const data = {
      user: {
        email,
        name,
        password,
        password_confirmation: confirmPassword,
      },
    }
    try {
      await signupUser(data)
      navigate('/login/email')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box className='login-container'>
      <img src={Adversal} alt='logo' className='login-logo' />
      <form onSubmit={handleSubmit} className='login-form'>
        <TextField
          required
          className='login-form-element'
          id='email'
          label='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          className='login-form-element'
          id='name'
          label='Name'
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          required
          className='login-form-element'
          id='password'
          label='Password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          required
          className='login-form-element'
          id='confirm password'
          label='Confirm Password'
          type='password'
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
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
          Sign Up
        </Button>
      </form>
    </Box>
  )
}

export default SignUp
