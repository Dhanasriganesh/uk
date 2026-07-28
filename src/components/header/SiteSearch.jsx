import React, { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { buildSiteSearchIndex, filterSiteSearch } from '../../utils/siteSearchIndex'

function SearchIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
    </svg>
  )
}

export default function SiteSearch({ navLinks, className = '', onNavigate }) {
  const navigate = useNavigate()
  const listId = useId()
  const rootRef = useRef(null)
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const fullWidth = className.includes('w-full')

  const searchIndex = useMemo(() => buildSiteSearchIndex(navLinks), [navLinks])
  const results = useMemo(() => filterSiteSearch(searchIndex, query), [searchIndex, query])

  const showDropdown = open && query.trim().length > 0

  useEffect(() => {
    setActiveIndex(results.length ? 0 : -1)
  }, [results])

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  const goTo = (path) => {
    navigate(path)
    setQuery('')
    setOpen(false)
    onNavigate?.()
  }

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
      return
    }

    if (!showDropdown || !results.length) {
      if (event.key === 'Enter' && query.trim()) {
        const match = filterSiteSearch(searchIndex, query, 1)[0]
        if (match) goTo(match.path)
      }
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((i) => (i + 1) % results.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((i) => (i <= 0 ? results.length - 1 : i - 1))
    } else if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault()
      goTo(results[activeIndex].path)
    }
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <label htmlFor={listId} className="sr-only">
        Search site pages
      </label>
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
        <input
          ref={inputRef}
          id={listId}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search…"
          autoComplete="off"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls={`${listId}-results`}
          aria-autocomplete="list"
          className={`h-9 rounded-[10px] border border-[#e5e7eb] bg-[#fafafa] pl-9 pr-3 text-[13px] text-[#111111] placeholder:text-[#9ca3af] transition-colors focus:border-[#dc2626] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#dc2626]/15 md:h-10 md:text-[14px] ${
            fullWidth ? 'w-full' : 'w-[8.5rem] md:w-[9.5rem] lg:w-[10rem] xl:w-[12rem] 2xl:w-[14rem]'
          }`}
        />
      </div>

      {showDropdown && (
        <div
          id={`${listId}-results`}
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-[#f1f1f1] bg-white py-1 shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
        >
          {results.length === 0 ? (
            <p className="px-4 py-3 text-[13px] text-[#6b7280]">No pages found. Try another keyword.</p>
          ) : (
            results.map((item, index) => (
              <button
                key={item.path}
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                className={`flex w-full flex-col items-start px-4 py-2.5 text-left transition-colors ${
                  index === activeIndex ? 'bg-[#fef2f2] text-[#dc2626]' : 'text-[#111111] hover:bg-[#fef2f2] hover:text-[#dc2626]'
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => goTo(item.path)}
              >
                <span className="text-[14px] font-semibold">{item.name}</span>
                <span className="text-[12px] text-[#6b7280]">{item.category}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
