import React, { useState, useEffect } from 'react'
import { fetchCurrentUserProducts } from '../../api/productApi'
import Product from '../../components/Product'
import { useNavigate } from 'react-router-dom'
import { Box, Button, ToggleButton, ToggleButtonGroup } from '@mui/material'
import './Catalog.css'

function Catalog() {
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState('LIVE') // State for filter
  const navigate = useNavigate()

  useEffect(() => {
    async function loadData() {
      try {
        const params = new URLSearchParams({
          status: filter, // Add filter to the query parameters
        })
        const data = await fetchCurrentUserProducts(params)
        setProducts(data)
      } catch (e) {
        console.error('Failed to load product: ', e)
      }
    }
    loadData()
  }, [filter]) // Re-fetch products when filter changes

  if (!products) return <div></div>

  const onDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id)
    setProducts(updatedProducts)
  }

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter)
    }
  }

  return (
    <Box className='catalog-container'>
      <Box className='catalog-topbar'>
        <ToggleButtonGroup
          className='catalog-toggle'
          value={filter}
          exclusive
          onChange={handleFilterChange}
          aria-label='product status filter'
        >
          <ToggleButton value='LIVE' aria-label='live'>
            Live
          </ToggleButton>
          <ToggleButton value='SOLD' aria-label='sold'>
            Sold
          </ToggleButton>
          <ToggleButton value='HIDDEN' aria-label='hidden'>
            Hidden
          </ToggleButton>
        </ToggleButtonGroup>
        <Box className='catalog-button'>
          <Button
            sx={{ width: '100%' }}
            variant='contained'
            onClick={() => {
              navigate(`/product/add`)
            }}
          >
            Create new product
          </Button>
        </Box>
      </Box>

      <Box className='catalog-elements'>
        {products.length > 0 &&
          products.map((product) => (
            <Box key={product.id}>
              <Product product={product} navigate={navigate} onDeleteProduct={onDeleteProduct} />
            </Box>
          ))}
      </Box>
    </Box>
  )
}

export default Catalog
