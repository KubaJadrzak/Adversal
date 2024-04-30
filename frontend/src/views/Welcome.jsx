import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import CategoryIcon from '../components/CategoryIcon'
import { fetchAllCategories } from '../api/categoryApi'
import './Welcome.css'

function Welcome() {
  const [categories, setCategories] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAllCategories()
        setCategories(data)
      } catch (e) {
        console.error('Failed to load categories: ', e)
      }
    }
    loadData()
  }, [])

  if (!categories || categories.length === 0) return <div></div>

  return (
    <Box className='welcome-category-container'>
      {categories.map((category) => (
        <Box
          key={category.id}
          className='welcome-category-item'
          onClick={() => navigate(`/products?category=${encodeURIComponent(category.name)}`)}
        >
          <CategoryIcon icon={category.icon} size='4x' className='welcome-category-icon' />
          <Typography variant='overline' className='welcome-category-text'>
            {category.name}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

export default Welcome
