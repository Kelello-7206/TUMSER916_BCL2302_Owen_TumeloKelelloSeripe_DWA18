import React from "react";

export default function Preview({ shows, loading }) {
  const [showPreview, setPreview] = React.useState(0);

  const nextSlide = () => {
    setPreview((prevPreview) => (prevPreview + 1) % shows.length);
  };

  const prevSlide = () => {
    setPreview((prevPreview) => ((prevPreview - 1) + shows.length) % shows.length);
  };

  return (
    <div className="preview-container">
      {loading ? (<p>Loading...</p>) : (
        
        <div className="slideshow-container">

          <button className="prev-btn" onClick={prevSlide}>Prev</button>

          <ul className="preview-show-list"
            style={{ transform: `translateX(-${showPreview * 100}%)` }}
          >

            {shows.map((show, item) => (
              <li
                key={show.id}
                className={`show-item ${item === showPreview ? "active" : ""}`}
              >
                <a href={`/show/${show.id}`} className="preview-link">
                  <div className="preview-info">
                    <img src={show.image} alt={show.title} className="preview-image" />
                    <div className="preview-details">
                      <h3 className="preview-title">{show.title}</h3>
                      
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
          <button className="next-btn" onClick={nextSlide}>Next</button>
        </div>
      )}
    </div>
  );
}
