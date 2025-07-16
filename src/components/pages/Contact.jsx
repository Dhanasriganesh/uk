import React, { useState } from 'react'

// Add Google Fonts import for Playfair Display in the document head
if (typeof document !== 'undefined' && !document.getElementById('playfair-font')) {
  const link = document.createElement('link');
  link.id = 'playfair-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap';
  document.head.appendChild(link);
}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    enquiryType: 'general',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting ATS! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      enquiryType: 'general',
    });
  };

  const contactInfo = [
    {
      icon: "📍",
      title: "Head Office",
      details: "ATS UK Ltd, South East England, United Kingdom",
      description: "Our main headquarters and manufacturing facility."
    },
    {
      icon: "📞",
      title: "Call Us",
      details: "+44 1234 567890",
      description: "Speak directly with our team for sales, support, or service."
    },
    {
      icon: "✉️",
      title: "Email Us",
      details: "info@ats-uk.com",
      description: "Send us your enquiry and our team will respond promptly."
    },
    {
      icon: "⏰",
      title: "Business Hours",
      details: "Mon - Fri: 8:30 AM - 5:30 PM",
      description: "We're available during these hours for consultations and support."
    }
  ];

  const socialLinks = [
    { name: "LinkedIn", icon: "💼", url: "#" },
    { name: "Twitter", icon: "🐦", url: "#" },
    { name: "YouTube", icon: "▶️", url: "#" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Contact ATS
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Have a question about our packaging solutions, machinery, or services? Get in touch with our team and we’ll be happy to assist you.
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            How Can We Help You?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{info.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{info.title}</h3>
                <p className="text-blue-700 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">{info.details}</p>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Form */}
            <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl shadow-lg">
              <h3 
                className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Send Us an Enquiry
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm sm:text-base"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm sm:text-base"
                      placeholder="your.email@ats-uk.com"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm sm:text-base"
                      placeholder="+44 1234 567890"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Enquiry Type</label>
                    <select
                      name="enquiryType"
                      value={formData.enquiryType}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm sm:text-base"
                    >
                      <option value="general">General Enquiry</option>
                      <option value="sales">Sales</option>
                      <option value="support">Support</option>
                      <option value="service">Service</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm sm:text-base"
                    placeholder="Subject of your enquiry"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none text-sm sm:text-base"
                    placeholder="Please provide details about your enquiry, requirements, or project..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 sm:py-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-base sm:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Send Enquiry
                </button>
              </form>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-6 sm:space-y-8">
              {/* Map */}
              <div className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg h-64 sm:h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.504234833635!2d0.13197831580000002!3d52.2042669797577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d870a6d2e7b1b1%3A0x2e7b1b1d2e7b1b1d!2sATS%20UK%20Ltd!5e0!3m2!1sen!2suk!4v1680000000000!5m2!1sen!2suk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ATS UK Ltd Location"
                />
              </div>

              {/* Quick Contact */}
              <div className="bg-gray-50 p-4 sm:p-6 rounded-2xl">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Quick Contact</h4>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center">
                    <span className="text-blue-700 mr-2 sm:mr-3 text-lg">📞</span>
                    <span className="text-gray-700 text-sm sm:text-base">+44 1234 567890</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-700 mr-2 sm:mr-3 text-lg">✉️</span>
                    <span className="text-gray-700 text-sm sm:text-base">info@ats-uk.com</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-700 mr-2 sm:mr-3 text-lg">📍</span>
                    <span className="text-gray-700 text-sm sm:text-base">South East England, United Kingdom</span>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gray-50 p-4 sm:p-6 rounded-2xl">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Connect With Us</h4>
                <div className="flex space-x-3 sm:space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-700 hover:bg-blue-800 text-white rounded-full flex items-center justify-center text-lg sm:text-xl transition-colors duration-300 hover:scale-110"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">What industries does ATS serve?</h3>
              <p className="text-sm sm:text-base text-gray-700">ATS provides packaging machinery and solutions for a wide range of industries including FMCG, Cosmetics, Pharmaceuticals, Food & Beverage, Chemicals, and Automotive sectors.</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">How can I request a quote or consultation?</h3>
              <p className="text-sm sm:text-base text-gray-700">You can use the contact form above, call us directly, or click the "Request a Quote" button. Our team will respond promptly to discuss your requirements.</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Where are ATS facilities located?</h3>
              <p className="text-sm sm:text-base text-gray-700">ATS has manufacturing facilities in the South East of England, with additional design, service, and support locations in the North of England and Asia.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact