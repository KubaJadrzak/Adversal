import React from "react"
import { useState, useEffect } from "react"
import { fetchUser, updateUser } from "../../api/userApi"
import { Box } from '@mui/material'
import { useNavigate } from "react-router-dom"
import UserForm from "./UserForm"

function EditUser() {
    const [user, setUser] = useState()
    const navigate = useNavigate()
    const id = localStorage.getItem('id')

    useEffect(() => {
      async function loadData(){
        try {
            const data = await fetchUser(id)
            setUser(data)
        } catch (e) {
            console.error("Failed to load: ", e)
        }
      }
      loadData()
    }, [])

    const handleSubmit = async ({name, email, newImage}) => {
        const updatedData = {
            name,
            email,
            image: newImage
        }
        try {
            await updateUser(id, updatedData)
            navigate(`/account/profile`)
        } catch (e) {
            console.error("Failed to update a product: ", e)
        }
    }

    if (!user || user.length === 0) return (
        <div></div>
    )

    const data = {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image
    }

    return (
        <Box>
            <UserForm buttonMessage={"Edit Profile"} data={data} handleSubmit={handleSubmit}/>
        </Box>
    )
}

export default EditUser