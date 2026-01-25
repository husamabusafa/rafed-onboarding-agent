import { HsafaChat } from '@hsafa/ui-sdk'
import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useI18n } from '../i18n/i18n'
import { l, ls } from '../data/localization'

type ThemeMode = 'light' | 'dark'

type HsafaChatComponentProps = Parameters<typeof HsafaChat>[0]

export type HsafaUiComponents = NonNullable<HsafaChatComponentProps['HsafaUI']>

type Props = {
  themeMode: ThemeMode
  uiComponents: HsafaUiComponents
  initialMessages: NonNullable<HsafaChatComponentProps['initialMessages']>
}

export function ChatPage({ themeMode, uiComponents, initialMessages }: Props) {
  const { locale, t } = useI18n()
  const location = useLocation()
  const [draft, setDraft] = useState('')

  useEffect(() => {
    const fromState = (location.state as { draft?: string } | null)?.draft
    const stored = localStorage.getItem('rafed.chatDraft')
    const resolved = (fromState ?? stored ?? '').trim()
    if (resolved) {
      localStorage.setItem('rafed.chatDraft', resolved)
      setDraft(resolved)
    }
  }, [location.state])

  const DraftBanner = useMemo(() => {
    if (!draft) return undefined

    const copyLabel = ls('Copy', 'نسخ')
    const clearLabel = ls('Clear', 'مسح')
    const hintLabel = ls('Paste this into the message box below to send.', 'الصق هذه الرسالة في مربع الكتابة أدناه ثم أرسلها.')

    const Component = function DraftBannerComponent() {
      return (
        <div className="mx-auto w-full max-w-3xl px-3 pt-3">
          <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white/80 p-3 text-slate-900 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{t('home.startChat')}</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-900/10 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/15"
                  onClick={async () => {
                    await navigator.clipboard.writeText(draft)
                  }}
                >
                  {l(locale, copyLabel)}
                </button>
                <button
                  type="button"
                  className="rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-900/10 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/15"
                  onClick={() => {
                    localStorage.removeItem('rafed.chatDraft')
                    setDraft('')
                  }}
                >
                  {l(locale, clearLabel)}
                </button>
              </div>
            </div>
            <div className="rounded-xl bg-white px-3 py-2 text-sm text-slate-700 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:ring-white/10">
              {draft}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">{l(locale, hintLabel)}</p>
          </div>
        </div>
      )
    }

    return Component
  }, [draft, locale, t])

  return (
    <div className="fixed inset-0 overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#002855]/10 blur-3xl dark:bg-[#002855]/20" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-[500px] w-[500px] rounded-full bg-[#E1523E]/10 blur-3xl dark:bg-[#E1523E]/15" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-[#002855]/5 blur-xl dark:bg-[#002855]/30" />
      
      <div className="relative h-full w-full">
        <HsafaChat
          agentId="cmkc0f4gi000ppc0k703h6zgn"
          theme={themeMode}
          HsafaUI={uiComponents}
          backgroundColor='transparent'
          fullPageChat
          title={t('chat.title')}
          initialMessages={initialMessages}
          componentAboveInput={DraftBanner}
        />
      </div>
    </div>
  )
}
