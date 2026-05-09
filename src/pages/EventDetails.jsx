import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";

import clock from "../assets/clock.png"
import calendar from "../assets/calendar.png"
import location from "../assets/location.png"
import rupee from "../assets/rupee.png"

const EventDetails = () => {
    const {data, loading, error} = useFetch("https://backend-meetup-nine.vercel.app/meetups")
    const {eventId} = useParams()
    const detailsOfEvent = data?.find((event) => event._id == eventId)
    //console.log(detailsOfEvent)
    console.log()

    return (
        <div className="bg-body-secondary">
            <Header/>
                <main className="container pb-4">
                    {data ? (
                        <div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <h2>{detailsOfEvent.title}</h2>
                                    <p className="fw-normal">Hosted By:<br/> <span className="fw-bolder">{detailsOfEvent.host}</span></p>
                                    <br/>
                                    <img className="img-fluid rounded" style={{width: "100%", height: "300px", objectFit: "cover"}} src={detailsOfEvent.eventImageUrl}/>
                                </div>
                                <div className="col-md-2"></div>
                                <div className="col-md-4">
                                    <div className="container pt-3 px-3 card bg-white border-0 rounded">
                                        <p><img src={calendar} className="img-fluid me-2" style={{height: "12px", width: "12px", objectFit: "cover"}}/>{" "}{detailsOfEvent.eventDate}</p>
                                        <p><img src={clock} className="img-fluid me-2" style={{height: "12px", width: "12px", objectFit: "cover"}}/>{" "}From {detailsOfEvent.eventStartTime} to {detailsOfEvent.eventEndTime}</p>
                                        <p><img src={location} className="img-fluid me-2" style={{height: "12px", width: "12px", objectFit: "cover"}}/>{" "}{detailsOfEvent.venueAddress.apartment !== "N/A" ? `${detailsOfEvent.venueAddress.apartment}, ${detailsOfEvent.venueAddress.street}, ${detailsOfEvent.venueAddress.city}, ${detailsOfEvent.venueAddress.state}` : " Online Event"}</p>
                                        <p><img src={rupee} className="img-fluid me-2" style={{height: "16px", width: "16px", objectFit: "cover"}}/>{detailsOfEvent.eventFee}/-</p>
                                    </div>
                                    <hr className="mt-4"/>
                                    <div className="row mt-4 mb-4">
                                        <h3>Speakers ({detailsOfEvent.speakers.length})</h3>
                                            {detailsOfEvent.speakers.map((speaker, index) => (
                                                <div className="col-md-6 mb-2" key={index}>
                                                    <div className="card bg-white border-0 rounded d-flex align-items-center py-3 h-100">
                                                        <img src={speaker.image} className="img-fluid rounded-circle" style={{height: "80px", width: "80px", objectFit: "cover"}}/>
                                                        <div className="fw-medium text-center container mt-2">{speaker.name}</div>
                                                        <div className="fw-light text-center container">{speaker.expertise}</div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div> 
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-7">
                                    <div>
                                        <h3>Details:</h3>
                                        <p>{detailsOfEvent.details}</p>
                                    </div>
                                    <div className="mt-4">
                                        <h3>Additional Information: </h3>
                                        <ul>
                                            {detailsOfEvent.additionalInfo.map((info, index) => (
                                                <li key={index}>{info}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3>Event Tags:</h3>
                                        {detailsOfEvent.eventTag.map((tag) => (
                                            <span className="fw-normal badge mt-2 py-2 me-3" style={{backgroundColor: "#ed213c", color: "white", fontSize: "1rem"}}>{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        loading && <p>Loading...</p>
                    )}
                </main>
            <Footer/>
        </div>
    )
}

export default EventDetails