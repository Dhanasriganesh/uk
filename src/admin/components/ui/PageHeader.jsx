import React from 'react'
import { Link } from 'react-router-dom'
import { LuChevronRight } from 'react-icons/lu'

export default function PageHeader({
  title,
  description,
  actions,
  breadcrumbs = [],
  actionsClassName = '',
}) {
  return (
    <header className="mb-6 sm:mb-8">
      {breadcrumbs.length > 0 && (
        <nav
          className="mb-2 flex flex-wrap items-center gap-x-1 gap-y-1 text-xs text-slate-500 sm:mb-3 sm:text-sm"
          aria-label="Breadcrumb"
        >
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={`${crumb.label}-${index}`}>
              {index > 0 && <LuChevronRight className="h-3 w-3 shrink-0 text-slate-400" aria-hidden />}
              {crumb.to ? (
                <Link to={crumb.to} className="max-w-[8rem] truncate transition-colors hover:text-red-600 sm:max-w-none">
                  {crumb.label}
                </Link>
              ) : (
                <span className="max-w-[10rem] truncate font-medium text-slate-700 sm:max-w-none">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}
      <div className="flex flex-col gap-4 sm:gap-5">
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">{title}</h1>
          {description && (
            <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-slate-500 sm:mt-2">{description}</p>
          )}
        </div>
        {actions && (
          <div
            className={`flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center lg:w-auto lg:justify-end ${actionsClassName}`}
          >
            {actions}
          </div>
        )}
      </div>
    </header>
  )
}
