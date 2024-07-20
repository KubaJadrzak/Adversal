import React, { useState, useEffect } from 'react'
import { Box, Button, Rating, Typography, useMediaQuery } from '@mui/material'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import ImageDisplay from '../../components/ImageDisplay'
import Sidebar from '../../components/Sidebar'
import SellerCatalog from './SellerCatalog'
import SellerReviews from './SellerReviews'
import { fetchUser } from '../../api/userApi'
import './SellerAccount.css'

function SellerAccount() {
  const baseURL = import.meta.env.VITE_API_BASE_URL
  const [alignment, setAlignment] = useState(null)
  const [seller, setSeller] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const isSmallScreen = useMediaQuery('(max-width: 700px)')

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const paramValue = params.get('view')

    if (paramValue === 'reviews') {
      setAlignment(1)
    } else if (paramValue === 'catalog') {
      setAlignment(2)
    }
  }, [location.search])

  useEffect(() => {
    async function getSeller() {
      try {
        const sellerData = await fetchUser(id)
        setSeller(sellerData)
      } catch (error) {
        console.error('Failed to fetch seller data:', error)
      }
    }

    getSeller()
  }, [id])

  const handleAlignmentChange = (newAlignment) => {
    if (newAlignment === 1) {
      navigate(`/seller/${id}?view=reviews`)
    } else if (newAlignment === 2) {
      navigate(`/seller/${id}?view=catalog`)
    }
  }

  const sidebarItems = [
    { id: 1, name: 'Reviews', onClick: () => handleAlignmentChange(1) },
    { id: 2, name: 'Catalog', onClick: () => handleAlignmentChange(2) },
  ]

  if (!seller) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Box className='seller-account-container'>
      <Box className='seller-account-top'>
        <Box className='seller-image'>
          <ImageDisplay imageURL={seller.image ? `${baseURL}/${seller.image}` : null} />
        </Box>
        <Box className='seller-account-info'>
          <Box className='seller-name'>
            <Typography variant={isSmallScreen ? 'subtitle1' : 'h6'}>{seller.name}</Typography>
          </Box>
          <Box className='seller-rating'>
            <Rating
              name='seller-rating'
              value={seller.average_rating}
              precision={0.5}
              readOnly
              size={isSmallScreen ? undefined : 'large'}
            />
          </Box>
          <Box className='seller-address'>
            <Typography variant={isSmallScreen ? 'caption' : undefined}>
              {seller.full_address}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className='seller-account-sidebar'>
        <Sidebar
          items={sidebarItems}
          onAlignmentChange={handleAlignmentChange}
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
