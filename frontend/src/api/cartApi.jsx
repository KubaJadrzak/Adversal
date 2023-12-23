export async function fetchAllCartProducts() {
    const response = await fetch('http://localhost:3000/api/v1/cart_products')
    if (!response.ok) {
        throw new Error(reponse.statusText)
    }
    return response.json()
}

export async function deleteCartProduct(id) {
    const response = await fetch(`http://localhost:3000/api/v1/cart_products/${id}`, {
        method: "DELETE",
    })
    if (!response.ok) {
        throw new Error(reponse.statusText)
    }
    return response.json()
}

export async function fetchCartProduct(id) {
    const response = await fetch(`http://localhost:3000/api/v1/cart_products/${id}`)
    if (!response.ok) {
        throw new Error(reponse.statusText)
    }
    return response.json()
}
