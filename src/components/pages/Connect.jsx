import React, { useState } from 'react'

// Add Google Fonts import for Playfair Display in the document head
if (typeof document !== 'undefined' && !document.getElementById('playfair-font')) {
  const link = document.createElement('link');
  link.id = 'playfair-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap';
  document.head.appendChild(link);
}

function Connect() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => { e.preventDefault(); alert('Consultation request sent!'); };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-blend-multiply" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-blue-900/80" />
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6 sm:py-10 lg:py-20 gap-6 sm:gap-10 lg:gap-16">
        {/* Left: Text */}
        <div className="flex-1 text-white max-w-xl text-center lg:text-left mb-6 lg:mb-0">
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 md:mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Let's Connect
          </h2>
          <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-blue-300 mb-2 sm:mb-4 md:mb-6 tracking-wide">
            REQUEST A PACKAGING MACHINERY CONSULTATION
          </h3>
          <p className="text-xs sm:text-base md:text-lg leading-relaxed text-blue-100 mb-4 sm:mb-6 md:mb-8">
            With over 35 years of experience, ATS Packaging delivers advanced packaging machinery and automation solutions for a wide range of industries. Fill out the form to request a free consultation with our experts and discover how we can optimize your packaging process.
          </p>
        </div>
        {/* Right: Form Card */}
        <form onSubmit={handleSubmit} className="flex-1 bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-10 max-w-md w-full min-w-[220px] sm:min-w-[320px] flex flex-col gap-3 sm:gap-5 border border-gray-100">
          <h3 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-3 text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
            Submit
          </h3>
          <div>
            <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-xs sm:text-base">
              Name <span className="text-red-500">*</span>
            </label>
            <input 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              required 
              className="w-full px-2 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-900 bg-gray-50 text-xs sm:text-base" 
              placeholder="Enter your name" 
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-xs sm:text-base">
              Email <span className="text-red-500">*</span>
            </label>
            <input 
              name="email" 
              type="email"
              value={form.email} 
              onChange={handleChange} 
              required 
              className="w-full px-2 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-900 bg-gray-50 text-xs sm:text-base" 
              placeholder="Enter your email" 
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-xs sm:text-base">
              Company <span className="text-red-500">*</span>
            </label>
            <input 
              name="company" 
              value={form.company} 
              onChange={handleChange} 
              required 
              className="w-full px-2 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-900 bg-gray-50 text-xs sm:text-base" 
              placeholder="Enter your company name" 
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-xs sm:text-base">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-2 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-900 bg-gray-50 text-xs sm:text-base"
              placeholder="How can we help you?"
            />
          </div>
          <button 
            type="submit" 
            className="mt-2 sm:mt-4 w-full py-2 sm:py-3 rounded-full bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  )
}

export default Connect