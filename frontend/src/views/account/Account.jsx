import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { logoutUser } from '../../api/authApi'
import Sidebar from '../../components/Sidebar'
import Profile from './Profile'
import Catalog from './Catalog'
import './Account.css'

function Account() {
  const [alignment, setAlignment] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const paramValue = params.get('view')

    if (paramValue === 'profile') {
      setAlignment(1)
    } else if (paramValue === 'catalog') {
      setAlignment(2)
    }
  }, [location.search])

  const handleLogout = async () => {
    try {
      await logoutUser()
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const sidebarItems = [
    { id: 1, name: 'Profile', onClick: () => navigate('/account?view=profile') },
    { id: 2, name: 'Catalog', onClick: () => navigate('/account?view=catalog') },
    { id: 3, name: 'Logout', onClick: handleLogout },
  ]

  const handleAlignmentChange = (newAlignment) => {
    if (newAlignment === 1) {
      navigate('/account?view=profile')
    } else if (newAlignment === 2) {
      navigate('/account?view=catalog')
    } else if (newAlignment === 3) {
      handleLogout()
    }
  }

  return (
    <Box className='account-container'>
      <Box className='account-sidebar'>
        <Sidebar
          items={sidebarItems}
          onAlignmentChange={handleAlignmentChange}
          alignment={alignment}
        />
      </Box>
      <Box className='account-content'>
        {alignment === 1 && <Profile />}
        {alignment === 2 && <Catalog />}
      </Box>
    </Box>
  )
}

export default Account
