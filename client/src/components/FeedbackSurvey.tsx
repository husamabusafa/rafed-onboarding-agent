import { useEffect } from 'react'
import { IconMessageCircle, IconStarFilled } from '@tabler/icons-react'

interface Question {
  questionId: string
  questionText: string
  questionType: 'rating' | 'multiple_choice' | 'text' | 'yes_no'
  answer: number | string | boolean | string[]
}

interface Props {
  input?: {
    surveyId?: string
    employeeId?: number
    surveyType?: 'onboarding_satisfaction' | 'workplace_environment' | 'manager_feedback' | 'facilities_feedback' | 'it_services' | 'hr_services' | 'general_suggestion'
    isAnonymous?: boolean
    questions?: Question[]
    overallRating?: number
    additionalComments?: string
    submittedDate?: string
    status?: 'draft' | 'submitted' | 'reviewed'
  }
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: unknown) => void
}

const surveyTypeLabels = {
  onboarding_satisfaction: 'Onboarding Satisfaction',
  workplace_environment: 'Workplace Environment',
  manager_feedback: 'Manager Feedback',
  facilities_feedback: 'Facilities Feedback',
  it_services: 'IT Services',
  hr_services: 'HR Services',
  general_suggestion: 'General Suggestion',
}

const statusColors = {
  draft: 'border border-[#002855]/10 bg-[#002855]/5 text-[#002855] dark:border-white/10 dark:bg-white/5 dark:text-white',
  submitted: 'border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-200',
  reviewed: 'border border-[#002855]/10 bg-white text-[#002855] dark:border-white/10 dark:bg-slate-950/30 dark:text-white',
}

const EMPTY_QUESTIONS: Question[] = []

export function FeedbackSurvey({ input, toolName, toolCallId, addToolResult }: Props) {
  const surveyType = input?.surveyType ?? 'general_suggestion'
  const isAnonymous = input?.isAnonymous ?? false
  const questions = input?.questions ?? EMPTY_QUESTIONS
  const overallRating = input?.overallRating
  const additionalComments = input?.additionalComments
  const submittedDate = input?.submittedDate
  const status = input?.status ?? 'draft'

  useEffect(() => {
    if (addToolResult && toolName && toolCallId) {
      addToolResult({
        tool: toolName,
        toolCallId: toolCallId,
        output: {
          status: 'displayed',
          surveyType: surveyType,
          surveyStatus: status,
          isAnonymous: isAnonymous,
          questionsCount: questions.length,
          overallRating: overallRating,
          submittedDate: submittedDate,
          message: `Survey: ${surveyTypeLabels[surveyType]} (${status})`,
        },
      })
    }
  }, [surveyType, isAnonymous, questions, overallRating, additionalComments, submittedDate, status, toolName, toolCallId, addToolResult])

  const renderAnswer = (question: Question) => {
    switch (question.questionType) {
      case 'rating':
        return (
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <IconStarFilled 
                key={star} 
                className={`w-5 h-5 ${star <= (question.answer as number) ? 'text-[#E1523E]' : 'text-slate-300 dark:text-slate-600'}`}
              />
            ))}
            <span className="ml-2 font-medium text-[#002855] dark:text-white">{question.answer}/5</span>
          </div>
        )
      case 'yes_no':
        return (
          <span className={`rounded-full px-3 py-1 text-sm font-medium ${
            question.answer
              ? 'border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-200'
              : 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white'
          }`}>
            {question.answer ? 'Yes' : 'No'}
          </span>
        )
      case 'multiple_choice':
        if (Array.isArray(question.answer)) {
          return (
            <div className="flex flex-wrap gap-2">
              {question.answer.map((choice, idx) => (
                <span key={idx} className="rounded-full border border-[#002855]/10 bg-white px-3 py-1 text-sm text-[#002855] shadow-sm dark:border-white/10 dark:bg-slate-950/30 dark:text-white">
                  {choice}
                </span>
              ))}
            </div>
          )
        }
        return <p className="text-[#002855] dark:text-white">{question.answer as string}</p>
      case 'text':
      default:
        return <p className="text-[#002855] dark:text-white">{question.answer as string}</p>
    }
  }

  return (
    <div className="max-w-2xl rounded-3xl border border-[#002855]/10 bg-linear-to-br from-[#002855]/10 via-white/70 to-[#E1523E]/10 p-6 shadow-[0_10px_30px_rgba(0,40,85,0.10)] backdrop-blur dark:border-white/10 dark:bg-linear-to-br dark:from-[#002855]/25 dark:via-slate-950/55 dark:to-[#E1523E]/15">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-linear-to-br from-[#002855]/12 via-[#002855]/6 to-[#E1523E]/12 p-3 text-[#002855] dark:from-[#002855]/35 dark:via-[#002855]/15 dark:to-[#E1523E]/25 dark:text-white">
          <IconMessageCircle className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-semibold tracking-tight text-[#002855] dark:text-white">Feedback & Survey</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">الملاحظات والاستبيان</p>
        </div>
        {isAnonymous && (
          <span className="rounded-full border border-[#002855]/10 bg-[#002855]/5 px-3 py-1 text-sm font-medium text-[#002855] dark:border-white/10 dark:bg-white/5 dark:text-white">
            Anonymous
          </span>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Survey Type</p>
            <p className="text-lg font-semibold text-[#002855] dark:text-white">{surveyTypeLabels[surveyType]}</p>
          </div>
          <span className={`rounded-full px-4 py-2 font-medium ${statusColors[status]}`}>
            {status}
          </span>
        </div>

        {overallRating && (
          <div className="rounded-2xl border border-[#002855]/10 bg-white/80 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/30">
            <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">Overall Rating</p>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <IconStarFilled 
                  key={star} 
                  className={`w-6 h-6 ${star <= overallRating ? 'text-[#E1523E]' : 'text-slate-300 dark:text-slate-600'}`}
                />
              ))}
              <span className="ml-2 text-2xl font-semibold text-[#002855] dark:text-white">{overallRating}/5</span>
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
          <h3 className="mb-4 font-semibold text-[#002855] dark:text-white">Survey Responses</h3>
          <div className="space-y-4">
            {questions.map((question, idx) => (
              <div key={idx} className="rounded-2xl border border-[#002855]/10 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-slate-950/30">
                <p className="mb-2 text-sm font-medium text-[#002855] dark:text-white">
                  {idx + 1}. {question.questionText}
                </p>
                <div className="mt-2">
                  {renderAnswer(question)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {additionalComments && (
          <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
            <h3 className="mb-2 font-semibold text-[#002855] dark:text-white">Additional Comments</h3>
            <p className="text-slate-700 dark:text-slate-300">{additionalComments}</p>
          </div>
        )}

        {submittedDate && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 shadow-sm dark:border-emerald-500/25 dark:bg-emerald-500/10">
            <p className="text-sm text-emerald-800 dark:text-emerald-200">
              ✓ Submitted on {submittedDate}
            </p>
          </div>
        )}

        {status === 'draft' && (
          <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#002855] px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#001f44]">
            Submit Survey
          </button>
        )}
      </div>
    </div>
  )
}
