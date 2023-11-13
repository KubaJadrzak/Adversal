import React, { useEffect, useState } from "react"
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {List, ListItemButton, Divider, Typography, IconButton, Box} from '@mui/material'
import "./CartListElement.css"

function CartListElement (product, navigate) {

    if (!product || product.lenght === 0) return (
        <div></div>
    )

    return (
        <Box>
            <List className='cart-list'>
                <ListItemButton className='cart-list-item' onClick={() => {navigate(`/product/${product.id}`)}}>
                    <Typography>{product.title}</Typography>
                    <Box className='cart-list-item-properties'>
                        <Typography className='cart-list-item-price'>${product.price}</Typography>
                        <IconButton>
                            <FontAwesomeIcon icon={faTrash} />
                        </IconButton>
                    </Box>
                </ListItemButton>
            </List>
            <Divider />
        </Box>
    )
}

export default CartListElement