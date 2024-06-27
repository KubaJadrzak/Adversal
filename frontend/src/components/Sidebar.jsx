import React from 'react'
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material'
import './Sidebar.css'
import PriceFilter from '../components/PriceFilter' // Adjust the import path as necessary

function Sidebar({ items, onAlignmentChange, alignment, onFilterChange }) {
  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      onAlignmentChange(newAlignment)
    }
  }

  const isAccountPage = window.location.pathname.includes('/account')

  return (
    <Box className={`sidebar-container ${isAccountPage ? 'sidebar-account' : ''}`}>
      <Box className='sidebar-toggle-group-container'>
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
        {!isAccountPage && <PriceFilter />}
      </Box>
    </Box>
  )
}

export default Sidebar
