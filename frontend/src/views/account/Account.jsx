import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { logoutUser } from '../../api/authApi'
import Sidebar from '../../components/Sidebar'
import Profile from './Profile'
import Catalog from './Catalog'
import './Account.css'
import AddProduct from '../../forms/products/AddProduct'
import EditProduct from '../../forms/products/EditProduct'

function Account() {
  const [alignment, setAlignment] = useState(null)
  const [productId, setProductId] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const paramValue = params.get('view')
    const id = params.get('productId')

    if (paramValue === 'profile') {
      setAlignment(1)
    } else if (paramValue === 'catalog') {
      setAlignment(2)
    } else if (paramValue === 'addProduct') {
      setAlignment(3)
    } else if (paramValue === 'editProduct') {
      setAlignment(4)
      setProductId(id)
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
    { id: 9, name: 'Logout', onClick: handleLogout },
  ]

  const handleAlignmentChange = (newAlignment) => {
    if (newAlignment === 1) {
      navigate('/account?view=profile')
    } else if (newAlignment === 2) {
      navigate('/account?view=catalog')
    } else if (newAlignment === 9) {
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
        {alignment === 3 && <AddProduct />}
        {alignment === 4 && <EditProduct productId={productId} />}
      </Box>
    </Box>
  )
}

export default Account
