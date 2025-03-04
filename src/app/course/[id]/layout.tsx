import { AlertBox } from '@/components/molecules/AlertBox'
import { CourseSidebar } from '@/components/organisms/CourseSidebar'
import { StickyLayout } from '@/components/organisms/StickyLayout'
import { trpcServer } from '@/trpc/client/server'

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {
    id: number
  }
}) {
  const courseId = params.id

  const course = await trpcServer.courses.course.query({
    id: +courseId,
  })

  if (!course) {
    return <AlertBox>Course not found.</AlertBox>
  }

  return (
    <StickyLayout sidebarContent={<CourseSidebar course={course} />}>
      {children}
    </StickyLayout>
  )
}
