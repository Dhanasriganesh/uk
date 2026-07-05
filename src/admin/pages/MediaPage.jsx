import React, { useEffect, useState } from 'react'
import { LuCopy, LuImageOff, LuTrash2 } from 'react-icons/lu'
import { listMedia, deleteMediaItem, seedMediaLibrary } from '../../firebase/cmsService'
import { formatBytes, isVideoUrl } from '../../cms/mediaLimits'
import VideoEmbed from '../../components/cms/VideoEmbed'
import { CmsImage } from '../../components/cms/CmsMedia'
import { getVideoPlayback } from '../../utils/videoEmbed'
import MediaUploader from '../components/MediaUploader'
import AdminAuthStatus from '../components/AdminAuthStatus'
import AdminPageShell from '../components/ui/AdminPageShell'
import PageHeader from '../components/ui/PageHeader'
import Card from '../components/ui/Card'
import Spinner from '../components/ui/Spinner'
import Button from '../components/ui/Button'
import Alert from '../components/ui/Alert'

export default function MediaPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [copiedId, setCopiedId] = useState(null)
  const [seeding, setSeeding] = useState(false)
  const [seedMsg, setSeedMsg] = useState('')

  const refresh = async () => {
    setLoading(true)
    try {
      setItems(await listMedia())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  const copyUrl = async (url, id) => {
    await navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this entry from the media library? (The file on disk is not removed.)')) return
    await deleteMediaItem(id)
    refresh()
  }

  const handleSeed = async () => {
    if (!confirm('Register local site paths (/media, /videos) and default content URLs in the media table?')) return
    setSeeding(true)
    setSeedMsg('')
    try {
      const { added, skipped, total } = await seedMediaLibrary({ migrateLegacy: true })
      setSeedMsg(`Done. Added ${added} URL(s), skipped ${skipped} duplicate(s). Library now has ${total} item(s).`)
      await refresh()
    } catch (err) {
      setSeedMsg(`Error: ${err.message}`)
    } finally {
      setSeeding(false)
    }
  }

  return (
    <AdminPageShell>
      <PageHeader
        breadcrumbs={[{ label: 'Dashboard', to: '/admin' }, { label: 'Media Library' }]}
        title="Media Library"
        description="Upload images and videos, or paste URLs. Files become site paths or Storage links; only URLs are stored in Firestore."
        actions={
          <Button variant="secondary" onClick={handleSeed} disabled={seeding}>
            {seeding ? 'Seeding…' : 'Seed local media'}
          </Button>
        }
      />

      <AdminAuthStatus />

      {seedMsg && (
        <Alert
          variant={seedMsg.startsWith('Error') ? 'error' : 'success'}
          className="mb-6"
          onDismiss={() => setSeedMsg('')}
        >
          {seedMsg}
        </Alert>
      )}

      <Card className="mb-6 sm:mb-8">
        <MediaUploader variant="full" onUploaded={() => refresh()} />
      </Card>

      <div className="mb-3 sm:mb-4">
        <h2 className="text-sm font-semibold text-slate-900">
          {loading ? 'Loading assets…' : `${items.length} file${items.length !== 1 ? 's' : ''} in library`}
        </h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-12 sm:py-16">
          <Spinner label="Loading media…" />
        </div>
      ) : items.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-12 text-center sm:py-16">
          <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <LuImageOff className="h-7 w-7" aria-hidden />
          </span>
          <p className="text-base font-semibold text-slate-800">No images yet</p>
          <p className="mt-1 max-w-sm px-4 text-sm text-slate-500">
            Upload a file or paste a URL above, or run “Seed local media”.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => {
            const videoPlayback = getVideoPlayback(item.url)
            const isVideoItem =
              isVideoUrl(item.url) || (item.type || '').startsWith('video/')

            return (
            <article
              key={item.id}
              className="group overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm sm:rounded-2xl sm:hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                {isVideoItem ? (
                  videoPlayback.thumbnail ? (
                    <img
                      src={videoPlayback.thumbnail}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <VideoEmbed
                      src={item.url}
                      className="h-full w-full border-0 object-contain p-2 sm:p-3"
                      muted
                      playsInline
                      preload="metadata"
                      title={item.name}
                    />
                  )
                ) : (
                  <CmsImage
                    src={item.url}
                    alt={item.name}
                    className="h-full w-full object-contain p-2 sm:p-3"
                    loading="lazy"
                  />
                )}
                {/* Desktop: hover overlay */}
                <div className="absolute inset-0 hidden items-end justify-center gap-2 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100 sm:flex">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={LuCopy}
                    className="!bg-white/95"
                    onClick={() => copyUrl(item.url, item.id)}
                  >
                    {copiedId === item.id ? 'Copied!' : 'Copy URL'}
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    icon={LuTrash2}
                    className="!bg-white/95"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <div className="border-t border-slate-100 p-3 sm:p-4">
                <p className="truncate text-sm font-semibold text-slate-900">{item.name}</p>
                <p className="mt-0.5 truncate text-xs text-slate-500" title={item.url}>
                  {item.url}
                </p>
                {item.size ? (
                  <p className="mt-0.5 text-xs text-slate-400">{formatBytes(item.size)}</p>
                ) : null}
                {/* Mobile / touch: always-visible actions */}
                <div className="mt-3 flex flex-wrap gap-2 sm:hidden">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={LuCopy}
                    fullWidth
                    className="flex-1 min-w-[calc(50%-0.25rem)]"
                    onClick={() => copyUrl(item.url, item.id)}
                  >
                    {copiedId === item.id ? 'Copied!' : 'Copy URL'}
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    icon={LuTrash2}
                    fullWidth
                    className="flex-1 min-w-[calc(50%-0.25rem)]"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </article>
            )
          })}
        </div>
      )}
    </AdminPageShell>
  )
}
