import { cn } from '@/util/styles'
import { BaseComponent } from '@/util/types'
import { Link } from '../molecules/CustomLink2'

export const NavMenu = ({ className }: BaseComponent) => {
  return (
    <div
      className={cn('w-full relative flex justify-between gap-12', className)}
    >
      <Link href="/course">Courses</Link>      
      <Link href="/student">Student</Link>
      <Link href="/admin">Admin</Link>
    </div>
  )
}
