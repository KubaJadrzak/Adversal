import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Card, TextField, Button, Link } from "@mui/material"
import { signupUser } from "../../api/authApi"
import './SignUp.css'

function SignUp() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            user: {
                email,
                name,
                password,
                password_confirmation: confirmPassword
            }
        }
        try {
            await signupUser(data)
            navigate('/account')
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <Card className='login-signup-card'>
            <form className="login-signup-form" >
                <TextField
                    required
                    className="login-signup-form-element"
                    id="email"
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                ></TextField>
                <TextField
                    required
                    className="login-signup-form-element"
                    id="name"
                    label="Name"
                    onChange={e => setName(e.target.value)}
                ></TextField>
                <TextField
                    required
                    className="login-signup-form-element"
                    id="password"
                    label="Password"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                ></TextField>
                <TextField
                    required
                    className="login-signup-form-element"
                    id="confirm password"
                    label="Confirm Password"
                    type="password"
                    onChange={e => setConfirmPassword(e.target.value)}
                ></TextField>
                <Link className="login-form-link" underline="hover" onClick={() => {navigate(`/login`)}}>Back to login</Link>
                <Box className="login-signup-form-button">
                <Button variant="contained" type="submit" onClick={(e) => handleSubmit(e)}>SIGN UP</Button>
                </Box>
            </form>
        </Card>
    )
}

export default SignUp