import React, { useState, useEffect } from 'react'
import { TextField, InputAdornment } from '@mui/material'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation } from 'react-router-dom'
import './SearchBar.css'

function SearchBar({ handleSubmit }) {
  const location = useLocation()
  const [query, setQuery] = useState('')

  // Extract query parameter from URL on component mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const urlQuery = searchParams.get('query') || ''
    setQuery(urlQuery)
  }, [location.search])

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit({ query })
    }
  }

  return (
    <TextField
      className='search-form-field'
      size='small'
      placeholder='Search...'
      variant='standard'
      autoComplete='off'
      value={query} // Set value to display the query in the input field
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default SearchBar
