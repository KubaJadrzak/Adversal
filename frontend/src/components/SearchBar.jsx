import React from "react";
import { useState } from "react"
import { TextField, Card, InputAdornment } from "@mui/material";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './SearchBar.css'

function SearchBar({handleSubmit}) {

  const [query, setQuery] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit({query})
    }
  };

  return (
    <Card className='search-form-card'>
      <TextField
        className='search-form-field'
        size="small"
        placeholder="Search..."
        variant="outlined"
        autoComplete="off"
        defaultValue=''
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </InputAdornment>
          ),
        }}
      />
    </Card>
  );
}

export default SearchBar