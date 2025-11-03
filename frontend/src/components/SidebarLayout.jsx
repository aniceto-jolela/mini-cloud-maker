import { clsx } from 'clsx'
import { useState } from 'react'
import React from 'react'

export function SidebarLayout({ navbar, sidebar, children, className }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className={clsx(className, 'flex h-screen bg-gray-50 dark:bg-gray-900 w-full')}>
      {/* Sidebar para mobile */}
      <div className={clsx(
        'lg:hidden fixed inset-0 z-50 transition-opacity duration-300',
        sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}>
        <div 
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300" 
          onClick={() => setSidebarOpen(false)} 
        />
        <div className={clsx(
          "fixed inset-y-0 left-0 w-80 transform transition-transform duration-300 ease-in-out",
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}>
          {React.cloneElement(sidebar, { onClose: () => setSidebarOpen(false) })}
        </div>
      </div>

      {/* Sidebar para desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex w-80">
          {sidebar}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        {/* Navbar com botão mobile */}
        {React.cloneElement(navbar, { onMenuClick: () => setSidebarOpen(true) })}
        
        {/* Page content */}
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 w-full transition-all duration-200">
          <div className="min-h-full p-8 w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}