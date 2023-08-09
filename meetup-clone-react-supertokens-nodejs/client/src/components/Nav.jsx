import meetup from "../assets/meetup.png"
import { Link } from "react-router-dom"
import Novu from "./Novu"

const Nav = () => {
  return (
      <nav className='navbar'>
          <Link to="/">
              <img src={meetup} alt="Meetup" className="logo"/>
          </Link>
          <div className="navBtn">
              <Novu />
              <button className="buttons signUpBtn">Log out</button>
          </div>
      </nav>
  )
}

export default Nav