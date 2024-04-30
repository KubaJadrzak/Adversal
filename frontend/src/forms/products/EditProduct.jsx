import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchAllCategories } from '../../api/categoryApi'
import { updateProduct, fetchProduct } from '../../api/productApi'
import ProductForm from './ProductForm'
import './ProductForm.css'

function EditProduct() {
  const { id } = useParams()
  const [categories, setCategories] = useState([])
  const [product, setProduct] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    async function loadData() {
      try {
        const categoriesData = await fetchAllCategories()
        const productData = await fetchProduct(id)
        setCategories(categoriesData)
        setProduct(productData)
      } catch (error) {
        console.error('Failed to load: ', error)
        // Handle error feedback to the user
      }
    }

    loadData()
  }, [id])

  const handleSubmit = async ({ title, price, category_id, description, newImages }) => {
    const updatedData = {
      title,
      price,
      category_id,
      description,
      images: newImages,
    }

    try {
      await updateProduct(id, updatedData)
      navigate(`/account/catalog`)
    } catch (error) {
      console.error('Failed to update a product: ', error)
    }
  }

  if (!categories.length || !product.id) {
    return <div>Loading...</div>
  }

  const { id: productId, title, price, category, description, images } = product

  const data = {
    id: productId,
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
