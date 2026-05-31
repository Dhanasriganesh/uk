import ConsultationDetailPage from '../../consultation/ConsultationDetailPage'
import { PROJECT_PLANNING_DEFAULTS } from '../../consultation/projectPlanningDefaults'

export default function ProjectPlanning() {
  return (
    <ConsultationDetailPage
      pageId="project-planning"
      breadcrumbLabel="Project Planning"
      defaults={PROJECT_PLANNING_DEFAULTS}
    />
  )
}
