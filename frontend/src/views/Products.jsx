import React, { useEffect, useState } from 'react'
import { fetchAllProducts } from '../api/productApi'
import ProductsElement from '../components/ProductsElement'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { Box } from '@mui/material'
import './Products.css'

function ProductsList() {
  const [products, setProducts] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function loadData() {
      try {
        const searchParams = new URLSearchParams(location.search)
        const category = searchParams.get('category')
        const query = searchParams.get('query')
        const params = new URLSearchParams()
        params.set('without_carted_products', 'true')
        params.set('without_listed_products', 'true')
        if (category) {
          params.set('category', category)
        }
        if (query) {
          params.set('query', query)
        }
        const data = await fetchAllProducts(params)
        setProducts(data)
      } catch (e) {
        console.error('Failed to load products: ', e)
      }
    }

    loadData()
  }, [location.search])

  const onAddToCart = (id) => {
    const index = products.findIndex((product) => {
      return product.id === id
    })
    products.splice(index, 1)
    setProducts([...products])
  }

  return (
    <Box className='products-container'>
      {products.map((product) => (
        <Box key={product.id}>
          <ProductsElement product={product} navigate={navigate} onAddToCart={onAddToCart} />
        </Box>
      ))}
    </Box>
  )
}

export default ProductsList
