export async function fetchAllCarts() {
    const response = await fetch('http://localhost:3000/api/v1/carts')
    if (!response.ok) {
        throw new Error(reponse.statusText)
    }
    return response.json()
}

export async function deleteCart(id) {
    const response = await fetch(`http://localhost:3000/api/v1/carts/${id}`, {
        method: "DELETE",
    })
    if (!response.ok) {
        throw new Error(reponse.statusText)
    }
    return response.json()
}

export async function fetchCart(id) {
    const response = await fetch(`http://localhost:3000/api/v1/carts/${id}`)
    if (!response.ok) {
        throw new Error(reponse.statusText)
    }
    return response.json()
}
