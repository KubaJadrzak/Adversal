import React from "react"
import { useState } from "react"
import { styled } from '@mui/material/styles'
import { Card, Button, TextField, MenuItem, Box, Typography } from '@mui/material'
import './ProductForm.css'

function ProductForm({uploadMessage, buttonMessage, data, handleSubmit}) {
    const [title, setTitle] = useState(data.title)
    const [price, setPrice] = useState(data.price)
    const [category_id, setCategoryId] = useState(data.category_id)
    const [description, setDescription] = useState(data.description)
    const [image, setImage] = useState(data.image)

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      })

    return (
        <Card className='product-form-container'>
            <form className="product-form" onSubmit={(e) => {
                e.preventDefault()
                handleSubmit({title, price, category_id, description, image})}}>
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
                {(data.image && image === data.image)  &&
                    <Box className='product-form-image-container'>
                        <Box
                            className='product-form-image'
                            component='img'
                            alt="img"
                            src={"http://localhost:3000" + data.image}
                        />
                    </Box>

                }
                {image !== data.image  &&
                    <Box className='product-form-image-container'>
                        <Box
                            className='product-form-image'
                            component='img'
                            alt="img"
                            src={URL.createObjectURL(image[0])}
                        />
                    </Box>
                }
                <Button component="label" variant="contained" className='product-form-upload'>
                    {uploadMessage}
                    <VisuallyHiddenInput type="file" onChange={e => setImage(e.target.files)}/>
                </Button>
                <Button variant="contained" type="submit">{buttonMessage}</Button>
            </form>
        </Card>
    )
}

export default ProductForm