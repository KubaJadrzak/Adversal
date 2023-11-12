import React, { useEffect, useState } from "react"
import { fetchCart } from "../api/cartApi"
import ProductsListElement from "../components/ProductsListElement"
import { useNavigate } from "react-router-dom"
import {Box, Card} from '@mui/material'

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
        <Box className='products-container'>
            {cart.products.map((product) => (
                <Box key={product.id}>
                    <Card  className='product-container' onClick={() => {navigate(`/product/${product.id}`)}}>
                        {ProductsListElement(product)}
                    </Card>
                </Box>

            ))}
        </Box>
    )
}

export default Cart