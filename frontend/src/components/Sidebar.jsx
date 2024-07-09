import React from 'react'
import { Box, ToggleButton, ToggleButtonGroup, Divider } from '@mui/material'
import './Sidebar.css'
import PriceFilter from '../components/PriceFilter' // Adjust the import path as necessary

function Sidebar({ items, onAlignmentChange, alignment, onFilterChange }) {
  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      onAlignmentChange(newAlignment)
    }
  }

  const isProductPage =
    !window.location.pathname.includes('/account') && !window.location.pathname.includes('/seller')
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
      {isProductPage && <Divider />}
      {isProductPage && <PriceFilter />}
    </Box>
  )
}

export default Sidebar
