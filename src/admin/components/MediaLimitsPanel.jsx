import React from 'react'
import { LuInfo, LuLightbulb } from 'react-icons/lu'
import {
  MEDIA_LIMITS_COPY,
  MAX_IMAGE_FILE_BYTES,
  STORAGE_RECORD_MAX_BYTES,
  formatBytes,
} from '../../cms/mediaLimits'

export default function MediaLimitsPanel({ compact = false }) {
  if (compact) {
    return (
      <details className="group text-xs text-slate-600">
        <summary className="cursor-pointer list-none font-medium text-slate-700 marker:content-none [&::-webkit-details-marker]:hidden">
          <span className="text-red-600 group-open:text-red-700">Upload limits</span>
          <span className="ml-1 text-slate-400">(max {formatBytes(MAX_IMAGE_FILE_BYTES)})</span>
        </summary>
        <MediaLimitsBody className="mt-2 rounded-xl border border-amber-200/80 bg-amber-50/80 p-3" />
      </details>
    )
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 shadow-sm">
      <div className="mb-4 flex items-start gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700"
          aria-hidden
        >
          <LuInfo className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-base font-semibold text-slate-900">{MEDIA_LIMITS_COPY.headline}</h2>
          <p className="mt-1 text-sm text-slate-500">
            {MEDIA_LIMITS_COPY.maxFile} · {MEDIA_LIMITS_COPY.formats}
          </p>
        </div>
      </div>
      <MediaLimitsBody />
    </div>
  )
}

function MediaLimitsBody({ className = '' }) {
  return (
    <div className={`space-y-4 text-sm text-slate-700 ${className}`}>
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="font-semibold text-slate-900">{MEDIA_LIMITS_COPY.whyTitle}</p>
        <p className="mt-1.5 leading-relaxed text-slate-600">{MEDIA_LIMITS_COPY.whyBody}</p>
        <ul className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
          <li className="rounded-lg bg-slate-50 px-3 py-2">
            <span className="font-semibold text-slate-800">File limit:</span>{' '}
            {formatBytes(MAX_IMAGE_FILE_BYTES)}
          </li>
          <li className="rounded-lg bg-slate-50 px-3 py-2">
            <span className="font-semibold text-slate-800">Saved size limit:</span>{' '}
            {formatBytes(STORAGE_RECORD_MAX_BYTES)}
          </li>
        </ul>
      </div>
      <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-4">
        <p className="mb-2 flex items-center gap-2 font-semibold text-slate-900">
          <LuLightbulb className="h-4 w-4 text-amber-600" aria-hidden />
          Tips if an image is rejected
        </p>
        <ul className="list-inside list-disc space-y-1.5 text-slate-600">
          {MEDIA_LIMITS_COPY.tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </div>
      <p className="text-xs text-slate-500">{MEDIA_LIMITS_COPY.videoNote}</p>
    </div>
  )
}
