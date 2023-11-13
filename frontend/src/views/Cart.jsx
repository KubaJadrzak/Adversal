import React, { useEffect, useState } from "react"
import { fetchCart } from "../api/cartApi"
import { useNavigate } from "react-router-dom"
import {Card, Box} from '@mui/material'
import CartListElement from "../components/CartListElement"
import "./Cart.css"

function Cart() {
    const navigate = useNavigate()
    const [cart, setCart] = useState([])
    const [, setLoading] = useState(true)
    const [, setError] = useState(null)

    useEffect(() => {
        async function loadData(){
          try {
              const data = await fetchCart(localStorage.getItem('id'))
              setCart(data)
              setLoading(false)
          } catch (e) {
              setError(e)
              setLoading(false)
          }
        }
        loadData()
      }, [])

      if (!cart || cart.length === 0) return (
        <div></div>
    )

    return (
        <Card className='cart-container'>
            {cart.products.map((product) => (
                <Box key={product.id} className='cart-list' >
                    {CartListElement(product, navigate)}
                </Box>
            ))}
        </Card>
    )
}

export default Cart