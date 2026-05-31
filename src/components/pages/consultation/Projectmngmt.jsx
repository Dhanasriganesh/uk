import ConsultationDetailPage from '../../consultation/ConsultationDetailPage'
import { PROJECT_MANAGEMENT_DEFAULTS } from '../../consultation/projectManagementDefaults'

export default function ProjectManagement() {
  return (
    <ConsultationDetailPage
      pageId="project-management"
      breadcrumbLabel="Project Management"
      defaults={PROJECT_MANAGEMENT_DEFAULTS}
    />
  )
}
