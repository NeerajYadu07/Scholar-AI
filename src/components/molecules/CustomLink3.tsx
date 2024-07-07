'use client'
import { ForwardRefRenderFunction, forwardRef } from 'react'
import NextLink, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/util/styles'

const CustomLinkComponent: ForwardRefRenderFunction<
  HTMLAnchorElement,
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
    LinkProps
> = ({ children, href, className, ...props }, ref) => {
  const pathname = usePathname()
  const active = pathname === href

  return (
    <NextLink
      ref={ref}
      href={href}
      className={cn(
        active ? 'font-semibold text-white bg-primary' : '',
        'flex items-center gap-2 transition-all relative',
        'p-2 border rounded-md hover:border-primary',
        className
      )}
      {...props}
    >
      {' '}
      {children}
    </NextLink>
  )
}

export const Link = forwardRef(CustomLinkComponent)
