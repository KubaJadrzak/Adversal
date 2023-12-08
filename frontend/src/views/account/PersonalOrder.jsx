import React from "react"
import { useState, useEffect } from "react"
import { fetchOrder } from "../../api/orderApi"
import { useParams } from 'react-router-dom';
import {Box, Typography, Card, ImageList, ImageListItem, Divider} from '@mui/material'
import "./PersonalOrder.css"

function PersonalOrder() {
    const { id } = useParams()
    const [order, setOrder] = useState()

    useEffect(() => {
        async function loadData(){
          try {
              const data = await fetchOrder(id)
              setOrder(data)
          } catch (e) {
              console.error("Failed to load order: ", e)
          }
        }
        loadData()
      }, [])

      if (!order || order.length === 0) return (
        <div></div>
    )



    return (
        <Box className='personal-order-container'>
            <Card className='personal-order-product-card'>
            <Box className='personal-order-product-header'>
                <Typography variant='h6'>{order.product.title}</Typography>
                <Typography>${order.product.price}</Typography>
            </Box>
                <Box className="personal-order-product-image-container">
                    {order.product.images ?
                        <ImageList cols={2} className="personal-order-product-image-list">
                            {order.product.images.map((image, index) => (
                                <ImageListItem key={index} >
                                    <img
                                    src={"http://localhost:3000" + image}
                                    loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>:
                        <Box>
                            <Typography variant='overline'>no image available</Typography>
                        </Box>

                    }
                </Box>
                <Box className='personal-order-product-description'>
                    <Typography>{order.product.description}</Typography>
                </Box>
            </Card>
            <Box>
                <Card className='personal-order-address-card'>
                    <Typography variant="h5" className='personal-order-address-card-title'>Delivery Address</Typography>
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
                    <Typography variant="h5" className='personal-order-address-card-title'>Details</Typography>
                    <Box className='personal-order-address-card-element'>
                        <Typography>STATUS: </Typography>
                        <Typography>{order.status}</Typography>
                    </Box>
                    <Box className='personal-order-address-card-element'>
                        <Typography>PRICE: </Typography>
                        <Typography>${order.product.price}</Typography>
                    </Box>
                </Card>
            </Box>
    </Box>
    )
}

export default PersonalOrder