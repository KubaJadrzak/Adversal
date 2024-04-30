import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchUser } from '../../api/userApi'
import { Card, List, Box, Typography, Avatar, Button } from '@mui/material'

import './Profile.css'

function Profile() {
  const baseURL = import.meta.env.VITE_API_BASE_URL
  const navigate = useNavigate()
  const [user, setUser] = useState([])

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchUser(localStorage.getItem('id'))
        setUser(data)
      } catch (e) {
        console.error('Failed to load user: ', e)
      }
    }
    loadData()
  }, [])

  return (
    <Card className='profile-cart'>
      <Box className='profile-container'>
        <Avatar className='profile-avatar' src={baseURL + user.image} />
        <List className='profile-list'>
          <Typography className='profile-list-element'>{user.name}</Typography>
          <Typography className='profile-list-element'>{user.email}</Typography>
        </List>
        <Button
          className='profile-button'
          variant='contained'
          onClick={() => {
            navigate(`/account/profile/password`)
          }}
        >
          Change Password
        </Button>
        <Button
          className='profile-button'
          variant='contained'
          onClick={() => {
            navigate(`/account/profile/edit`)
          }}
        >
          Edit Profile
        </Button>
      </Box>
    </Card>
  )
}

export default Profile
