import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import { GithubLogo, InstagramLogo, LinkedinLogo } from 'phosphor-react';
import "../styles/Contact.css"; // Ensure you have the correct path to your CSS file

function Contact() {
  const [name, setName] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [message, setMessage] = useState("");

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
        <h1 className="contact-title">Connect with me</h1>
        <div className="contact-icons">
  <a
    href="https://github.com/SakshamTejpal"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="GitHub"
  >
    <GithubLogo size={36} color="currentColor" />
  </a>
  <a
    href="https://www.instagram.com/saksham.tejpal_/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
  >
    <InstagramLogo size={36} color="currentColor" />
  </a>
  <a
    href="https://www.linkedin.com/in/saksham-tejpal-654b88116/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
  >
    <LinkedinLogo size={36} color="currentColor" />
  </a>
</div>

        <form className="contact-form" onSubmit={handleSubmit} style={{ fontSize: "1.25rem" }}>
          <input
            className="pill"
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ fontSize: "1.25rem", height: "2.5rem" }}
          />
          <input
            className="pill"
            id="email"
            type="email"
            placeholder="Email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            required
            style={{ fontSize: "1.25rem", height: "2.5rem" }}
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
          <button type="submit" style={{ fontSize: "1.25rem", padding: "0.75rem 2rem" }}>Send</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
