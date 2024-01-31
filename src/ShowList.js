// ShowList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ShowList.css'; 

const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    axios.get('https://api.tvmaze.com/search/shows?q=all')
      .then(response => setShows(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container">
    
      <div className="show-list">
        {shows.map(show => (
          <div key={show.show.id} className="show-card">
            <img src={show.show.image?.medium} alt={show.show.name} />
            <div className="show-details">
              <h3>{show.show.name}</h3>
              <Link to={`/show/${show.show.id}`} className="button">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowList;
