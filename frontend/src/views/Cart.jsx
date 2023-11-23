import React, { useEffect, useState } from "react"
import { fetchCartProducts } from "../api/cartProductApi"
import { useNavigate } from "react-router-dom"
import {Card, Box} from '@mui/material'
import CartListElement from "../components/CartListElement"
import "./Cart.css"

function Cart() {
    const navigate = useNavigate()
    const [cartProducts, setCartProducts] = useState([])
    const [, setLoading] = useState(true)
    const [, setError] = useState(null)

    useEffect(() => {
        async function loadData(){
          try {
              const data = await fetchCartProducts()
              setCartProducts(data)
              setLoading(false)
          } catch (e) {
              setError(e)
              setLoading(false)
          }
        }
        loadData()
      }, [])

      if (!cartProducts || cartProducts.length === 0) return (
        <div></div>
    )

    return (
        <Card className='cart-container'>
            {cartProducts.map((cartProduct) => (
                <Box key={cartProduct.id} className='cart-list' >
                    {CartListElement(cartProduct, navigate)}
                </Box>
            ))}
        </Card>
    )
}

export default Cart