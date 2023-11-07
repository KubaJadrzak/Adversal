export async function fetchAllProducts() {
    const response = await fetch('http://localhost:3000/api/v1/products')
    if (!response.ok) {
        throw new Error(reponse.statusText)
    }
    return response.json()
}

export async function deleteProduct(id) {
    const response = await fetch(`http://localhost:3000/api/v1/products/${id}`, {
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

export async function fetchProduct(id) {
    const response = await fetch(`http://localhost:3000/api/v1/products/${id}`)
    if (!response.ok) {
        throw new Error(reponse.statusText)
    }
    return response.json()
}
