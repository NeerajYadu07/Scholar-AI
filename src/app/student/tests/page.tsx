import { AlertBox } from '@/components/molecules/AlertBox'
import { StudentTests } from '@/components/template/StudentTests'
import { trpcServer } from '@/trpc/client/server'

export default async function Page() {
  const myTests = await trpcServer.tests.myTests.query()
  if (!myTests.length) {
    return <AlertBox>No tests found.</AlertBox>
  }
  return <StudentTests tests={myTests || []} />
}
