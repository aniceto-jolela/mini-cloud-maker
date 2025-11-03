import { Avatar } from '@/components/Avatar'
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from '@/components/Dropdown'
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/components/Navbar'
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from '@/components/Sidebar'
import { SidebarLayout } from '@/components/SidebarLayout'
import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserIcon,
} from '@heroicons/react/16/solid'
import {
  Cog6ToothIcon,
  HomeIcon,
  InboxIcon,
  MagnifyingGlassIcon,
  MegaphoneIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  Square2StackIcon,
  TicketIcon,
} from '@heroicons/react/20/solid'
import { useState } from 'react'

export default function Menu({ children }) {
  const [currentPath, setCurrentPath] = useState('/')

  const handleNavigation = (path) => {
    setCurrentPath(path)
  }

  const isActive = (path) => currentPath === path

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <NavbarItem 
              href="/search" 
              aria-label="Search"
              isActive={isActive('/search')}
              onClick={() => handleNavigation('/search')}
            >
              <MagnifyingGlassIcon className='size-5' />
            </NavbarItem>
            <NavbarItem 
              href="/inbox" 
              aria-label="Inbox"
              isActive={isActive('/inbox')}
              onClick={() => handleNavigation('/inbox')}
            >
              <InboxIcon className='size-5' />
            </NavbarItem>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar 
                  src="https://media.licdn.com/dms/image/v2/D4D03AQHHwyXuH6pApA/profile-displayphoto-scale_200_200/B4DZkvlKanJQAY-/0/1757439897537?e=1763596800&v=beta&t=JADvkOKFBdKggiwWZxfcDeANdwEdgA9K5fnA1TEvWsc" 
                  square 
                />
              </DropdownButton>
              <DropdownMenu className="min-w-64" anchor="bottom end">
                <DropdownItem href="/my-profile" onClick={() => handleNavigation('/my-profile')}>
                  <UserIcon className='size-4' />
                  <DropdownLabel>Perfil</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="/settings" onClick={() => handleNavigation('/settings')}>
                  <Cog8ToothIcon className='size-4' />
                  <DropdownLabel>Settings</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="/privacy-policy" onClick={() => handleNavigation('/privacy-policy')}>
                  <ShieldCheckIcon className='size-4' />
                  <DropdownLabel>Privacy policy</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="/share-feedback" onClick={() => handleNavigation('/share-feedback')}>
                  <LightBulbIcon className='size-4' />
                  <DropdownLabel>Share feedback</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="/logout">
                  <ArrowRightStartOnRectangleIcon className='size-4' />
                  <DropdownLabel>Sair</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <Dropdown>
              <DropdownButton as={SidebarItem} className="lg:mb-2.5">
                <Avatar src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" />
                <SidebarLabel>Modulos</SidebarLabel>
                <ChevronDownIcon className='size-4 flex-shrink-0' />
              </DropdownButton>
              <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
                <div className="px-4 py-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Gerencie seus recursos em nuvem
                </div>
                <DropdownDivider />
                <DropdownItem href="/teams/1">
                  <Avatar src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" size="sm" />
                  <DropdownLabel>Oficina</DropdownLabel>
                </DropdownItem>
                 <DropdownItem href="/teams/2">
                  <Avatar initials="WC" className="bg-purple-500 text-white" size="sm" />
                  <DropdownLabel>Estúdio de mídia</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="/teams/2">
                  <Avatar initials="WC" className="bg-purple-500 text-white" size="sm" />
                  <DropdownLabel>Gestão de arquivos</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="/teams/2">
                  <Avatar initials="WC" className="bg-purple-500 text-white" size="sm" />
                  <DropdownLabel>Backup automático</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <SidebarSection className="max-lg:hidden">
              <SidebarItem 
                href="/search" 
                isActive={isActive('/search')}
                onClick={() => handleNavigation('/search')}
              >
                <MagnifyingGlassIcon className='size-5' />
                <SidebarLabel>Search</SidebarLabel>
              </SidebarItem>
              <SidebarItem 
                href="/inbox" 
                isActive={isActive('/inbox')}
                onClick={() => handleNavigation('/inbox')}
              >
                <InboxIcon className='size-5' />
                <SidebarLabel>Inbox</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarHeader>
          
          <SidebarBody>
            {/* Seção principal de navegação */}
            <SidebarSection>
              <SidebarItem 
                href="/" 
                isActive={isActive('/')}
                onClick={() => handleNavigation('/')}
              >
                <HomeIcon className='size-5' />
                <SidebarLabel>Home</SidebarLabel>
              </SidebarItem>
              <SidebarItem 
                href="/events" 
                isActive={isActive('/events')}
                onClick={() => handleNavigation('/events')}
              >
                <Square2StackIcon className='size-5' />
                <SidebarLabel>Events</SidebarLabel>
              </SidebarItem>
              <SidebarItem 
                href="/orders" 
                isActive={isActive('/orders')}
                onClick={() => handleNavigation('/orders')}
              >
                <TicketIcon className='size-5' />
                <SidebarLabel>Orders</SidebarLabel>
              </SidebarItem>
              <SidebarItem 
                href="/settings" 
                isActive={isActive('/settings')}
                onClick={() => handleNavigation('/settings')}
              >
                <Cog6ToothIcon className='size-5' />
                <SidebarLabel>Settings</SidebarLabel>
              </SidebarItem>
              <SidebarItem 
                href="/broadcasts" 
                isActive={isActive('/broadcasts')}
                onClick={() => handleNavigation('/broadcasts')}
              >
                <MegaphoneIcon className='size-5' />
                <SidebarLabel>Broadcasts</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            {/* Seção de eventos - só no desktop */}
            <SidebarSection className="max-lg:hidden">
              <SidebarHeading>Upcoming Events</SidebarHeading>
              <SidebarItem 
                href="/events/1" 
                onClick={() => handleNavigation('/events/1')}
              >
                Bear Hug: Live in Concert
              </SidebarItem>
              <SidebarItem 
                href="/events/2" 
                onClick={() => handleNavigation('/events/2')}
              >
                Viking People
              </SidebarItem>
              <SidebarItem 
                href="/events/3" 
                onClick={() => handleNavigation('/events/3')}
              >
                Six Fingers — DJ Set
              </SidebarItem>
              <SidebarItem 
                href="/events/4" 
                onClick={() => handleNavigation('/events/4')}
              >
                We All Look The Same
              </SidebarItem>
            </SidebarSection>

            {/* Spacer para empurrar a próxima seção para baixo */}
            <SidebarSpacer />

            {/* Seção de suporte - fica logo acima do footer */}
            <SidebarSection>
              <SidebarItem 
                href="/support" 
                isActive={isActive('/support')}
                onClick={() => handleNavigation('/support')}
              >
                <QuestionMarkCircleIcon className='size-5' />
                <SidebarLabel>Support</SidebarLabel>
              </SidebarItem>
              <SidebarItem 
                href="/changelog" 
                isActive={isActive('/changelog')}
                onClick={() => handleNavigation('/changelog')}
              >
                <SparklesIcon className='size-5' />
                <SidebarLabel>Changelog</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <span className="flex min-w-0 items-center gap-3">
                  <Avatar 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                    className="size-10" 
                    square 
                    alt="" 
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">Erica</span>
                    <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                      erica@example.com
                    </span>
                  </span>
                </span>
                <ChevronUpIcon className='size-4 flex-shrink-0' />
              </DropdownButton>
              <DropdownMenu className="min-w-64" anchor="top start">
                <DropdownItem href="/my-profile" onClick={() => handleNavigation('/my-profile')}>
                  <UserIcon className='size-4' />
                  <DropdownLabel>My profile</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="/settings" onClick={() => handleNavigation('/settings')}>
                  <Cog8ToothIcon className='size-4' />
                  <DropdownLabel>Settings</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="/privacy-policy" onClick={() => handleNavigation('/privacy-policy')}>
                  <ShieldCheckIcon className='size-4' />
                  <DropdownLabel>Privacy policy</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="/share-feedback" onClick={() => handleNavigation('/share-feedback')}>
                  <LightBulbIcon className='size-4' />
                  <DropdownLabel>Share feedback</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="/logout">
                  <ArrowRightStartOnRectangleIcon className='size-4' />
                  <DropdownLabel>Sign out</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  )
}