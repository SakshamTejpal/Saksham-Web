import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import { GithubLogo, InstagramLogo, LinkedinLogo } from 'phosphor-react';
import { CiHome,CiLaptop,CiUser,CiCalendar,CiMail    } from "react-icons/ci";
import { PiGithubLogoLight, PiLinkedinLogoLight, PiInstagramLogoLight } from "react-icons/pi";
import '../styles/Contact.css';
import useIsMobile from "../hooks/screensize.js";


function Contact() {
  const [name, setName] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [message, setMessage] = useState("");
  const isMobile =  useIsMobile();

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceID = 'service_oy8mroc';
    const templateID = 'template_y9ndlhp';
    const publicKey = 'STxU44Yj_0DPkBs73';

    emailjs.send(serviceID, templateID, {
      from_name: name,
      from_email: emailInput,
      message: message,
    }, publicKey)
    .then(() => {
      alert("Message sent successfully!");
      setName("");
      setEmailInput("");
      setMessage("");
    }, (error) => {
      alert("Failed to send message. Please try again.");
      console.error(error);
    });
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-content">
        <h2 className="contact-title">Connect with me</h2>
        <div className="contact-links">
          <a
            href="https://github.com/SakshamTejpal"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            {isMobile ? <PiGithubLogoLight size={40} /> : <h4>GitHub</h4>}
          </a>
          <a
            href="https://www.instagram.com/saksham.tejpal_/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            {isMobile ? <PiInstagramLogoLight size={40} color="currentColor" /> : <h4>Instagram</h4>}
          </a>
          <a
            href="https://www.linkedin.com/in/saksham-tejpal-654b88116/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            {isMobile ? <PiLinkedinLogoLight size={40} color="currentColor" /> : <h4>LinkedIn</h4>}
          </a>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-fields">
            <input
              className="pill"
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ fontSize: "1.25rem", padding: "0.5rem"}}
            />
            <input
              className="pill"
              id="email"
              type="email"
              placeholder="Email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              required
              style={{ fontSize: "1.25rem", padding: "0.5rem" }}
            />
            <textarea
              id="message"
              placeholder="Write your message here…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              required
              style={{ fontSize: "1.25rem" }}
            />
          </div>
          <div className="form-button">
            <button type="submit" style={{ fontSize: "1.25rem", padding: "0.75rem 2rem" }}>
              <span className="contact-button-text">
                {isMobile ? "Send" : "›"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;

