import React from "react"
import { useState, useEffect } from "react"
import { fetchAllOrders } from "../../api/orderApi"
import { useNavigate } from "react-router-dom"
import {Box, Button, Typography, Card, ListItemButton, List, Divider} from '@mui/material'
import "./PersonalOrders.css"

function PersonalOrders() {
    const [orders, setOrders] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        async function loadData(){
          try {
              const params = new URLSearchParams({
                  only_personal_orders: "true",
                })
              const data = await fetchAllOrders(params)
              setOrders(data)
          } catch (e) {
              console.error("Failed to load orders: ", e)
          }
        }
        loadData()
      }, [])

      if (!orders || orders.length === 0) return (
        <div></div>
    )



    return (
        <Card className='personal-orders-container'>
            {orders.map((order) => (
                <Box key={order.id} className='personal-orders-list' >
                    <List className='personal-orders-list'>
                        <ListItemButton className='personal-orders-item' onClick={() => navigate(`${order.id}`)}>
                            <Typography className='personal-orders-number'>NUMBER: {order.number}</Typography>
                            <Typography className='personal-orders-title'>{order.product.title}</Typography>
                            <Typography className='personal-orders-status'>STATUS: {order.status}</Typography>
                            <Typography className='personal-orders-price'>PRICE: ${order.product.price}</Typography>
                        </ListItemButton>
                    </List>
                    <Divider />
                </Box>
            ))}
        </Card>
    )
}

export default PersonalOrders