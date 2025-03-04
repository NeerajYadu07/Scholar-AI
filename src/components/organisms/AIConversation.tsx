'use client'
import { useFormDoubt } from '@/forms/doubt'
import { trpcClient } from '@/trpc/client/client'
import { RouterOutputs } from '@/trpc/client/types'
import { cn } from '@/util/styles'
import { BaseComponent } from '@/util/types'
import { Title } from '../atoms/typography'
import { Loading } from '../molecules/Loading'
import { AlertBox } from '../molecules/AlertBox'
import { Input } from '../atoms/input'
import { Button } from '../atoms/button'
import { TextArea } from '../atoms/textArea'
import { getModelName } from '@/util'

export const AIConversations = ({
  chapter,
  className,
  children,
  credits,
}: {
  chapter: NonNullable<RouterOutputs['chapters']['chapter']>
  credits: number
} & BaseComponent) => {
  const { register, handleSubmit, reset } = useFormDoubt()
  const { data: messages, isLoading: messagesLoading } =
    trpcClient.chapters.messages.useQuery({
      chapterId: chapter.id,
    })

  const utils = trpcClient.useUtils()

  const { mutateAsync: askDoubt, isLoading } =
    trpcClient.chapters.doubt.useMutation({
      onSuccess() {
        utils.chapters.messages.invalidate()
        reset()
      },
    })
  return (
    <div className={cn('mb-16', className)} id="conversation">
      <Title>
        Your personal conversation{' '}
        <span className="text-gray-500 text-xs">(${credits})</span>
      </Title>
      {messagesLoading ? <Loading>Fetching messages...</Loading> : null}
      {messages?.length ? (
        messages?.map((message) => (
          <div
            className={`flex gap-2 my-4 ${message.sender === 'AI' ? 'justify-start' : 'flex-row-reverse'}`}
            key={message.id}
          >
            <div className="p-3">
              {message.sender === 'STUDENT' ? 'You' : 'AI'}
            </div>
            <div>
              <div className="max-w-lg p-3 whitespace-pre-wrap bg-white rounded-lg shadow-lg dark:bg-gray-600">
                {message.content}
              </div>
              {message.model ? (
                <div className="text-gray-600 text-sm mt-1 dark:text-gray-400">
                  {getModelName(message.model)}
                </div>
              ) : null}
            </div>
          </div>
        ))
      ) : (
        <AlertBox>No messages.</AlertBox>
      )}
      <form
        onSubmit={handleSubmit(async ({ doubt }) => {
          await askDoubt({ chapterId: chapter.id, doubt })
        })}
        className="sticky bottom-0 flex items-center gap-2 p-4 bg-white rounded-lg dark:bg-slate-500"
      >
        <TextArea
          {...register('doubt')}
          className="text-lg"
          placeholder="Ask..."
        />
        <Button loading={isLoading} type="submit" className='dark:bg-black'>
          Ask
        </Button>
      </form>{' '}
    </div>
  )
}
