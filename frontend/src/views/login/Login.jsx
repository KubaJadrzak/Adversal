import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, TextField, Button, Link } from "@mui/material";
import { loginUser } from "../../api/authApi"
import useAlert from "../../components/alerts/useAlert"
import Adversal from '../../assets/adversal.png'

import './Login.css';

function Login() {
    const {setAlert} = useAlert()
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser({
                user: {
                    email: login,
                    password: password,
                },
            });
            navigate('/account');
        } catch (error) {
            console.error('Failed to login!', error)
            setAlert('Failed to login! Invalid email or password', 'error')
        }
    };

    return (
        <Card className='login-card'>
            <form className="login-form" onSubmit={handleSubmit}>
            <img src={Adversal} alt="logo" className='login-logo' />
                <TextField
                    required
                    className="login-form-element"
                    id="Email"
                    label="Email"
                    onChange={(e) => setLogin(e.target.value)}
                ></TextField>
                <TextField
                    required
                    className="login-form-element"
                    id="password"
                    label="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                ></TextField>
                <Link className="login-form-link" underline="hover" onClick={() => { navigate(`/login/reset`) }}>Forgot password?</Link>
                <Link className="login-form-link" underline="hover" onClick={() => { navigate(`/login/signup`) }}>Create an account</Link>
                <Box className="login-form-button">
                    <Button variant="contained" type="submit">LOGIN</Button>
                </Box>
            </form>
        </Card>
    );
}

export default Login;