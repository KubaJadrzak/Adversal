import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { resetPassword } from "../../api/authApi"
import { Box, Card, TextField, Button, Link } from "@mui/material"
import './Login.css'
import useAlert from "../../components/alerts/useAlert"

function PasswordResetForm() {
    const {setAlert}  = useAlert()
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const navigate = useNavigate()

    function extractTokenFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('reset_token');
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (password !== passwordConfirmation) {
          console.error("Passwords do not match");
          return;
        }
    
        const resetToken = extractTokenFromURL();
    
        if (!resetToken) {
          console.error("Reset token not found");
          return;
        }
    
        try {
          await resetPassword({
            user: {
                reset_password_token: resetToken,
                password: password,
                password_confirmation: passwordConfirmation
            }
          });
          navigate('/login')
          setAlert('Password reset successfully!', 'success')

        } catch (error) {
          console.error("Error resetting password:", error);
          setAlert('Error resetting password!', 'error')
        }
      };


    return (
        <Card className='login-card'>
            <form className="login-form" onSubmit={handleSubmit}>
                <TextField
                    required
                    className="login-form-element"
                    id="password"
                    label="New Password"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                ></TextField>
                <TextField
                    required
                    className="login-form-element"
                    id="confirm password"
                    label="Confirm New Password"
                    type="password"
                    onChange={e => setPasswordConfirmation(e.target.value)}
                ></TextField>
                <Box className="login-form-button">
                <Button variant="contained" type="submit">CHANGE PASSWORD</Button>
                </Box>
            </form>
        </Card>
    )
}

export default PasswordResetForm