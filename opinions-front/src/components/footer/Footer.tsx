import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaGooglePlusSquare } from "react-icons/fa";

import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <h2 style={{ marginTop: "10px" }}>OPINIONS</h2>
        <div className="footer-description">
            <p>
                Opinions is a website where you can create reviews about your favorite streamings and also read about them.
            </p>
        </div>
        
        <div className="footer-links">
          <div className="social-links">
            <a className="links" href="#">
              <FaInstagramSquare />
            </a>
            <a className="links" href="#">
              <FaFacebookSquare />
            </a>
            <a className="links" href="#">
              <FaGooglePlusSquare />
            </a>
          </div>
          <div className="personal-links">
            <a className="links" href="#">Home</a>
            <a className="links" href="#">Contact</a>
            <a className="links" href="#">About</a>
            <a className="links" href="#">Blog</a>
          </div>
        </div>
      </div>
      <div className="sub-footer-content">
        <h5>
          Design By - <a href="#">Opinions Group</a>
        </h5>
      </div>
    </div>
  );
};

export default Footer;
