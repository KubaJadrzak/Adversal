import React, { useEffect, useState } from 'react'
import { Box, IconButton, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { faUser, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate, useLocation } from 'react-router-dom'
import { fetchAllCategories } from '../api/categoryApi'

import Adversal from '../assets/adversal-yellow.png'
import SearchBar from './SearchBar'

import './Navbar.css'

function Navbar() {
  const [alignment, setAlignment] = useState(null)
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()
  const location = useLocation()

  const isLoginPage = location.pathname.includes('login')

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await fetchAllCategories()
        setCategories(categories)

        const params = new URLSearchParams(location.search)
        const category = params.get('category')

        if (category) {
          setAlignment(parseInt(category, 10))
        } else {
          setAlignment(null)
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [location.search])

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      navigate(`/?category=${newAlignment}`)
    }
  }

  const handleSubmit = ({ query }) => {
    const currentPath = location.pathname
    const currentSearch = location.search
    const searchParams = new URLSearchParams(currentSearch)

    searchParams.set('query', encodeURIComponent(query))

    if (currentPath.includes('/category')) {
      navigate(`${currentPath}?${searchParams.toString()}`)
    } else {
      navigate(`/?${searchParams.toString()}`)
    }
  }

  if (isLoginPage) {
    return null
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box>
        <Box className='navbar-top'>
          <Box className='navbar-top-icon'>
            <IconButton onClick={() => navigate(`/`)}>
              <FontAwesomeIcon icon={faHome} />
            </IconButton>
          </Box>
          <img src={Adversal} alt='logo' style={{ width: '60px', height: '60px' }} />
          <Box className='navbar-top-icon'>
            <IconButton onClick={() => navigate(`/`)}>
              <FontAwesomeIcon icon={faUser} />
            </IconButton>
          </Box>
        </Box>
        <Box className='navbar-bottom'>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            className='navbar-bottom-toggle-group'
          >
            {categories.map((category) => (
              <ToggleButton
                key={category.id}
                value={category.id}
                className='navbar-bottom-toggle-button'
              >
                {category.name}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <Box className='navbar-bottom-search'>
            <SearchBar handleSubmit={handleSubmit} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar
