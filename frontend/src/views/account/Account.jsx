import React from "react"
import { useNavigate } from "react-router-dom"
import {Card, List, ListItemButton, Typography} from '@mui/material'

import "./Account.css"

function Account() {
    const navigate = useNavigate()

    return (
        <Card className='account-cart'>
            <List className='account-list'>
                <ListItemButton className='account-list-item' onClick={() => {navigate(`profile`)}}>
                    <Typography>Profile</Typography>
                </ListItemButton>
                <ListItemButton className='account-list-item' onClick={() => {navigate(`personalorders`)}}>
                    <Typography>Personal orders</Typography>
                </ListItemButton>
                <ListItemButton className='account-list-item'>
                    <Typography>Customer orders</Typography>
                </ListItemButton>
                <ListItemButton className='account-list-item' onClick={() => {navigate(`catalog`)}}>
                    <Typography>Your catalog</Typography>
                </ListItemButton>
            </List>
        </Card>
    )

}

export default Account