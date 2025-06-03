import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" className="logo-footer" />
          <p>
            Eat & Chill is a smart restaurant ordering system built to simplify
            food ordering with digital menus, QR code access, and real-time
            order tracking.
          </p>
          <div className="footer-social-icon">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>
              <a href="tel:+917755013772" className="footer-link">
                +91 7755013772
              </a>
            </li>
            <li>
              <a href="mailto:sa798027@gmail.com" className="footer-link">
                sa798027@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-note">
        Developed by <strong>Shahbaz Ahmad</strong> | MCA Capstone Project,
        <strong> Uttaranchal University</strong>
      </p>
      <p className="footer-note">
        This is a student project for academic purposes only.
      </p>
    </div>
  );
};

export default Footer;
