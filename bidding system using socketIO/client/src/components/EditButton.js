import React from 'react'
import {useNavigate} from "react-router-dom"

const EditButton = ({product}) => {
  const navigate = useNavigate()

  const handleClick = () =>  navigate(`/products/bid/${product.name}/${product.price}`)

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 editIcon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" onClick={handleClick}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  )
}

export default EditButton