export async function fetchAllUsers() {
    const response = await fetch('http://localhost:3000/users')
    if (!response.ok) {
        throw new Error(reponse.statusText)
    }
    return response.json()
}

export async function createUser(data){

    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
        if (key !== 'image') {
            formData.append(`user[${key}]`, value);
        }
    });

    if (data.image) {
        formData.append('user[image]', data.image);
    }

    const response = await fetch('http://localhost:3000/users', {
        method: "POST",
        body: formData
    })

    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return response.json()
}

export async function deleteUser(id) {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
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

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (key !== 'image') {
            formData.append(`user[${key}]`, value);
        }
    });

    if (data.image) {
        formData.append('user[image]', data.image);
    }

    const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "PUT",
        body: formData
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}


export async function fetchUser(id, params) {
    const response = await fetch(`http://localhost:3000/users/${id}?${params}`)
    if (!response.ok) {
        throw new Error(reponse.statusText)
    }
    return response.json()
}

export async function deleteUserImage(id) {

    await fetch(`http://localhost:3000/users/${id}/delete_image`, {
        method: "DELETE",
      });

}
