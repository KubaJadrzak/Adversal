import React, { useState, useEffect } from 'react'
import {
  Box,
  TextField,
  Autocomplete,
  Popover,
  ToggleButton,
  IconButton,
  useTheme,
} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchAddresses } from '../api/addressApi'

const LocationFilter = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [country, setCountry] = useState(null)
  const [subdivision, setSubdivision] = useState(null)
  const [county, setCounty] = useState(null)
  const [area, setArea] = useState(null)
  const [place, setPlace] = useState(null)
  const [countries, setCountries] = useState([])
  const [subdivisions, setSubdivisions] = useState([])
  const [counties, setCounties] = useState([])
  const [areas, setAreas] = useState([])
  const [places, setPlaces] = useState([])
  const location = useLocation()
  const navigate = useNavigate()
  const theme = useTheme()

  useEffect(() => {
    loadAddresses('country')
    prefillLocationFilter()
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const category = params.get('category')
    const subcategory = params.get('subcategory')

    // Reset location filter when category or subcategory changes
    resetLocationFilter()

    // Prefill location filter with new parameters
    prefillLocationFilter()
  }, [location.search])

  const prefillLocationFilter = async () => {
    const params = new URLSearchParams(location.search)
    const countryId = params.get('country_id')
    const subdivisionId = params.get('subdivision_id')
    const countyId = params.get('county_id')
    const areaId = params.get('area_id')
    const placeId = params.get('place_id')

    if (countryId) {
      const countryData = await fetchAddresses('country')
      const selectedCountry = countryData.find((c) => c.id === parseInt(countryId))
      if (selectedCountry) {
        setCountry(selectedCountry)
        // Reset lower level address parts
        setSubdivisions([])
        setSubdivision(null)
        setCounties([])
        setCounty(null)
        setAreas([])
        setArea(null)
        setPlaces([])
        setPlace(null)
        // Load subdivisions for the selected country
        loadAddresses('subdivision', '', selectedCountry.id)
      }
    }

    if (subdivisionId && countryId) {
      const subdivisionData = await fetchAddresses('subdivision', '', countryId)
      const selectedSubdivision = subdivisionData.find((s) => s.id === parseInt(subdivisionId))
      setSubdivision(selectedSubdivision)
      if (selectedSubdivision) {
        loadAddresses('county', '', selectedSubdivision.id)
      }
    }

    if (countyId && subdivisionId) {
      const countyData = await fetchAddresses('county', '', subdivisionId)
      const selectedCounty = countyData.find((c) => c.id === parseInt(countyId))
      setCounty(selectedCounty)
      if (selectedCounty) {
        loadAddresses('area', '', selectedCounty.id)
      }
    }

    if (areaId && countyId) {
      const areaData = await fetchAddresses('area', '', countyId)
      const selectedArea = areaData.find((a) => a.id === parseInt(areaId))
      setArea(selectedArea)
      if (selectedArea) {
        loadAddresses('place', '', selectedArea.id)
      }
    }

    if (placeId && areaId) {
      const placeData = await fetchAddresses('place', '', areaId)
      const selectedPlace = placeData.find((p) => p.id === parseInt(placeId))
      setPlace(selectedPlace)
    }
  }

  const resetLocationFilter = () => {
    setCountry(null)
    setSubdivision(null)
    setCounty(null)
    setArea(null)
    setPlace(null)
    setSubdivisions([])
    setCounties([])
    setAreas([])
    setPlaces([])
  }

  const loadAddresses = async (type, query = '', id = '') => {
    try {
      const data = await fetchAddresses(type, query, id)
      switch (type) {
        case 'country':
          setCountries(data)
          break
        case 'subdivision':
          setSubdivisions(data)
          break
        case 'county':
          setCounties(data)
          break
        case 'area':
          setAreas(data)
          break
        case 'place':
          setPlaces(data)
          break
        default:
          break
      }
    } catch (error) {
      console.error(`Error fetching ${type}:`, error)
    }
  }

  const handleFilterChange = () => {
    const params = new URLSearchParams(location.search)
    if (country) {
      params.set('country_id', country.id)
    } else {
      params.delete('country_id')
    }
    if (subdivision) {
      params.set('subdivision_id', subdivision.id)
    } else {
      params.delete('subdivision_id')
    }
    if (county) {
      params.set('county_id', county.id)
    } else {
      params.delete('county_id')
    }
    if (area) {
      params.set('area_id', area.id)
    } else {
      params.delete('area_id')
    }
    if (place) {
      params.set('place_id', place.id)
    } else {
      params.delete('place_id')
    }
    const newSearch = params.toString() ? `?${params.toString()}` : ''
    navigate(`/${newSearch}`)
    handleClose()
  }

  const handleResetFilters = () => {
    const params = new URLSearchParams(location.search)
    params.delete('country_id')
    params.delete('subdivision_id')
    params.delete('county_id')
    params.delete('area_id')
    params.delete('place_id')
    const newSearch = params.toString() ? `?${params.toString()}` : ''
    navigate(`/${newSearch}`)
    resetLocationFilter()
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  // Check if there are active filters in the URL
  const searchParams = new URLSearchParams(location.search)
  const isFilterActive =
    searchParams.has('country_id') ||
    searchParams.has('subdivision_id') ||
    searchParams.has('county_id') ||
    searchParams.has('area_id') ||
    searchParams.has('place_id')

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
          LOCATION <FontAwesomeIcon icon={faChevronDown} style={{ marginLeft: 4 }} />
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
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box p={2} display='flex' flexDirection='column' gap={2} sx={{ width: 300 }}>
          <Autocomplete
            options={countries}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(e, value) => {
              if (value) {
                setCountry(value)
                // Reset lower level address parts
                setSubdivisions([])
                setSubdivision(null)
                setCounties([])
                setCounty(null)
                setAreas([])
                setArea(null)
                setPlaces([])
                setPlace(null)
                // Load subdivisions for the selected country
                loadAddresses('subdivision', '', value.id)
              } else {
                setCountry(null)
                setSubdivisions([])
                setSubdivision(null)
                setCounties([])
                setCounty(null)
                setAreas([])
                setArea(null)
                setPlaces([])
                setPlace(null)
              }
            }}
            value={country}
            renderInput={(params) => <TextField {...params} label='Country' variant='outlined' />}
          />
          {country && subdivisions.length > 0 && (
            <Autocomplete
              options={subdivisions}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(e, value) => {
                if (value) {
                  setSubdivision(value)
                  setCounties([])
                  setCounty(null)
                  loadAddresses('county', '', value.id)
                } else {
                  setSubdivision(null)
                  setCounties([])
                  setCounty(null)
                }
              }}
              value={subdivision}
              renderInput={(params) => (
                <TextField {...params} label='Subdivision' variant='outlined' />
              )}
            />
          )}
          {country && subdivision && counties.length > 0 && (
            <Autocomplete
              options={counties}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(e, value) => {
                if (value) {
                  setCounty(value)
                  setAreas([])
                  setArea(null)
                  loadAddresses('area', '', value.id)
                } else {
                  setCounty(null)
                  setAreas([])
                  setArea(null)
                }
              }}
              value={county}
              renderInput={(params) => <TextField {...params} label='County' variant='outlined' />}
            />
          )}
          {country && subdivision && county && areas.length > 0 && (
            <Autocomplete
              options={areas}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(e, value) => {
                if (value) {
                  setArea(value)
                  setPlaces([])
                  setPlace(null)
                  loadAddresses('place', '', value.id)
                } else {
                  setArea(null)
                  setPlaces([])
                  setPlace(null)
                }
              }}
              value={area}
              renderInput={(params) => <TextField {...params} label='Area' variant='outlined' />}
            />
          )}
          {country && subdivision && county && area && places.length > 0 && (
            <Autocomplete
              options={places}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(e, value) => {
                if (value) {
                  setPlace(value)
                } else {
                  setPlace(null)
                }
              }}
              value={place}
              renderInput={(params) => <TextField {...params} label='Place' variant='outlined' />}
            />
          )}
          <ToggleButton
            value='apply'
            selected={false}
            onClick={handleFilterChange}
            style={{ textTransform: 'none' }}
            sx={{
              color: theme.palette.primary.contrastText,
              backgroundColor: theme.palette.primary.main,
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

export default LocationFilter
