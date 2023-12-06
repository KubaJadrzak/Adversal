export async function fetchAllOrders(params) {
    const response = await fetch(`http://localhost:3000/api/v1/orders?${params}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

export async function createOrder(data) {
    const response = await fetch('http://localhost:3000/api/v1/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

export async function deleteOrder(id, params) {
    const response = await fetch(`http://localhost:3000/api/v1/orders/${id}?${params}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    if (response.status === 204) {
        return null;
    }
    return response.json();
}

export async function updateOrder(id, data) {
    const response = await fetch(`http://localhost:3000/api/v1/orders/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

export async function fetchOrder(id, params) {
    const response = await fetch(`http://localhost:3000/api/v1/orders/${id}?${params}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}