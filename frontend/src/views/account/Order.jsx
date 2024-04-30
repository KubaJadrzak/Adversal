import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { fetchOrder } from '../../api/orderApi'
import { useParams } from 'react-router-dom'
import { updateOrder } from '../../api/orderApi'
import useAlert from '../../components/alerts/useAlert'
import {
  Box,
  Typography,
  Card,
  ImageList,
  MenuItem,
  ImageListItem,
  Divider,
  TextField,
  Button,
} from '@mui/material'
import './Order.css'

function Order() {
  const baseURL = import.meta.env.VITE_API_BASE_URL
  const { setAlert } = useAlert()
  const { id } = useParams()
  const [order, setOrder] = useState()
  const [status, setStatus] = useState()
  const navigate = useNavigate()
  const location = useLocation()

  const statusOptions = [
    { value: 1, label: 'CREATED' },
    { value: 2, label: 'PAYED' },
    { value: 3, label: 'SHIPPED' },
    { value: 4, label: 'DELIVERED' },
    { value: 5, label: 'FAILED' },
  ]

  const StatusValue = (statusLabel) => {
    const statusObject = statusOptions.find((option) => option.label === statusLabel)
    return statusObject ? statusObject.value : ''
  }

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchOrder(id)
        setOrder(data)
        setStatus(StatusValue(data.status))
      } catch (e) {
        console.error('Failed to load order: ', e)
      }
    }
    loadData()
  }, [id])

  const handleUpdateStatus = async () => {
    try {
      await updateOrder(id, { status: status })
      navigate(`/account/customerorders`)
      setAlert('Status was successfully updated!', 'success')
    } catch (error) {
      console.error('Failed to update order status: ', error)
      setAlert('Failed to update status!', 'error')
    }
  }

  if (!order || order.length === 0) return <div></div>

  const isCustomerOrder = location.pathname.includes('/customerorder')

  return (
    <Box className='personal-order-container'>
      <Card
        className='personal-order-product-card'
        onClick={() => navigate(`product/${order.product.id}`)}
      >
        <Box className='personal-order-product-header'>
          <Typography variant='h6'>{order.product.title}</Typography>
          <Typography>${order.product.price}</Typography>
        </Box>
        <Box className='personal-order-product-image-container'>
          {order.product.images ? (
            <ImageList cols={2} className='personal-order-product-image-list'>
              {order.product.images.map((image, index) => (
                <ImageListItem key={index}>
                  <img src={baseURL + image} loading='lazy' />
                </ImageListItem>
              ))}
            </ImageList>
          ) : (
            <Box>
              <Typography variant='overline'>no image available</Typography>
            </Box>
          )}
        </Box>
        <Box className='personal-order-product-description'>
          <Typography>{order.product.description}</Typography>
        </Box>
      </Card>
      <Box>
        <Card className='personal-order-address-card'>
          <Typography variant='h5' className='personal-order-address-card-title'>
            Delivery Address
          </Typography>
          <Divider />
          <Box className='personal-order-address-card-element'>
            <Typography>COUNTRY: </Typography>
            <Typography>{order.country}</Typography>
          </Box>
          <Box className='personal-order-address-card-element'>
            <Typography>CITY:</Typography>
            <Typography>{order.city}</Typography>
          </Box>
          <Box className='personal-order-address-card-element'>
            <Typography>ADDRESS: </Typography>
            <Typography>{order.address}</Typography>
          </Box>
          <Box className='personal-order-address-card-element'>
            <Typography>POSTAL CODE: </Typography>
            <Typography>{order.postal_code}</Typography>
          </Box>
          <Typography variant='h5' className='personal-order-address-card-title'>
            Details
          </Typography>
          {!isCustomerOrder ? (
            <Box className='personal-order-address-card-element'>
              <Typography>STATUS: </Typography>
              <Typography>{order.status}</Typography>
            </Box>
          ) : (
            <TextField
              required
              className='product-form-element'
              id='status'
              label='Status'
              value={status}
              select
              onChange={(e) => setStatus(e.target.value)}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}

          <Box className='personal-order-address-card-element'>
            <Typography>PRICE: </Typography>
            <Typography>${order.product.price}</Typography>
          </Box>
          <Box className='personal-order-address-card-element'>
            <Typography>DATE: </Typography>
            <Typography>{order.created_at}</Typography>
          </Box>
          {isCustomerOrder && (
            <Button variant='contained' color='primary' onClick={handleUpdateStatus}>
              Update Status
            </Button>
          )}
        </Card>
      </Box>
    </Box>
  )
}

export default Order
