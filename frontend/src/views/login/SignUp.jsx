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
  const [subdivision, setSubdivision] = useState(null) // Changed initial state to null
  const [subdivisionId, setSubdivisionId] = useState('')
  const [city, setCity] = useState('')
  const [county, setCounty] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [countries, setCountries] = useState([])
  const [subdivisions, setSubdivisions] = useState([])
  const [cities, setCities] = useState([])
  const [postalCodes, setPostalCodes] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchAddresses('country', '')
  }, [])

  const fetchAddresses = async (type, id, query, country_code) => {
    setLoading(true)
    try {
      const response = await axios.get(`http://localhost:3000/addresses/search`, {
        params: { type, id, query, country_code },
      })
      console.log(`Fetching ${type}:`, response.data)
      switch (type) {
        case 'country':
          setCountries(response.data)
          break
        case 'subdivision':
          setSubdivisions(response.data)
          break
        case 'city':
          setCities(response.data)
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
          city,
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

  const handleCountryChange = (e, value) => {
    if (value) {
      setCountry(value)
      setCountryCode(value.countryCode)
      fetchAddresses('subdivision', value.id)
      fetchAddresses('postal_code', '', '', value.countryCode)
      // Clear city, subdivision, and postal code when country changes
      setSubdivision(null)
      setSubdivisionId('')
      setCity('')
      setCounty('')
      setPostalCode('')
    } else {
      setCountry(null)
      setCountryCode('')
      setSubdivisions([])
      setCities([])
      setPostalCodes([])
    }
  }

  const handleSubdivisionChange = (e, value) => {
    if (value) {
      setSubdivision(value)
      setSubdivisionId(value.adminCode1)
      fetchAddresses('city', value.adminCode1, '', countryCode)
      // Clear city and postal code when subdivision changes
      setCity('')
      setCounty('')
      setPostalCode('')
    } else {
      setSubdivision(null)
      setSubdivisionId('')
      setCities([])
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
          onChange={handleCountryChange}
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

        {country && (
          <Autocomplete
            className='login-form-element'
            options={subdivisions}
            getOptionLabel={(option) => option.name}
            onChange={handleSubdivisionChange}
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

        {subdivision && (
          <Autocomplete
            className='login-form-element'
            options={cities}
            getOptionLabel={(option) => {
              if (option.county) {
                return `${option.name} - ${option.county}`
              } else {
                return `${option.name}`
              }
            }}
            onInputChange={(e, value) => fetchAddresses('city', subdivisionId, value, countryCode)}
            onChange={(e, value) => {
              setCity(value.name)
              setCounty(value.county)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='City'
                variant='outlined'
                InputProps={{
                  ...params.InputProps,
                }}
              />
            )}
          />
        )}
        {subdivision && (
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
