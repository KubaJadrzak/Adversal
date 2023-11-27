export async function fetchAllUsers() {
    const response = await fetch('http://localhost:3000/api/v1/users')
    if (!response.ok) {
        throw new Error(reponse.statusText)
    }
    return response.json()
}

export async function createUser(data){
    const response = await fetch('http://localhost:3000/api/v1/users', {
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

export async function updateUser(id, data) {
    const response = await fetch(`http://localhost:3000/api/v1/users/${id}`, {
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


export async function fetchUser(id, params) {
    const response = await fetch(`http://localhost:3000/api/v1/users/${id}?${params}`)
    if (!response.ok) {
        throw new Error(reponse.statusText)
    }
    return response.json()
}
