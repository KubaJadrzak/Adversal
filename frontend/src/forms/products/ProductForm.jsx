import React from "react"
import { useState } from "react"
import { Card, Button, TextField, MenuItem} from '@mui/material'
import './ProductForm.css'

function ProductForm({message, data, handleSubmit}) {
    const [title, setTitle] = useState(data.title)
    const [price, setPrice] = useState(data.price)
    const [category_id, setCategoryId] = useState(data.category_id)
    const [description, setDescription] = useState(data.description)

    return (
        <Card className='product-form-container'>
            <form className="product-form" onSubmit={(e) => {
                e.preventDefault()
                handleSubmit({title, price, category_id, description})}}>
                <TextField
                    required
                    className="product-form-element"
                    id="title"
                    label="Name"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                ></TextField>
                <TextField
                    required
                    className="product-form-element"
                    id="price"
                    label="Price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                ></TextField>
                <TextField
                    required
                    className="product-form-element"
                    id="category"
                    label="Category"
                    value={category_id}
                    select
                    onChange={e => setCategoryId(e.target.value)}
                >
                    {data.categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    required
                    className="product-form-element"
                    id="description"
                    label="Description"
                    value={description}
                    multiline
                    minRows={6}
                    onChange={e => setDescription(e.target.value)}
                ></TextField>
                <Button variant="contained" type="submit">{message}</Button>
            </form>
        </Card>
    )
}

export default ProductForm