import ProductDetailPage from '../../products/ProductDetailPage'
import { BOTTLE_DEFAULTS, BOTTLE_GALLERY } from '../../products/bottleDefaults'

function BottleUnscramblers() {
  return (
    <ProductDetailPage
      pageId="bottle"
      breadcrumbLabel="Bottle Unscramblers"
      galleryAltPrefix="Bottle unscrambler"
      fallbackImages={BOTTLE_GALLERY}
      defaults={BOTTLE_DEFAULTS}
    />
  )
}

export default BottleUnscramblers
