import React, { useEffect, useState } from "react"
import { fetchCartProducts } from "../api/cartProductApi"
import { useNavigate } from "react-router-dom"
import { Card, Box, Button } from '@mui/material'
import CartElement from "../components/CartElement"
import { createOrder } from "../api/orderApi"
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

    const onDeleteCartProduct = (id) => {
        const index = cartProducts.findIndex(cartProduct => {
            return cartProduct.id === id
        })
        cartProducts.splice(index, 1)
        setCartProducts([...cartProducts])
    }

      if (!cartProducts || cartProducts.length === 0) return (
        <div></div>
    )

    const handleCreateOrder = async () => {
        try {
          // Extract product IDs from cartProducts
          const product_ids = cartProducts.map((cartProduct) => cartProduct.product.id);
          const buyer_id = localStorage.getItem('id')

          const data = {
            buyer_id,
            product_ids
          }
          // Create an order with the array of product IDs
          await createOrder(data)
          navigate('/account/personalorders')
        } catch (e) {
          console.error("Failed to create an order: ", e);
        }
      };
    return (
        <Card className='cart-container'>
            {cartProducts.map((cartProduct) => (
                <Box key={cartProduct.id} className='cart-list' >
                    <CartElement cartProduct={cartProduct} navigate={navigate} onDeleteCartProduct={onDeleteCartProduct}/>
                </Box>
            ))}
            <Button className='cart-button' variant='contained' onClick={handleCreateOrder}>Order</Button>
        </Card>
    )
}

export default Cart