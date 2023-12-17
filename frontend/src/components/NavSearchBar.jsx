import React from "react";
import { useState } from "react"
import { TextField, Card, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './NavSearchBar.css'

function NavSearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      navigate(`/products?query=${encodeURIComponent(query)}`)
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
        value={query}
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

export default NavSearchBar