
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ShowSummary.css';

const ShowSummary = () => {
  const { id } = useParams();
  const [showData, setShowData] = useState({});
  const [bookingFormVisible, setBookingFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    movieName: '',
  });
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get(`https://api.tvmaze.com/shows/${id}`)
      .then(response => setShowData(response.data))
      .catch(error => console.error(error));

    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(storedBookings);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBookingFormSubmit = (e) => {
    e.preventDefault();
    const newBooking = { ...formData, movieName: showData.name };

    const updatedBookings = [...bookings, newBooking];
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));

    setBookings(updatedBookings);
    setFormData({
        name: '',
        email: '',
        movieName: '',

    })
    setBookingFormVisible(false);
  };
  const handleCancelBooking = (index) => {
    const updatedBookings = [...bookings];
    updatedBookings.splice(index, 1);

    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
  };

  return (
    <div className="container">
    <div className="left-half">
      <h2>Show Summary</h2>
      <img
        src={showData.image?.medium}
        alt={showData.name}
        loading="lazy"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <div dangerouslySetInnerHTML={{ __html: showData.summary }} />
      <Link to="/">Back to Shows</Link>
    </div>
      <div className="right-half">
      
        <button onClick={() => setBookingFormVisible(!bookingFormVisible)}>
          {bookingFormVisible ? 'Hide Booking Form' : 'Show Booking Form'}
        </button>

        {bookingFormVisible && (
          <div className="booking-form">
            <h3>Book Tickets</h3>
            <form onSubmit={handleBookingFormSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <button type="submit">Book Now</button>
            </form>
          </div>
        )}

       
        <div className="bookings-section">
          <h3>Your Bookings</h3>
          {bookings.length === 0 ? (
            <p>No bookings yet.</p>
          ) : (
            <ul>
              {bookings.map((booking, index) => (
                <li key={index}>
                  <p>Name: {booking.name}</p>
                  <p>Email: {booking.email}</p>
                  <p>Movie Name: {booking.movieName}</p>
                  <button onClick={() => handleCancelBooking(index)}>Cancel Booking</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
export default ShowSummary;
