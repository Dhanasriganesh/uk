import React, { useEffect, useRef, useState } from 'react'
import { LuCloudUpload, LuImage, LuX } from 'react-icons/lu'
import { uploadMedia, formatMediaError } from '../../firebase/cmsService'
import {
  ACCEPTED_IMAGE_INPUT,
  MAX_IMAGE_FILE_BYTES,
  validateImageFile,
  formatBytes,
} from '../../cms/mediaLimits'
import MediaLimitsPanel from './MediaLimitsPanel'
import Button from './ui/Button'
import Alert from './ui/Alert'

export default function MediaUploader({ onUploaded, variant = 'compact' }) {
  const inputRef = useRef(null)
  const [accepted, setAccepted] = useState(null)
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [rejectError, setRejectError] = useState('')
  const [uploadError, setUploadError] = useState('')
  const [success, setSuccess] = useState('')
  const [dragOver, setDragOver] = useState(false)

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
    setDragOver(false)
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

  const dropZoneClass = rejectError && !accepted
    ? 'border-red-300 bg-red-50/80'
    : dragOver
      ? 'border-red-400 bg-red-50/60'
      : 'border-slate-300 bg-slate-50/80 hover:border-red-300 hover:bg-red-50/30'

  if (isFull) {
    return (
      <div className="w-full space-y-5">
        <MediaLimitsPanel />

        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className={`rounded-xl border-2 border-dashed p-6 text-center transition-all sm:rounded-2xl sm:p-10 ${dropZoneClass}`}
        >
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_IMAGE_INPUT}
            className="hidden"
            onChange={onInputChange}
            disabled={uploading}
          />
          <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
            <LuCloudUpload className="h-7 w-7 text-red-600" aria-hidden />
          </span>
          <p className="text-base font-semibold text-slate-900">Drop an image here</p>
          <p className="mt-1 text-sm text-slate-500">or choose a file from your computer</p>
          <Button
            className="mt-5"
            icon={LuImage}
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
          >
            Choose file
          </Button>
          <p className="mt-4 text-xs text-slate-500">
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
    <div className="flex w-full min-w-0 max-w-full flex-col gap-2 sm:max-w-sm">
      <MediaLimitsPanel compact />
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_IMAGE_INPUT}
        className="hidden"
        onChange={onInputChange}
        disabled={uploading}
      />
      <Button
        variant="secondary"
        size="sm"
        icon={LuImage}
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
      >
        {uploading ? 'Saving…' : 'Choose image…'}
      </Button>

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
    <Alert variant="error" onDismiss={onDismiss} className={compact ? 'text-xs' : ''}>
      <p className="font-semibold">Image not accepted</p>
      <p className="mt-0.5">{message}</p>
    </Alert>
  )
}

function AcceptedPreview({ file, preview, onClear, compact = false }) {
  return (
    <div
      className={`rounded-xl border border-emerald-200 bg-emerald-50/60 p-3 ${compact ? 'text-xs' : 'text-sm'}`}
    >
      <div className="flex gap-3">
        {preview && (
          <img
            src={preview}
            alt=""
            className={`shrink-0 rounded-lg object-cover ring-1 ring-white ${compact ? 'h-12 w-12' : 'h-16 w-16'}`}
          />
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-slate-900">{file.name}</p>
          <p className="text-slate-600">{formatBytes(file.size)}</p>
          <p className="mt-1 text-xs font-semibold text-emerald-800">Ready to upload</p>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white hover:text-slate-700"
          aria-label="Remove image"
        >
          <LuX className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

function UploadActions({ uploading, onUpload, onChooseAnother, compact = false }) {
  return (
    <div className={`flex flex-wrap gap-2 ${compact ? '' : 'justify-start'}`}>
      <Button size={compact ? 'sm' : 'md'} onClick={onUpload} disabled={uploading} icon={LuCloudUpload}>
        {uploading ? 'Uploading…' : 'Upload to library'}
      </Button>
      <Button variant="secondary" size={compact ? 'sm' : 'md'} onClick={onChooseAnother} disabled={uploading}>
        Pick another file
      </Button>
    </div>
  )
}

function StatusMessages({ error, success, compact = false }) {
  if (!error && !success) return null
  return (
    <div className={compact ? 'space-y-2' : 'space-y-3'}>
      {error && (
        <Alert variant="error">
          <p className="font-semibold">Upload failed</p>
          <p className="mt-1">{error}</p>
        </Alert>
      )}
      {success && <Alert variant="success">{success}</Alert>}
    </div>
  )
}
