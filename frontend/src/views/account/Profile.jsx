import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchUser, updateUser, deleteUserImage } from '../../api/userApi' // Ensure deleteProductImage is imported
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
import useAlert from '../../components/alerts/useAlert'
import PasswordChangeDialog from './PasswordChangeDialog'
import './Profile.css'

function Profile() {
  const baseURL = import.meta.env.VITE_API_BASE_URL
  const navigate = useNavigate()
  const { setAlert } = useAlert()
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
  const [openImageDialog, setOpenImageDialog] = useState(false)
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const ref = useRef(null)
  const imageDialogRef = useRef(null)

  const loadData = async () => {
    try {
      const data = await fetchUser(localStorage.getItem('id'))
      setUser(data)
    } catch (error) {
      console.error('Failed to load user: ', error)
    }
  }

  useEffect(() => {
    loadData()
  }, [setAlert])

  useEffect(() => {
    if (user && user.image && user.image.length > 0) {
      setImagePreview(baseURL + user.image)
    } else {
      setImagePreview(null)
    }
  }, [user, baseURL])

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

  const handlePasswordChangeClick = () => {
    setOpenPasswordDialog(true)
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
      loadData()
      setAlert('User profile updated successfully!', 'success')
    } catch (error) {
      setAlert('Failed to update user profile!', 'error')
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
    loadData()
  }

  const handleTextFieldKeyDown = (event, field) => {
    if (event.key === 'Enter') {
      handleSubmit(field)
    }
  }

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target) && event.target.tagName !== 'INPUT') {
      discardChanges()
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

      await updateUser(localStorage.getItem('id'), { image: selectedImage })
      console.log(selectedImage)
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
        await deleteUserImage(user.id) // Assume user.image_id exists
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

  const renderField = (label, value, field) => {
    if (editMode[field] && activeField === field) {
      return (
        <TextField
          fullWidth
          label={label}
          value={user[field]}
          variant='outlined'
          onChange={(e) => setUser({ ...user, [field]: e.target.value })}
          onKeyDown={(e) => handleTextFieldKeyDown(e, field)}
        />
      )
    } else {
      return (
        <>
          {field === 'email' && user['unconfirmed_email'] ? (
            <>
              <Typography>
                <strong>{label}</strong> {value}
              </Typography>
              <Typography variant='caption' color='error'>
                <strong>New Email (Unconfirmed):</strong> {user['unconfirmed_email']}
              </Typography>
            </>
          ) : (
            <Box>
              <Typography>
                <strong>{label}</strong>
              </Typography>
              <Typography>{value}</Typography>
            </Box>
          )}
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
        field !== 'password' ? (
          <IconButton
            className='profile-list-element-icon'
            onClick={() => handleEditClick(field)}
            disabled={activeField && activeField !== field}
          >
            <FontAwesomeIcon icon={faEdit} />
          </IconButton>
        ) : (
          <Button
            className='profile-list-element-button'
            variant='contained'
            onClick={() => handlePasswordChangeClick()}
            disabled={activeField && activeField !== field}
          >
            Change Password
          </Button>
        )
      ) : null}
    </Box>
  )

  return (
    <Box className='profile-container'>
      {user && (
        <>
          <Box className='profile-image' onClick={() => setOpenImageDialog(true)}>
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
            {renderEditableField('Password:', '***********', 'password')}
            <Divider />
            <PasswordChangeDialog
              open={openPasswordDialog}
              onClose={() => setOpenPasswordDialog(false)}
              updateUser={updateUser}
              loadData={loadData}
            />
          </Box>
          <Dialog
            open={openImageDialog}
            ref={imageDialogRef}
            onClose={() => {
              setOpenImageDialog(false)
              setSelectedImage(null)
              setImagePreview(null)
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
        </>
      )}
    </Box>
  )
}

export default Profile
