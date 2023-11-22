import React, { useEffect, useState } from "react"
import { fetchUser } from "../api/userApi"
import { useNavigate } from "react-router-dom"
import {Card, Box} from '@mui/material'
import CartListElement from "../components/CartListElement"
import "./Cart.css"

function Cart() {
    const navigate = useNavigate()
    const [user, setUser] = useState([])
    const [, setLoading] = useState(true)
    const [, setError] = useState(null)

    useEffect(() => {
        async function loadData(){
          try {
              const params = new URLSearchParams({
                with_carted_products: "true",
              })
              const data = await fetchUser(localStorage.getItem('id'), params)
              setUser(data)
              setLoading(false)
          } catch (e) {
              setError(e)
              setLoading(false)
          }
        }
        loadData()
      }, [])

      if (!user || user.length === 0) return (
        <div></div>
    )

    return (
        <Card className='cart-container'>
            {user.carted_products.map((carted_product) => (
                <Box key={carted_product.id} className='cart-list' >
                    {CartListElement(carted_product, navigate)}
                </Box>
            ))}
        </Card>
    )
}

export default Cart