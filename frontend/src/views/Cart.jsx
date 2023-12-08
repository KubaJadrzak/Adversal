import React, { useEffect, useState } from "react"
import { fetchCartProducts } from "../api/cartProductApi"
import { useNavigate } from "react-router-dom"
import { Card, Box, Button, Typography } from '@mui/material'
import CartElement from "../components/CartElement"
import "./Cart.css"

function Cart() {
    const navigate = useNavigate()
    const [cartProducts, setCartProducts] = useState([])

    useEffect(() => {
        async function loadData(){
          try {
              const data = await fetchCartProducts()
              setCartProducts(data)
          } catch (e) {
            console.error("Failed to load products: ", e)
          }
        }
        loadData()
      }, [])

    if (!cartProducts || cartProducts.length === 0) return (
        <div></div>
    )

    const onDeleteCartProduct = (id) => {
        const index = cartProducts.findIndex(cartProduct => {
            return cartProduct.id === id
        })
        cartProducts.splice(index, 1)
        setCartProducts([...cartProducts])
      }
      const calculateTotalPrice = () => {
        const total = cartProducts.reduce((sum, cartProduct) => sum + parseFloat(cartProduct.product.price), 0);
        return total.toFixed(2); // Format as a string with two decimal places
      };



    return (
        <Card className='cart-container'>
            {cartProducts.map((cartProduct) => (
                <Box key={cartProduct.id} className='cart-list' >
                    <CartElement cartProduct={cartProduct} navigate={navigate} onDeleteCartProduct={onDeleteCartProduct}/>
                </Box>
            ))}
            <Typography className='cart-price'>Total Price: ${calculateTotalPrice()}</Typography>
            <Button className='cart-button' variant='contained' onClick={() => navigate('/order/add')}>Order</Button>
        </Card>
    )
}

export default Cart