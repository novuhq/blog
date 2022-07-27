import React, {useEffect, useState} from 'react'
import EditButton from "./EditButton"
import { Link} from "react-router-dom"

const Products = () => {
  const [products, setProducts] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=> {
      const fetchProducts = () => {
        fetch("http://localhost:4000/api").then(res => res.json()).then(data => {
          setProducts(data.products)   
          setLoading(false)
      })}
      fetchProducts()
  }, [])
  
  return (
    <div>
      <div className='table__container'>
        <Link to="/products/add" className='products__cta'>ADD PRODUCTS </Link>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Last Bidder</th>
            <th>Creator</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {loading ? <tr><td>Loading</td></tr> : products.map(product => (
            <tr key={`${product.name}${product.price}`}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.last_bidder || "None"}</td>
              <td>{product.owner}</td>
              <td><EditButton product={product}/></td>
            </tr>
          ))}
            
        </tbody>
      </table>
      </div>

    </div>
  )
}

export default Products