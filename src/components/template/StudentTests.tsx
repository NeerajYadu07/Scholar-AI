import { RouterOutputs } from '@/trpc/clients/types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../atoms/accordion'
import { format } from 'date-fns'
import { StudentTestCard } from '../organisms/StudentTestCard'

export const StudentTests = ({
  tests,
}: {
  tests: RouterOutputs['tests']['myTests']
}) => {
  return (
    <Accordion type="multiple" className="mt-12">
      {tests.map((test) => (
        <AccordionItem
          value={test.id.toString()}
          key={test.id}
          className="bg-white dark:bg-slate-500 p-4 rounded-lg mb-4"
        >
          <AccordionTrigger>
            <div className="flex flex-col items-start font-normal text-md">
              <div className="text-lg font-medium dark:text-white">
                {test.Course.title}
              </div>
              <div className="text-xs dark:text-slate-400">
                {format(new Date(test.createdAt), 'PPp')}
              </div>
              <div className="mt-1 dark:text-white">
                {test.aiTotalScore}
                <span className="text-xs">/100</span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <StudentTestCard test={test} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
