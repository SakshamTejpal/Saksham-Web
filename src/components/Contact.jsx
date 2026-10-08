import { useState } from "react";
import emailjs from "@emailjs/browser";
import { PiGithubLogoLight, PiLinkedinLogoLight, PiInstagramLogoLight } from "react-icons/pi";
import useIsMobile from "../hooks/useIsMobile";
import "../styles/Contact.css";

// EmailJS IDs are public by design; restrict allowed origins and rate limits in the EmailJS dashboard.
const EMAILJS_SERVICE_ID = "service_oy8mroc";
const EMAILJS_TEMPLATE_ID = "template_y9ndlhp";
const EMAILJS_PUBLIC_KEY = "STxU44Yj_0DPkBs73";

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/SakshamTejpal", Icon: PiGithubLogoLight },
  { label: "Instagram", href: "https://www.instagram.com/saksham.tejpal_/", Icon: PiInstagramLogoLight },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/saksham-tejpal-654b88116/", Icon: PiLinkedinLogoLight },
];

const EMPTY_FORM = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [sending, setSending] = useState(false);
  const isMobile = useIsMobile();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      alert("Message sent successfully!");
      setForm(EMPTY_FORM);
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-content">
        <h2 className="contact-title">Let's Connect</h2>
        <div className="contact-links">
          {SOCIAL_LINKS.map(({ label, href, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
              {isMobile ? <Icon size={35} /> : <h4>{label}</h4>}
            </a>
          ))}
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-fields">
            <input
              name="name"
              type="text"
              placeholder="Name"
              aria-label="Name"
              autoComplete="name"
              maxLength={100}
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              aria-label="Email"
              autoComplete="email"
              maxLength={254}
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Write your message here…"
              aria-label="Message"
              maxLength={5000}
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-button">
            <button type="submit" disabled={sending} aria-label="Send">
              <span className="contact-button-text">{isMobile ? (sending ? "Sending…" : "Send") : "›"}</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
