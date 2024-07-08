import { AlertBox } from '@/components/molecules/AlertBox'
import { ConversationCard } from '@/components/organisms/ConversationCard'
import { trpcServer } from '@/trpc/client/server'

export default async function Page() {
  const myConversations = await trpcServer.students.myConversations.query()

  if (!myConversations.length) {
    return <AlertBox>No conversations found.</AlertBox>
  }

  return (
    <div className="mt-12 flex flex-col gap-4">
      {myConversations.map((conversation) => (
        <ConversationCard key={conversation.id} conversation={conversation} />
      ))}
    </div>
  )
}
