import React, { useEffect, useRef, useState } from 'react'
import { uploadMedia, formatMediaError } from '../../firebase/cmsService'
import {
  ACCEPTED_IMAGE_INPUT,
  MAX_IMAGE_FILE_BYTES,
  validateImageFile,
  formatBytes,
} from '../../cms/mediaLimits'
import MediaLimitsPanel from './MediaLimitsPanel'

export default function MediaUploader({ onUploaded, variant = 'compact' }) {
  const inputRef = useRef(null)
  const [accepted, setAccepted] = useState(null)
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [rejectError, setRejectError] = useState('')
  const [uploadError, setUploadError] = useState('')
  const [success, setSuccess] = useState('')

  const isFull = variant === 'full'

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  const clearAccepted = () => {
    if (preview) URL.revokeObjectURL(preview)
    setAccepted(null)
    setPreview(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  const rejectFile = (validation) => {
    clearAccepted()
    const message = [validation.error, validation.hint].filter(Boolean).join(' ')
    setRejectError(message)
  }

  const handleFile = (file) => {
    if (!file) return
    setSuccess('')
    setUploadError('')

    const validation = validateImageFile(file)
    if (!validation.ok) {
      rejectFile(validation)
      return
    }

    setRejectError('')
    clearAccepted()

    setAccepted({ file, validation })
    if (file.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(file))
    } else {
      setPreview(null)
    }
  }

  const onInputChange = (e) => {
    handleFile(e.target.files?.[0])
  }

  const onDrop = (e) => {
    e.preventDefault()
    handleFile(e.dataTransfer.files?.[0])
  }

  const onUpload = async () => {
    if (!accepted?.file) return
    setUploading(true)
    setUploadError('')
    setSuccess('')
    try {
      const result = await uploadMedia(accepted.file)
      setSuccess(`Saved “${result.name}” to the media library.`)
      onUploaded?.(result.url, result)
      clearAccepted()
      setRejectError('')
    } catch (err) {
      setUploadError(formatMediaError(err) || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const dropZoneClass =
    rejectError && !accepted
      ? 'border-red-300 bg-red-50/50'
      : 'border-gray-300 bg-gray-50/50 hover:border-red-300 hover:bg-red-50/30'

  if (isFull) {
    return (
      <div className="w-full max-w-xl space-y-4">
        <MediaLimitsPanel />

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          className={`rounded-xl border-2 border-dashed p-8 text-center transition-colors ${dropZoneClass}`}
        >
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_IMAGE_INPUT}
            className="hidden"
            onChange={onInputChange}
            disabled={uploading}
          />
          <p className="text-sm font-medium text-gray-800">Drop an image here, or</p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="mt-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
          >
            Choose file
          </button>
          <p className="mt-3 text-xs text-gray-500">
            Max {formatBytes(MAX_IMAGE_FILE_BYTES)} · JPEG, PNG, WebP, GIF, SVG
          </p>
        </div>

        <RejectBanner message={rejectError} onDismiss={() => setRejectError('')} />

        {accepted && (
          <>
            <AcceptedPreview
              file={accepted.file}
              preview={preview}
              onClear={() => {
                clearAccepted()
                setRejectError('')
              }}
            />
            <UploadActions uploading={uploading} onUpload={onUpload} onChooseAnother={() => inputRef.current?.click()} />
          </>
        )}

        <StatusMessages error={uploadError} success={success} />
      </div>
    )
  }

  return (
    <div className="flex min-w-[200px] max-w-sm flex-col gap-2">
      <MediaLimitsPanel compact />
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_IMAGE_INPUT}
        className="hidden"
        onChange={onInputChange}
        disabled={uploading}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
      >
        {uploading ? 'Saving…' : 'Choose image…'}
      </button>

      <RejectBanner message={rejectError} onDismiss={() => setRejectError('')} compact />

      {accepted && (
        <>
          <AcceptedPreview
            file={accepted.file}
            preview={preview}
            compact
            onClear={() => {
              clearAccepted()
              setRejectError('')
            }}
          />
          <UploadActions
            compact
            uploading={uploading}
            onUpload={onUpload}
            onChooseAnother={() => inputRef.current?.click()}
          />
        </>
      )}

      <StatusMessages error={uploadError} success={success} compact />
    </div>
  )
}

function RejectBanner({ message, onDismiss, compact = false }) {
  if (!message) return null
  return (
    <div
      role="alert"
      className={`flex gap-2 rounded-lg border border-red-200 bg-red-50 text-red-800 ${
        compact ? 'px-3 py-2 text-xs' : 'px-4 py-3 text-sm'
      }`}
    >
      <div className="min-w-0 flex-1">
        <p className="font-semibold">Image not accepted</p>
        <p className="mt-0.5 leading-relaxed">{message}</p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="shrink-0 text-red-400 hover:text-red-700"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  )
}

function AcceptedPreview({ file, preview, onClear, compact = false }) {
  return (
    <div
      className={`rounded-lg border border-green-200 bg-green-50/50 p-3 ${
        compact ? 'text-xs' : 'text-sm'
      }`}
    >
      <div className="flex gap-3">
        {preview && (
          <img
            src={preview}
            alt=""
            className={`shrink-0 rounded object-cover ${compact ? 'h-12 w-12' : 'h-16 w-16'}`}
          />
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-gray-900">{file.name}</p>
          <p className="text-gray-600">{formatBytes(file.size)}</p>
          <p className="mt-1 font-medium text-green-800">Ready to upload</p>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="shrink-0 text-gray-400 hover:text-gray-700"
          aria-label="Remove image"
        >
          ×
        </button>
      </div>
    </div>
  )
}

function UploadActions({ uploading, onUpload, onChooseAnother, compact = false }) {
  return (
    <div className={`flex flex-wrap gap-2 ${compact ? '' : 'justify-start'}`}>
      <button
        type="button"
        onClick={onUpload}
        disabled={uploading}
        className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-50"
      >
        {uploading ? 'Uploading…' : 'Upload to library'}
      </button>
      <button
        type="button"
        onClick={onChooseAnother}
        disabled={uploading}
        className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
      >
        Pick another file
      </button>
    </div>
  )
}

function StatusMessages({ error, success, compact = false }) {
  if (!error && !success) return null
  return (
    <div className={compact ? 'space-y-1' : 'space-y-2'}>
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800 sm:text-sm"
        >
          <p className="font-semibold">Upload failed</p>
          <p className="mt-1 leading-relaxed">{error}</p>
        </div>
      )}
      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-800 sm:text-sm">
          {success}
        </div>
      )}
    </div>
  )
}
