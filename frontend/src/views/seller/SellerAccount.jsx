import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import SellerCatalog from './SellerCatalog'
import SellerReviews from './SellerReviews'
import './SellerAccount.css'

function SellerAccount() {
  const [alignment, setAlignment] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams() // Get seller ID from URL

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const paramValue = params.get('view')

    if (paramValue === 'reviews') {
      setAlignment(1)
    } else if (paramValue === 'catalog') {
      setAlignment(2)
    }
  }, [location.search])

  const sidebarItems = [
    { id: 1, name: 'Reviews', onClick: () => navigate(`/seller/${id}?view=reviews`) },
    { id: 2, name: 'Catalog', onClick: () => navigate(`/seller/${id}?view=catalog`) },
  ]

  return (
    <Box className='seller-account-container'>
      <Box className='seller-account-sidebar'>
        <Sidebar
          items={sidebarItems}
          onAlignmentChange={(newAlignment) => setAlignment(newAlignment)}
          alignment={alignment}
        />
      </Box>
      <Box className='seller-account-content'>
        {alignment === 1 && <SellerReviews sellerId={id} />}
        {alignment === 2 && <SellerCatalog sellerId={id} />}
      </Box>
    </Box>
  )
}

export default SellerAccount
