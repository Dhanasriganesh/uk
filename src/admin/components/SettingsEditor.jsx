import React from 'react'
import { LuChevronDown, LuPlus, LuTrash2 } from 'react-icons/lu'
import MediaUrlField from './MediaUrlField'
import IconPickerField from './IconPickerField'

const inputClass =
  'w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20'

function Field({ label, hint, children }) {
  return (
    <div className="mb-4">
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </label>
      {hint ? <p className="mb-2 text-xs leading-relaxed text-slate-500">{hint}</p> : null}
      {children}
    </div>
  )
}

function SettingsSection({ title, description, children, defaultOpen = true }) {
  const [open, setOpen] = React.useState(defaultOpen)
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        className="flex w-full items-start justify-between gap-3 border-b border-slate-100 bg-slate-50/80 px-4 py-4 text-left sm:px-5"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div>
          <h3 className="text-sm font-bold text-slate-900">{title}</h3>
          {description ? <p className="mt-1 text-xs leading-relaxed text-slate-500">{description}</p> : null}
        </div>
        <LuChevronDown
          className={`mt-0.5 h-5 w-5 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>
      {open ? <div className="space-y-1 p-4 sm:p-5">{children}</div> : null}
    </section>
  )
}

function LinkRowEditor({ link, onChange, onRemove, showRemove }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-slate-50/50 p-3 sm:flex-row sm:items-end">
      <div className="min-w-0 flex-1">
        <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
          Label
        </label>
        <input
          className={inputClass}
          value={link.name || ''}
          onChange={(e) => onChange({ ...link, name: e.target.value })}
          placeholder="Link label"
        />
      </div>
      <div className="min-w-0 flex-[1.2]">
        <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
          URL
        </label>
        <input
          className={inputClass}
          value={link.url || link.path || ''}
          onChange={(e) => onChange({ ...link, url: e.target.value, path: e.target.value })}
          placeholder="/services or https://..."
        />
      </div>
      {showRemove ? (
        <button
          type="button"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-200 text-red-600 hover:bg-red-50"
          onClick={onRemove}
          aria-label="Remove link"
        >
          <LuTrash2 className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  )
}

function FooterLinkColumnEditor({ column, onChange }) {
  const links = column.links || []
  return (
    <div className="rounded-xl border border-dashed border-slate-300 p-4">
      <Field label="Column title">
        <input
          className={inputClass}
          value={column.title || ''}
          onChange={(e) => onChange({ ...column, title: e.target.value })}
        />
      </Field>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Links in this column</p>
      <div className="space-y-2">
        {links.map((link, i) => (
          <LinkRowEditor
            key={i}
            link={link}
            onChange={(next) => {
              const nextLinks = [...links]
              nextLinks[i] = next
              onChange({ ...column, links: nextLinks })
            }}
            onRemove={() => onChange({ ...column, links: links.filter((_, j) => j !== i) })}
            showRemove
          />
        ))}
      </div>
      <button
        type="button"
        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700"
        onClick={() => onChange({ ...column, links: [...links, { name: '', url: '' }] })}
      >
        <LuPlus className="h-3.5 w-3.5" aria-hidden />
        Add link
      </button>
    </div>
  )
}

function NavLinkEditor({ item, onChange }) {
  const dropdown = item.dropdown || []
  const hasDropdown = dropdown.length > 0

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/40 p-4">
      <div className="mb-3 grid gap-3 sm:grid-cols-2">
        <Field label="Menu label">
          <input
            className={inputClass}
            value={item.name || ''}
            onChange={(e) => onChange({ ...item, name: e.target.value })}
          />
        </Field>
        <Field label="Main link" hint="Where the top-level menu item goes when clicked.">
          <input
            className={inputClass}
            value={item.path || ''}
            onChange={(e) => onChange({ ...item, path: e.target.value })}
            placeholder="/services"
          />
        </Field>
      </div>

      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Dropdown items {hasDropdown ? `(${dropdown.length})` : '(none — top-level link only)'}
      </p>
      {hasDropdown ? (
        <div className="space-y-2">
          {dropdown.map((sub, i) => (
            <LinkRowEditor
              key={i}
              link={{ name: sub.name, path: sub.path }}
              onChange={(next) => {
                const nextDropdown = [...dropdown]
                nextDropdown[i] = { name: next.name, path: next.path || next.url }
                onChange({ ...item, dropdown: nextDropdown })
              }}
              onRemove={() => onChange({ ...item, dropdown: dropdown.filter((_, j) => j !== i) })}
              showRemove
            />
          ))}
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700"
            onClick={() => onChange({ ...item, dropdown: [...dropdown, { name: '', path: '' }] })}
          >
            <LuPlus className="h-3.5 w-3.5" aria-hidden />
            Add dropdown item
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700"
          onClick={() => onChange({ ...item, dropdown: [{ name: '', path: '' }] })}
        >
          <LuPlus className="h-3.5 w-3.5" aria-hidden />
          Add dropdown menu
        </button>
      )}
    </div>
  )
}

function HighlightEditor({ item, onChange }) {
  return (
    <div className="grid gap-3 rounded-xl border border-slate-200 p-4 sm:grid-cols-2">
      <Field label="Icon">
        <IconPickerField path={['icon']} value={item.icon || 'years'} onChange={(_, val) => onChange({ ...item, icon: val })} />
      </Field>
      <Field label="Title">
        <input className={inputClass} value={item.title || ''} onChange={(e) => onChange({ ...item, title: e.target.value })} />
      </Field>
      <Field label="Subtitle" hint="Shown below the title in the footer highlights strip.">
        <input
          className={inputClass}
          value={item.subtitle || ''}
          onChange={(e) => onChange({ ...item, subtitle: e.target.value })}
        />
      </Field>
    </div>
  )
}

export default function SettingsEditor({ data, onChange, onAutoSave }) {
  const patch = (key, value) => onChange({ ...data, [key]: value })
  const patchFooter = (key, value) => patch('footer', { ...data.footer, [key]: value })
  const patchContact = (key, value) => patch('contact', { ...data.contact, [key]: value })

  const navLinks = data.header?.navLinks || []
  const linkColumns = data.footer?.linkColumns || []
  const highlights = data.footer?.highlights || []
  const socialLinks = data.footer?.socialLinks || []
  const legalLinks = data.footer?.legalLinks || []

  return (
    <div className="mx-auto w-full max-w-4xl space-y-4">
      <div className="rounded-xl border border-blue-100 bg-blue-50/80 px-4 py-3 text-sm text-blue-900">
        <strong>How this page works:</strong> Global Settings controls the site header, footer, and shared
        contact details. Changes apply to every page after you click <strong>Save changes</strong>. The main
        navigation menu is under <strong>Header navigation</strong>; footer content is grouped below.
      </div>

      <SettingsSection
        title="Site branding"
        description="Logo and site name shown in the header and footer on every page."
      >
        <Field label="Site name" hint="Used for accessibility labels and browser context.">
          <input
            className={inputClass}
            value={data.siteName || ''}
            onChange={(e) => patch('siteName', e.target.value)}
          />
        </Field>
        <Field label="Logo image" hint="Upload or paste a URL. Recommended: transparent PNG, roughly 200×60px.">
          <MediaUrlField
            path={['logoUrl']}
            value={data.logoUrl || ''}
            onChange={(_, val, options) => {
              const next = { ...data, logoUrl: val }
              onChange(next)
              if (options?.autoSave) onAutoSave?.(next)
            }}
          />
        </Field>
      </SettingsSection>

      <SettingsSection
        title="Header navigation"
        description="The main menu bar at the top of the site. Each item can have an optional dropdown submenu."
      >
        <div className="space-y-4">
          {navLinks.map((item, i) => (
            <div key={i}>
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">Menu item {i + 1}</p>
              <NavLinkEditor
                item={item}
                onChange={(next) => {
                  const nextLinks = [...navLinks]
                  nextLinks[i] = next
                  patch('header', { ...data.header, navLinks: nextLinks })
                }}
              />
            </div>
          ))}
        </div>
      </SettingsSection>

      <SettingsSection
        title="Footer — company info"
        description="Left column of the footer: tagline, description, address, phone, and email."
      >
        <Field label="Tagline">
          <input
            className={inputClass}
            value={data.footer?.tagline || ''}
            onChange={(e) => patchFooter('tagline', e.target.value)}
          />
        </Field>
        <Field label="Company description">
          <textarea
            className={`${inputClass} min-h-[88px] resize-y`}
            value={data.footer?.companyDescription || ''}
            onChange={(e) => patchFooter('companyDescription', e.target.value)}
          />
        </Field>
        <Field label="Address" hint="Also used on the Contact page if contact address is empty.">
          <textarea
            className={`${inputClass} min-h-[72px] resize-y`}
            value={data.footer?.address || ''}
            onChange={(e) => patchFooter('address', e.target.value)}
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Phone">
            <input
              className={inputClass}
              value={data.footer?.phone || ''}
              onChange={(e) => patchFooter('phone', e.target.value)}
            />
          </Field>
          <Field label="Email">
            <input
              className={inputClass}
              value={data.footer?.email || ''}
              onChange={(e) => patchFooter('email', e.target.value)}
            />
          </Field>
        </div>
        <Field label="Copyright name">
          <input
            className={inputClass}
            value={data.footer?.copyrightName || ''}
            onChange={(e) => patchFooter('copyrightName', e.target.value)}
          />
        </Field>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
            checked={data.footer?.showMadeInBritain !== false}
            onChange={(e) => patchFooter('showMadeInBritain', e.target.checked)}
          />
          Show &quot;Made in Britain&quot; badge in footer
        </label>
      </SettingsSection>

      <SettingsSection
        title="Footer — link columns"
        description="The four columns of navigation links in the footer (Services, Sectors, Company, Support)."
      >
        <div className="space-y-4">
          {linkColumns.map((column, i) => (
            <FooterLinkColumnEditor
              key={i}
              column={column}
              onChange={(next) => {
                const nextColumns = [...linkColumns]
                nextColumns[i] = next
                patchFooter('linkColumns', nextColumns)
              }}
            />
          ))}
        </div>
      </SettingsSection>

      <SettingsSection
        title="Footer — highlights strip"
        description="The four icon boxes above the copyright bar (e.g. 35+ Years, UK Manufactured)."
        defaultOpen={false}
      >
        <div className="space-y-3">
          {highlights.map((item, i) => (
            <HighlightEditor
              key={i}
              item={item}
              onChange={(next) => {
                const nextItems = [...highlights]
                nextItems[i] = next
                patchFooter('highlights', nextItems)
              }}
            />
          ))}
        </div>
      </SettingsSection>

      <SettingsSection
        title="Footer — social & legal links"
        description="Social icons under the company info, and legal links in the bottom bar."
        defaultOpen={false}
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Social links</p>
        <div className="mb-4 space-y-2">
          {socialLinks.map((link, i) => (
            <LinkRowEditor
              key={i}
              link={link}
              onChange={(next) => {
                const nextLinks = [...socialLinks]
                nextLinks[i] = { name: next.name, url: next.url || next.path }
                patchFooter('socialLinks', nextLinks)
              }}
              onRemove={() => patchFooter('socialLinks', socialLinks.filter((_, j) => j !== i))}
              showRemove
            />
          ))}
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600"
            onClick={() => patchFooter('socialLinks', [...socialLinks, { name: 'LinkedIn', url: '' }])}
          >
            <LuPlus className="h-3.5 w-3.5" aria-hidden />
            Add social link
          </button>
        </div>

        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Legal links</p>
        <div className="space-y-2">
          {legalLinks.map((link, i) => (
            <LinkRowEditor
              key={i}
              link={link}
              onChange={(next) => {
                const nextLinks = [...legalLinks]
                nextLinks[i] = { name: next.name, url: next.url || next.path }
                patchFooter('legalLinks', nextLinks)
              }}
              onRemove={() => patchFooter('legalLinks', legalLinks.filter((_, j) => j !== i))}
              showRemove
            />
          ))}
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600"
            onClick={() => patchFooter('legalLinks', [...legalLinks, { name: '', url: '' }])}
          >
            <LuPlus className="h-3.5 w-3.5" aria-hidden />
            Add legal link
          </button>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Contact page details"
        description="Shared contact information used on the /contact page (hero, cards, and map)."
        defaultOpen={false}
      >
        <Field label="Contact page title">
          <input
            className={inputClass}
            value={data.contact?.heroTitle || ''}
            onChange={(e) => patchContact('heroTitle', e.target.value)}
          />
        </Field>
        <Field label="Contact page intro">
          <textarea
            className={`${inputClass} min-h-[88px] resize-y`}
            value={data.contact?.heroSubtitle || ''}
            onChange={(e) => patchContact('heroSubtitle', e.target.value)}
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Phone">
            <input
              className={inputClass}
              value={data.contact?.phone || ''}
              onChange={(e) => patchContact('phone', e.target.value)}
            />
          </Field>
          <Field label="Email">
            <input
              className={inputClass}
              value={data.contact?.email || ''}
              onChange={(e) => patchContact('email', e.target.value)}
            />
          </Field>
        </div>
        <Field label="Address">
          <textarea
            className={`${inputClass} min-h-[72px] resize-y`}
            value={data.contact?.address || ''}
            onChange={(e) => patchContact('address', e.target.value)}
          />
        </Field>
        <Field label="Business hours">
          <input
            className={inputClass}
            value={data.contact?.businessHours || ''}
            onChange={(e) => patchContact('businessHours', e.target.value)}
          />
        </Field>
        <Field label="Google Maps embed URL">
          <textarea
            className={`${inputClass} min-h-[72px] resize-y font-mono text-xs`}
            value={data.contact?.mapEmbedUrl || ''}
            onChange={(e) => patchContact('mapEmbedUrl', e.target.value)}
          />
        </Field>
      </SettingsSection>
    </div>
  )
}
