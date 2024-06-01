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
import { deleteProduct } from '../../api/productApi'
import useAlert from '../../components/alerts/useAlert'
import { useLocation, useNavigate } from 'react-router-dom'
import ProductFormImages from './ProductFormImages'

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
  const [status, setStatus] = useState(data.status)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [newImages, setNewImages] = useState([])
  const [deletedImages, setDeletedImages] = useState([])

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
            deletedImages,
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
          inputProps={{ maxLength: 7 }}
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
          minRows={4}
          onChange={(e) => setDescription(e.target.value)}
        />
        <ProductFormImages
          initialImages={data.images}
          newImages={newImages}
          setNewImages={setNewImages}
          setDeletedImages={setDeletedImages}
        />

        <Button variant='contained' type='submit'>
          {buttonMessage}
        </Button>
        {!isAddProduct && (
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
