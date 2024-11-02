import { FaTelegram } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import "../assets/sass/contact.scss"; 

const Contact = () => {
  return (
    <>
      <div className="container">
        <div className="contact_cards">
          <a href="https://t.me/abdushukurov_000" target="_blank" rel="noopener noreferrer" className="contact_card">
            <div className="icon_box">
              <FaTelegram className="telegram_icon" />
              <h2>Write To Telegram</h2>
            </div>
          </a>
          <a href="https://www.instagram.com/_.abdu.a_/" target="_blank" rel="noopener noreferrer" className="contact_card">
            <div className="icon_box">
              <FaInstagram className="instagram_icon" />
              <h2>Write To Instagram</h2>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default Contact;
