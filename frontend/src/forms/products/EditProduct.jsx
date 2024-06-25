import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchAllCategories } from '../../api/categoryApi'
import { updateProduct, fetchProduct, deleteProductImage } from '../../api/productApi'
import ProductForm from './ProductForm'
import './ProductForm.css'
import useAlert from '../../components/alerts/useAlert' // Step 1

function EditProduct() {
  const { productId } = useParams() // Step 2: Get productId from URL
  const [categories, setCategories] = useState([])
  const [product, setProduct] = useState({})
  const navigate = useNavigate()
  const { setAlert } = useAlert() // Step 3

  // Define loadData function here
  useEffect(() => {
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

    // Call loadData function inside useEffect
    loadData()
  }, [productId])

  const handleSubmit = async ({
    title,
    price,
    category_id,
    description,
    status,
    newImages,
    deletedImages,
  }) => {
    const updatedData = {
      title,
      price,
      category_id,
      description,
      status,
      images: newImages,
    }

    try {
      // Delete each image in deletedImages array
      await Promise.all(
        deletedImages.map(async (imageIndex) => {
          try {
            await deleteProductImage(productId, imageIndex)
          } catch (error) {
            console.error(`Failed to delete image ${imageIndex}:`, error)
            // Handle error if necessary
          }
        })
      )

      // After deleting images, update the product data
      await updateProduct(productId, updatedData)

      // After successful update, navigate to account page
      navigate(`/account?view=catalog`)
      setAlert('Product was successfully updated', 'success')
    } catch (error) {
      console.error('Failed to update a product: ', error)
      setAlert('Failed to update a product', 'error')
    }
  }

  if (!categories.length || !product.id) return <div></div>

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
      <ProductForm buttonMessage={'Edit Product'} data={data} handleSubmit={handleSubmit} />
    </Box>
  )
}

export default EditProduct
