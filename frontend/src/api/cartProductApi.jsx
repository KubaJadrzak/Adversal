export async function fetchCartProducts(params) {
    const response = await fetch(`http://localhost:3000/api/v1/cart_products?${params}`)
    if (!response.ok) {
        throw new Error(reponse.statusText)
    }
    return response.json()
}

export async function createCartProduct(data){
    const response = await fetch('http://localhost:3000/api/v1/cart_products', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return response.json()
}

export async function deleteCartProduct(id, params) {
    const response = await fetch(`http://localhost:3000/api/v1/cart_products/${id}?${params}`, {
        method: "DELETE",
    })
    if (!response.ok) {
        throw new Error(reponse.statusText)
    }

    if (response.status === 204){
        return null
    }
    return response.json()
}

export async function updateCartProduct(id, data) {
    const response = await fetch(`http://localhost:3000/api/v1/cart_products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

export async function fetchCartProduct(id, params) {
    const response = await fetch(`http://localhost:3000/api/v1/cart_products/${id}?${params}`)
    if (!response.ok) {
        throw new Error(reponse.statusText)
    }
    return response.json()
}
