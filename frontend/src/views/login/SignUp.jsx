import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, TextField, Button, Autocomplete } from '@mui/material'
import { signupUser } from '../../api/authApi'
import Adversal from '../../assets/adversal-yellow.png'
import './Login.css'
import axios from 'axios'

function SignUp() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [country, setCountry] = useState(null) // Changed initial state to null
  const [countryCode, setCountryCode] = useState('')
  const [subdivisionId, setSubdivisionId] = useState('')
  const [place, setPlace] = useState('')
  const [places, setPlaces] = useState([])
  const [subdivision, setSubdivision] = useState(null) // Changed initial state to null
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
    fetchAddresses('country')
  }, [])

  const fetchAddresses = async (type, query, id, country_code) => {
    setLoading(true)
    try {
      const response = await axios.get(`http://localhost:3000/addresses/search`, {
        params: { type, query, id, country_code },
      })
      console.log(`Fetching ${type}:`, response.data)
      switch (type) {
        case 'country':
          setCountries(response.data)
          break
        case 'subdivision':
          setSubdivisions(response.data)
          break
        case 'county':
          setCounties(response.data)
          break
        case 'area':
          setAreas(response.data)
          break
        case 'place':
          setPlaces(response.data)
          break
        case 'postal_code':
          setPostalCodes(response.data)
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

    const data = {
      user: {
        email,
        name,
        password,
        password_confirmation: confirmPassword,
        phone_number: phoneNumber,
        address: {
          country,
          subdivision,
          area,
          postal_code: postalCode,
        },
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
          isOptionEqualToValue={(option, value) => option.id == value.id}
          onChange={(e, value) => {
            setCountry(value)
            setCountryCode(value.countryCode)
            setSubdivisions([])
            setSubdivision(null)
            fetchAddresses('subdivision', '', value.id)
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
            isOptionEqualToValue={(option, value) => option.id == value.id}
            onChange={(e, value) => {
              setSubdivision(value)
              setCounties([])
              setCounty(null)
              fetchAddresses('county', '', value.id)
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

        {subdivision && subdivisions.length > 0 && counties.length > 0 && (
          <Autocomplete
            className='login-form-element'
            options={counties}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id == value.id}
            onChange={(e, value) => {
              setCounty(value.name)
              setAreas([])
              setArea(null)
              fetchAddresses('area', '', value.id)
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

        {subdivision &&
          county &&
          subdivisions.length > 0 &&
          counties.length > 0 &&
          areas.length > 0 && (
            <Autocomplete
              className='login-form-element'
              options={areas}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id == value.id}
              onChange={(e, value) => {
                setArea(value.name)
                setPlaces([])
                setPlace(null)
                fetchAddresses('place', '', value.id)
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

        {subdivision &&
          county &&
          area &&
          subdivisions.length > 0 &&
          counties.length > 0 &&
          areas.length > 0 &&
          places.length > 0 && (
            <Autocomplete
              className='login-form-element'
              options={places}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id == value.id}
              onChange={(e, value) => {
                setArea(value.name)
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

        {country && postalCodes > 0 && (
          <Autocomplete
            className='login-form-element'
            options={postalCodes}
            getOptionLabel={(option) => option.postal_code}
            onInputChange={(e, value) => fetchAddresses('postal_code', '', value, countryCode)}
            onChange={(e, value) => setPostalCode(value.postal_code)}
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
