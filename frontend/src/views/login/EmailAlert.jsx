import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { resetPasswordRequest } from "../../api/authApi"
import { Box, Card, TextField, Button, Link, Typography } from "@mui/material"
import { faEnvelope, faHome, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './EmailAlert.css'
import useAlert from "../../components/alerts/useAlert"

function EmailAlert() {
    const navigate = useNavigate()

    return (
        <Card className='email-alert-card'>
            <Box className='email-alert-content'>
            <FontAwesomeIcon icon={faEnvelope} size="6x" style={{ color: '1976d2' }} />
                <Typography className='email-alert-element' >Email has been send to your email account, please check your SPAM folder as well</Typography>
                <Link className="email-alert-link" underline="hover" onClick={() => {navigate(`/login`)}}>Back to login</Link>
            </Box>
        </Card>
    )
}

export default EmailAlert