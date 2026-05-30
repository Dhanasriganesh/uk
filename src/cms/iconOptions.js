export const SECTOR_ICON_OPTIONS = [
  { id: 'cad', label: 'CAD / design' },
  { id: 'inspection', label: 'Inspection' },
  { id: 'aerospace', label: 'Aerospace' },
  { id: 'automotive', label: 'Automotive' },
  { id: 'foundry', label: 'Foundry' },
  { id: 'moulding', label: 'Moulding' },
  { id: 'packaging', label: 'Packaging' },
  { id: 'machining', label: 'Machining' },
]

export const SECTOR_ICON_IDS = SECTOR_ICON_OPTIONS.map((o) => o.id)

export const EMOJI_ICON_OPTIONS = [
  { id: '⏰', label: 'Clock' },
  { id: '⭐', label: 'Star' },
  { id: '💡', label: 'Idea' },
  { id: '🤝', label: 'Handshake' },
  { id: '📍', label: 'Location' },
  { id: '📞', label: 'Phone' },
  { id: '✉️', label: 'Email' },
  { id: '💼', label: 'Business' },
  { id: '🐦', label: 'Social' },
  { id: '▶️', label: 'Video' },
  { id: '🏭', label: 'Factory' },
  { id: '⚙️', label: 'Gears' },
  { id: '🔧', label: 'Tools' },
  { id: '📦', label: 'Package' },
  { id: '✈️', label: 'Aerospace' },
  { id: '🚗', label: 'Automotive' },
  { id: '🏗️', label: 'Construction' },
  { id: '💬', label: 'Chat' },
  { id: '✅', label: 'Check' },
  { id: '🎯', label: 'Target' },
  { id: '🔒', label: 'Secure' },
  { id: '🌐', label: 'Web' },
  { id: '📊', label: 'Chart' },
  { id: '❤️', label: 'Heart' },
]

export const EMOJI_ICON_IDS = EMOJI_ICON_OPTIONS.map((o) => o.id)

export function isSectorIcon(value) {
  return SECTOR_ICON_IDS.includes(value)
}

export function isEmojiIcon(value) {
  if (!value || typeof value !== 'string') return false
  if (EMOJI_ICON_IDS.includes(value)) return true
  return /\p{Extended_Pictographic}/u.test(value)
}

/** Pick default tab in admin picker from field context */
export function getDefaultIconTab(value, path = []) {
  const pathStr = path.join('.').toLowerCase()
  if (pathStr.includes('cards') || isSectorIcon(value)) return 'sector'
  if (pathStr.includes('promises') || pathStr.includes('contact') || pathStr.includes('social')) {
    return 'emoji'
  }
  if (isEmojiIcon(value)) return 'emoji'
  return 'sector'
}
