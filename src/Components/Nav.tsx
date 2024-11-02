import "../assets/sass/Nav.scss";
import { SlBasket } from "react-icons/sl";
import { IoSearchOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="nav">
      <div className="container">
        <nav>
          <a href="/">
            <img
              src="https://thumbs.dreamstime.com/b/online-shopping-e-commerce-logo-vector-design-illustration-ecommerce-online-store-logo-online-shopping-e-commerce-logo-178571891.jpg"
              alt="Logo"
              className="logo_img"
            />
          </a>
          <div className={`nav-elements ${isOpen ? "active" : ""}`}>
            <button className="close-btn" onClick={toggleMenu}>
              X
            </button>

            <ul className="nav-links">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/contacts">Contact</a>
              </li>
            </ul>
            <div className="search-form">
              <input type="text" placeholder="Search..." />
              <IoSearchOutline className="nav_icon" />
            </div>
            <MdFavoriteBorder
              className={`nav_svg ${isFavorite ? "active" : ""}`}
              onClick={toggleFavorite}
            />
            <SlBasket className="nav_svg" />
          </div>
          <div className="nav-menu" onClick={toggleMenu}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </nav>
        <div className="line-bottom"></div>
      </div>
    </div>
  );
};

export default Navbar;
