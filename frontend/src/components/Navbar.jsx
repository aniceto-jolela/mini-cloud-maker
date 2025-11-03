import { clsx } from 'clsx'
import { Bars3Icon } from '@heroicons/react/20/solid'
import React from 'react'

export function Navbar({ children, className, onMenuClick }) {
  return (
    <nav className={clsx(className, 'flex items-center justify-between px-4 lg:px-6 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm')}>
      {/* Botão menu mobile */}
      <button
        type="button"
        onClick={onMenuClick}
        className="lg:hidden -ml-2 p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
      >
        <Bars3Icon className="size-5" />
      </button>
      
      {children}
    </nav>
  )
}

export function NavbarSection({ children, className }) {
  return (
    <div className={clsx(className, 'flex items-center gap-1')}>
      {children}
    </div>
  )
}

export function NavbarSpacer() {
  return <div className="flex-1" />
}

export function NavbarItem({ href, children, className, isActive, ...props }) {
  return (
    <a
      href={href}
      className={clsx(
        className,
        'flex items-center justify-center size-9 rounded-lg transition-all duration-200 ease-in-out',
        isActive 
          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 shadow-sm transform scale-105' 
          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-md transform hover:scale-110'
      )}
      {...props}
    >
      {children}
    </a>
  )
}