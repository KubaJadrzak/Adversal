import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Card, TextField, Button, Link } from "@mui/material"
import './PasswordReset.css'

function PasswordReset() {
    const navigate = useNavigate()

    return (
        <Card className='login-reset-card'>
            <form className="login-reset-form" onSubmit={(e) => {handleSubmit}}>
                <TextField
                    required
                    className="login-reset-form-element"
                    label="Email"
                ></TextField>
                <Link className="login-form-link" underline="hover" onClick={() => {navigate(`/login`)}}>Back to login</Link>
                <Box className="login-reset-form-button">
                <Button variant="contained" type="submit">Reset Password</Button>
                </Box>
            </form>
        </Card>
    )
}

export default PasswordReset