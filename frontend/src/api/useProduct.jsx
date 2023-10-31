import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function useProduct() {
    const { id } = useParams()
    const [product, setProduct] = useState([])
    const [, setLoading] = useState(true)
    const [, setError] = useState(null)

    useEffect(() => {
        async function loadProduct(){
            try {
                const response = await fetch(`http://localhost:3000/api/v1/products/${id}`);
                if (response.ok) {
                    const json = await response.json();
                    setProduct(json);
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
        loadProduct();
    }, [])

    return product
}

export default useProduct