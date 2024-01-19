import React from "react"
import { useState } from "react"
import { Card, Button, TextField} from '@mui/material'
import './OrderForm.css'

function OrderForm({buttonMessage, data, handleSubmit}) {
    const [country, setCountry] = useState(data.country)
    const [city, setCity] = useState(data.city)
    const [address, setAddress] = useState(data.address)
    const [postal_code, setPostalCode] = useState(data.postal_code)

    return (
        <Card className='order-form-container'>
            <form className="order-form" onSubmit={(e) => {
                e.preventDefault()
                handleSubmit({country, city, address, postal_code})}}>
                <TextField
                    required
                    className="order-form-element"
                    id="country"
                    label="Country"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                ></TextField>
                <TextField
                    required
                    className="order-form-element"
                    id="city"
                    label="City"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                ></TextField>
                <TextField
                    required
                    className="order-form-element"
                    id="address"
                    label="Address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                ></TextField>
                <TextField
                    required
                    className="order-form-element"
                    id="postal_code"
                    label="Postal code"
                    value={postal_code}
                    onChange={e => setPostalCode(e.target.value)}
                ></TextField>
                <Button variant="contained" type="submit">{buttonMessage}</Button>
            </form>
        </Card>
    )
}

export default OrderForm