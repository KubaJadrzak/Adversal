import React from "react"
import { useState } from "react"
import { styled } from '@mui/material/styles'
import { Card, Button, TextField, MenuItem, Box } from '@mui/material'
import { deleteProductImage } from "../../api/productApi"
import './ProductForm.css'

function ProductForm({buttonMessage, data, handleSubmit}) {
    const [title, setTitle] = useState(data.title)
    const [price, setPrice] = useState(data.price)
    const [category_id, setCategoryId] = useState(data.category_id)
    const [description, setDescription] = useState(data.description)
    const [images, setImages] = useState(data.images)
    const [newImages, setNewImages] = useState([])

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

    const handleDeleteNewImage = (index) => {
        const updatedImages = [...newImages];

        updatedImages.splice(index, 1);

        setNewImages(updatedImages);
    };

    const handleDeleteImage = async ({index}) => {
        const updatedImages = [...images];

        updatedImages.splice(index, 1);
        setImages(updatedImages);

        deleteProductImage(data.id, index)

    };

    const handleUploadNewImages = (e) => {
        setNewImages((prevImages) => [...prevImages, ...e.target.files]);
        };


    return (
        <Card className='product-form-container'>
            <form className="product-form" onSubmit={(e) => {
                e.preventDefault()
                handleSubmit({title, price, category_id, description, newImages})}}>
                <TextField
                    required
                    className="product-form-element"
                    id="title"
                    label="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                ></TextField>
                <TextField
                    required
                    autoComplete="off"
                    type="number"
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
                <Box className='product-form-image-container'>
                    {(images && images.length !== 0) &&
                        images.map((image, index) => (
                        <Box key={index} className='product-form-image-element'>
                            <Box
                                component="img"
                                className="product-form-image"
                                src={"http://localhost:3000" + image}
                                loading="lazy"
                            />
                            <Button onClick={() => handleDeleteImage({index})}>delete</Button>
                        </Box>
                        ))
                    }
                    {newImages.length !== 0 &&
                        Array.from(newImages).map((image, index) => (
                            <Box key={index} className='product-form-image-element'>
                            <Box
                                component="img"
                                className="product-form-image"
                                src={URL.createObjectURL(image)}
                                loading="lazy"
                            />
                            <Button onClick={() => handleDeleteNewImage(index)}>delete</Button>
                        </Box>
                        ))
                    }
                </Box>
                <Button component="label" variant="contained" className='product-form-upload'>
                    Upload Image
                    <VisuallyHiddenInput type="file" onChange={handleUploadNewImages}  multiple/>
                </Button>
                <Button variant="contained" type="submit">{buttonMessage}</Button>
            </form>
        </Card>
    )
}

export default ProductForm