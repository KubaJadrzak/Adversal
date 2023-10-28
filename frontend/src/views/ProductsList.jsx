import React from "react"
import Products from "../api/useProducts"
import ProductsListElement from "../components/ProductsListElement"

function ProductsList() {
    return (
        <div>
            {Products().map((product) => (
                <div key={product.id}>
                    {ProductsListElement(product)}
                </div>
            ))}
        </div>
    )
}

export default ProductsList