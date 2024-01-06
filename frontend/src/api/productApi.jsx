export async function fetchAllProducts(params) {
    const response = await fetch(`http://localhost:3000/products?${params}`)
    if (!response.ok) {
        throw new Error(reponse.statusText)
    }
    return response.json()
}

export async function createProduct(data){

    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
        if (key !== 'images') {
            formData.append(`product[${key}]`, value)
        }
    })
    for (let i=0; i < data.images.length; i++) {
        formData.append(`product[images][]`, data.images[i])
    }


    const response = await fetch('http://localhost:3000/products', {
        method: "POST",
        body: formData
    })

    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return response.json()
}

export async function deleteProduct(id, params) {
    const response = await fetch(`http://localhost:3000/products/${id}?${params}`, {
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

    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
        if (key !== 'images') {
            formData.append(`product[${key}]`, value)
        }
    })
    for (let i=0; i < data.images.length; i++) {
        formData.append(`product[images][]`, data.images[i])
    }

    const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "PUT",
        body: formData
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

export async function fetchProduct(id, params) {
    const response = await fetch(`http://localhost:3000/products/${id}?${params}`)
    if (!response.ok) {
        throw new Error(reponse.statusText)
    }
    return response.json()
}

export async function deleteProductImage(id, image_id) {

    await fetch(`http://localhost:3000/products/${id}/delete_image/${image_id}`, {
        method: "DELETE",
      });

}


