import React from "react"
import useProducts from "../api/useProducts"
import ProductsListElement from "../components/ProductsListElement"
import './ProductsList.css'

function ProductsList() {
    const products = useProducts()
    return (
        <div className='products-container'>
            {products.map((product) => (
                <div key={product.id} className='product-container'>
                    {ProductsListElement(product)}
                </div>
            ))}
        </div>
    )
}

export default ProductsList