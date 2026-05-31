import ConsultationDetailPage from '../../consultation/ConsultationDetailPage'
import { LIFECYCLE_MANAGEMENT_DEFAULTS } from '../../consultation/lifecycleManagementDefaults'

export default function LifecycleManagement() {
  return (
    <ConsultationDetailPage
      pageId="lifecycle-management"
      breadcrumbLabel="Lifecycle Management"
      defaults={LIFECYCLE_MANAGEMENT_DEFAULTS}
    />
  )
}
