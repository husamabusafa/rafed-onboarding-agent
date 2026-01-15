import { useI18n } from '../i18n/i18n'

type Props = {
  labelKey: string
}

export function PageTitle({ labelKey }: Props) {
  const { t } = useI18n()
  return (
    <h1 className="text-3xl font-bold tracking-tight text-[#002855] dark:text-white md:text-4xl">
      {t(labelKey)}
    </h1>
  )
}
