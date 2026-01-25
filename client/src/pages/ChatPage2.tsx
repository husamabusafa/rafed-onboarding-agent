import { HsafaChat } from '@hsafa/ui-sdk'

type ThemeMode = 'light' | 'dark'

type HsafaChatComponentProps = Parameters<typeof HsafaChat>[0]

export type HsafaUiComponents = NonNullable<HsafaChatComponentProps['HsafaUI']>

type Props = {
  themeMode: ThemeMode
  uiComponents: HsafaUiComponents
}

const presetPrompts = [
  { label: "Show me my onboarding status", prompt: "Show me my onboarding status" },
  { label: "What are my benefits?", prompt: "What are my benefits?" },
  { label: "Who's on my team?", prompt: "Who's on my team?" },
  { label: "Show me the company calendar", prompt: "Show me the company calendar" },
  { label: "Help me get started", prompt: "Help me get started" },
  { label: "What's my email address?", prompt: "What's my email address?" },
  { label: "Show me the employee directory", prompt: "Show me the employee directory" },
  { label: "When is my building tour?", prompt: "When is my building tour?" },
]

export function ChatPage2({ themeMode, uiComponents }: Props) {
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
          title="Hayyak"
          presetPrompts={presetPrompts}
        />
      </div>
    </div>
  )
}
