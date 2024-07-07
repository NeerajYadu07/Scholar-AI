import { Title2, Title3 } from '@/components/atoms/typography'
import { AlertBox } from '@/components/molecules/AlertBox'
import { CourseCard } from '@/components/organisms/CourseCard'
import { trpcServer } from '@/trpc/clients/server'
export default async function Page() {
  const courses = await trpcServer.courses.courses.query()

  if (!courses.length) {
    return <AlertBox>No courses found.</AlertBox>
  }

  return (
    <div className='mt-12'>
      <div>
        <Title2>
          Our Courses
        </Title2>
      </div>
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {courses.map((course) => (
          <CourseCard course={course} key={course.id} />
        ))}
      </div>
    </div>
  )
}
