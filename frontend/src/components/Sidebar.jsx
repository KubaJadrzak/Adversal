import React, { useState } from 'react'
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Sidebar.css'

function Sidebar({ items, onAlignmentChange, alignment }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null) // New state to track currently selected item
  const theme = useTheme()
  const isMobile = useMediaQuery('(max-width:900px)')

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      onAlignmentChange(newAlignment)
      setSelectedItem(newAlignment) // Update selected item
    }
    setDrawerOpen(false)
  }

  return (
    <Box className='sidebar-container'>
      {isMobile ? (
        <>
          <Box
            className='sidebar-items-menu'
            onClick={() => setDrawerOpen(true)}
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            <Box className='sidebar-items-menu-icon'>
              <FontAwesomeIcon icon={faBars} />
            </Box>
            <Drawer anchor='left' open={drawerOpen} onClose={() => setDrawerOpen(false)}>
              <List>
                {items.map((item) => (
                  <ListItem
                    button
                    key={item.id}
                    onClick={() => {
                      handleAlignment(null, item.id) // Pass null for event and item id for newAlignment
                    }}
                  >
                    <ListItemText primary={item.name} />
                  </ListItem>
                ))}
              </List>
            </Drawer>
            <Box ml={1}>
              <ListItemText
                primary={
                  selectedItem
                    ? items.find((item) => item.id === selectedItem)?.name
                    : 'Choose Item'
                }
              />
            </Box>
          </Box>
        </>
      ) : (
        <ToggleButtonGroup
          orientation='vertical'
          value={alignment}
          exclusive
          className='sidebar-items-group'
          onChange={handleAlignment}
        >
          {items.map((item) => (
            <ToggleButton key={item.id} value={item.id} className='sidebar-items-button'>
              {item.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
    </Box>
  )
}

export default Sidebar
