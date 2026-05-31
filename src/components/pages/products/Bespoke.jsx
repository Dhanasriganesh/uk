import ProductDetailPage from '../../products/ProductDetailPage'
import { BESPOKE_DEFAULTS, BESPOKE_GALLERY } from '../../products/bespokeDefaults'

function Bespoke() {
  return (
    <ProductDetailPage
      pageId="bespoke"
      breadcrumbLabel="Bespoke Packaging Solutions"
      galleryAltPrefix="Bespoke packaging system"
      fallbackImages={BESPOKE_GALLERY}
      defaults={BESPOKE_DEFAULTS}
    />
  )
}

export default Bespoke
