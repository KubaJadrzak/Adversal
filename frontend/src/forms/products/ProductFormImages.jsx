import React, { useState, useRef } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'
import ImageDisplay from '../../components/ImageDisplay'
import './ProductFormImages.css'

function ProductFormImages({ initialImages, newImages, setNewImages, setDeletedImages }) {
  const baseURL = import.meta.env.VITE_API_BASE_URL
  const [images, setImages] = useState(initialImages || [])
  const [image, setImage] = useState(null)
  const [openImageDialog, setOpenImageDialog] = useState(false)
  const [newImage, setNewImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const handleImageClick = (image, previewImageURL) => {
    setImage(image)
    setImagePreview(previewImageURL)
    setOpenImageDialog(true)
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    setNewImage(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleImageUpload = () => {
    if (newImage) {
      setNewImages((prevImages) => [...prevImages, newImage])
      setOpenImageDialog(false)
      setNewImage(null)
      setImagePreview(null)
    }
  }

  const handleImageDelete = () => {
    if (image) {
      const imageIndex = images.indexOf(image)
      if (imageIndex !== -1) {
        setDeletedImages((prevDeletedImages) => [...prevDeletedImages, imageIndex])
        const updatedImages = images.filter((img) => img !== image)
        setImages(updatedImages)
      } else {
        const updatedNewImages = newImages.filter((img) => img !== image)
        setNewImages(updatedNewImages)
      }
      setOpenImageDialog(false)
      setImage(null)
    }
  }

  const combinedImages = [
    ...(images || []).map((image) => ({ image, previewImageURL: baseURL + image })),
    ...Array.from(newImages || []).map((image) => ({
      image,
      previewImageURL: URL.createObjectURL(image),
    })),
  ]

  if (combinedImages.length < 6) {
    combinedImages.push({ image: null, previewImageURL: null })
  }

  return (
    <Box className='product-form-images'>
      {combinedImages.slice(0, 6).map((imageData, index) => (
        <Box
          key={index}
          className='product-form-image'
          onClick={() => handleImageClick(imageData.image, imageData.previewImageURL)}
        >
          <ImageDisplay imageURL={imageData.previewImageURL} />
        </Box>
      ))}
      <Dialog open={openImageDialog} onClose={() => setOpenImageDialog(false)}>
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
            {image && (
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
                setNewImage(null)
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
              disabled={!newImage}
            >
              Upload
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ProductFormImages
