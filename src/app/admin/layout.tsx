import { AlertBox } from '@/components/molecules/AlertBox'
import { SimpleSidebar } from '@/components/molecules/SimpleSidebar'
import { TellThem } from '@/components/molecules/TellThem'
import { AdminMenu } from '@/components/organisms/AdminMenu'
import { trpcServer } from '@/trpc/clients/server'
import { cn } from '@/util/styles'
import { auth } from '@clerk/nextjs/server'
import { Divide } from 'lucide-react'
import Link from 'next/link'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await auth()

  if (!user?.userId) {
    return (
      <AlertBox>
        <Link href="/signIn">Sign In</Link>
      </AlertBox>
    )
  }

  const adminMe = await trpcServer.admins.adminMe.query()

  if (!adminMe) {
    return <TellThem uid={user.userId} role="admin" />
  }

  return (
    <div className="mt-12 flex gap-4">
      <div className="hidden w-full max-w-xs bg-white dark:bg-slate-700 border rounded-lg sm:block">
        <AdminMenu />
      </div>

      <div className="flex-grow justify-center items-center">
        <SimpleSidebar>
          <AdminMenu />
        </SimpleSidebar>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg min-h-[calc(100vh-8rem)] py-2 px-4">
          {children}
        </div>
      </div>
    </div>
  )
}
