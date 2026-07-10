import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCmsPage } from '../../hooks/useCmsPage'
import { useSiteSettings } from '../../context/CmsContext'
import {
  ATS_MAP_EMBED_URL,
  CONTACT_HUB_DEFAULTS,
  mergeContactCards,
  mergeEnquiryTypes,
  mergeFaq,
  resolveSiteAddress,
} from '../contact/contactDefaults'

const inputClass =
  'w-full rounded-xl border border-[#e8e8e8] bg-white px-3.5 py-2.5 text-sm text-[#111111] transition-colors placeholder:text-[#9ca3af] focus:border-[#dc2626] focus:outline-none focus:ring-2 focus:ring-[#dc2626]/15 sm:px-4 sm:py-3 sm:text-base'

function SocialIcon({ name }) {
  if (name === 'LinkedIn') {
    return (
      <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm15.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.37-1.54 2.82-1.54 3.01 0 3.57 1.98 3.57 4.56v5.62z" />
      </svg>
    )
  }
  if (name === 'YouTube') {
    return (
      <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.692 3.5 12 3.5 12 3.5s-7.692 0-9.386.574a2.994 2.994 0 0 0-2.112 2.112C0 7.88 0 12 0 12s0 4.12.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.308 20.5 12 20.5 12 20.5s7.692 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 16.12 24 12 24 12s0-4.12-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    )
  }
  return (
    <span className="text-base font-semibold" aria-hidden>
      {name?.charAt(0) || '?'}
    </span>
  )
}

