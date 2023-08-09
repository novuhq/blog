import { Link } from "react-router-dom"
import event from "../assets/event.jpeg"
import { AiOutlineCalendar } from "react-icons/ai"
import { BsCheckCircle } from "react-icons/bs"
import { ImLocation2 } from "react-icons/im"
import { useState, useEffect } from "react"
import { fetchEvents } from "../utils/util"

const EventsSection = () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        fetchEvents(setEvents)
    }, [])

  return (
      <div className="home_events">
          <section className="header_events">
              <h1 style={{fontSize: "30px"}}>Upcoming online events</h1>
              <Link to="/events/all" className="link">See all events</Link>
          </section>

          <div className="body_events">
              {events.map(e => (
                   <Link to={`/event/${e.slug}`} key={e.id} className="i_event">
                  <img src={event} alt="Event" className="i_image" />
                  <div className="i_content">
                      <h2 style={{marginBottom: "10px"}}>{e.title}</h2>
                      <p style={{marginBottom: "10px", opacity: 0.7}}>Hosted by: {e.host}</p>
                      <div style={{display: "flex", alignItems: "center", opacity: 0.7, marginBottom: "10px"}}>
                          <AiOutlineCalendar style={{marginRight: "5px"}}/>
                          <p>Starting at {e.start_time}</p>
                      </div>
                       <div style={{display: "flex", alignItems: "center", opacity: 0.7, marginBottom: "10px"}}>
                          <ImLocation2 style={{marginRight: "5px", color: "red"}}/>
                          <p>{e.location}</p>
                      </div>
                       <div style={{display: "flex", alignItems: "center", opacity: 0.7, marginBottom: "10px"}}>
                          <BsCheckCircle style={{marginRight: "5px", color: "green"}}/>
                          <p>{e.attendees.length} going</p>
                      </div>
                  </div>
              </Link> 
              ))}
              
          </div>
      </div>
  )
}

export default EventsSection