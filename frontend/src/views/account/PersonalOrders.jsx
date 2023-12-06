import React from "react"
import { useState, useEffect } from "react"
import { fetchAllOrders } from "../../api/orderApi"
import ProductsListElement from "../../components/ProductsListElement"
import { useNavigate } from "react-router-dom"
import {Box, Button} from '@mui/material'
import "./PersonalOrders.css"

function PersonalOrders() {
    const [orders, setOrders] = useState()

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


    return (
        <Box>

        </Box>
    )
}

export default PersonalOrders