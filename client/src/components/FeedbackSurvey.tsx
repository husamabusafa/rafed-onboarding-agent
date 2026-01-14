import { IconMessageCircle, IconStarFilled } from '@tabler/icons-react'

interface Question {
  questionId: string
  questionText: string
  questionType: 'rating' | 'multiple_choice' | 'text' | 'yes_no'
  answer: number | string | boolean | string[]
}

interface Props {
  surveyId?: string
  employeeId: number
  surveyType: 'onboarding_satisfaction' | 'workplace_environment' | 'manager_feedback' | 'facilities_feedback' | 'it_services' | 'hr_services' | 'general_suggestion'
  isAnonymous: boolean
  questions: Question[]
  overallRating?: number
  additionalComments?: string
  submittedDate?: string
  status: 'draft' | 'submitted' | 'reviewed'
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
  draft: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  submitted: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  reviewed: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
}

export function FeedbackSurvey({ surveyType, isAnonymous, questions = [], overallRating, additionalComments, submittedDate, status }: Props) {
  const renderAnswer = (question: Question) => {
    switch (question.questionType) {
      case 'rating':
        return (
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <IconStarFilled 
                key={star} 
                className={`w-5 h-5 ${star <= (question.answer as number) ? 'text-yellow-500' : 'text-gray-300'}`}
              />
            ))}
            <span className="ml-2 font-medium text-gray-900 dark:text-white">{question.answer}/5</span>
          </div>
        )
      case 'yes_no':
        return (
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            question.answer ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
          }`}>
            {question.answer ? 'Yes' : 'No'}
          </span>
        )
      case 'multiple_choice':
        if (Array.isArray(question.answer)) {
          return (
            <div className="flex flex-wrap gap-2">
              {question.answer.map((choice, idx) => (
                <span key={idx} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm">
                  {choice}
                </span>
              ))}
            </div>
          )
        }
        return <p className="text-gray-900 dark:text-white">{question.answer as string}</p>
      case 'text':
      default:
        return <p className="text-gray-900 dark:text-white">{question.answer as string}</p>
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-xl">
          <IconMessageCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Feedback & Survey</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">الملاحظات والاستبيان</p>
        </div>
        {isAnonymous && (
          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
            Anonymous
          </span>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Survey Type</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{surveyTypeLabels[surveyType]}</p>
          </div>
          <span className={`px-4 py-2 rounded-full font-medium ${statusColors[status]}`}>
            {status}
          </span>
        </div>

        {overallRating && (
          <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900 rounded-xl border border-indigo-200 dark:border-indigo-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Overall Rating</p>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <IconStarFilled 
                  key={star} 
                  className={`w-6 h-6 ${star <= overallRating ? 'text-yellow-500' : 'text-gray-300'}`}
                />
              ))}
              <span className="ml-2 text-2xl font-bold text-indigo-600 dark:text-indigo-400">{overallRating}/5</span>
            </div>
          </div>
        )}

        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Survey Responses</h3>
          <div className="space-y-4">
            {questions.map((question, idx) => (
              <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
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
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Additional Comments</h3>
            <p className="text-gray-700 dark:text-gray-300">{additionalComments}</p>
          </div>
        )}

        {submittedDate && (
          <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-700">
            <p className="text-sm text-green-700 dark:text-green-300">
              ✓ Submitted on {submittedDate}
            </p>
          </div>
        )}

        {status === 'draft' && (
          <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
            Submit Survey
          </button>
        )}
      </div>
    </div>
  )
}
