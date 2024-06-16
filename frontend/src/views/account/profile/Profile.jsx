import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchUser, updateUser } from '../../../api/userApi'
import { Box, Typography, IconButton, Button, Divider, TextField } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import useAlert from '../../../components/alerts/useAlert'
import PasswordChangeDialog from './PasswordChangeDialog'
import ProfileImage from './ProfileImage'
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
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false) // Added state for password dialog
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
    loadData()
  }, [setAlert])

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
    if (ref.current && !ref.current.contains(event.target)) {
      if (!event.target.closest('.MuiInputBase-root')) {
        discardChanges()
      }
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
          inputProps={field === 'name' ? { maxLength: 32 } : {}}
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
          <ProfileImage user={user} loadData={loadData} baseURL={baseURL} />
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
        </>
      )}
    </Box>
  )
}

export default Profile
