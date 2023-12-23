import React from "react"
import Products from "../api/useProducts"

function ProductsList() {
    return (
        <div>
            {Products().map((product) => (
                <div key={product.id} className="product-container">
                    <h2>{product.title}</h2>
                    <p>{product.price}</p>
                    <p>{product.description}</p>
                </div>
            ))}
        </div>
    )
}

export default ProductsList


