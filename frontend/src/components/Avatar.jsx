import { clsx } from 'clsx'
import React from 'react'

export function Avatar({ src, initials, square = false, size = 'md', className, ...props }) {
  const sizeClasses = {
    sm: 'size-8',
    md: 'size-10',
    lg: 'size-12'
  }

  return (
    <span
      className={clsx(
        className,
        sizeClasses[size],
        'inline-flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 border-2 border-primary-200 dark:border-primary-700',
        square ? 'rounded-lg' : 'rounded-full',
        !src && 'font-medium text-primary-700 dark:text-primary-300',
        'transition-all duration-200 hover:scale-105 hover:border-primary-300 dark:hover:border-primary-500'
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt=""
          className={clsx(
            'object-cover',
            square ? 'rounded-lg' : 'rounded-full',
            'size-full'
          )}
        />
      ) : initials ? (
        <span className="text-sm font-semibold">
          {initials}
        </span>
      ) : null}
    </span>
  )
}