import React, { useState, useEffect } from "react";
import { API_URL } from "../constants";

function Products() {
    const [products, setProducts] = useState([])
    const [, setLoading] = useState(true)
    const [, setError] = useState(null)

    useEffect(() => {
        async function loadProducts(){
            try {
                const response = await fetch('http://localhost:3000/api/v1/products');
                if (response.ok) {
                    const json = await response.json();
                    setProducts(json);
                } else {
                    throw response;
                }
            } catch (e) {
                setError("Error");
                console.log("Error: ", e);
            } finally {
                setLoading(false)
            }
        }
        loadProducts();
    }, [])

    return products
}

export default Products