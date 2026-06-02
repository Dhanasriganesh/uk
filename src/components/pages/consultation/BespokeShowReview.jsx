import ConsultationDetailPage from '../../consultation/ConsultationDetailPage'
import { BESPOKE_SHOW_REVIEW_DEFAULTS } from '../../consultation/bespokeShowReviewDefaults'

export default function BespokeShowReview() {
  return (
    <ConsultationDetailPage
      pageId="bespoke-show-review-models"
      breadcrumbLabel="Bespoke Show and Review Models"
      defaults={BESPOKE_SHOW_REVIEW_DEFAULTS}
    />
  )
}
