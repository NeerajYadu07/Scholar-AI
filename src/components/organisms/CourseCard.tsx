import Link from 'next/link'
import Image from 'next/image'
import { RouterOutputs } from '@/trpc/client/types'
import { cn } from '@/util/styles'

export const CourseCard = ({
  course,
}: {
  course: RouterOutputs['courses']['courses'][0]
}) => {
  return (
    <div className="flex items-center justify-center transition duration-500 hover:scale-125">
      <div className="h-[275] w-[300] max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800">
        <Link href={`/course/${course.id}`}>
          <Image
            className="object-cover w-full rounded shadow-lg aspect-video"
            src={course.image || '/book.jpg'}
            alt=""
            width={300}
            height={300}
          />
          <div className="px-2 py-1">
            <div
              className={cn(
                'font-medium hover:underline mt-2 line-clamp-2 max-w-lg underline-offset-4 dark:text-white '
              )}
            >
              {course.title}
            </div>
            <div className="max-w-md mt-1 text-sm gray-500 line-clamp-2 dark:text-white">
              {course.Chapters?.length || 0} chapters
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
