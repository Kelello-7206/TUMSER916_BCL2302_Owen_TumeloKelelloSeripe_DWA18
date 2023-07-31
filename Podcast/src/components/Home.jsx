import React from "react";

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
              <a href={`/show/${show.id}`} className="show-link">
                <div className="show-info">
                  <img src={show.image} className="show-image" />
                  <div className="show-details">
                    <h3 className="show-title">{show.title}</h3>
                    <p className="show-description">{show.description}</p>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
