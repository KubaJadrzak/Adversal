export async function fetchAllProducts(params) {
    const response = await fetch(`http://localhost:3000/api/v1/products?${params}`)
    if (!response.ok) {
        throw new Error(reponse.statusText)
    }
    return response.json()
}

export async function createProduct(data){
    const response = await fetch('http://localhost:3000/api/v1/products', {
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

export async function deleteProduct(id, params) {
    const response = await fetch(`http://localhost:3000/api/v1/products/${id}?${params}`, {
        method: "DELETE",
    })
    if (!response.ok) {
        throw new Error(reponse.statusText)
    }

    if (response.status === 204){
        return null
    } else {
        return response.json()
    }
}

export async function updateProduct(id, data) {
    const response = await fetch(`http://localhost:3000/api/v1/products/${id}`, {
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

export async function fetchProduct(id, params) {
    const response = await fetch(`http://localhost:3000/api/v1/products/${id}?${params}`)
    if (!response.ok) {
        throw new Error(reponse.statusText)
    }
    return response.json()
}


