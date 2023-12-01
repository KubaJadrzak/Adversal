import React from "react"
import { useState, useEffect } from "react"
import { fetchAllCategories } from "../../api/categoryApi"
import { updateProduct, fetchProduct } from "../../api/productApi"
import ProductForm from "./ProductForm"
import { Box } from '@mui/material'
import { useNavigate, useParams } from "react-router-dom"
import './ProductForm.css'

function EditProduct() {
    const {id} = useParams()
    const [categories, setCategories] = useState([])
    const [product, setProduct] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
      async function loadData(){
        try {
            const categories = await fetchAllCategories()
            const product = await fetchProduct(id)
            setCategories(categories)
            setProduct(product)
        } catch (e) {
            console.error("Failed to load: ", e)
        }
      }
      loadData()
    }, [])

    const handleSubmit = async ({title, price, category_id, description, images}) => {
        const updatedData = {
            title,
            price,
            category_id,
            description,
            images
        }
        try {
            await updateProduct(id, updatedData)
            navigate(`/catalog`)
        } catch (e) {
            console.error("Failed to update a product: ", e)
        }
    }

    if ((!categories || categories.length === 0) || (!product || product.length === 0)) return (
        <div></div>
    )

    const data = {
        title: product.title,
        price: product.price,
        category_id: product.category.id,
        description: product.description,
        images: product.images,
        categories
    }

    return (
        <Box>
            <ProductForm buttonMessage={"Edit Product"} data={data} handleSubmit={handleSubmit}/>
        </Box>
    )
}

export default EditProduct