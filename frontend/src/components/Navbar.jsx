import React, { useEffect, useState } from 'react'
import {
  Box,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import { faUser, faHeart, faBars, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate, useLocation } from 'react-router-dom'
import { fetchAllCategories } from '../api/categoryApi'
import Adversal from '../assets/adversal-yellow.png'
import SearchBar from './SearchBar'
import useMediaQuery from '@mui/material/useMediaQuery'
import './Navbar.css'

function Navbar() {
  const [alignment, setAlignment] = useState(null)
  const [categories, setCategories] = useState([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [currentCategoryName, setCurrentCategoryName] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const isLoginPage = location.pathname.includes('login')
  const isPasswordResetPage = location.pathname.includes('reset')
  const isMobile = useMediaQuery('(max-width:1200px)')

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await fetchAllCategories()
        setCategories(categories)

        const params = new URLSearchParams(location.search)
        const category = params.get('category')

        if (category) {
          setAlignment(parseInt(category, 10))
          const selectedCategory = categories.find((cat) => cat.id === parseInt(category, 10))
          if (selectedCategory) {
            setCurrentCategoryName(selectedCategory.name)
          }
        } else {
          setAlignment(null)
          setCurrentCategoryName('')
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [location.search])

  useEffect(() => {
    if (!isMobile && drawerOpen) {
      setDrawerOpen(false)
    }
  }, [isMobile])

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      const selectedCategory = categories.find((cat) => cat.id === newAlignment)
      if (selectedCategory) {
        setCurrentCategoryName(selectedCategory.name)
      }
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

  if (isLoginPage || isPasswordResetPage) {
    return null
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box>
        <Box className='navbar-top'>
          <Box className='navbar-top-icons'></Box>
          <Box className='navbar-top-logo'>
            <img src={Adversal} alt='logo' style={{ width: '60px', height: '60px' }} />
          </Box>
          <Box className='navbar-top-icons'>
            <IconButton onClick={() => navigate(`/`)}>
              <FontAwesomeIcon icon={faHome} />
            </IconButton>
            <IconButton onClick={() => navigate(`/favorites`)}>
              <FontAwesomeIcon icon={faHeart} />
            </IconButton>
            <IconButton onClick={() => navigate(`/account?view=profile`)}>
              <FontAwesomeIcon icon={faUser} />
            </IconButton>
          </Box>
        </Box>

        <Box className='navbar-bottom'>
          {isMobile ? (
            <>
              <Box
                className='navbar-bottom-categories-menu'
                onClick={() => setDrawerOpen(true)}
                sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              >
                <Box className='navbar-bottom-categories-menu-icon'>
                  <FontAwesomeIcon icon={faBars} />
                </Box>
                <Box className='navbar-bottom-categories-menu-text'>
                  <Typography>{currentCategoryName || 'Choose Category'}</Typography>
                </Box>
              </Box>
              <Drawer anchor='left' open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 250 }} role='presentation'>
                  <List>
                    {categories.map((category) => (
                      <ListItem
                        button
                        key={category.id}
                        onClick={() => {
                          setCurrentCategoryName(category.name)
                          navigate(`/?category=${category.id}`)
                          setDrawerOpen(false)
                        }}
                      >
                        <ListItemText primary={category.name} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleAlignment}
              className='navbar-bottom-categories-group'
            >
              {categories.map((category) => (
                <ToggleButton
                  key={category.id}
                  value={category.id}
                  className='navbar-bottom-categories-button'
                >
                  {category.name}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          )}
          <Box className='navbar-bottom-search'>
            <SearchBar handleSubmit={handleSubmit} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar
