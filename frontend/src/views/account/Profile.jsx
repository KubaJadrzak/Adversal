import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchUser } from '../../api/userApi'
import { updateUser } from '../../api/userApi'
import { Box, Typography, Avatar, IconButton, Button, Divider, TextField } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

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
    country: false,
    zip_code: false,
  })
  const [activeField, setActiveField] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchUser(localStorage.getItem('id'))
        setUser(data)
      } catch (error) {
        console.error('Failed to load user: ', error)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        // Check if the clicked target is not a descendant of TextField
        if (!event.target.closest('.MuiInputBase-root')) {
          // Clicked outside the editable area, discard changes
          discardChanges()
        }
      }
    }

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
      const updatedValue = user[field] // Get the updated value from user state

      // Call updateUser function to update the specific field
      await updateUser(localStorage.getItem('id'), { [field]: updatedValue })

      // Disable edit mode after successful update
      setEditMode((prevMode) => ({
        ...prevMode,
        [field]: false,
      }))
      setActiveField(null) // Reset activeField after submission

      // Optional: Fetch updated user data after submission
      loadData() // Assuming this function reloads user data
    } catch (error) {
      console.error('Failed to update user:', error)
      // Handle error (e.g., show error message to the user)
    }
  }

  const discardChanges = () => {
    // Reset edit mode and active field
    setEditMode({
      name: false,
      email: false,
      phone_number: false,
      city: false,
      country: false,
      zip_code: false,
    })
    setActiveField(null)
    // Refetch user data to discard changes made
    loadData() // Assuming this function reloads user data
  }

  const handleTextFieldKeyDown = (event, field) => {
    if (event.key === 'Enter') {
      handleSubmit(field)
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
          <Typography variant='h6'>{label}</Typography>
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
      {editMode[field] && activeField === field ? (
        <Box></Box>
      ) : (
        <IconButton
          className='profile-list-element-icon'
          onClick={() => handleEditClick(field)}
          disabled={activeField && activeField !== field}
        >
          <FontAwesomeIcon icon={faEdit} />
        </IconButton>
      )}
    </Box>
  )

  return (
    <Box className='profile-container'>
      {user && (
        <>
          <Avatar className='profile-avatar' src={baseURL + user.image} />
          <Box className='profile-list'>
            {renderEditableField('Name:', user.name, 'name')}
            <Divider />
            {renderEditableField('Email:', user.email, 'email')}
            <Divider />
            {renderEditableField('Phone:', user.phone_number, 'phone_number')}
            <Divider />
            {renderEditableField('Country:', user.country, 'country')}
            <Divider />
            {renderEditableField('City:', user.city, 'city')}
            <Divider />
            {renderEditableField('Zip Code:', user.zip_code, 'zip_code')}
            <Divider />
          </Box>
        </>
      )}
    </Box>
  )
}

export default Profile
