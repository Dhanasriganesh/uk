import ProductDetailPage from '../../products/ProductDetailPage'
import { TURNKEY_DEFAULTS, TURNKEY_GALLERY } from '../../products/turnkeyDefaults'

function Turnkey() {
  return (
    <ProductDetailPage
      pageId="turnkey"
      breadcrumbLabel="Turnkey Filling Lines"
      galleryAltPrefix="Turnkey filling line"
      fallbackImages={TURNKEY_GALLERY}
      defaults={TURNKEY_DEFAULTS}
    />
  )
}

export default Turnkey
