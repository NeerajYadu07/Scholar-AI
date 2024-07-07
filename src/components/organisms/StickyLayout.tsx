import { ReactNode } from 'react'
import { SimpleSidebar } from '../molecules/SimpleSidebar'
import { CourseSidebar } from './CourseSidebar'

export const StickyLayout = ({
  sidebarContent,
  children,
}: {
  sidebarContent: ReactNode
  children: ReactNode
}) => {
  return (
    <div className="mt-12 flex gap-4">
      <div className="hidden w-full max-w-xs bg-white dark:bg-slate-700 border rounded-lg sm:block">
        {sidebarContent}
      </div>

      <div className="flex-grow min-h-[calc(100vh-8rem)] py-2 px-4 bg-gray-100 dark:bg-gray-700 rounded-lg relative">
        <SimpleSidebar className="absolute top-0 left-0">
          {sidebarContent}
        </SimpleSidebar>
        {children}
      </div>
    </div>
  )
}
