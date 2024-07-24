import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchUser, updateUser } from '../../../api/userApi'
import { Box, Typography, IconButton, Button, Divider, TextField } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import useAlert from '../../../components/alerts/useAlert'
import PasswordChangeDialog from './PasswordChangeDialog'
import ProfileImage from './ProfileImage'
import AddressEditDialog from './AddressEditDialog'
import './Profile.css'

function Profile() {
  const baseURL = import.meta.env.VITE_API_BASE_URL
  const navigate = useNavigate()
  const { setAlert } = useAlert()
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone_number: '',
    full_address: '',
    geonameIds: {
      place: null,
      area: null,
      county: null,
      subdivision: null,
      country: null,
    },
  })
  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    phone_number: false,
    full_address: false,
  })
  const [activeField, setActiveField] = useState(null)
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false)
  const [openAddressDialog, setOpenAddressDialog] = useState(false)
  const ref = useRef(null)

  const loadData = async () => {
    try {
      const data = await fetchUser(localStorage.getItem('id'))
      setUser({
        id: data.id,
        name: data.name,
        email: data.email,
        phone_number: data.phone_number,
        full_address: data.full_address,
        geonameIds: {
          place: data.place_geoname_id,
          area: data.area_geoname_id,
          county: data.county_geoname_id,
          subdivision: data.subdivision_geoname_id,
          country: data.country_geoname_id,
          postal_code: data.postal_code,
        },
        image: data.image,
      })
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

  const handleAddressEditClick = () => {
    setOpenAddressDialog(true)
  }

  const handleAddressEditClose = () => {
    setOpenAddressDialog(false)
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

  const discardChanges = () => {
    setEditMode({
      name: false,
      email: false,
      phone_number: false,
      full_address: false,
    })
    setActiveField(null)
    loadData()
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
        <Box>
          <Typography>
            <strong>{label}</strong>
          </Typography>
          <Typography>{value}</Typography>
        </Box>
      )
    }
  }

  const renderEditableField = (label, value, field) => (
    <Box
      key={field}
      className={`profile-list-element ${field === 'full_address' ? 'profile-list-element-address' : field === 'password' ? 'profile-list-element-password' : ''}`}
    >
      <Box className='profile-list-element-text' ref={ref}>
        {renderField(label, value, field)}
      </Box>
      {!editMode[field] || activeField !== field ? (
        field !== 'password' ? (
          field !== 'full_address' ? (
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
              onClick={handleAddressEditClick}
              disabled={activeField && activeField !== field}
            >
              Edit Address
            </Button>
          )
        ) : (
          <Button
            className='profile-list-element-button'
            variant='contained'
            onClick={handlePasswordChangeClick}
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
      {user && user.geonameIds && user.geonameIds.country && (
        <>
          <ProfileImage user={user} loadData={loadData} baseURL={baseURL} />
          <Box className='profile-list'>
            {renderEditableField('Email:', user.email, 'email')}
            <Divider />
            {renderEditableField('Name:', user.name, 'name')}
            <Divider />
            {renderEditableField('Phone:', user.phone_number, 'phone_number')}
            <Divider />
            {renderEditableField('Full Address:', user.full_address, 'full_address')}
            <Divider />
            {renderEditableField('Password:', '***********', 'password')}
            <Divider />
            <PasswordChangeDialog
              open={openPasswordDialog}
              onClose={() => setOpenPasswordDialog(false)}
              updateUser={updateUser}
              loadData={loadData}
            />
            <AddressEditDialog
              open={openAddressDialog}
              onClose={handleAddressEditClose}
              user={user}
              setUser={setUser}
            />
          </Box>
        </>
      )}
    </Box>
  )
}

export default Profile
