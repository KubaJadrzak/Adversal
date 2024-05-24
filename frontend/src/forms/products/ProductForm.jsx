import React from 'react'
import { useState } from 'react'
import { styled } from '@mui/material/styles'
import { Button, TextField, MenuItem, Box, Typography } from '@mui/material'
import { deleteProductImage } from '../../api/productApi'
import './ProductForm.css'

function ProductForm({ buttonMessage, data, handleSubmit }) {
  const [title, setTitle] = useState(data.title)
  const [price, setPrice] = useState(data.price)
  const [category_id, setCategoryId] = useState(data.category_id)
  const [description, setDescription] = useState(data.description)
  const [images, setImages] = useState(data.images)
  const [newImages, setNewImages] = useState([])

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

  return (
    <Box>
      <form
        className='product-form'
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit({ title, price, category_id, description, newImages })
        }}
      >
        <TextField
          required
          id='title'
          label='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></TextField>
        <TextField
          required
          autoComplete='off'
          type='number'
          id='price'
          label='Price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        ></TextField>
        <TextField
          required
          id='category'
          label='Category'
          value={category_id}
          select
          onChange={(e) => setCategoryId(e.target.value)}
        >
          {data.categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              <Box>
                <Typography>{category.name}</Typography>
              </Box>
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          id='description'
          label='Description'
          value={description}
          multiline
          minRows={6}
          onChange={(e) => setDescription(e.target.value)}
        ></TextField>

        <Button variant='contained' type='submit'>
          {buttonMessage}
        </Button>
      </form>
    </Box>
  )
}

export default ProductForm
