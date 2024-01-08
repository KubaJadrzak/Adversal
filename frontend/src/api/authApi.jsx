export async function SignUpUser(data) {
    try {
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
        const userId = responseData?.data?.id;
        const authToken = response.headers.get('Authorization');

        if (!userId) {
            throw new Error("User ID not found in the response");
        }

        localStorage.setItem('id', userId);

        if (authToken) {
            localStorage.setItem('token', authToken);
        } else {
            throw new Error("Authorization header not found in the response");
        }
    } catch (error) {
        console.error('Error signing up user:', error);
        // Handle the error as needed (e.g., show a notification to the user)
    }
}