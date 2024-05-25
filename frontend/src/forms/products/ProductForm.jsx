import React, { useState, useEffect } from 'react'
import {
  Button,
  TextField,
  MenuItem,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { deleteProductImage } from '../../api/productApi'
import { deleteProduct } from '../../api/productApi'
import useAlert from '../../components/alerts/useAlert'
import { useLocation, useNavigate } from 'react-router-dom'

import './ProductForm.css'

function ProductForm({ buttonMessage, data, handleSubmit }) {
  const location = useLocation()
  const isAddProduct = location.search.includes('view=addProduct')
  const { setAlert } = useAlert()
  const navigate = useNavigate()
  const [title, setTitle] = useState(data.title)
  const [price, setPrice] = useState(data.price)
  const [parentCategoryId, setParentCategoryId] = useState('')
  const [childCategoryId, setChildCategoryId] = useState('')
  const [description, setDescription] = useState(data.description)
  const [status, setStatus] = useState(data.status) // State for status
  const [images, setImages] = useState(data.images)
  const [newImages, setNewImages] = useState([])
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  useEffect(() => {
    // Preselect parent and child categories based on data
    const parentCategory = data.categories.find((category) =>
      category.subcategories.some((sub) => sub.id === data.category_id)
    )
    if (parentCategory) {
      setParentCategoryId(parentCategory.id)
      setChildCategoryId(data.category_id)
    } else {
      setParentCategoryId(data.category_id)
    }
  }, [data])

  const handleDeleteNewImage = (index) => {
    const updatedImages = [...newImages]
    updatedImages.splice(index, 1)
    setNewImages(updatedImages)
  }

  const handleDeleteImage = async ({ index }) => {
    const updatedImages = [...images]
    updatedImages.splice(index, 1)
    setImages(updatedImages)
    deleteProductImage(data.id, index)
  }

  const handleUploadNewImages = (e) => {
    setNewImages((prevImages) => [...prevImages, ...e.target.files])
  }

  const selectedParentCategory = data.categories.find(
    (category) => category.id === parentCategoryId
  )

  const handleDeleteProduct = () => {
    // Your delete product logic here
    try {
      deleteProduct(data.id)
      navigate(`/account?view=catalog`)
      setAlert('Product was successfully deleted', 'success')
    } catch (e) {
      console.error('Failed to delete  a product: ', e)
      setAlert('Failed to delete a product', 'error')
    }
    setOpenDeleteDialog(false)
  }

  return (
    <Box>
      <form
        className='product-form'
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit({
            title,
            price,
            category_id: childCategoryId || parentCategoryId,
            description,
            status, // Include status in form submission
            newImages,
          })
        }}
      >
        <TextField
          required
          id='title'
          label='Title'
          value={title}
          inputProps={{ maxLength: 64 }}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          required
          autoComplete='off'
          type='number'
          id='price'
          label='Price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          required
          id='parent-category'
          label='Category'
          value={parentCategoryId}
          select
          onChange={(e) => {
            setParentCategoryId(e.target.value)
            setChildCategoryId('') // Reset child category when parent changes
          }}
        >
          {data.categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              <Box>
                <Typography>{category.name}</Typography>
              </Box>
            </MenuItem>
          ))}
        </TextField>
        {selectedParentCategory && selectedParentCategory.subcategories.length > 0 && (
          <TextField
            required
            id='child-category'
            label='Subcategory'
            value={childCategoryId}
            select
            onChange={(e) => setChildCategoryId(e.target.value)}
          >
            {selectedParentCategory.subcategories.map((subcategory) => (
              <MenuItem key={subcategory.id} value={subcategory.id}>
                <Box>
                  <Typography>{subcategory.name}</Typography>
                </Box>
              </MenuItem>
            ))}
          </TextField>
        )}
        <TextField
          required
          id='status'
          label='Status'
          value={status}
          select
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value='LIVE'>Live</MenuItem>
          <MenuItem value='SOLD'>Sold</MenuItem>
          <MenuItem value='HIDDEN'>Hidden</MenuItem>
        </TextField>
        <TextField
          required
          id='description'
          label='Description'
          value={description}
          multiline
          minRows={6}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button variant='contained' type='submit'>
          {buttonMessage}
        </Button>
        {!isAddProduct && ( // Conditionally render delete button
          <Button variant='outlined' color='error' onClick={() => setOpenDeleteDialog(true)}>
            Delete Product
          </Button>
        )}
      </form>
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color='primary' variant='contained'>
            Cancel
          </Button>
          <Button onClick={handleDeleteProduct} color='error' variant='outlined'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ProductForm
