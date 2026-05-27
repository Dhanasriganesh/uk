import { LuImage, LuLayoutDashboard } from 'react-icons/lu'

export const ADMIN_NAV = [
  { to: '/admin', label: 'Dashboard', description: 'Pages & content', icon: LuLayoutDashboard, end: true },
  { to: '/admin/media', label: 'Media Library', description: 'Images & assets', icon: LuImage, end: false },
]
