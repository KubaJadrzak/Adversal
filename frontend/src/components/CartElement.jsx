import React from "react"
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { deleteCartProduct } from "../api/cartProductApi"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {List, ListItemButton, Divider, Typography, IconButton, Box} from '@mui/material'
import "./CartElement.css"

function CartElement ({cartProduct, navigate, onDeleteCartProduct}) {

    if (!cartProduct || cartProduct.lenght === 0) return (
        <div></div>
    )

    const handleDeleteCartProduct = async (e) => {
        e.stopPropagation()
        e.preventDefault()
        try {
            deleteCartProduct(cartProduct.id)
            onDeleteCartProduct(cartProduct.id)
        } catch (e) {
            console.error("Failed to delete the product:", e)
        }
    }

    return (
        <Box>
            <List className='cart-list'>
                <ListItemButton className='cart-list-item' onClick={() => {navigate(`product/${cartProduct.product.id}`)}}>
                    <Typography>{cartProduct.product.title}</Typography>
                    <Box className='cart-list-item-properties'>
                        <Typography className='cart-list-item-price'>${cartProduct.product.price}</Typography>
                        <IconButton onClick={handleDeleteCartProduct}>
                            <FontAwesomeIcon icon={faTrash}/>
                        </IconButton>
                    </Box>
                </ListItemButton>
            </List>
            <Divider />
        </Box>
    )
}

export default CartElement