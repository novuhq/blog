import React, {useState, useEffect} from 'react'

const Nav = ({header, socket}) => {
  const [notification, setNotification] = useState("")

  useEffect(()=> {
    socket.on("addProductResponse", data => {
      setNotification(`@${data.owner} just added ${data.name} worth $${Number(data.price).toLocaleString()}`)
    })
  }, [socket])
  
  useEffect(()=> {
    socket.on("bidProductResponse", data => {
      setNotification(`@${data.last_bidder} just bid ${data.name} for $${Number(data.amount).toLocaleString()}`)
    })
  }, [socket])

  return (
    <nav className='navbar'>
      <div className='header'>
        <h2>{header}</h2>
      </div>
            
      <div>
        <p style={{color: "red"}}>{notification}</p>
      </div>       
    </nav>
  )
}

export default Nav