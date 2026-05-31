import { FaGears } from 'react-icons/fa6'
import { FaQuinscape } from 'react-icons/fa'
import { BsWrenchAdjustable } from 'react-icons/bs'
import { LuGauge, LuPackage, LuPuzzle, LuTarget, LuTruck } from 'react-icons/lu'

export default function ProductPageIcon({ type, className = 'h-6 w-6 text-red-600' }) {
  if (type === 'cap') return <FaQuinscape className={className} aria-hidden />
  if (type === 'wrench') return <BsWrenchAdjustable className={className} aria-hidden />
  if (type === 'bottle' || type === 'formats') return <LuPackage className={className} aria-hidden />
  if (type === 'conveyor') return <LuTruck className={className} aria-hidden />
  if (type === 'target') return <LuTarget className={className} aria-hidden />
  if (type === 'puzzle') return <LuPuzzle className={className} aria-hidden />
  if (type === 'uk') {
    return (
      <span className="text-xl font-bold text-red-600" aria-hidden>
        UK
      </span>
    )
  }
  if (type === 'gauge') return <LuGauge className={className} aria-hidden />
  return <FaGears className={className} aria-hidden />
}
