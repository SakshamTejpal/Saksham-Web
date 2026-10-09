import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import SectionTitle from "./SectionTitle";
import "../styles/Contact.css";

// EmailJS IDs are public by design; restrict allowed origins and rate limits in the EmailJS dashboard.
const EMAILJS_SERVICE_ID = "service_oy8mroc";
const EMAILJS_TEMPLATE_ID = "template_y9ndlhp";
const EMAILJS_PUBLIC_KEY = "STxU44Yj_0DPkBs73";

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/SakshamTejpal" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/saksham-tejpal-654b88116/" },
  { label: "Instagram", href: "https://www.instagram.com/saksham.tejpal_/" },
];

const EMPTY_FORM = { name: "", email: "", message: "" };
const STATUS_TEXT = {
  sending: "→ sending…",
  sent: "→ message sent",
  failed: "→ couldn't send. try again",
};
const MIN_EDITOR_LINES = 8;

// The message box looks like a tiny code editor: a line-number gutter that tracks the text.
function useLineCount(textareaRef, value) {
  const [lines, setLines] = useState(MIN_EDITOR_LINES);
  useEffect(() => {
    const textarea = textareaRef.current;
    const style = getComputedStyle(textarea);
    const contentHeight = textarea.scrollHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
    setLines(Math.max(MIN_EDITOR_LINES, Math.round(contentHeight / parseFloat(style.lineHeight))));
  }, [textareaRef, value]);
  return lines;
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState(null);
  const textareaRef = useRef(null);
  const gutterRef = useRef(null);
  const lineCount = useLineCount(textareaRef, form.message);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setStatus("sent");
      setForm(EMPTY_FORM);
    } catch (error) {
      console.error(error);
      setStatus("failed");
    }
  };

  return (
    <section className="section" data-snap id="contact">
      <SectionTitle align="right">Let's Connect</SectionTitle>
      <div className="contact">
        <ul className="contact-links" data-reveal>
          {SOCIAL_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer">
                {label} <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>

        <form className="contact-form" onSubmit={handleSubmit} data-reveal>
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
          <div className="editor">
            <div className="editor-bar label">
              <span>message.txt</span>
              <span>{form.message.length} / 5000</span>
            </div>
            <div className="editor-body">
              <div className="editor-gutter" ref={gutterRef} aria-hidden="true">
                {Array.from({ length: lineCount }, (_, i) => <span key={i}>{i + 1}</span>)}
              </div>
              <textarea
                ref={textareaRef}
                name="message"
                placeholder="// write your message"
                aria-label="Message"
                spellCheck={false}
                maxLength={5000}
                rows={MIN_EDITOR_LINES}
                value={form.message}
                onChange={handleChange}
                onScroll={(e) => (gutterRef.current.scrollTop = e.target.scrollTop)}
                required
              />
            </div>
          </div>
          <div className="contact-send">
            <p className={`contact-status ${status ?? ""}`} aria-live="polite">{STATUS_TEXT[status]}</p>
            <button type="submit" disabled={status === "sending"}>Send →</button>
          </div>
        </form>
      </div>
    </section>
  );
}
