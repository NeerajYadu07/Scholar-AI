import { Title2 } from '@/components/atoms/typography'
import { UserCard } from '@/components/organisms/UserCard'
import { trpcServer } from '@/trpc/client/server'

export default async function Page() {
  const admins = await trpcServer.admins.admins.query()
  return (
    <div>
      <Title2>Admins</Title2>

      <div className="my-3">
        {admins?.map((admin) => (
          <UserCard key={admin.User.id} user={admin.User} />
        ))}
      </div>
    </div>
  )
}
