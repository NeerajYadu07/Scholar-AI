import { RouterOutputs } from '@/trpc/clients/types'
import { BaseComponent } from '@/util/types'
import Image from 'next/image'

export interface IUserCardProps extends BaseComponent {
  user: RouterOutputs['admins']['admins'][0]['User']
}

export const UserCard = ({ user, children }: IUserCardProps) => {
  return (
    <div className="flex bg-white dark:bg-slate-500 max-w-md rounded-lg p-2 justify-start items-center gap-2">
      <Image
        src={user.image || '/user.jpg'}
        alt=""
        width={300}
        height={300}
        className="w-16 h-16 rounded-full"
      />
      <div>
        <div className="font-medium ">{user.name}</div>
        <div className="text-xs text-gray-500 dark:text-white whitespace-pre-wrap">
          {user.id}
        </div>
        {children}
      </div>
    </div>
  )
}
