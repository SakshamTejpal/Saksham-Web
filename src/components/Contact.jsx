import React, { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Contact from ${encodeURIComponent(name)}`;
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${emailInput}\n\n${message}`
    );
    const mailtoURL = `mailto:saksham.tejpal@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoURL;
  };

  return (
    <section className="contact-section">
      <h1 className="contact-title">Contact</h1>
      {/* Contact Form placed at the top */}
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Your Name</label>
        <input
          id="name"
          type="text"
          placeholder="Jane Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">Your Email</label>
        <input
          id="email"
          type="email"
          placeholder="jane@example.com"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          required
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          placeholder="Write your message here…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          required
        />

        <button type="submit">Send</button>
      </form>
    </section>
  );
}

export default Contact;
