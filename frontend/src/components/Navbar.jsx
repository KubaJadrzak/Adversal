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
import { faUser, faHome, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchBar from './SearchBar'
import { useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'
import Adversal from '../assets/adversal-yellow.png'

function Navbar() {
  const [alignment, setAlignment] = React.useState('left')

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment)
  }
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = ({ query }) => {
    const currentPath = location.pathname
    const currentSearch = location.search
    const searchParams = new URLSearchParams(currentSearch)

    searchParams.set('query', encodeURIComponent(query))

    if (currentPath.includes('/products')) {
      navigate(`${currentPath}?${searchParams.toString()}`)
    } else {
      navigate(`/products?${searchParams.toString()}`)
    }
  }

  const isLoginPage = location.pathname.includes('login')

  if (isLoginPage) {
    return null
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box className='navbar'>
        <Box className='navbar-top'>
          <IconButton
            onClick={() => {
              navigate(`/`)
            }}
          >
            <FontAwesomeIcon icon={faHome} className='navbar-icon' />
          </IconButton>

          <img src={Adversal} alt='logo' style={{ width: '60px', height: '60px' }} />

          <IconButton
            onClick={() => {
              navigate(`/account`)
            }}
          >
            <FontAwesomeIcon icon={faUser} className='navbar-icon' />
          </IconButton>
        </Box>
        <Box className='navbar-bottom'>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label='text alignment'
          >
            <ToggleButton value='camping' className='navbar-bottom-toggle-button'>
              camping
            </ToggleButton>
            <ToggleButton value='furniture' className='navbar-bottom-toggle-button'>
              furniture
            </ToggleButton>
            <ToggleButton value='electronics' className='navbar-bottom-toggle-button'>
              electronics
            </ToggleButton>
            <ToggleButton value='appliances' className='navbar-bottom-toggle-button'>
              appliances
            </ToggleButton>
            <ToggleButton value='clothes' className='navbar-bottom-toggle-button'>
              clothes
            </ToggleButton>
          </ToggleButtonGroup>
          <Box className='navbar-search'>
            {!location.pathname.includes('/account') && <SearchBar handleSubmit={handleSubmit} />}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar
