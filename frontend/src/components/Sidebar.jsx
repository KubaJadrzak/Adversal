import React from 'react'
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material'
import './Sidebar.css'

function Sidebar({ items, onAlignmentChange, alignment }) {
  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      onAlignmentChange(newAlignment)
    }
  }

  const isAccountPage = window.location.pathname.includes('/account')

  return (
    <Box className={`sidebar-container ${isAccountPage ? 'sidebar-account' : ''}`}>
      <ToggleButtonGroup
        orientation='vertical'
        value={alignment}
        exclusive
        className='sidebar-toggle-group'
        onChange={handleAlignment}
        fullWidth={isAccountPage} // Conditionally set fullWidth based on isAccountPage
      >
        {items.map((item) => (
          <ToggleButton key={item.id} value={item.id} className='sidebar-toggle-button'>
            {item.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  )
}

export default Sidebar
