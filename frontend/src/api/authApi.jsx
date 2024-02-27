import api from './apiClient';

const baseURL = import.meta.env.VITE_API_BASE_URL

export async function signupUser(data) {
    const response = await fetch(`${baseURL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        return response.data;
    } else {
        throw new Error('Invalid email or password')
    }
}
export async function logoutUser() {
    try {
        const email = localStorage.getItem('email');
        if (!email) {
            throw new Error('Email not found in localStorage');
        }

        await api.delete('/logout', { user: { email } });

        localStorage.removeItem('email');
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        window.location.href = '/login'
    } catch (error) {
        throw new Error('Error logging out user');
    }
}

export async function loginUser(data) {
    const response = await fetch(`${baseURL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
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
    } else{
        throw new Error('Invalid email or password')
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
            throw new Error('Failed to change password. Please try again.');
        }

    } catch (error) {
        throw new Error('Error changing password:');
    }
}

export async function resetPasswordRequest(data) {
        const response = await fetch(`${baseURL}/password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to request password reset');
        }
}

export async function resetPassword(data) {
        const response = await fetch(`${baseURL}/password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to reset password');
        }

        if (response.status === 204) {
            console.log('Password reset successful.');
        } else {
            const responseData = await response.json();
            console.log('Password reset response:', responseData);
        }
}