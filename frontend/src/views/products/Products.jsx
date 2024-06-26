import React, { useEffect, useState } from 'react'
import { fetchAllProducts } from '../../api/productApi'
import { fetchCategory } from '../../api/categoryApi'
import { fetchCurrentUserFavorites } from '../../api/favoriteApi'
import { useNavigate, useLocation } from 'react-router-dom'
import { Box } from '@mui/material'
import Product from '../../components/Product'
import Sidebar from '../../components/Sidebar'
import './Products.css'

function Products() {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState(null)
  const [alignment, setAlignment] = useState(null)
  const [userFavorites, setUserFavorites] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    async function loadData() {
      try {
        const searchParams = new URLSearchParams(location.search)
        const categoryId = searchParams.get('category')
        const subcategoryId = searchParams.get('subcategory')
        const minPriceParam = searchParams.get('min_price')
        const maxPriceParam = searchParams.get('max_price')
        const query = searchParams.get('query')
        const params = new URLSearchParams()

        if (categoryId) {
          params.set('category', categoryId)
          const fetchedCategory = await fetchCategory(categoryId)
          setCategory(fetchedCategory)

          if (subcategoryId) {
            params.set('category', subcategoryId)
            setAlignment(parseInt(subcategoryId, 10))
          }
        } else {
          setCategory(null)
        }

        if (query) {
          params.set('query', query)
        }

        if (minPriceParam) {
          params.set('min_price', minPriceParam)
        }
        if (maxPriceParam) {
          params.set('max_price', maxPriceParam)
        }

        const fetchedProducts = await fetchAllProducts(params)
        setProducts(fetchedProducts)

        // Check if there's a logged-in user (id in localStorage)
        const loggedInUserId = localStorage.getItem('id')
        if (loggedInUserId) {
          const favorites = await fetchCurrentUserFavorites()
          setUserFavorites(favorites)
        } else {
          setUserFavorites([]) // If no logged-in user, set empty array
        }
      } catch (error) {
        console.error('Failed to load products: ', error)
      }
    }

    loadData()
  }, [location.search])

  const handleAlignmentChange = (newAlignment) => {
    setAlignment(newAlignment)
    const params = new URLSearchParams(location.search)
    const categoryId = params.get('category')
    navigate(`/?category=${categoryId}&subcategory=${newAlignment}`)
  }

  if (!products || userFavorites === null) {
    return <div>Loading...</div>
  }

  return (
    <Box className='products'>
      {category && (
        <Box className='products-sidebar'>
          <Sidebar
            items={category.subcategories}
            alignment={alignment}
            onAlignmentChange={handleAlignmentChange}
          />
        </Box>
      )}
      {products.length > 0 && (
        <Box className='products-elements'>
          {products.map((product) => (
            <Box key={product.id}>
              <Product
                product={product}
                navigate={navigate}
                isFavorite={userFavorites.some((fav) => fav.id === product.id)}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default Products
