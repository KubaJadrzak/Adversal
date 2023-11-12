export async function fetchAllUsers() {
    const response = await fetch('http://localhost:3000/api/v1/users')
    if (!response.ok) {
        throw new Error(reponse.statusText)
    }
    return response.json()
}

export async function deleteUser(id) {
    const response = await fetch(`http://localhost:3000/api/v1/users/${id}`, {
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

export async function fetchUser(id, params) {
    const response = await fetch(`http://localhost:3000/api/v1/users/${id}?${params}`)
    if (!response.ok) {
        throw new Error(reponse.statusText)
    }
    return response.json()
}
