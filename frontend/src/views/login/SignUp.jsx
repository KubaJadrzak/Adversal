import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Card, TextField, Button, Link } from "@mui/material"
import './SignUp.css'

function SignUp() {
    const navigate = useNavigate()

    return (
        <Card className='login-signup-card'>
            <form className="login-signup-form" onSubmit={(e) => {handleSubmit}}>
                <TextField
                    required
                    className="login-signup-form-element"
                    id="email"
                    label="Email"
                ></TextField>
                <TextField
                    required
                    className="login-signup-form-element"
                    id="name"
                    label="Name"
                ></TextField>
                <TextField
                    required
                    className="login-signup-form-element"
                    id="password"
                    label="Password"
                    type="password"
                ></TextField>
                <TextField
                    required
                    className="login-signup-form-element"
                    id="password"
                    label=" Confirm Password"
                    type="password"
                ></TextField>
                <Link className="login-form-link" underline="hover" onClick={() => {navigate(`/login`)}}>Back to login</Link>
                <Box className="login-signup-form-button">
                <Button variant="contained" type="submit">LOGIN</Button>
                </Box>
            </form>
        </Card>
    )
}

export default SignUp