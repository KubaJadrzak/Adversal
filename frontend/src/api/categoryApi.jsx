export async function fetchAllCategories() {
    const response = await fetch('http://localhost:3000/categories')
    if (!response.ok) {
        throw new Error(reponse.statusText)
    }
    return response.json()
}

export async function createCategory(data){
    const response = await fetch('http://localhost:3000/categories', {
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

export async function deleteCategory(id) {
    const response = await fetch(`http://localhost:3000/categories/${id}`, {
        method: "DELETE",
    })
    if (!response.ok) {
        throw new Error(reponse.statusText)
    }
    return response.json()
}

export async function updateCategory(id, data) {
    const response = await fetch(`http://localhost:3000/categories/${id}`, {
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

export async function fetchCategory(id) {
    const response = await fetch(`http://localhost:3000/categories/${id}`)
    if (!response.ok) {
        throw new Error(reponse.statusText)
    }
    return response.json()
}
