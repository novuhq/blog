import header from "../assets/header.av1.mp4"
import { Link } from "react-router-dom"

const Hero = () => {
    return (
        <div className="hero">
            <video src={header} autoPlay muted loop className="video" />
            <div className="content">
                <h1>The people platform—</h1>
                <h1>Where interests</h1>
                <h1>become friendships</h1>
                <Link to="/dashboard" className="buttons contentBtn">Go to Dashboard</Link>
            </div>
        </div>
  )
}

export default Hero