import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { clsx } from 'clsx'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export function Dropdown({ children }) {
  return <Menu as="div" className="relative">{children}</Menu>
}

export function DropdownButton({ as = 'button', className, children, ...props }) {
  const Component = as
  return (
    <Menu.Button as={Component} className={clsx(className, 'flex items-center w-full text-left transition-all duration-200 hover:scale-105')} {...props}>
      {children}
    </Menu.Button>
  )
}

export function DropdownMenu({ children, className, anchor = 'bottom end' }) {
  const anchorClasses = {
    'bottom end': 'top-full right-0',
    'bottom start': 'top-full left-0',
    'top start': 'bottom-full left-0',
    'top end': 'bottom-full right-0',
  }

  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-150"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items
        className={clsx(
          className,
          anchorClasses[anchor],
          'absolute z-50 mt-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-gray-900/10 dark:ring-gray-100/10 focus:outline-none py-2 border border-gray-200 dark:border-gray-600'
        )}
      >
        {children}
      </Menu.Items>
    </Transition>
  )
}

export function DropdownItem({ to, children, className, ...props }) {
  const navigate = useNavigate();
  
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={() => navigate(to)}
          className={clsx(
            className,
            active ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-200',
            'flex gap-3 items-center px-4 py-2 text-sm transition-all duration-150 ease-in-out transform hover:translate-x-1 w-full text-left'
          )}
          {...props}
        >
          {children}
        </button>
      )}
    </Menu.Item>
  )
}

export function DropdownLabel({ children, className }) {
  return (
    <span className={clsx(className, 'flex-1 truncate')}>
      {children}
    </span>
  )
}

export function DropdownDivider() {
  return <div className="my-2 border-t border-gray-200 dark:border-gray-600" />
}