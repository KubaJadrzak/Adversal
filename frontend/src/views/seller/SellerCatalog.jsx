import React, { useState, useEffect } from 'react'
import { fetchUserProducts } from '../../api/productApi'
import Product from '../../components/Product'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'

function SellerCatalog({ sellerId }) {
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState('LIVE') // State for filter
  const navigate = useNavigate()

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchUserProducts(sellerId)
        setProducts(data)
      } catch (e) {
        console.error('Failed to load product: ', e)
      }
    }
    loadData()
  }, [filter]) // Re-fetch products when filter changes

  if (!products) return <div></div>

  return (
    <Box className='catalog-container'>
      <Box className='catalog-elements'>
        {products.length > 0 &&
          products.map((product) => (
            <Box key={product.id}>
              <Product product={product} navigate={navigate} />
            </Box>
          ))}
      </Box>
    </Box>
  )
}

export default SellerCatalog
