import { Title2 } from '@/components/atoms/typography'
import { CourseCardSimple } from '@/components/organisms/CourseCardSimple'
import { trpcServer } from '@/trpc/client/server'

export default async function Page() {
  const courses = await trpcServer.courses.courses.query()
  return (
    <div>
      <Title2>Courses</Title2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {courses?.map((course) => (
          <CourseCardSimple key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
