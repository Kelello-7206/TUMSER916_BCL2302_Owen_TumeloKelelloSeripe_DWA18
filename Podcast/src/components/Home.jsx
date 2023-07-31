import React from "react"
import Link from 'react-router-dom'


export default function Home({ shows, loading }) {
  return (
    <div className="home-container">
      <h1>All Shows</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="show-list">
          {shows.map((show) => (
            <li key={show.id}>
              <Link to={`/show/${show.id}`} className="show-link">
                <div className="show-info">
                  <img src={show.image} alt={show.title} className="show-image" />
                  <div className="show-details">
                    <h3 className="show-title">{show.title}</h3>
                    <p className="show-description">{show.description}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

