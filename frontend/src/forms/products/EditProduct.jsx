import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { fetchAllCategories } from '../../api/categoryApi'
import { updateProduct, fetchProduct } from '../../api/productApi'
import ProductForm from './ProductForm'
import './ProductForm.css'
import useAlert from '../../components/alerts/useAlert' // Step 1

function EditProduct({ productId }) {
  const [categories, setCategories] = useState([])
  const [product, setProduct] = useState({})
  const navigate = useNavigate()
  const { setAlert } = useAlert() // Step 2

  // Define loadData function here
  const loadData = async () => {
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

  useEffect(() => {
    // Call loadData function inside useEffect
    loadData()
  }, [productId])

  const handleSubmit = async ({ title, price, category_id, description, status }) => {
    const updatedData = {
      title,
      price,
      category_id,
      description,
      status,
    }

    try {
      await updateProduct(productId, updatedData)
      navigate(`/account?view=catalog`)
      setAlert('Product was successfully updated', 'success') // Step 3
    } catch (error) {
      console.error('Failed to update a product: ', error)
      setAlert('Failed to update a product', 'error') // Step 3
    }
  }

  if (!categories.length || !product.id) {
    return <div>Loading...</div>
  }

  const { id, title, price, category, description, status, images } = product

  const data = {
    id,
    title,
    price,
    category_id: category.id,
    description,
    status,
    images,
    categories,
  }

  return (
    <Box>
      <ProductForm
        buttonMessage={'Edit Product'}
        data={data}
        handleSubmit={handleSubmit}
        loadData={loadData}
      />
    </Box>
  )
}

export default EditProduct
