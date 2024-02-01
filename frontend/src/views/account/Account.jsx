import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, List, ListItemButton, Typography } from '@mui/material';
import { logoutUser } from "../../api/authApi"
import useAlert from "../../components/alerts/useAlert"

import "./Account.css";

function Account() {
    const {setAlert} = useAlert()
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
            setAlert('Failed to logout!', 'error')
        }
    };

    return (
        <Card className='account-cart'>
            <List className='account-list'>
                <ListItemButton className='account-list-item' onClick={() => { navigate(`profile`) }}>
                    <Typography>Profile</Typography>
                </ListItemButton>
                <ListItemButton className='account-list-item' onClick={() => { navigate(`personalorders`) }}>
                    <Typography>Personal orders</Typography>
                </ListItemButton>
                <ListItemButton className='account-list-item' onClick={() => { navigate(`customerorders`) }}>
                    <Typography>Customer orders</Typography>
                </ListItemButton>
                <ListItemButton className='account-list-item' onClick={() => { navigate(`catalog`) }}>
                    <Typography>Your catalog</Typography>
                </ListItemButton>
                <ListItemButton className='account-list-item' onClick={handleLogout}>
                    <Typography>Logout</Typography>
                </ListItemButton>
            </List>
        </Card>
    );
}

export default Account;