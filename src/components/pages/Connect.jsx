import React, { useState } from 'react'
import CmsPageProvider from '../cms/CmsPageProvider'

function ConnectForm({ content }) {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = (e) => {
    e.preventDefault()
    alert(content.successMessage || 'Consultation request sent! We will contact you soon.')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-lg flex-col gap-3 self-center rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl sm:gap-4 sm:rounded-3xl sm:p-6 lg:max-w-md lg:flex-1 lg:p-8 xl:max-w-lg xl:p-10"
    >
      <h3 className="mb-1 text-lg font-bold text-gray-900 sm:text-xl" style={{ fontFamily: 'Playfair Display, serif' }}>
        {content.formTitle || 'Submit'}
      </h3>
      {['name', 'email', 'company', 'message'].map((field) => (
        <div key={field}>
          <label className="mb-1 block text-xs font-semibold capitalize text-gray-700 sm:mb-2 sm:text-sm">
            {field} <span className="text-red-500">*</span>
          </label>
          {field === 'message' ? (
            <textarea
              name={field}
              required
              rows={4}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none sm:px-4 sm:py-3"
              value={form[field]}
              onChange={handleChange}
            />
          ) : (
            <input
              name={field}
              type={field === 'email' ? 'email' : 'text'}
              required
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none sm:px-4 sm:py-3"
              value={form[field]}
              onChange={handleChange}
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="mt-1 min-h-[44px] rounded-xl bg-blue-700 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 sm:text-base"
      >
        Submit
      </button>
    </form>
  )
}

function Connect() {
  return (
    <CmsPageProvider pageId="home-connect">
      {({ content, mediaUrl }) => {
        const bgImage =
          mediaUrl(content.backgroundImageUrl) ||
          'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'

        return (
          <section
            className="relative w-full max-w-full overflow-x-hidden bg-blend-multiply"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-blue-900/80" />
            <div className="site-container relative z-10 flex flex-col items-stretch gap-8 py-10 sm:gap-10 sm:py-14 md:flex-row md:items-center md:justify-between md:gap-12 lg:gap-16 lg:py-20">
              <div className="flex-1 text-center text-white md:max-w-xl md:text-left">
                <h2
                  className="page-hero-title-lg mb-2 text-white sm:mb-4"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {content.title || "Let's Connect"}
                </h2>
                <h3 className="mb-3 text-xs font-semibold tracking-wide text-blue-300 sm:mb-4 sm:text-sm md:text-base lg:text-lg">
                  {content.subtitle || 'REQUEST A PACKAGING MACHINERY CONSULTATION'}
                </h3>
                <p className="text-sm leading-relaxed text-blue-100 sm:text-base lg:text-lg">
                  {content.body ||
                    'With over 35 years of experience, ATS Packaging delivers advanced packaging machinery and automation solutions for a wide range of industries.'}
                </p>
              </div>
              <ConnectForm content={content} />
            </div>
          </section>
        )
      }}
    </CmsPageProvider>
  )
}

export default Connect
