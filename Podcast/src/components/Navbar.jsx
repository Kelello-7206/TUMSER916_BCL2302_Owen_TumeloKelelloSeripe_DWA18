import React from "react"
import '../index.css'


export default function Navbar() {

  return (
    <nav className="navbar">
      {/* Left button to drop down the menu */}
      <button className="menu-button">
        Menu
      </button>

      {/* Dropdown menu options */}
      { (
        <ul className="menu">
          <li>hoooo
          </li>
          <li>hoooo
          </li>
          <li>hoooo
          </li>
          {/* Add more menu items as needed */}
        </ul>
      )}

      {/* Right buttons */}
      <div className="right-buttons">
        <button>
          {/* Button 1 on the right */}
          Search
        </button>
        <button>
          {/* Button 2 on the right */}
          User
        </button>
      </div>
    </nav>
  );


}

