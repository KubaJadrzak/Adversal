import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { fetchAllCategories } from '../../api/categoryApi'
import { updateProduct, fetchProduct } from '../../api/productApi'
import ProductForm from './ProductForm'
import './ProductForm.css'

function EditProduct({ productId }) {
  const [categories, setCategories] = useState([])
  const [product, setProduct] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    async function loadData() {
      try {
        const categoriesData = await fetchAllCategories()
        const productData = await fetchProduct(productId)
        setCategories(categoriesData)
        setProduct(productData)
      } catch (error) {
        console.error('Failed to load: ', error)
        // Handle error feedback to the user
      }
    }

    loadData()
  }, [productId])

  const handleSubmit = async ({ title, price, category_id, description, newImages }) => {
    const updatedData = {
      title,
      price,
      category_id,
      description,
      images: newImages,
    }

    try {
      await updateProduct(productId, updatedData)
      navigate(`/account?view=catalog`)
    } catch (error) {
      console.error('Failed to update a product: ', error)
    }
  }

  if (!categories.length || !product.id) {
    return <div>Loading...</div>
  }

  const { id, title, price, category, description, images } = product

  const data = {
    id,
    title,
    price,
    category_id: category.id,
    description,
    images,
    categories,
  }

  return (
    <Box>
      <ProductForm buttonMessage={'Edit Product'} data={data} handleSubmit={handleSubmit} />
    </Box>
  )
}

export default EditProduct
