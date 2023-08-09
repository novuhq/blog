import Nav from "../components/Nav"
import { Link } from "react-router-dom"
import { VscLinkExternal } from "react-icons/vsc"
import { useEffect, useState } from "react"
import { fetchMyEvents } from "../utils/util"

const Dashboard = () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        fetchMyEvents(localStorage.getItem("user_id"), setEvents)
    }, [])

  return (
      <div className="dashboard_container">
          <Nav />
          <div className="dashboard_main">
               <section className="header_events">
                  <h1 style={{ fontSize: "30px" }}>Your Events</h1>
                  <Link to="/create/event" className="link">Create new event</Link>
              </section>

              <div className="dashboard_events">
                  {events.map(event => (
                       <div className="dashboard_event" key={event.id}>
                      <h2>{event.title}</h2>
                      <Link to={`/event/${event.slug}`}><VscLinkExternal size={20}/></Link>
                  </div>
                  ))}
                 
                 
              </div>
              
          </div>
      </div>
  )
}

export default Dashboard