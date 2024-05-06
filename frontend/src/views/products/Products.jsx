import React, { useEffect, useState } from 'react'
import { fetchAllProducts } from '../../api/productApi'
import { fetchCategory } from '../../api/categoryApi'
import { useNavigate, useLocation } from 'react-router-dom'
import { Box } from '@mui/material'
import Product from './Product'
import Sidebar from '../../components/Sidebar'
import './Products.css'

function Products() {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState()
  const [alignment, setAlignment] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    async function loadData() {
      try {
        const searchParams = new URLSearchParams(location.search)
        const categoryId = searchParams.get('category')
        const subcategoryId = searchParams.get('subcategory')
        const query = searchParams.get('query')
        const params = new URLSearchParams()
        params.set('without_listed_products', 'true')

        if (categoryId) {
          params.set('category', categoryId)
          const category = await fetchCategory(categoryId)
          setCategory(category)

          if (subcategoryId) {
            params.set('category', subcategoryId)
            setAlignment(parseInt(subcategoryId, 10))
          }
        } else {
          setCategory(null)
        }

        const fetchedProducts = await fetchAllProducts(params)
        setProducts(fetchedProducts)
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

  return (
    <Box className='products'>
      {category ? (
        <Box className='products-sidebar'>
          <Sidebar
            items={category.subcategories}
            alignment={alignment}
            onAlignmentChange={handleAlignmentChange}
          />
        </Box>
      ) : null}
      <Box className='products-elements'>
        {products.map((product) => (
          <Box key={product.id}>
            <Product product={product} navigate={navigate} />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Products
