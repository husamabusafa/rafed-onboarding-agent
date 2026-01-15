import type { LocalizedString } from './localization'
import { ls } from './localization'

export type OnboardingDocument = {
  id: string
  title: LocalizedString
  description: LocalizedString
}

export const onboardingDocuments: OnboardingDocument[] = [
  {
    id: 'doc:nda',
    title: ls('Non-Disclosure Agreement', 'اتفاقية عدم الإفصاح (NDA)'),
    description: ls('Review and sign the NDA before your start date.', 'راجع ووقّع اتفاقية عدم الإفصاح قبل تاريخ المباشرة.'),
  },
  {
    id: 'doc:code-of-ethics',
    title: ls('Code of Ethics', 'مدوّنة أخلاقيات العمل'),
    description: ls('Review and acknowledge the company Code of Ethics.', 'راجع وأقرّ مدوّنة أخلاقيات العمل الخاصة بالشركة.'),
  },
]
