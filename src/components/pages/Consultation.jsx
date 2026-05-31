import React from 'react'
import { Link } from 'react-router-dom'
import { useCmsPage } from '../../hooks/useCmsPage'
import ProductInfoCta from '../products/ProductInfoCta'
import {
  CONSULTATION_HUB_DEFAULTS,
  CONSULTATION_SERVICES,
} from '../consultation/consultationHubDefaults'
import { LuArrowRight } from 'react-icons/lu'

function mergeServices(cmsServices) {
  return CONSULTATION_SERVICES.map((def, i) => {
    const service = cmsServices?.[i] || {}
    return {
      title: service.title || def.title,
      description: service.description || def.description,
      path: service.path || def.path,
      icon: def.icon,
    }
  })
}

export default function Consultation() {
  const { content } = useCmsPage('consultation')
  const hub = { ...CONSULTATION_HUB_DEFAULTS, ...content }
  const services = mergeServices(content.services)
  const ctaSection = { ...CONSULTATION_HUB_DEFAULTS.ctaSection, ...content.ctaSection }
  const cta = { ...CONSULTATION_HUB_DEFAULTS.cta, ...content.cta }

  return (
    <div className="w-full overflow-x-hidden bg-white text-[#111111]">
      <section className="relative overflow-hidden bg-white pb-10 pt-6 sm:pb-14 sm:pt-8 lg:pb-16">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-[68%] rounded-br-[min(28vw,200px)] bg-[#f5f5f5]"
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
          <nav className="mb-6 text-xs text-[#5f5f5f] sm:text-sm" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link to="/" className="hover:text-[#dc2626]">
                  Home
                </Link>
              </li>
              <li aria-hidden>&gt;</li>
              <li className="font-medium text-[#111111]">Consultation</li>
            </ol>
          </nav>

          <div className="mx-auto max-w-3xl text-center lg:max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#dc2626] sm:text-sm">
              {hub.eyebrow}
            </p>
            <h1 className="mt-3 text-[clamp(1.75rem,5vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#111111]">
              {hub.title}{' '}
              <span className="text-[#dc2626]">{hub.titleHighlight}</span>
            </h1>
            <div className="mx-auto mb-5 mt-4 h-[3px] w-full max-w-[120px] rounded-full bg-[#dc2626] sm:max-w-[160px]" />
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#5f5f5f] sm:text-base lg:text-lg">
              {hub.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="site-container pb-12 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-7">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Link
                key={service.path}
                to={service.path}
                className="group flex h-full flex-col rounded-2xl border border-[#f1f1f1] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)] sm:p-7"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#fef2f2]">
                  <Icon className="h-6 w-6 text-[#dc2626]" aria-hidden />
                </div>
                <h2 className="text-lg font-bold text-[#111111] sm:text-xl">{service.title}</h2>
                <div className="mb-3 mt-2.5 h-[2px] w-8 rounded-full bg-[#dc2626]" />
                <p className="flex-1 text-sm leading-relaxed text-[#5f5f5f]">{service.description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#dc2626]">
                  Learn more
                  <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      <ProductInfoCta
        title={ctaSection.title}
        description={ctaSection.description}
        cta={cta}
      />
    </div>
  )
}
