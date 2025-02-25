import { RouterOutputs } from '@/trpc/client/types'
import { BaseComponent } from '@/util/types'
import { AlertBox } from '../molecules/AlertBox'

export interface IUserCardProps extends BaseComponent {
  test: RouterOutputs['tests']['myTests'][0]
}

export const StudentTestCard = ({ test }: IUserCardProps) => {
  if (!test.aiTotalScore) {
    return (
      <AlertBox className="dark:text-white dark:bg-slate-400">
        Not validated.
      </AlertBox>
    )
  }

  return (
    <div className="max-w-lg">
      <h4 className="font-semibold text-md dark:text-white">Results</h4>
      <ul className="space-y-8">
        {test.TestQuestions.map((result, index) => (
          <li key={index} className="p-2 mt-1 space-y-3">
            <div className="font-semibold dark:text-white">
              Q: {result.Question.question}
            </div>
            <div className="text-gray-600 dark:text-slate-300">
              A: {result.studentAnswer}
            </div>
            <div className="flex items-start gap-2 p-2 mt-1 border rounded border-primary-100">
              <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-green-600 dark:text-green-300 border rounded ">
                {result.aiScore}
              </div>
              <p className="text-gray-500 dark:text-white">
                Feedback: {result.aiFeedback || 'No feedback'}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
