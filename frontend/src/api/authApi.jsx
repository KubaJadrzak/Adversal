export async function CreateUser(data) {
    const response = await fetch('http://localhost:3000/signup', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const responseData = await response.json();

    // Check if the response contains an "id"
    if (responseData && responseData.data && responseData.data.id) {
        const userId = responseData.data.id;

        // Save the user id to localStorage
        localStorage.setItem('id', userId);
    } else {
        // If the "id" is not present in the response, handle the error accordingly
        throw new Error("User ID not found in the response");
    }

    // Check if the "Authorization" header is present in the response
    const authTokenHeader = response.headers.get('Authorization');

    if (authTokenHeader) {
        // Extract the token from the "Authorization" header with "Bearer" prefix
        const authToken = authTokenHeader.split(' ')[1];
        localStorage.setItem('authToken', `Bearer ${authToken}`);
    } else {
        // If the "Authorization" header is not present, handle the error accordingly
        throw new Error("Authorization header not found in the response");
    }
}