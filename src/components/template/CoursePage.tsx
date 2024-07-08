'use client'

import { RouterOutputs } from '@/trpc/client/types'
import { DisplayDate } from '../molecules/DisplayDate'
import Image from 'next/image'
import { cn } from '@/util/styles'
import { SimpleSidebar } from '../molecules/SimpleSidebar'
import { CourseSidebar } from '../organisms/CourseSidebar'

export type CourseType = NonNullable<RouterOutputs['courses']['course']>

export interface ICoursePageProps {
  course: CourseType
}

export const CoursePage = ({ course }: ICoursePageProps) => {
  return (
    <div>
      <Image
        src={course.image || '/book.jpg'}
        alt=""
        className="object-cover h-[400] w-full rounded shadow-lg aspect-video"
        width={300}
        height={300}
      />
      <div className="mt-4 whitespace-pre-wrap ">{course.title}</div>
      <DisplayDate dateString={course.createdAt} />
      <div className="mt-4 whitespace-pre-wrap ">{course.description}</div>
      <div className="mt-12 text-xs">Select a chapter to start learning...</div>
    </div>
  )
}
