import ProductDetailPage from '../../products/ProductDetailPage'
import { getServiceById } from '../../../cms/servicesRegistry'
import { getServiceGallery, getServiceLocalDefaults } from '../../services/serviceDefaults'

export default function ServiceDetail({ serviceId }) {
  const service = getServiceById(serviceId)
  if (!service) return null

  return (
    <ProductDetailPage
      pageId={serviceId}
      breadcrumbLabel={service.shortTitle}
      parentLabel="Services"
      parentLink="/services"
      galleryAltPrefix={service.shortTitle}
      fallbackImages={getServiceGallery(serviceId)}
      defaults={getServiceLocalDefaults(serviceId)}
    />
  )
}
