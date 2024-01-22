import api from './apiClient'

export async function signupUser(data) {
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
        const email = responseData?.data?.email;
        const authToken = response.headers.get('Authorization')

        if (!userId) {
            throw new Error("User ID not found in the response")
        }

        localStorage.setItem('id', userId);

        if (authToken) {
            localStorage.setItem('token', authToken);
        } else {
            throw new Error("Authorization header not found in the response")
        }

        if (email) {
            localStorage.setItem('email', email)
        } else {
            throw new Error("Email not found in the response");
        }
    } catch (error) {
        console.error('Error signing up user:', error);

    }
}

export async function logoutUser() {
    try {
      const email = localStorage.getItem('email'); // Assuming you store the email in localStorage
      if (!email) {
        throw new Error('Email not found in localStorage');
      }

      // Make a DELETE request to the Devise logout endpoint
      await api.delete('/logout', { user: { email } });

      // Clear localStorage items
      localStorage.removeItem('email');
      localStorage.removeItem('id');
      localStorage.removeItem('token');

      // Redirect the user or perform any other necessary actions
      // For example, you can use window.location.href to redirect to a specific page
      window.location.href = '/login'; // Redirect to the login page
    } catch (error) {
      console.error('Logout error:', error.message);
      // Handle the error or show a relevant message to the user
    }
}

export async function loginUser(data) {
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const responseData = await response.json();
        const userId = responseData?.status?.data?.user?.id;
        const email = responseData?.status?.data?.user?.email;
        const authToken = response.headers.get('Authorization');

        if (!userId) {
            throw new Error('User ID not found in the response');
        }

        localStorage.setItem('id', userId);

        if (authToken) {
            localStorage.setItem('token', authToken);
        } else {
            throw new Error('Authorization header not found in the response');
        }

        if (email) {
            localStorage.setItem('email', email);
        } else {
            throw new Error('Email not found in the response');
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        // Handle the error as needed (e.g., show a notification to the user)
    }
}

export async function changePassword(data) {
    try {
        const response = await api.put('/change_password', JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        const responseData = await response.data;
        console.log('Password change response:', responseData);
        // Optionally, you can handle success or show a message to the user

    } catch (error) {
        console.error('Error changing password:', error);
        // Handle the error as needed (e.g., show a notification to the user)
    }
}

export async function resetPasswordRequest(data) {
    try {
        const response = await fetch('http://localhost:3000/password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const responseData = await response.json();
        // Check the response data for success or error messages

        // Handle the response data as needed (e.g., show a notification to the user)
    } catch (error) {
        console.error('Error resetting password:', error);
        // Handle the error as needed (e.g., show a notification to the user)
    }
}

export async function resetPassword(data) {
    try {
        const response = await fetch('http://localhost:3000/password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // Check if the response status is 204 (No Content)
        if (response.status === 204) {
            console.log('Password reset successful.');
            // Optionally, you can handle success or show a message to the user
        } else {
            // Parse the response as JSON if it's not a 204 status
            const responseData = await response.json();
            console.log('Password reset response:', responseData);
        }
    } catch (error) {
        console.error('Error resetting password:', error);
        // Handle the error as needed (e.g., show a notification to the user)
    }
}