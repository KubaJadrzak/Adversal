import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, TextField, Button, Autocomplete } from '@mui/material'
import { signupUser } from '../../api/authApi'
import { fetchAddresses } from '../../api/addressApi'
import Adversal from '../../assets/adversal-yellow.png'
import './Login.css'

function SignUp() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [country, setCountry] = useState(null)
  const [countryCode, setCountryCode] = useState('')
  const [place, setPlace] = useState('')
  const [places, setPlaces] = useState([])
  const [subdivision, setSubdivision] = useState(null)
  const [area, setArea] = useState('')
  const [county, setCounty] = useState('')
  const [counties, setCounties] = useState([])
  const [postalCode, setPostalCode] = useState('')
  const [countries, setCountries] = useState([])
  const [subdivisions, setSubdivisions] = useState([])
  const [areas, setAreas] = useState([])
  const [postalCodes, setPostalCodes] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadAddresses('country')
  }, [])

  const loadAddresses = async (type, query, id, country_code) => {
    setLoading(true)
    try {
      const data = await fetchAddresses(type, query, id, country_code)
      console.log(`Fetching ${type}:`, data)
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!country) {
      console.error('Country is required')
      return
    }

    const data = {
      user: {
        email,
        name,
        password,
        password_confirmation: confirmPassword,
        phone_number: phoneNumber,
        country_name: country.name,
        country_geoname_id: country.id,
        subdivision_name: subdivision ? subdivision.name : '',
        subdivision_geoname_id: subdivision ? subdivision.id : null,
        county_name: county ? county.name : '',
        county_geoname_id: county ? county.id : null,
        area_name: area ? area.name : '',
        area_geoname_id: area ? area.id : null,
        place_name: place ? place.name : '',
        place_geoname_id: place ? place.id : null,
        postal_code: postalCode ? postalCode : '',
      },
    }

    console.log(data)
    try {
      await signupUser(data)
      navigate('/login/email')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box className='login-container'>
      <img src={Adversal} alt='logo' className='login-logo' />
      <form onSubmit={handleSubmit} className='login-form'>
        <TextField
          required
          className='login-form-element'
          id='email'
          label='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          className='login-form-element'
          id='name'
          label='Name'
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          required
          className='login-form-element'
          id='phone-number'
          label='Phone Number'
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <TextField
          required
          className='login-form-element'
          id='password'
          label='Password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          required
          className='login-form-element'
          id='confirm-password'
          label='Confirm Password'
          type='password'
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Autocomplete
          className='login-form-element'
          options={countries}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(e, value) => {
            if (value) {
              setCountry(value)
              setCountryCode(value.countryCode)
              setSubdivisions([])
              setSubdivision(null)
              loadAddresses('subdivision', '', value.id)
              loadAddresses('postal_code', '', '', value.countryCode)
            } else {
              setCountry(null)
              setCountryCode(null)
              setSubdivisions([])
              setSubdivision(null)
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
            className='login-form-element'
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
            className='login-form-element'
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
            className='login-form-element'
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
            className='login-form-element'
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
            className='login-form-element'
            options={postalCodes}
            getOptionLabel={(option) => option.postal_code}
            isOptionEqualToValue={(option, value) => option.postalCode === value.postalCode}
            onInputChange={(e, value) => loadAddresses('postal_code', value, '', countryCode)}
            onChange={(e, value) => {
              if (value) {
                setPostalCode(value.postal_code)
              } else {
                setPostalCode('')
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

        <Button
          className='login-form-button'
          variant='outlined'
          color='secondary'
          type='button'
          onClick={() => {
            navigate(`/login`)
          }}
        >
          Back to login
        </Button>
        <Button className='login-form-button' variant='contained' type='submit'>
          Sign Up
        </Button>
      </form>
    </Box>
  )
}

export default SignUp
