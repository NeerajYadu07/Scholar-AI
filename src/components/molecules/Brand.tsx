import Link from 'next/link'

import { DeveloperInfo } from './DeveloperInfo'
import { cn } from '@/util/styles'
import Image from 'next/image'

export interface IBrandProps {}

export const Brand = () => {
  return (
    <div>
      <Link
        href="/"
        className={cn(
          'font-semibold',
        )}
      >
        {/* <Image src={"../../../public/logo.scg"} alt='logo' width={5} height={5}> */}

        {/* </Image> */}
        Scholar.AI
      </Link>
      {/* <DeveloperInfo /> */}
    </div>
  )
}
