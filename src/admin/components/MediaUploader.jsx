import React, { useRef, useState } from 'react'
import { LuLink, LuPlus, LuUpload } from 'react-icons/lu'
import { uploadMedia, formatMediaError } from '../../firebase/cmsService'
import { uploadMediaFile } from '../../firebase/uploadMediaFile'
import { guessMediaType } from '../../cms/mediaSeed'
import {
  ACCEPTED_IMAGE_INPUT,
  ACCEPTED_VIDEO_INPUT,
  ACCEPTED_MEDIA_INPUT,
  ACCEPTED_PDF_INPUT,
} from '../../cms/mediaLimits'
import MediaLimitsPanel from './MediaLimitsPanel'
import Button from './ui/Button'
import Alert from './ui/Alert'

function acceptToInput(accept) {
  if (accept === 'image') return ACCEPTED_IMAGE_INPUT
  if (accept === 'video') return ACCEPTED_VIDEO_INPUT
  if (accept === 'pdf' || accept === 'brochure') return ACCEPTED_PDF_INPUT
  return ACCEPTED_MEDIA_INPUT
}

export default function MediaUploader({ onUploaded, variant = 'compact', accept = 'any' }) {
  const fileInputRef = useRef(null)
  const [url, setUrl] = useState('')
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const isFull = variant === 'full'
  const isInline = variant === 'inline'
  const busy = saving || uploading

  const onSaveUrl = async (e) => {
    e?.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const trimmedUrl = url.trim()
      const result = await uploadMedia({
        url: trimmedUrl,
        name: name.trim() || trimmedUrl.split('/').pop(),
        type: guessMediaType(trimmedUrl),
        source: 'manual',
      })
      setSuccess(`Saved “${result.name}” (${result.url})`)
      onUploaded?.(result.url, result)
      setUrl('')
      setName('')
    } catch (err) {
      setError(formatMediaError(err) || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const onFileChange = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

    setUploading(true)
    setProgress(0)
    setError('')
    setSuccess('')
    try {
      const result = await uploadMediaFile(file, {
        accept,
        onProgress: setProgress,
      })
      setSuccess(`Uploaded “${result.name}” → ${result.url}`)
      onUploaded?.(result.url, result)
    } catch (err) {
      setError(formatMediaError(err) || err.message || 'Upload failed')
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  const uploadSection = (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-4 sm:p-5">
      <div className="mb-3 flex items-center gap-2 text-slate-900">
        <LuUpload className="h-5 w-5 text-red-600" aria-hidden />
        <h3 className="text-sm font-semibold sm:text-base">Upload file</h3>
      </div>
      <p className="mb-3 text-xs text-slate-500">
        {accept === 'video'
          ? 'Videos → /videos/ (or Firebase Storage when deployed)'
          : accept === 'image'
            ? 'Images → /media/'
            : 'Images and videos — saved as URLs in the media library'}
      </p>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptToInput(accept)}
        className="sr-only"
        disabled={busy}
        onChange={onFileChange}
      />
      <Button
        type="button"
        variant="primary"
        icon={LuUpload}
        disabled={busy}
        onClick={() => fileInputRef.current?.click()}
      >
        {uploading ? `Uploading… ${progress}%` : 'Choose file'}
      </Button>
      {uploading && (
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-red-600 transition-all duration-200"
            style={{ width: `${Math.max(progress, 8)}%` }}
          />
        </div>
      )}
    </div>
  )

  const urlForm = (
    <form onSubmit={onSaveUrl} className="space-y-4">
      <div>
        <label htmlFor="media-url" className="mb-1.5 block text-sm font-semibold text-slate-800">
          Or paste URL
        </label>
        <input
          id="media-url"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="/media/photo.jpg or https://…"
          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
          disabled={busy}
        />
      </div>

      {isFull && (
        <div>
          <label htmlFor="media-name" className="mb-1.5 block text-sm font-semibold text-slate-800">
            Display name <span className="font-normal text-slate-400">(optional)</span>
          </label>
          <input
            id="media-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Hero background"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
            disabled={busy}
          />
        </div>
      )}

      <Button type="submit" variant="secondary" icon={LuPlus} disabled={busy || !url.trim()}>
        {saving ? 'Saving…' : 'Add URL to library'}
      </Button>
    </form>
  )

  if (isFull) {
    return (
      <div className="w-full space-y-5">
        <MediaLimitsPanel />
        {uploadSection}
        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 sm:rounded-2xl sm:p-6">
          <div className="mb-4 flex items-center gap-2 text-slate-900">
            <LuLink className="h-5 w-5 text-red-600" aria-hidden />
            <h3 className="text-base font-semibold">Add by URL</h3>
          </div>
          {urlForm}
        </div>
        <StatusMessages error={error} success={success} />
      </div>
    )
  }

  if (isInline) {
    return (
      <div className="w-full">
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptToInput(accept)}
          className="sr-only"
          disabled={busy}
          onChange={onFileChange}
        />
        <Button
          type="button"
          variant="primary"
          icon={LuUpload}
          disabled={busy}
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? `Uploading… ${progress}%` : 'Choose file'}
        </Button>
        {uploading && (
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-red-600 transition-all"
              style={{ width: `${Math.max(progress, 8)}%` }}
            />
          </div>
        )}
        <StatusMessages error={error} success={success} compact />
      </div>
    )
  }

  return (
    <div className="flex w-full min-w-0 max-w-full flex-col gap-2 sm:max-w-md">
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptToInput(accept)}
        className="sr-only"
        disabled={busy}
        onChange={onFileChange}
      />
      <Button
        type="button"
        variant="secondary"
        size="sm"
        icon={LuUpload}
        disabled={busy}
        onClick={() => fileInputRef.current?.click()}
      >
        {uploading ? `${progress}%` : 'Upload'}
      </Button>
      <StatusMessages error={error} success={success} compact />
    </div>
  )
}

function StatusMessages({ error, success, compact = false }) {
  if (!error && !success) return null
  return (
    <div className={compact ? 'space-y-2' : 'space-y-3'}>
      {error && (
        <Alert variant="error">
          <p className="font-semibold">Could not save</p>
          <p className="mt-1">{error}</p>
        </Alert>
      )}
      {success && <Alert variant="success">{success}</Alert>}
    </div>
  )
}
