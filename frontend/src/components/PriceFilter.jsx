import React, { useState, useEffect } from 'react'
import { Popover, TextField, Box, ToggleButton } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useLocation, useNavigate } from 'react-router-dom'

const PriceFilter = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const minPriceParam = searchParams.get('min_price')
    const maxPriceParam = searchParams.get('max_price')
    setMinPrice(minPriceParam || '')
    setMaxPrice(maxPriceParam || '')
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

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div>
      <ToggleButton
        value='check'
        selected={open}
        onClick={handleClick}
        style={{ textTransform: 'none' }}
      >
        PRICE <FontAwesomeIcon icon={faChevronDown} style={{ marginLeft: 4 }} />
      </ToggleButton>
      <Popover
        id={id}
        open={open}
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
            style={{ textTransform: 'none' }}
          >
            APPLY FILTERS
          </ToggleButton>
        </Box>
      </Popover>
    </div>
  )
}

export default PriceFilter
