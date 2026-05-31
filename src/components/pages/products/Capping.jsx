import ProductDetailPage from '../../products/ProductDetailPage'
import { CAPPING_DEFAULTS, CAPPING_GALLERY } from '../../products/cappingDefaults'

function CappingMachines() {
  return (
    <ProductDetailPage
      pageId="capping"
      breadcrumbLabel="Capping Machines"
      galleryAltPrefix="Capping machine"
      fallbackImages={CAPPING_GALLERY}
      defaults={CAPPING_DEFAULTS}
    />
  )
}

export default CappingMachines
