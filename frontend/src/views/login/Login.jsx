import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Card, TextField, Button, Link } from "@mui/material"
import './Login.css'

function Login() {
    const navigate = useNavigate()
    const [login, setLogin] = useState()
    const [password, setPassword] = useState()

    return (
        <Card className='login-card'>
            <form className="login-form" onSubmit={(e) => {handleSubmit}}>
                <TextField
                    required
                    className="login-form-element"
                    id="Email"
                    label="Email"
                    onChange={e => setLogin(e.target.value)}
                ></TextField>
                <TextField
                    required
                    className="login-form-element"
                    id="password"
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                ></TextField>
                <Link className="login-form-link" underline="hover" onClick={() => {navigate(`/login/reset`)}} >Forgot password?</Link>
                <Link className="login-form-link" underline="hover" onClick={() => {navigate(`/login/signup `)}}>Create an account</Link>
                <Box className="login-form-button">
                <Button variant="contained" type="submit">LOGIN</Button>
                </Box>
            </form>
        </Card>
    )
}

export default Login