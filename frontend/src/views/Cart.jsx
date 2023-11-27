import React, { useEffect, useState } from "react"
import { fetchCartProducts } from "../api/cartProductApi"
import { useNavigate } from "react-router-dom"
import {Card, Box} from '@mui/material'
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

    return (
        <Card className='cart-container'>
            {cartProducts.map((cartProduct) => (
                <Box key={cartProduct.id} className='cart-list' >
                    <CartElement cartProduct={cartProduct} navigate={navigate} onDeleteCartProduct={onDeleteCartProduct}/>
                </Box>
            ))}
        </Card>
    )
}

export default Cart