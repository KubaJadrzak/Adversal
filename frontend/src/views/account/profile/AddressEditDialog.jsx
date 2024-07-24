import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Button,
  TextField,
  Autocomplete,
} from '@mui/material'
import useAlert from '../../../components/alerts/useAlert'
import { updateUser } from '../../../api/userApi'
import { fetchAddresses } from '../../../api/addressApi' // Import the address API
import './AddressEditDialog.css'

function AddressEditDialog({ open, onClose, user, setUser }) {
  const { setAlert } = useAlert()
  const [address, setAddress] = useState(user.full_address)
  const [geonameIds, setGeonameIds] = useState(user.geonameIds || {})
  const [error, setError] = useState('')

  const [countries, setCountries] = useState([])
  const [subdivisions, setSubdivisions] = useState([])
  const [counties, setCounties] = useState([])
  const [areas, setAreas] = useState([])
  const [places, setPlaces] = useState([])
  const [country, setCountry] = useState(null)
  const [subdivision, setSubdivision] = useState(null)
  const [county, setCounty] = useState(null)
  const [area, setArea] = useState(null)
  const [place, setPlace] = useState(null)
  const [countryCode, setCountryCode] = useState(null)
  const [loading, setLoading] = useState(false)
  const [postalCode, setPostalCode] = useState(null)
  const [postalCodes, setPostalCodes] = useState([])

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Load countries if it hasn't been loaded before
        if (countries.length === 0) {
          const countryData = await fetchAddresses('country')
          setCountries(countryData)

          // Set selected country if geonameIds has a selected country
          if (geonameIds.country && countryData.length > 0) {
            const selectedCountry = countryData.find((c) => c.id === geonameIds.country)
            if (selectedCountry) {
              setCountry(selectedCountry)
              setCountryCode(selectedCountry.countryCode)
              if (geonameIds.country && postalCodes.length === 0) {
                const postalCodeData = await fetchAddresses(
                  'postal_code',
                  geonameIds.postal_code || '',
                  '',
                  selectedCountry.countryCode
                )

                setPostalCodes(postalCodeData)
                if (geonameIds.postal_code && postalCodeData.length > 0) {
                  const selectedPostalCode = postalCodeData.find(
                    (p) => p.postal_code === geonameIds.postal_code
                  )
                  if (selectedPostalCode) {
                    setPostalCode(selectedPostalCode)
                  }
                } else if (!geonameIds.country) {
                  // Reset postal code if country is unset
                  setPostalCodes([])
                  setPostalCode(null)
                }
              }
            }
          }
        }

        // Load subdivisions if geonameIds.country is set and subdivisions haven't been loaded
        if (geonameIds.country && subdivisions.length === 0) {
          const subdivisionData = await fetchAddresses('subdivision', '', geonameIds.country)
          setSubdivisions(subdivisionData)

          // Set selected subdivision if geonameIds has a selected subdivision
          if (geonameIds.subdivision && subdivisionData.length > 0) {
            const selectedSubdivision = subdivisionData.find((s) => s.id === geonameIds.subdivision)
            if (selectedSubdivision) {
              setSubdivision(selectedSubdivision)
            }
          }
        } else if (!geonameIds.country) {
          // Reset subdivisions if country is unset
          setSubdivisions([])
          setSubdivision(null)
        }

        // Load counties if geonameIds.subdivision is set and counties haven't been loaded
        if (geonameIds.subdivision && counties.length === 0) {
          const countyData = await fetchAddresses('county', '', geonameIds.subdivision)
          setCounties(countyData)

          // Set selected county if geonameIds has a selected county
          if (geonameIds.county && countyData.length > 0) {
            const selectedCounty = countyData.find((c) => c.id === geonameIds.county)
            if (selectedCounty) {
              setCounty(selectedCounty)
            }
          }
        } else if (!geonameIds.subdivision) {
          // Reset counties if subdivision is unset
          setCounties([])
          setCounty(null)
        }

        // Load areas if geonameIds.county is set and areas haven't been loaded
        if (geonameIds.county && areas.length === 0) {
          const areaData = await fetchAddresses('area', '', geonameIds.county)
          setAreas(areaData)

          // Set selected area if geonameIds has a selected area
          if (geonameIds.area && areaData.length > 0) {
            const selectedArea = areaData.find((a) => a.id === geonameIds.area)
            if (selectedArea) {
              setArea(selectedArea)
            }
          }
        } else if (!geonameIds.county) {
          // Reset areas if county is unset
          setAreas([])
          setArea(null)
        }

        // Load places if geonameIds.area is set and places haven't been loaded
        if (geonameIds.area && places.length === 0) {
          const placeData = await fetchAddresses('place', '', geonameIds.area)
          setPlaces(placeData)

          // Set selected place if geonameIds has a selected place
          if (geonameIds.place && placeData.length > 0) {
            const selectedPlace = placeData.find((p) => p.id === geonameIds.place)
            if (selectedPlace) {
              setPlace(selectedPlace)
            }
          }
        } else if (!geonameIds.area) {
          // Reset places if area is unset
          setPlaces([])
          setPlace(null)
        }
      } catch (error) {
        console.error('Error loading initial data:', error)
      }
    }

    loadInitialData()
  }, []) // Empty dependency array ensures this runs only once after initial render

  const loadAddresses = async (type, query, id, country_code) => {
    setLoading(true)
    try {
      const data = await fetchAddresses(type, query, id, country_code)
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
        case 'postal_code':
          setPostalCodes(data)
          break
        default:
          break
      }
    } catch (error) {
      console.error(`Error fetching ${type}:`, error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()

    try {
      await updateUser(localStorage.getItem('id'), {
        place_geoname_id: place ? place.id : '',
        area_geoname_id: area ? area.id : '',
        county_geoname_id: county ? county.id : '',
        subdivision_geoname_id: subdivision ? subdivision.id : '',
        country_geoname_id: country ? country.id : '',
        country_name: country ? country.name : '',
        subdivision_name: subdivision ? subdivision.name : '',
        county_name: county ? county.name : '',
        area_name: area ? area.name : '',
        place_name: place ? place.name : '',
        postal_code: postalCode ? postalCode.postal_code : '',
      })
      setUser({
        ...user,
        geonameIds,
      })
      setAlert('Address updated successfully!', 'success')
      onClose()
    } catch (error) {
      console.error('Failed to update address:', error)
      setAlert('Failed to update address!', 'error')
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>Edit Address</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSave}>
          <Autocomplete
            className='address-form-element'
            options={countries}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(e, value) => {
              if (value) {
                setCountry(value)
                setCountryCode(value.countryCode)
                // Reset lower level address parts
                setSubdivisions([])
                setSubdivision(null)
                setCounties([])
                setCounty(null)
                setAreas([])
                setArea(null)
                setPlaces([])
                setPlace(null)
                setPostalCode(null)
                // Load subdivisions for the selected country
                loadAddresses('subdivision', '', value.id)
                loadAddresses('postal_code', '', '', value.countryCode)
              } else {
                setCountry(null)
                setGeonameIds({ ...geonameIds, country: null })
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
            renderInput={(params) => (
              <TextField
                {...params}
                label='Country'
                variant='outlined'
                InputProps={{
                  ...params.InputProps,
                }}
              />
            )}
          />
          {country && subdivisions.length > 0 && (
            <Autocomplete
              className='address-form-element'
              options={subdivisions}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(e, value) => {
                if (value) {
                  setSubdivision(value)
                  // Reset lower level address parts
                  setCounties([])
                  setCounty(null)
                  setAreas([])
                  setArea(null)
                  // Load counties for the selected subdivision
                  loadAddresses('county', '', value.id)
                } else {
                  setSubdivision(null)
                  setCounties([])
                  setCounty(null)
                  setAreas([])
                  setArea(null)
                }
              }}
              value={subdivision}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Subdivision'
                  variant='outlined'
                  InputProps={{
                    ...params.InputProps,
                  }}
                />
              )}
            />
          )}
          {subdivision && counties.length > 0 && (
            <Autocomplete
              className='address-form-element'
              options={counties}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(e, value) => {
                if (value) {
                  setCounty(value)
                  // Reset lower level address parts
                  setAreas([])
                  setArea(null)
                  // Load areas for the selected county
                  loadAddresses('area', '', value.id)
                } else {
                  setCounty(null)
                  setAreas([])
                  setArea(null)
                }
              }}
              value={county}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='County'
                  variant='outlined'
                  InputProps={{
                    ...params.InputProps,
                  }}
                />
              )}
            />
          )}
          {subdivision && county && areas.length > 0 && (
            <Autocomplete
              className='address-form-element'
              options={areas}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(e, value) => {
                if (value) {
                  setArea(value)
                  // Reset lower level address parts
                  setPlaces([])
                  setPlace(null)
                  // Load places for the selected area
                  loadAddresses('place', '', value.id)
                } else {
                  setArea(null)
                  setPlaces([])
                  setPlace(null)
                }
              }}
              value={area}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Area'
                  variant='outlined'
                  InputProps={{
                    ...params.InputProps,
                  }}
                />
              )}
            />
          )}
          {subdivision && county && area && places.length > 0 && (
            <Autocomplete
              className='address-form-element'
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
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Place'
                  variant='outlined'
                  InputProps={{
                    ...params.InputProps,
                  }}
                />
              )}
            />
          )}
          {country && postalCodes.length > 0 && (
            <Autocomplete
              className='address-form-element'
              options={postalCodes}
              value={postalCode || null} // Use null instead of empty string
              getOptionLabel={(option) => option.postal_code}
              isOptionEqualToValue={(option, value) => option.postal_code === value.postal_code}
              onInputChange={(e, value) => {
                loadAddresses('postal_code', value, '', countryCode)
              }}
              onChange={(e, value) => {
                if (value) {
                  setPostalCode(value)
                } else {
                  setPostalCode(null) // Set to null for consistency
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Postal Code'
                  variant='outlined'
                  InputProps={{
                    ...params.InputProps,
                  }}
                />
              )}
            />
          )}

          <Box className='dialog-actions'>
            <Button onClick={onClose} variant='outlined' color='secondary'>
              Cancel
            </Button>
            <Button variant='contained' type='submit'>
              Save
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddressEditDialog
