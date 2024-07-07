import { Link } from '../molecules/CustomLink3'
import { Link as Link2 } from '../molecules/CustomLink2'
import { LayoutDashboard } from 'lucide-react'
import { BookOpenText } from 'lucide-react'
import { UserRoundCog } from 'lucide-react'
import { CirclePlus } from 'lucide-react'

export interface IAdminMenuProps {}

export const AdminMenu = () => {
  return (
    <div className="flex py-2 px-16 flex-col justify-center gap-2 w-full">
      <Link href="/admin">
        <LayoutDashboard className="w-4 h-4" />
        Dashboard
      </Link>

      <Link href="/admin/manageCourses">
        <BookOpenText className="w-4 h-4" />
        Courses
      </Link>
      <Link2 href="/admin/manageCourses/new" className="pl-6">
        <CirclePlus className="w-4 h-4" />
        Add course
      </Link2>
      <div className="h-[1px] bg-gray-300 my-1 " />
      <Link href="/admin/manageAdmins">
        <UserRoundCog className="w-4 h-4" />
        Admins
      </Link>
      <Link2 href="/admin/manageAdmins/new" className="pl-6">
        <CirclePlus className="w-4 h-4" />
        Add admin
      </Link2>
    </div>
  )
}
