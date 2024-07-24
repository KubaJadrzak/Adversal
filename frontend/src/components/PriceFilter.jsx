import React, { useState, useEffect } from 'react'
import { Popover, TextField, Box, ToggleButton, IconButton, useTheme } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useLocation, useNavigate } from 'react-router-dom'

const PriceFilter = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [isFilterActive, setIsFilterActive] = useState(false) // Track if filters are active
  const location = useLocation()
  const navigate = useNavigate()
  const theme = useTheme() // Access MUI theme

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const minPriceParam = searchParams.get('min_price')
    const maxPriceParam = searchParams.get('max_price')
    setMinPrice(minPriceParam || '')
    setMaxPrice(maxPriceParam || '')

    // Check if filters are active
    setIsFilterActive(!!(minPriceParam || maxPriceParam))
  }, [location.search])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleFilterChange = () => {
    const params = new URLSearchParams(location.search)
    if (minPrice) {
      params.set('min_price', minPrice)
    } else {
      params.delete('min_price')
    }
    if (maxPrice) {
      params.set('max_price', maxPrice)
    } else {
      params.delete('max_price')
    }
    const newSearch = params.toString() ? `?${params.toString()}` : ''
    navigate(`/${newSearch}`)
    handleClose()
  }

  const handleResetFilters = () => {
    const params = new URLSearchParams(location.search)
    params.delete('min_price')
    params.delete('max_price')
    const newSearch = params.toString() ? `?${params.toString()}` : ''
    navigate(`/${newSearch}`)
    setMinPrice('')
    setMaxPrice('')
    setIsFilterActive(false)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <ToggleButton
          value='check'
          selected={open}
          onClick={handleClick}
          sx={{
            textTransform: 'none',
            color: isFilterActive ? theme.palette.primary.contrastText : theme.palette.text.primary,
            backgroundColor: isFilterActive ? theme.palette.primary.main : 'transparent',
            '&:hover': {
              backgroundColor: isFilterActive
                ? theme.palette.primary.dark
                : theme.palette.action.hover,
            },
            border: isFilterActive
              ? `1px solid ${theme.palette.primary.main}`
              : `1px solid ${theme.palette.divider}`,
            paddingRight: isFilterActive ? '30px' : 'default', // Conditionally apply paddingRight
          }}
        >
          PRICE <FontAwesomeIcon icon={faChevronDown} style={{ marginLeft: 4 }} />
        </ToggleButton>
        {isFilterActive && (
          <IconButton
            size='small'
            onClick={handleResetFilters}
            sx={{
              position: 'absolute',
              right: 4,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
        )}
      </div>
      <Popover
        id={id}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box p={2} display='flex' flexDirection='column' gap={2}>
          <TextField
            label='Min Price'
            type='number'
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <TextField
            label='Max Price'
            type='number'
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <ToggleButton
            value='apply'
            selected={false}
            onClick={handleFilterChange}
            sx={{
              textTransform: 'none',
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            APPLY FILTERS
          </ToggleButton>
        </Box>
      </Popover>
    </div>
  )
}

export default PriceFilter
