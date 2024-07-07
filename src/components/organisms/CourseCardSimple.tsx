'use client'
import { RouterOutputs } from '@/trpc/clients/types'
import { cn } from '@/util/styles'
import Link from 'next/link'
import { DisplayDate } from '../molecules/DisplayDate'
import { Badge } from '../atoms/badge'
import Image from 'next/image'
import { Pencil } from 'lucide-react'
import { EllipsisVertical } from 'lucide-react'
import { Trash2 } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/atoms/dropdown-menu'
import { trpcClient } from '@/trpc/clients/client'
import { revalidatePath } from '@/util/actions'
import { useToast } from '../molecules/Toaster/use-toast'
import { useRouter } from 'next/navigation'

export interface ICourseCardSimpleProps {
  course: RouterOutputs['courses']['courses'][0]
}

export const CourseCardSimple = ({ course }: ICourseCardSimpleProps) => {
  const { toast } = useToast()
  const router = useRouter()

  const { mutateAsync: deleteCourse } = trpcClient.courses.delete.useMutation({
    onSuccess(data, variables, context) {
      revalidatePath('/admin/manageCourses')
      toast({ title: `Course: ${data.title} deleted!` })
      router.replace('/admin/manageCourses')
    },
    onError(error, variables, context) {
      console.log(error.message)
      toast({ title: ` ${error.message}` })
    },
  })

  return (
    <div
      className={cn(
        !course.published ? 'text-gray-400' : ' bg-gray-100',
        'relative h-[300px] w-[300px] max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800'
      )}
    >
      <div className="absolute top-2 right-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="bg-transparent rounded-full shadow-lg"
          >
            <EllipsisVertical className="w-5 h-5 text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link
                  href={`/admin/manageCourses/update/${course.id}`}
                  className="flex items-center"
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  <span>Edit</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trash2
                  className="w-4 h-4 mr-2"
                  onClick={() => {
                    deleteCourse({ id: +course.id })
                  }}
                />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Image
        alt=""
        width={300}
        height={300}
        src={course.image || '/user.jpg'}
        className="object-cover w-full rounded shadow-lg aspect-video"
      />
      <Link href={`/course/${course.id}`}>
        <div className="px-2 py-1">
          <div className={cn('mt-2 font-medium', 'dark:text-white')}>
            {course.title}
          </div>

          <DisplayDate
            dateString={course.createdAt}
            className="mt-2 dark:text-gray-400"
          />
          <Badge variant={'secondary'}>
            {course.published ? 'published' : 'unpublished'}
          </Badge>
        </div>
      </Link>
    </div>
  )
}

// Define the handleDelete function
const handleDelete = (courseId: string) => {
  // Implement your delete logic here
  console.log(`Deleting course with id: ${courseId}`)
}
