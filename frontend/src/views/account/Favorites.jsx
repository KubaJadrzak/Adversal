import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import Product from '../../components/Product'
import { fetchCurrentUserFavorites } from '../../api/favoriteApi'
import { useNavigate } from 'react-router-dom'

function Favorites() {
  const [userFavorites, setUserFavorites] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getUserFavorites = async () => {
      try {
        const favorites = await fetchCurrentUserFavorites()
        setUserFavorites(favorites)
      } catch (error) {
        console.error('Error fetching user favorites:', error)
      }
    }

    getUserFavorites()
  }, [])

  const handleRemoveFavorite = (productId) => {
    setUserFavorites((prevFavorites) => prevFavorites.filter((product) => product.id !== productId))
  }

  return (
    <div>
      {userFavorites.map((product) => (
        <Box key={product.id}>
          <Product
            product={product}
            navigate={navigate}
            isFavorite={true}
            onRemoveFavorite={handleRemoveFavorite}
          />
        </Box>
      ))}
    </div>
  )
}

export default Favorites
