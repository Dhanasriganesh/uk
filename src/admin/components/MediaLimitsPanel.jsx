import React from 'react'
import {
  MEDIA_LIMITS_COPY,
  MAX_IMAGE_FILE_BYTES,
  STORAGE_RECORD_MAX_BYTES,
  formatBytes,
} from '../../cms/mediaLimits'

export default function MediaLimitsPanel({ compact = false }) {
  if (compact) {
    return (
      <details className="group text-xs text-gray-600">
        <summary className="cursor-pointer list-none font-medium text-gray-700 marker:content-none [&::-webkit-details-marker]:hidden">
          <span className="text-red-600 group-open:text-red-700">Upload limits</span>
          <span className="ml-1 text-gray-400">(max {formatBytes(MAX_IMAGE_FILE_BYTES)})</span>
        </summary>
        <MediaLimitsBody className="mt-2 rounded-lg border border-amber-200 bg-amber-50/80 p-3" />
      </details>
    )
  }

  return (
    <div className="rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50/50 p-5 shadow-sm">
      <div className="mb-3 flex items-start gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-lg"
          aria-hidden
        >
          ℹ️
        </span>
        <div>
          <h2 className="text-base font-semibold text-gray-900">{MEDIA_LIMITS_COPY.headline}</h2>
          <p className="mt-1 text-sm text-gray-600">
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
    <div className={`space-y-3 text-sm text-gray-700 ${className}`}>
      <div className="rounded-lg border border-amber-100 bg-white/70 p-3">
        <p className="font-semibold text-gray-900">{MEDIA_LIMITS_COPY.whyTitle}</p>
        <p className="mt-1 leading-relaxed">{MEDIA_LIMITS_COPY.whyBody}</p>
        <ul className="mt-2 grid gap-1 text-xs text-gray-600 sm:grid-cols-2">
          <li>
            <span className="font-medium text-gray-800">File limit:</span>{' '}
            {formatBytes(MAX_IMAGE_FILE_BYTES)}
          </li>
          <li>
            <span className="font-medium text-gray-800">Saved size limit:</span>{' '}
            {formatBytes(STORAGE_RECORD_MAX_BYTES)}
          </li>
        </ul>
      </div>
      <div>
        <p className="mb-1.5 font-medium text-gray-900">Tips if an image is rejected</p>
        <ul className="list-inside list-disc space-y-1 text-gray-600">
          {MEDIA_LIMITS_COPY.tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </div>
      <p className="text-xs text-gray-500">{MEDIA_LIMITS_COPY.videoNote}</p>
    </div>
  )
}
