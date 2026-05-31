import ProductDetailPage from '../../products/ProductDetailPage'
import { PUMP_DEFAULTS, PUMP_GALLERY } from '../../products/pumpDefaults'

function Pump() {
  return (
    <ProductDetailPage
      pageId="pump"
      breadcrumbLabel="Pump & Trigger Feeding Systems"
      galleryAltPrefix="Pump and trigger feeding system"
      fallbackImages={PUMP_GALLERY}
      defaults={PUMP_DEFAULTS}
    />
  )
}

export default Pump
