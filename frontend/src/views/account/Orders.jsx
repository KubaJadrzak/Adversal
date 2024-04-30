import React from 'react'
import { useState, useEffect } from 'react'
import { fetchAllOrders } from '../../api/orderApi'
import { useNavigate, useLocation } from 'react-router-dom'
import { Box, Typography, Card, ListItemButton, List, Divider } from '@mui/material'
import SearchBar from '../../components/SearchBar'
import './Orders.css'

function PersonalOrders() {
  const [orders, setOrders] = useState()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    async function loadData() {
      try {
        let params = new URLSearchParams()

        if (location.pathname.includes('/personalorders')) {
          params.set('only_personal_orders', 'true')
        } else if (location.pathname.includes('/customerorders')) {
          params.set('only_customer_orders', 'true')
        }

        const queryParam = new URLSearchParams(location.search).get('query')
        if (queryParam) {
          params.set('query', queryParam)
        }

        const data = await fetchAllOrders(params)
        setOrders(data)
      } catch (e) {
        console.error('Failed to load orders: ', e)
      }
    }

    loadData()
  }, [location.search])

  if (!orders || orders.length === 0) return <div></div>

  const handleSubmit = ({ query }) => {
    const currentPath = location.pathname
    const currentSearch = location.search
    const searchParams = new URLSearchParams(currentSearch)
    searchParams.set('query', encodeURIComponent(query))
    navigate(`${currentPath}?${searchParams.toString()}`)
  }

  return (
    <Box className='personal-orders-container'>
      <SearchBar handleSubmit={handleSubmit} />
      <Card className='personal-orders-card'>
        {orders.map((order) => (
          <Box key={order.id} className='personal-orders-list'>
            <List className='personal-orders-list'>
              <ListItemButton
                className='personal-orders-item'
                onClick={() => navigate(`${order.id}`)}
              >
                <Typography className='personal-orders-number'>NUMBER: {order.number}</Typography>
                <Typography className='personal-orders-date'>
                  DATE: <br /> {order.created_at}
                </Typography>
                <Typography className='personal-orders-title'>{order.product.title}</Typography>
                <Typography className='personal-orders-status'>STATUS: {order.status}</Typography>
                <Typography className='personal-orders-price'>
                  PRICE: ${order.product.price}
                </Typography>
              </ListItemButton>
            </List>
            <Divider />
          </Box>
        ))}
      </Card>
    </Box>
  )
}

export default PersonalOrders
