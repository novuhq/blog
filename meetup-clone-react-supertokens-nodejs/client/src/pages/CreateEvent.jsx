import Nav from "../components/Nav"
import { useState } from "react"
import { postNewEvent } from "../utils/util"
import { useNavigate } from "react-router-dom"

const CreateEvent = () => {
    const [title, setTitle] = useState("")
    const navigate = useNavigate()
    const [location, setLocation] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [startTime, setStartTime] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        postNewEvent(title, location, category, startTime, description, localStorage.getItem("user_id"), navigate)
        setTitle("")
        setLocation("")
        setCategory("")
        setDescription("")
        setStartTime("")
    }
  return (
      <div className="create_event">
          <Nav />
          <div style={{ padding: "30px" }}>
              <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#1d5d9b" }}>Create new event</h2>
              <form className="create_form" onSubmit={handleSubmit}>
                  <label htmlFor="title">Title</label>
                  <input type="text" name="title" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="event_title" />

                  <label htmlFor="location">Location</label>
                  <input type="text" name="location" id="location" value={location} onChange={e => setLocation(e.target.value)} className="event_title"  required/>

                  <div style={{
                      width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                      <div style={{display: "flex", flexDirection: "column", width: "50%", marginRight: "7px"}}>
                             <label htmlFor="startTime">Starting Time</label>
                  <input type="time" name="startTime" id="startTime" value={startTime} onChange={e => setStartTime(e.target.value)} className="event_title" required/>
                      </div>
                      <div style={{display: "flex", flexDirection: "column", width: "50%"}}>
                           <label htmlFor="category">Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} className="event_title" required>
                      <option value="travel-and-outdoor">Travel and Outdoor</option>
                      <option value="religion">Religion</option>
                      <option value="sports-and-fitness">Sports and Fitness</option>
                      <option value="social-activities">Social Activities</option>
                  </select>
                  </div>
                      </div>
                   

                 
                  

                  <label htmlFor="description">Description</label>
                  <textarea rows={8} value={description} onChange={e => setDescription(e.target.value)}  required/>
                  
                  <button className="createEventBtn" type="submit">Create Event</button>
              </form>
          </div>
      </div>
  )
}

export default CreateEvent