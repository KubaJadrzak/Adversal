import React from "react"

function ProductsListElement(product) {
    return (
        <div>
            <h2>{product.title}</h2>
            <p>price: {product.price}</p>
            <p>description: {product.description}</p>
            <p>category: {product.category.name}</p>
        </div>
    )
}

export default ProductsListElement