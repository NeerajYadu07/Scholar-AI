import { RouterOutputs } from '@/trpc/clients/types'
import Link from 'next/link'
import { DisplayDate } from '../molecules/DisplayDate'

export const ConversationCard = ({
  conversation,
}: {
  conversation: RouterOutputs['students']['myConversations'][0]
}) => {
  const courseId = conversation.Chapter.Course.id
  const chapterId = conversation.Chapter.id
  return (
    <div className="flex bg-white dark:bg-slate-500 rounded-lg p-4 justify-start items-center gap-2">
      <Link
        href={`/course/${courseId}/chapter/${chapterId}#conversation`}
        key={conversation.id}
        scroll
      >
        <div className="font-semibold dark:text-white">
          {conversation.Chapter.title}
        </div>
        <div className="text-sm dark:text-slate-200">
          {conversation.Chapter.Course.title}
        </div>
        <DisplayDate
          className="dark:text-slate-300"
          dateString={conversation.updatedAt}
        />
      </Link>
    </div>
  )
}
