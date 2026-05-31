import ConsultationDetailPage from '../../consultation/ConsultationDetailPage'
import { TURNKEY_AUTOMATION_DEFAULTS } from '../../consultation/turnkeyAutomationDefaults'

export default function TurnkeyAutomation() {
  return (
    <ConsultationDetailPage
      pageId="turnkey-automation"
      breadcrumbLabel="Turnkey Automation"
      defaults={TURNKEY_AUTOMATION_DEFAULTS}
    />
  )
}
