import React, { useEffect, useState } from 'react'
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import './Sidebar.css'

function Sidebar({ subcategories }) {
  const [alignment, setAlignment] = React.useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const subcategory = params.get('subcategory')

    if (subcategory) {
      setAlignment(parseInt(subcategory, 10))
    }
  })

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      const params = new URLSearchParams(location.search)
      const category = params.get('category')
      navigate(`/?category=${category}&subcategory=${newAlignment}`)
    }
  }

  return (
    <Box className='sidebar-container'>
      <ToggleButtonGroup
        orientation='vertical'
        value={alignment}
        exclusive
        className='sidebar-toggle-group'
        onChange={handleAlignment}
      >
        {subcategories.map((subcategory, index) => (
          <ToggleButton
            key={subcategory.id}
            value={subcategory.id}
            className='sidebar-toggle-button'
          >
            {subcategory.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  )
}

export default Sidebar
