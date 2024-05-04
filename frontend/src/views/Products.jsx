import React, { useEffect, useState } from 'react'
import { fetchAllProducts } from '../api/productApi'
import { fetchCategory } from '../api/categoryApi'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import ProductsElement from '../components/ProductsElement'
import Sidebar from '../components/Sidebar'
import './Products.css'

function Products() {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState()
  const navigate = useNavigate()

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
          }
        } else {
          setCategory(null)
        }

        const products = await fetchAllProducts(params)
        setProducts(products)
      } catch (e) {
        console.error('Failed to load products: ', e)
      }
    }

    loadData()
  }, [location.search])

  return (
    <Box className='products'>
      {category ? (
        <Box className='products-sidebar'>
          <Sidebar subcategories={category.subcategories} />
        </Box>
      ) : null}
      <Box className='products-elements'>
        {products.map((product) => (
          <Box key={product.id}>
            <ProductsElement product={product} navigate={navigate} />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Products
