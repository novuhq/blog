import { FaUmbrellaBeach, FaChurch } from "react-icons/fa"
import { MdSportsMartialArts, MdSportsKabaddi } from "react-icons/md"
import { Link } from "react-router-dom"

const CategoriesSection = () => {
  return (
      <div  className="home_events">
          <h1 style={{ fontSize: "30px", marginBottom: "30px" }}>Explore top categories</h1>
          <div className="categories_events">
              <Link to="/events/travel-and-outdoor">
                  <p> <FaUmbrellaBeach/> Travel and Outdoor</p>
              </Link>
              <Link to="/events/religion">
                  <p><FaChurch/> Religion</p>
              </Link>
             <Link to="/events/sports-and-fitness">
              <p><MdSportsMartialArts/> Sports and Fitness</p>
              </Link>
              
              <Link to="/events/social-activities">
                  <p><MdSportsKabaddi /> Social activities</p>
              </Link>

          </div>
      </div>
  )
}

export default CategoriesSection