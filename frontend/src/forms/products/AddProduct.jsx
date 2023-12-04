import React, { useState, useEffect }  from "react"
import { fetchAllCategories } from "../../api/categoryApi"
import { createProduct } from "../../api/productApi"
import ProductForm from "./ProductForm"
import { Box } from '@mui/material'
import { useNavigate } from "react-router-dom"
import './ProductForm.css'

function AddProduct() {
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchAllCategories();
                setCategories(data);
            } catch (e) {
                console.error("Failed to load: ", e)
            }
          };
          loadData();
        }, []);

    const handleSubmit = async ({title, price, category_id, description, newImages}) => {
        const data = {
            title,
            price,
            category_id,
            description,
            images: newImages
        }
        try {
            const response = await createProduct(data)
            navigate(`/account/catalog`)
        } catch (e) {
            console.error("Failed to create a product: ", e)
        }
    }

    if (!categories || categories.length === 0) return (
        <div></div>
    )

    const data = {
        title: '',
        price: '',
        category_id: '',
        description: '',
        images: [],
        categories
    }

    return (
        <Box>
            <ProductForm buttonMessage={"Create New Product"} data={data} handleSubmit={handleSubmit}/>
        </Box>
    )
}

export default AddProduct