import React, { useEffect, useState } from 'react'
import { fetchAllProducts } from '../../api/productApi'
import { fetchCategory } from '../../api/categoryApi'
import { fetchCurrentUserFavorites } from '../../api/favoriteApi'
import { useNavigate, useLocation } from 'react-router-dom'
import { Box, Button, Divider } from '@mui/material'
import PriceFilter from '../../components/PriceFilter'
import Product from '../../components/Product'
import Sidebar from '../../components/Sidebar'
import './Products.css'

function Products() {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState(null)
  const [alignment, setAlignment] = useState(null)
  const [userFavorites, setUserFavorites] = useState(null)
  const [previousCategoryId, setPreviousCategoryId] = useState(null)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  })
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const page = parseInt(searchParams.get('page'), 10) || 1
    loadData(page)
  }, [location.search, previousCategoryId])

  const loadData = async (page = 1) => {
    try {
      const searchParams = new URLSearchParams(location.search)
      const categoryId = searchParams.get('category')
      const subcategoryId = searchParams.get('subcategory')
      const minPriceParam = searchParams.get('min_price')
      const maxPriceParam = searchParams.get('max_price')
      const query = searchParams.get('query')
      const params = new URLSearchParams()

      if (categoryId !== previousCategoryId) {
        setAlignment(null)
        setPreviousCategoryId(categoryId)
      }

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

      params.set('page', page)

      const fetchedData = await fetchAllProducts(params)
      if (fetchedData.products.length === 0 && page > 1) {
        navigate(`/?page=1`)
        return
      }
      setProducts(fetchedData.products)
      setPagination({
        currentPage: fetchedData.meta.current_page,
        totalPages: fetchedData.meta.total_pages,
      })

      const loggedInUserId = localStorage.getItem('id')
      if (loggedInUserId) {
        const favorites = await fetchCurrentUserFavorites()
        setUserFavorites(favorites)
      } else {
        setUserFavorites([])
      }
    } catch (error) {
      console.error('Failed to load products: ', error)
    }
  }

  const handleAlignmentChange = (newAlignment) => {
    setAlignment(newAlignment)
    const params = new URLSearchParams(location.search)
    const categoryId = params.get('category')
    params.set('subcategory', newAlignment)
    navigate(`/?${params.toString()}`)
  }

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(location.search)
    params.set('page', newPage)
    navigate(`/?${params.toString()}`)
    loadData(newPage)
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
          <Divider />
          <PriceFilter />
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
      {products.length > 0 && (
        <Box className='pagination-controls'>
          <Button
            disabled={pagination.currentPage === 1}
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            variant='contained'
          >
            Previous Page
          </Button>
          <Button
            disabled={pagination.currentPage === pagination.totalPages}
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            variant='contained'
          >
            Next Page
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default Products
