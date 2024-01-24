import React, { useState, useEffect }  from "react"
import { fetchCartProducts } from "../../api/cartProductApi"
import OrderForm from "./OrderForm"
import { createOrder } from '../../api/orderApi'
import { Box } from '@mui/material'
import { useNavigate } from "react-router-dom"
import useAlert from "../../components/alerts/useAlert"


function AddOrder() {
    const navigate = useNavigate()
    const {setAlert} = useAlert()
    const [cartProducts, setCartProducts] = useState()

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


    const handleSubmit = async ({country, city, address, postal_code}) => {
        try {

          // Loop through each cartProduct and create an order
          for (const cartProduct of cartProducts) {
            const product_id = cartProduct.product.id;

            const data = {
              product_id,
              country,
              city,
              address,
              postal_code
            };

            // Assuming createOrder is an asynchronous function that sends a request to create an order
            await createOrder(data);
          }


          // After creating all orders, navigate to the desired location
          navigate('/account/personalorders');

          const alertMessage =
          cartProducts.length > 1
              ? `Orders were successfully created`
              : 'Order was successfully created';

          setAlert(alertMessage, 'success');
        } catch (e) {
          console.error("Failed to create and order: ", e);
          setAlert('Failed to create an order', 'error')
        }
      };

    const data = {
        country: '',
        city: '',
        address: '',
        postal_code: ''
    }

    return (
        <Box>
            <OrderForm buttonMessage={"Create New Order"} data={data} handleSubmit={handleSubmit}/>
        </Box>
    )
}

export default AddOrder