import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchUser, updateUser } from '../../api/userApi'
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Button,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import ImageDisplay from '../../components/ImageDisplay'

import './Profile.css'

function Profile() {
  const baseURL = import.meta.env.VITE_API_BASE_URL
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    phone_number: false,
    city: false,
    street: false,
    country: false,
    zip_code: false,
  })
  const [activeField, setActiveField] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const ref = useRef(null)

  const loadData = async () => {
    try {
      const data = await fetchUser(localStorage.getItem('id'))
      setUser(data)
    } catch (error) {
      console.error('Failed to load user: ', error)
    }
  }

  useEffect(() => {
    loadData() // Initial load of user data
  }, [])

  useEffect(() => {
    if (user && user.image && user.image.length > 0) {
      // Set imagePreview to the URL of the existing user image
      setImagePreview(baseURL + user.image)
    } else {
      // Clear imagePreview if user does not have an image
      setImagePreview(null)
    }
  }, [user, baseURL])

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      if (!event.target.closest('.MuiInputBase-root')) {
        discardChanges()
      }
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleEditClick = (field) => {
    if (!activeField) {
      setActiveField(field)
    }
    setEditMode((prevMode) => ({
      ...prevMode,
      [field]: true,
    }))
  }

  const handleSubmit = async (field) => {
    try {
      const updatedValue = user[field]
      await updateUser(localStorage.getItem('id'), { [field]: updatedValue })
      setEditMode((prevMode) => ({
        ...prevMode,
        [field]: false,
      }))
      setActiveField(null)
      loadData() // Refresh user data after successful update
    } catch (error) {
      console.error('Failed to update user:', error)
    }
  }

  const discardChanges = () => {
    setEditMode({
      name: false,
      email: false,
      phone_number: false,
      city: false,
      country: false,
      zip_code: false,
    })
    setActiveField(null)
    loadData() // Refresh user data to discard changes
  }

  const handleTextFieldKeyDown = (event, field) => {
    if (event.key === 'Enter') {
      handleSubmit(field)
    }
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    setSelectedImage(file)
    setImagePreview(URL.createObjectURL(file)) // Create a preview URL for the selected image
  }

  const handleImageUpload = async () => {
    try {
      if (!selectedImage) {
        return // No image selected, do nothing
      }

      await updateUser(localStorage.getItem('id'), { image: selectedImage })

      loadData() // Refresh user data after successful image upload

      setOpenDialog(false)
      setSelectedImage(null)
      setImagePreview(null)
    } catch (error) {
      console.error('Failed to upload image:', error)
    }
  }

  const renderField = (label, value, field) => {
    if (editMode[field] && activeField === field) {
      return (
        <TextField
          fullWidth
          label={label}
          value={user[field]} // Use value from state
          variant='outlined'
          onChange={(e) => setUser({ ...user, [field]: e.target.value })}
          onKeyDown={(e) => handleTextFieldKeyDown(e, field)}
        />
      )
    } else {
      return (
        <>
          <Typography>{label}</Typography>
          <Typography>{value}</Typography>
        </>
      )
    }
  }

  const renderEditableField = (label, value, field) => (
    <Box key={field} className='profile-list-element'>
      <Box className='profile-list-element-text' ref={ref}>
        {renderField(label, value, field)}
      </Box>
      {!editMode[field] || activeField !== field ? (
        <IconButton
          className='profile-list-element-icon'
          onClick={() => handleEditClick(field)}
          disabled={activeField && activeField !== field}
        >
          <FontAwesomeIcon icon={faEdit} />
        </IconButton>
      ) : null}
    </Box>
  )

  return (
    <Box className='profile-container'>
      {user && (
        <>
          <Box className='profile-image' onClick={() => setOpenDialog(true)}>
            <ImageDisplay
              imageURL={user.image && user.image.length > 0 ? baseURL + user.image : null}
            />
          </Box>
          <Box className='profile-list'>
            {renderEditableField('Email:', user.email, 'email')}
            <Divider />
            {renderEditableField('Name:', user.name, 'name')}
            <Divider />
            {renderEditableField('Phone:', user.phone_number, 'phone_number')}
            <Divider />
            {renderEditableField('Country:', user.country, 'country')}
            <Divider />
            {renderEditableField('City:', user.city, 'city')}
            <Divider />
            {renderEditableField('Street:', user.street, 'street')}
            <Divider />
            {renderEditableField('Zip Code:', user.zip_code, 'zip_code')}
            <Divider />
          </Box>
          <Dialog
            open={openDialog}
            onClose={() => {
              setOpenDialog(false)
              setSelectedImage(null) // Clear selected image if dialog is closed
              setImagePreview(null) // Clear image preview if dialog is closed
            }}
          >
            <DialogTitle>Change Profile Photo</DialogTitle>
            <DialogContent>
              <input
                style={{
                  marginBottom: '20px',
                  width: '100%',
                  overflow: 'hidden',
                }}
                type='file'
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div
                  style={{
                    marginBottom: '20px',
                    width: '100%',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      paddingBottom: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={imagePreview}
                      alt='Preview'
                      style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                </div>
              )}
              <Typography>Please upload a square (1:1) photo for best results.</Typography>
            </DialogContent>
            <DialogActions>
              <Button
                variant='contained'
                onClick={() => {
                  setOpenDialog(false)
                  setSelectedImage(null) // Clear selected image if dialog is closed
                  setImagePreview(null) // Clear image preview if dialog is closed
                }}
              >
                Cancel
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                onClick={handleImageUpload}
                disabled={!selectedImage}
              >
                Upload
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  )
}

export default Profile
