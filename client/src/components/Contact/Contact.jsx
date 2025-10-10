import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import "../Contact/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("fooorm submitted:", formData);
  };

  return (
    <div className="contact-page">

      <div className="contact-hero">
        <div className="container">
          <h1 className="contact-title">Get in Touch</h1>
          <p className="contact-subtitle">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info">
              <h2 className="contact-info-title">Contact Information</h2>
              <p className="contact-info-description">
                Reach out to us through any of these channels or visit us at our location.
              </p>

              <div className="contact-items">
                <div className="contact-item">
                  <div className="contact-icon"><Phone className="icon" /></div>
                  <div className="contact-details">
                    <h3 className="contact-label">Phone</h3>
                    <p className="contact-value">+359 888 8888 8</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon"><Mail className="icon" /></div>
                  <div className="contact-details">
                    <h3 className="contact-label">Email</h3>
                    <p className="contact-value">hello@tastybites.com</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon"><MapPin className="icon" /></div>
                  <div className="contact-details">
                    <h3 className="contact-label">Address</h3>
                    <p className="contact-value"> 123 Food Street, Tasty City</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon"><Clock className="icon" /></div>
                  <div className="contact-details">
                    <h3 className="contact-label">Hours</h3>
                    <p className="contact-value">
                      Mon-Sat: 11AM-11PM<br />
                      Sunday: 12PM-10PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-container">
              <h2 className="contact-form-title">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone (Optional)</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-textarea"
                    rows={5}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary submit-btn">
                  <Send className="btn-icon" /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;