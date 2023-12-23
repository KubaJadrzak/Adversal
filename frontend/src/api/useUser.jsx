import { useState, useEffect } from "react";

function useUser() {
    const [user, setUser] = useState([])
    const [, setLoading] = useState(true)
    const [, setError] = useState(null)

    useEffect(() => {
        async function loadUser(){
            try {
                const response = await fetch('http://localhost:3000/api/v1/users/1');
                if (response.ok) {
                    const json = await response.json();
                    setUser(json);
                } else {
                    throw response;
                }
            } catch (e) {
                setError("Error");
                console.log("Error: ", e);
            } finally {
                setLoading(false)
            }
        }
        loadUser();
    }, [])

    return user
}

export default useUser