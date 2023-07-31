import React from "react"
import './App.css'


const Navbar = () =>{

const [showNav, setNav] = React.useState(false);

const toggleNav = () => {
    setNav((preShowNav) => !prevShowNav)
}

const handleMenuClick = () => {
    // Handle the menu item click here (e.g., redirecting to the clicked page)
    // For example, setShowMenu(false); or handle other actions based on the selected menu item
  };

  return (
    <nav className="navbar">
      {/* Left button to drop down the menu */}
      <button className="menu-button" onClick={toggleMenu}>
        Menu
      </button>

      {/* Dropdown menu options */}
      {showMenu && (
        <ul className="menu">
          <li onClick={handleMenuClick}>
            <Link to="/page1">Page 1</Link>
          </li>
          <li onClick={handleMenuClick}>
            <Link to="/page2">Page 2</Link>
          </li>
          <li onClick={handleMenuClick}>
            <Link to="/page3">Page 3</Link>
          </li>
          {/* Add more menu items as needed */}
        </ul>
      )}

      {/* Right buttons */}
      <div className="right-buttons">
        <button>
          {/* Button 1 on the right */}
          Button 1
        </button>
        <button>
          {/* Button 2 on the right */}
          Button 2
        </button>
      </div>
    </nav>
  );


}

export default Navbar;