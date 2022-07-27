import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"
import { useParams } from 'react-router-dom'

const BidProduct = ({socket}) => {
  const {name, price} = useParams()
  const [amount, setAmount] = useState(price)
  const navigate = useNavigate()
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if(amount > Number(price)) {
      socket.emit("bidProduct", {amount, last_bidder: localStorage.getItem("userName"), name })
      navigate("/products")
    } else {
      setError(true)
    }
  }
  
  return (
    <div>
      <div className='bidproduct__container'>
        <h2>Place a Bid</h2>
        <form className="bidProduct__form" onSubmit={handleSubmit}>

          <h3 className='bidProduct__name'>{name}</h3>

          <label htmlFor='amount'>Bidding Amount</label>
          {error && <p style={{color: "red"}}>The bidding amount must be greater than {price}</p>}
          <input type="number" name='amount' value={amount} onChange={e => setAmount(e.target.value)} required/>

          <button className='bidProduct__cta'>SEND</button>
        </form>
        </div>
    </div>
  )
}

export default BidProduct