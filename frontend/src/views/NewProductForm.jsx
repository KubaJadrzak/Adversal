import React from "react"
import { useState, useEffect } from "react"
import { fetchAllCategories } from "../api/categoryApi"
import { Card, Button, TextField, MenuItem, FormControl} from '@mui/material'
import { useNavigate } from "react-router-dom"
import './NewProductForm.css'

function NewProductForm() {
    const [categories, setCategories] = useState([])
    const [title, setTitle] = useState([])
    const [price, setPrice] = useState([])
    const [category_id, setCategoryId] = useState([])
    const [description, setDescription] = useState([])

    const [, setLoading] = useState(true)
    const [, setError] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
      async function loadData(){
        try {
            const data = await fetchAllCategories()
            setCategories(data)
            setLoading(false)
        } catch (e) {
            setError(e)
            setLoading(false)
        }
      }
      loadData()
    }, [])

    if (!categories || categories.length === 0) return (
        <div></div>
    )

    const handleCreateNewProduct = async (e) => {
        e.preventDefault()
        const data = { title, price, description, category_id }

        const response = await fetch('http://localhost:3000/api/v1/products', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if (response.ok) {
            const { id } = await response.json()
            navigate(`/product/${id}`)
        } else {
            console.log("An error occurred.")
        }
    }

    return (
        <Card className='new-product-form-container'>
            <form onSubmit={handleCreateNewProduct} className="new-product-form">
                <TextField
                    required
                    className="new-product-form-element"
                    id="title"
                    label="Name"
                    onChange={e => setTitle(e.target.value)}
                ></TextField>
                <TextField
                    required
                    className="new-product-form-element"
                    id="price"
                    label="Price"
                    onChange={e => setPrice(e.target.value)}
                ></TextField>
                <TextField
                    required
                    className="new-product-form-element"
                    id="category"
                    label="Category"
                    defaultValue={""}
                    select
                    onChange={e => setCategoryId(e.target.value)}
                >
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    required
                    className="new-product-form-element"
                    id="description"
                    label="Description"
                    multiline
                    minRows={6}
                    onChange={e => setDescription(e.target.value)}
                ></TextField>
                <Button variant="contained" type="submit">Create new product</Button>
            </form>
        </Card>
    )
}

export default NewProductForm