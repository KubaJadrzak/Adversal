import React from 'react'
import {
  Box,
  Toolbar,
  IconButton,
  Typography,
  Link,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import './ProductsSidebar.css'

function ProductsSidebar() {
  const [alignment, setAlignment] = React.useState()
  return (
    <Box className='products-sidebar-container'>
      <ToggleButtonGroup
        orientation='vertical'
        value={alignment}
        exclusive
        onChange={setAlignment}
        className='products-sidebar-toggle-group'
      >
        <ToggleButton value='Camping' className='products-sidebar-toggle-button'>
          women clothes
        </ToggleButton>
        <ToggleButton value='Furniture' className='products-sidebar-toggle-button'>
          men clothes
        </ToggleButton>
        <ToggleButton value='Electronics' className='products-sidebar-toggle-button'>
          women shoes
        </ToggleButton>
        <ToggleButton value='Appliances' className='products-sidebar-toggle-button'>
          men shoes
        </ToggleButton>
        <ToggleButton value='Clothes' className='products-sidebar-toggle-button'>
          women accessories
        </ToggleButton>
        <ToggleButton value='Clothes' className='products-sidebar-toggle-button'>
          men accessories
        </ToggleButton>
        <ToggleButton value='Clothes' className='products-sidebar-toggle-button'>
          jewerly
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  )
}
export default ProductsSidebar
