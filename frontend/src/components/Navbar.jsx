import React, { useEffect } from 'react'
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
  const [alignment, setAlignment] = React.useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Parse the category from the URL query parameter
    const params = new URLSearchParams(location.search)
    const category = params.get('category')

    // Set the alignment state based on the category in the URL
    if (category) {
      setAlignment(category)
    }
  }, [location.search])

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment)
      const encodedCategory = encodeURIComponent(newAlignment)
      navigate(`/products?category=${encodedCategory}`)
    }
  }

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
            <FontAwesomeIcon icon={faHome} />
          </IconButton>

          <img src={Adversal} alt='logo' style={{ width: '60px', height: '60px' }} />

          <IconButton
            onClick={() => {
              navigate(`/account`)
            }}
          >
            <FontAwesomeIcon icon={faUser} />
          </IconButton>
        </Box>
        <Box className='navbar-bottom'>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            className='navbar-bottom-toggle-group'
          >
            <ToggleButton value='Camping' className='navbar-bottom-toggle-button'>
              camping
            </ToggleButton>
            <ToggleButton value='Furniture' className='navbar-bottom-toggle-button'>
              furniture
            </ToggleButton>
            <ToggleButton value='Electronics' className='navbar-bottom-toggle-button'>
              electronics
            </ToggleButton>
            <ToggleButton value='Appliances' className='navbar-bottom-toggle-button'>
              appliances
            </ToggleButton>
            <ToggleButton value='Clothes' className='navbar-bottom-toggle-button'>
              clothes
            </ToggleButton>
          </ToggleButtonGroup>
          <Box className='navbar-bottom-search'>
            {!location.pathname.includes('/account') && <SearchBar handleSubmit={handleSubmit} />}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar
