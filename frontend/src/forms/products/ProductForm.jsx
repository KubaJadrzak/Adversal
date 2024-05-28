import React, { useState, useEffect, useRef } from 'react'
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
import { deleteProductImage, deleteProduct, updateProduct } from '../../api/productApi' // Import deleteProduct and updateProduct functions
import useAlert from '../../components/alerts/useAlert'
import { useLocation, useNavigate } from 'react-router-dom'
import ImageDisplay from '../../components/ImageDisplay'

import './ProductForm.css'

function ProductForm({ buttonMessage, data, handleSubmit, loadData }) {
  const baseURL = import.meta.env.VITE_API_BASE_URL
  const location = useLocation()
  const isAddProduct = location.search.includes('view=addProduct')
  const { setAlert } = useAlert()
  const navigate = useNavigate()
  const [title, setTitle] = useState(data.title)
  const [price, setPrice] = useState(data.price)
  const [parentCategoryId, setParentCategoryId] = useState('')
  const [childCategoryId, setChildCategoryId] = useState('')
  const [description, setDescription] = useState(data.description)
  const [status, setStatus] = useState(data.status)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [newImages, setNewImages] = useState([])
  const [images, setImages] = useState(data.images || [])
  const [currentImage, setCurrentImage] = useState(null)
  const [openImageDialog, setOpenImageDialog] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const ref = useRef(null)
  const imageDialogRef = useRef(null)

  useEffect(() => {
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

  useEffect(() => {
    if (currentImage) {
      setImagePreview(baseURL + currentImage)
    } else {
      setImagePreview(null)
    }
  }, [currentImage, baseURL])

  const selectedParentCategory = data.categories.find(
    (category) => category.id === parentCategoryId
  )

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(data.id)
      navigate(`/account?view=catalog`)
      setAlert('Product was successfully deleted', 'success')
    } catch (e) {
      console.error('Failed to delete a product: ', e)
      setAlert('Failed to delete a product', 'error')
    }
    setOpenDeleteDialog(false)
  }

  const handleImageClick = (image) => {
    setCurrentImage(image)
    setOpenImageDialog(true)
  }

  const handleClickOutside = (event) => {
    if (imageDialogRef.current && !imageDialogRef.current.contains(event.target)) {
      if (!event.target.closest('.MuiInputBase-root')) {
        discardChanges()
      }
    }
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    setSelectedImage(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleImageUpload = async () => {
    try {
      if (!selectedImage) {
        return
      }

      await updateProduct(data.id, { image: selectedImage })

      loadData()
      setSelectedImage(null)
      setImagePreview(null)
      setOpenImageDialog(false)
      setAlert('Product image updated successfully!', 'success')
    } catch (error) {
      setAlert('Failed to update product image!', 'error')
      console.error('Failed to upload image:', error)
    }
  }

  const handleImageDelete = async () => {
    try {
      if (currentImage) {
        await deleteProductImage(data.id, images.indexOf(currentImage)) // Pass index of the current image

        // Update images state by filtering out the deleted image
        const updatedImages = images.filter((image) => image !== currentImage)
        setImages(updatedImages)

        // Reload data if necessary, but you may not need this if the deleted image is removed from the state.
        // loadData()

        setSelectedImage(null)
        setImagePreview(null)
        setOpenImageDialog(false)

        setAlert('Product image deleted successfully!', 'success')
      }
    } catch (error) {
      setAlert('Failed to delete product image!', 'error')
      console.error('Failed to delete image:', error)
    }
  }

  // Create an array with exactly 5 items, filling with placeholder if necessary
  const displayImages = [...images, ...Array(5 - images.length).fill(null)]

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
        <Box className='product-form-images'>
          {displayImages.map((image, index) => (
            <Box key={index} className='profile-form-image' onClick={() => handleImageClick(image)}>
              <ImageDisplay imageURL={image ? baseURL + image : null} />
            </Box>
          ))}
        </Box>

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

      <Dialog ref={imageDialogRef} open={openImageDialog} onClose={() => setOpenImageDialog(false)}>
        <DialogTitle>Image Preview</DialogTitle>
        <DialogContent style={{ width: '320px' }}>
          <input
            style={{
              marginBottom: '20px',
            }}
            type='file'
            onChange={handleImageChange}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt='Preview'
              style={{
                top: '0',
                left: '0',
                width: '320px',
                height: '240px',
                objectFit: 'cover',
              }}
            />
          )}
          <Typography>Please upload photo with 3:4 aspect ratio.</Typography>
        </DialogContent>

        <DialogActions className='profile-dialog-buttons'>
          <Box>
            {currentImage && (
              <Button
                className='profile-dialog-button'
                variant='outlined'
                color='error'
                onClick={handleImageDelete}
              >
                Delete
              </Button>
            )}
          </Box>
          <Box>
            <Button
              className='profile-dialog-button'
              variant='contained'
              onClick={() => {
                setOpenImageDialog(false)
                setSelectedImage(null)
                setImagePreview(null)
              }}
            >
              Cancel
            </Button>
            <Button
              className='profile-dialog-button'
              variant='outlined'
              color='secondary'
              onClick={handleImageUpload}
              disabled={!selectedImage}
            >
              Upload
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ProductForm