export default function Contact() {
  const { content } = useCmsPage('contact')
  const { settings } = useSiteSettings()
  const hub = {
    ...CONTACT_HUB_DEFAULTS,
    ...content,
    pageTitle: content.pageTitle || content.heroTitle || CONTACT_HUB_DEFAULTS.pageTitle,
    intro: content.intro || content.heroSubtitle || CONTACT_HUB_DEFAULTS.intro,
  }
  const contactCards = mergeContactCards(content.contactCards, settings)
  const enquiryTypes = mergeEnquiryTypes(content.enquiryTypes)
  const faq = mergeFaq(content.faq)
  const cmsMap = content.mapEmbedUrl?.trim() || settings.contact?.mapEmbedUrl?.trim() || ''
  const mapEmbedUrl =
    cmsMap && !cmsMap.includes('51.301') && !cmsMap.includes('0.480') ? cmsMap : ATS_MAP_EMBED_URL

  const socialLinks = settings.footer?.socialLinks || []
  const quickLines = [
    { icon: '📞', text: settings.contact?.phone || settings.footer?.phone },
    { icon: '✉️', text: settings.contact?.email || settings.footer?.email },
    { icon: '📍', text: resolveSiteAddress(settings) },
  ].filter((line) => line.text)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    enquiryType: enquiryTypes[0]?.value || 'general',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(hub.formSuccessMessage)
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      enquiryType: enquiryTypes[0]?.value || 'general',
    })
  }

  return (
    <div className="page-shell bg-white text-[#111111]">
      <section className="relative overflow-hidden bg-[#111111] pb-10 pt-6 sm:pb-14 sm:pt-8 lg:pb-16">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-[68%] rounded-br-[min(28vw,200px)] bg-[#1a1a1a]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-[min(18vw,100px)] w-[min(42vw,200px)] sm:h-[min(20vw,140px)] sm:w-[min(38vw,280px)]"
          style={{
            clipPath: 'polygon(100% 0, 100% 100%, 8% 100%)',
            background: 'linear-gradient(160deg, #f87171 0%, #ef4444 45%, #b91c1c 100%)',
          }}
          aria-hidden
        />

        <div className="site-container relative">
          <nav className="mb-6 text-xs text-[#d1d5db] sm:text-sm" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link to="/" className="hover:text-[#fca5a5]">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-[#6b7280]">
                &gt;
              </li>
              <li className="font-medium text-white">Contact</li>
            </ol>
          </nav>

          <div className="mx-auto max-w-3xl text-center lg:max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#fca5a5] sm:text-sm">
              {hub.eyebrow}
            </p>
            <h1 className="page-hero-title mt-3 text-white">
              {hub.pageTitle}{' '}
              <span className="text-[#dc2626]">{hub.pageTitleHighlight}</span>
            </h1>
            <div className="mx-auto mb-5 mt-4 h-[3px] w-full max-w-[120px] rounded-full bg-[#dc2626] sm:max-w-[160px]" />
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#d1d5db] sm:text-base lg:text-lg">
              {hub.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="site-container pb-12 sm:pb-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-[#111111] sm:mb-10 sm:text-3xl">
          {hub.cardsSectionTitle}
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-7">
          {contactCards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-[#f1f1f1] bg-white p-6 text-center shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:p-7"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#fef2f2] text-2xl">
                {card.icon}
              </div>
              <h3 className="text-lg font-bold text-[#111111]">{card.title}</h3>
              <div className="mx-auto my-2.5 h-[2px] w-8 rounded-full bg-[#dc2626]" />
              <p className="mb-2 text-sm font-semibold text-[#dc2626] sm:text-base">{card.details}</p>
              <p className="text-sm leading-relaxed text-[#5f5f5f]">{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#f1f1f1] bg-[#fafafa] py-12 sm:py-16 lg:py-20">
        <div className="site-container">
          <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
            <div className="rounded-2xl border border-[#f1f1f1] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:p-8">
              <h2 className="mb-6 text-2xl font-bold text-[#111111] sm:text-3xl">
                {hub.formSectionTitle}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-[#111111]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-[#111111]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="your.email@company.com"
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-[#111111]">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="+44 1622 678143"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-[#111111]">
                      Enquiry Type
                    </label>
                    <select
                      name="enquiryType"
                      value={formData.enquiryType}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      {enquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-[#111111]">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="Subject of your enquiry"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-[#111111]">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`${inputClass} resize-none`}
                    placeholder="Please provide details about your enquiry, requirements, or project..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#dc2626] py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(220,38,38,0.25)] transition hover:bg-[#b91c1c] sm:text-base"
                >
                  {hub.formSubmitLabel}
                </button>
              </form>
            </div>

            <div className="space-y-6 sm:space-y-7">
              <div className="overflow-hidden rounded-2xl border border-[#f1f1f1] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                <div className="h-64 sm:h-80">
                  <iframe
                    src={mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="ATS UK Ltd Location"
                  />
                </div>
              </div>

              {quickLines.length > 0 && (
                <div className="rounded-2xl border border-[#f1f1f1] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:p-6">
                  <h3 className="mb-4 text-lg font-bold text-[#111111] sm:text-xl">
                    {hub.quickContactTitle}
                  </h3>
                  <ul className="space-y-3">
                    {quickLines.map((line) => (
                      <li key={line.icon} className="flex items-start gap-3 text-sm text-[#5f5f5f] sm:text-base">
                        <span className="text-lg" aria-hidden>
                          {line.icon}
                        </span>
                        <span>{line.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {socialLinks.length > 0 && (
                <div className="rounded-2xl border border-[#f1f1f1] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:p-6">
                  <h3 className="mb-4 text-lg font-bold text-[#111111] sm:text-xl">
                    {hub.socialSectionTitle}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#dc2626] text-white transition hover:bg-[#b91c1c]"
                        aria-label={social.name}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <SocialIcon name={social.name} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="site-container py-12 sm:py-16 lg:py-20">
        <h2 className="mb-8 text-center text-2xl font-bold text-[#111111] sm:mb-10 sm:text-3xl">
          {hub.faqSectionTitle}
        </h2>
        <div className="mx-auto max-w-3xl space-y-4 sm:space-y-5">
          {faq.map((item) => (
            <article
              key={item.question}
              className="rounded-2xl border border-[#f1f1f1] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:p-6"
            >
              <h3 className="mb-2 text-base font-bold text-[#111111] sm:text-lg">{item.question}</h3>
              <p className="text-sm leading-relaxed text-[#5f5f5f] sm:text-base">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
