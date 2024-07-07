import { cn } from '@/util/styles'
import { BaseComponent } from '@/util/types'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const StatCard = ({
  label,
  children,
  Icon,
  href,
  className,
}: {
  label: string
  Icon: LucideIcon
  href?: string
} & BaseComponent) => {
  const Comp = href ? Link : 'div'

  return (
    <Comp
      href={href || ''}
      className={cn(
        'bg-white dark:bg-slate-500 shadow-lg p-4 md:p-6 flex items-center border rounded-lg ',
        className
      )}
    >
      <Icon
        className="mr-2 w-8 h-8 md:mr-4 md:w-10 md:h-10 flex-shrink-0"
        strokeWidth={1}
      />

      <div>
        <p className="text-gray-500 dark:text-white text-xs md:text-sm">
          {label}
        </p>
        <p className="text-xl dark:text-white md:text-2xl font-bold">
          {children}
        </p>
      </div>
    </Comp>
  )
}
