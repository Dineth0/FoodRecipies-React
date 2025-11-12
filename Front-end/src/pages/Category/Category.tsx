import React from 'react'
import { useParams } from 'react-router-dom'
import FoodCard from '../../components/Home/FoodCard'

export default function Category() {
  const {category} = useParams()
  return (
    <div>
      <FoodCard selectedCategory={category}/>
    </div>
  )
}
