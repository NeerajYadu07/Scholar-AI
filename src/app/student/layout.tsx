import { SimpleSidebar } from '@/components/molecules/SimpleSidebar'
import { StudentMenu } from '@/components/organisms/StudentMenu'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex mt-12 gap-4">
      <div className="hidden w-full max-w-xs bg-white dark:bg-slate-700 border rounded-lg sm:block">
        <StudentMenu />
      </div>

      <div className="flex-grow">
        <div className="sm:hidden">
          <SimpleSidebar>
            <StudentMenu />
          </SimpleSidebar>
        </div>
        <div className=" bg-gray-100 dark:bg-gray-700 rounded-lg min-h-[calc(100vh-8rem)] py-2 px-4">
          {children}
        </div>
      </div>
    </div>
  )
}
