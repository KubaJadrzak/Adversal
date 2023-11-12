export async function fetchAllProducts(params) {
    const response = await fetch(`http://localhost:3000/api/v1/products?${params}`)
    if (!response.ok) {
        throw new Error(reponse.statusText)
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

export async function fetchProduct(id, params) {
    const response = await fetch(`http://localhost:3000/api/v1/products/${id}?${params}`)
    if (!response.ok) {
        throw new Error(reponse.statusText)
    }
    return response.json()
}


