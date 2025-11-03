import { clsx } from 'clsx'
import { XMarkIcon } from '@heroicons/react/20/solid'
import React from 'react'

export function Sidebar({ children, className, onClose }) {
  return (
    <div className={clsx(className, 'flex flex-col w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full')}>
      {/* Botão fechar para mobile */}
      {onClose && (
        <div className="flex items-center justify-end p-4 lg:hidden border-b border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-500 transition-colors duration-200"
          >
            <XMarkIcon className="size-5" />
          </button>
        </div>
      )}
      {children}
    </div>
  )
}

export function SidebarHeader({ children, className }) {
  return (
    <div className={clsx(className, 'flex flex-col p-4 gap-4 border-b border-gray-200 dark:border-gray-700')}>
      {children}
    </div>
  )
}

export function SidebarBody({ children, className }) {
  return (
    <div className={clsx(className, 'flex flex-col overflow-y-auto flex-1')}>
      {children}
    </div>
  )
}

export function SidebarFooter({ children, className }) {
  return (
    <div className={clsx(className, 'p-4 border-t border-gray-200 dark:border-gray-700')}>
      {children}
    </div>
  )
}

export function SidebarSection({ children, className }) {
  return (
    <div className={clsx(className, 'flex flex-col gap-1 p-4')}>
      {children}
    </div>
  )
}

export function SidebarItem({ href, children, className, isActive, ...props }) {
  return (
    <a
      href={href}
      className={clsx(
        className,
        'flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all duration-200 ease-in-out',
        isActive
          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border-r-2 border-primary-500 font-semibold shadow-sm'
          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white hover:shadow-md transform hover:-translate-y-0.5'
      )}
      {...props}
    >
      {children}
    </a>
  )
}

export function SidebarLabel({ children, className }) {
  return (
    <span className={clsx(className, 'flex-1 truncate text-sm')}>
      {children}
    </span>
  )
}

export function SidebarHeading({ children, className }) {
  return (
    <h3 className={clsx(className, 'text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3')}>
      {children}
    </h3>
  )
}

export function SidebarSpacer() {
  return <div className="flex-1" />
}