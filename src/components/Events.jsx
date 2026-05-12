import { Link } from "react-router-dom"
import { useState } from "react"
import useFetch from "../useFetch"

const Events = () => {
    const [eventType, setEventType] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")
    const {data, loading, error} = useFetch("https://backend-meetup-nine.vercel.app/meetups")
    
    //filtering for eventType and search query
    const filteredEventData = data?.filter((event) => {
        const matchesType = eventType === "All" || event.eventType === eventType;
        const lowerCaseQuery = searchQuery.toLowerCase();
        const matchesSearch = event.title.toLowerCase().includes(lowerCaseQuery) || 
                              event.eventTag.some(tag => tag.toLowerCase().includes(lowerCaseQuery));
        return matchesType && matchesSearch;
    });
    return (
        <div>
            <div className="row align-items-center mb-3">
                <div className="col-md-6">
                    <h2 className="display-6 m-0">Meetup Events</h2>
                </div>
                <div className="col-md-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search by title and tags..." 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                    />
                </div>
                <div className="col-md-3">
                    <select id="eventFilter" className="form-select" onChange={(e) => setEventType(e.target.value)}>
                        <option hidden>Event Type</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                        <option value="All">Both</option>
                    </select>
                </div>
            </div>
            <div className="mx-3 my-4">
                <div className="row mt-3">
                    {filteredEventData ? (filteredEventData.map((event)=>(
                        <div key={event._id} className="col-md-3">
                            <div className="position-relative mb-3">
                              <Link to={`/events/${event._id}`} className="text-decoration-none text-reset">
                                <span className="position-absolute top-0 start-0 m-2 badge bg-white text-dark fw-medium p-2 rounded">{event.eventType} Event</span>
                                <img style={{width: "100%", height: "200px", objectFit: "cover"}} className="img-fluid rounded" src={event.eventImageUrl} />
                              <span className="fw-normal">{event.eventDate}{" | "}{event.eventStartTime}</span>
                              <br/>
                              <span className="fw-medium">{event.title}</span>
                              </Link>
                            </div>
                        </div>
                    ))) : (
                      loading && <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Events