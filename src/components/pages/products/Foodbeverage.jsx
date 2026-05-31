import ProductDetailPage from '../../products/ProductDetailPage'
import { FOODBEVERAGE_DEFAULTS, FOODBEVERAGE_GALLERY } from '../../products/foodbeverageDefaults'

function Foodbeverage() {
  return (
    <ProductDetailPage
      pageId="foodbeverage"
      breadcrumbLabel="Food & Beverage Lines (FBL)"
      galleryAltPrefix="Food and beverage line"
      fallbackImages={FOODBEVERAGE_GALLERY}
      defaults={FOODBEVERAGE_DEFAULTS}
    />
  )
}

export default Foodbeverage
