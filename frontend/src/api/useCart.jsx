import { useState, useEffect } from "react";

function useCart() {
    const [cart, setCart] = useState([])
    const [, setLoading] = useState(true)
    const [, setError] = useState(null)

    useEffect(() => {
        async function loadCart(){
            try {
                const response = await fetch('http://localhost:3000/api/v1/carts/1');
                if (response.ok) {
                    const json = await response.json();
                    setCart(json);
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
        loadCart();
    }, [])

    return cart
}

export default useCart