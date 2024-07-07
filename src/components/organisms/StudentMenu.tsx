import { Link } from '../molecules/CustomLink3'
import { LayoutDashboard } from 'lucide-react'
import { WalletCards } from 'lucide-react'
import { MessageCircle } from 'lucide-react'
import { BookCheck } from 'lucide-react'


export const StudentMenu = () => {
  return (
    <div className="flex py-2 px-16 flex-col justify-center gap-2 w-full">
      <span>
        <Link href="/student">
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Link>
      </span>
      <span>
        <Link href="/student/credits">
          <WalletCards className="w-4 h-4" />
          AI Credits
        </Link>
      </span>
      <span>
        <Link href="/student/conversations">
          <MessageCircle className="w-4 h-4" />
          Conversations
        </Link>
      </span>
      <span>
        <Link href="/student/tests">
          <BookCheck className="w-4 h-4" />
          Tests
        </Link>
      </span>
    </div>
  )
}
