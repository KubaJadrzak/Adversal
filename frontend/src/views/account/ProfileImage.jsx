import React, { useState, useRef, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from '@mui/material'
import useAlert from '../../components/alerts/useAlert'
import { updateUser, deleteUserImage } from '../../api/userApi'
import ImageDisplay from '../../components/ImageDisplay'
import './ProfileImage.css'

const ProfileImage = ({ user, loadData }) => {
  const baseURL = import.meta.env.VITE_API_BASE_URL
  const { setAlert } = useAlert()
  const [openImageDialog, setOpenImageDialog] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const imageDialogRef = useRef(null)

  useEffect(() => {
    if (user && user.image) {
      setImagePreview(baseURL + user.image)
    }
  }, [user])

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

      await updateUser(localStorage.getItem('id'), { image: selectedImage })
      loadData()
      setSelectedImage(null)
      setImagePreview(null)
      setOpenImageDialog(false)
      setAlert('Profile image updated successfully!', 'success')
    } catch (error) {
      setAlert('Failed to update profile image!', 'error')
      console.error('Failed to upload image:', error)
    }
  }

  const handleImageDelete = async () => {
    try {
      if (user && user.image) {
        await deleteUserImage(user.id)
        loadData()
        setSelectedImage(null)
        setImagePreview(null)
        setOpenImageDialog(false)

        setAlert('Profile image deleted successfully!', 'success')
      }
    } catch (error) {
      setAlert('Failed to delete profile image!', 'error')
      console.error('Failed to delete image:', error)
    }
  }

  return (
    <>
      <Box className='profile-image' onClick={() => setOpenImageDialog(true)}>
        <ImageDisplay imageURL={imagePreview} />
      </Box>
      <Dialog
        open={openImageDialog}
        ref={imageDialogRef}
        onClose={() => {
          setOpenImageDialog(false)
          setSelectedImage(null)
          setImagePreview(user.image ? baseURL + user.image : null)
        }}
      >
        <DialogTitle>Change Profile Photo</DialogTitle>
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
            {user.image && (
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
                setImagePreview(user.image ? baseURL + user.image : null)
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
    </>
  )
}

export default ProfileImage
