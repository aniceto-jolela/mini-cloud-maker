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
  WrenchScrewdriverIcon,
  FilmIcon,
  CloudArrowDownIcon,
  FolderIcon,
  ChartBarIcon,
  DocumentChartBarIcon,
  MagnifyingGlassIcon,
  InboxIcon,
} from '@heroicons/react/20/solid'
import { useState, useCallback, memo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

// Componentes memoizados para evitar re-renders desnecessários
const MemoizedSidebarItem = memo(SidebarItem);
const MemoizedNavbarItem = memo(NavbarItem);
const MemoizedDropdownItem = memo(DropdownItem);

function Menu({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // useCallback para evitar recriação de funções
  const handleNavigation = useCallback((path) => {
    navigate(path);
    setMobileSidebarOpen(false);
  }, [navigate]);

  const handleLogout = useCallback(() => {
    logout();
    navigate('/');
  }, [logout, navigate]);

  const isActive = useCallback((path) => location.pathname.startsWith(path), [location.pathname]);

  return (
    <SidebarLayout
      navbar={
        <Navbar onMenuClick={() => setMobileSidebarOpen(true)}>
          <NavbarSpacer />
          <NavbarSection>
            <MemoizedNavbarItem 
              to="/search" 
              aria-label="Search"
              isActive={isActive('/search')}
            >
              <MagnifyingGlassIcon className='size-5' />
            </MemoizedNavbarItem>
            <MemoizedNavbarItem 
              to="/inbox" 
              aria-label="Inbox"
              isActive={isActive('/inbox')}
            >
              <InboxIcon className='size-5' />
            </MemoizedNavbarItem>
            <Dropdown>
              <DropdownButton as={MemoizedNavbarItem}>
                <Avatar 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  square 
                />
              </DropdownButton>
              <DropdownMenu className="min-w-64" anchor="bottom end">
                <MemoizedDropdownItem to="/profile">
                  <UserIcon className='size-4' />
                  <DropdownLabel>Meu Perfil</DropdownLabel>
                </MemoizedDropdownItem>
                <MemoizedDropdownItem to="/settings">
                  <Cog8ToothIcon className='size-4' />
                  <DropdownLabel>Configurações</DropdownLabel>
                </MemoizedDropdownItem>
                <DropdownDivider />
                <MemoizedDropdownItem to="/privacy">
                  <ShieldCheckIcon className='size-4' />
                  <DropdownLabel>Privacidade</DropdownLabel>
                </MemoizedDropdownItem>
                <MemoizedDropdownItem to="/feedback">
                  <LightBulbIcon className='size-4' />
                  <DropdownLabel>Enviar Feedback</DropdownLabel>
                </MemoizedDropdownItem>
                <DropdownDivider />
                <MemoizedDropdownItem onClick={handleLogout}>
                  <ArrowRightStartOnRectangleIcon className='size-4' />
                  <DropdownLabel>Sair</DropdownLabel>
                </MemoizedDropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar onClose={() => setMobileSidebarOpen(false)}>
          <SidebarHeader>
            <Dropdown>
              <DropdownButton as={MemoizedSidebarItem} className="lg:mb-2.5">
                <Avatar src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" />
                <SidebarLabel>Mini Cloud Maker</SidebarLabel>
                <ChevronDownIcon className='size-4 flex-shrink-0' />
              </DropdownButton>
              <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
                <MemoizedDropdownItem to="/settings">
                  <Cog8ToothIcon className='size-4' />
                  <DropdownLabel>Configurações</DropdownLabel>
                </MemoizedDropdownItem>
                <DropdownDivider />
                <MemoizedDropdownItem to="/">
                  <Avatar src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" size="sm" />
                  <DropdownLabel>Mini Cloud Maker</DropdownLabel>
                </MemoizedDropdownItem>
                <DropdownDivider />
                <MemoizedDropdownItem to="/workspace/create">
                  <PlusIcon className='size-4' />
                  <DropdownLabel>Novo Workspace</DropdownLabel>
                </MemoizedDropdownItem>
              </DropdownMenu>
            </Dropdown>
          </SidebarHeader>
          
          <SidebarBody>
            {/* Navegação Principal */}
            <SidebarSection>
              <MemoizedSidebarItem 
                to="/dashboard" 
                isActive={isActive('/dashboard') || location.pathname === '/'}
              >
                <HomeIcon className='size-5' />
                <SidebarLabel>Dashboard</SidebarLabel>
              </MemoizedSidebarItem>
            </SidebarSection>

            {/* Módulos da Plataforma */}
            <SidebarSection>
              <SidebarHeading>Módulos</SidebarHeading>
              
              {/* 🧰 Oficina */}
              <MemoizedSidebarItem 
                to="/oficina" 
                isActive={isActive('/oficina')}
              >
                <WrenchScrewdriverIcon className='size-5' />
                <SidebarLabel>Oficina</SidebarLabel>
              </MemoizedSidebarItem>

              {/* 🎥 Estúdio de Mídia */}
              {user?.modules?.includes('studio') && (
                <MemoizedSidebarItem 
                  to="/studio" 
                  isActive={isActive('/studio')}
                >
                  <FilmIcon className='size-5' />
                  <SidebarLabel>Estúdio de Mídia</SidebarLabel>
                </MemoizedSidebarItem>
              )}

              {/* 📂 Backup Local */}
              {user?.modules?.includes('backup') && (
                <MemoizedSidebarItem 
                  to="/backup" 
                  isActive={isActive('/backup')}
                >
                  <CloudArrowDownIcon className='size-5' />
                  <SidebarLabel>Backup Local</SidebarLabel>
                </MemoizedSidebarItem>
              )}

              {/* 📦 Gestão de Arquivos */}
              {user?.modules?.includes('files') && (
                <MemoizedSidebarItem 
                  to="/files" 
                  isActive={isActive('/files')}
                >
                  <FolderIcon className='size-5' />
                  <SidebarLabel>Gestão de Arquivos</SidebarLabel>
                </MemoizedSidebarItem>
              )}

              {/* Se não tiver módulos pagos, mostrar link para planos */}
              {(!user?.modules?.includes('studio') || !user?.modules?.includes('backup') || !user?.modules?.includes('files')) && (
                <MemoizedSidebarItem to="/pricing">
                  <PlusIcon className='size-5' />
                  <SidebarLabel>Mais Módulos...</SidebarLabel>
                </MemoizedSidebarItem>
              )}
            </SidebarSection>

            {/* Ferramentas */}
            <SidebarSection>
              <SidebarHeading>Ferramentas</SidebarHeading>
              <MemoizedSidebarItem 
                to="/analytics" 
                isActive={isActive('/analytics')}
              >
                <ChartBarIcon className='size-5' />
                <SidebarLabel>Analytics</SidebarLabel>
              </MemoizedSidebarItem>
              <MemoizedSidebarItem 
                to="/reports" 
                isActive={isActive('/reports')}
              >
                <DocumentChartBarIcon className='size-5' />
                <SidebarLabel>Relatórios</SidebarLabel>
              </MemoizedSidebarItem>
            </SidebarSection>

            <SidebarSpacer />

            {/* Suporte */}
            <SidebarSection>
              <MemoizedSidebarItem 
                to="/help" 
                isActive={isActive('/help')}
              >
                <Cog6ToothIcon className='size-5' />
                <SidebarLabel>Ajuda & Suporte</SidebarLabel>
              </MemoizedSidebarItem>
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            <Dropdown>
              <DropdownButton as={MemoizedSidebarItem}>
                <span className="flex min-w-0 items-center gap-3">
                  <Avatar 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                    className="size-10" 
                    square 
                    alt="" 
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium text-gray-900 dark:text-white">
                      {user?.name || 'Usuário'}
                    </span>
                    <span className="block truncate text-xs/5 font-normal text-gray-500 dark:text-gray-400">
                      {user?.email || 'email@exemplo.com'}
                    </span>
                  </span>
                </span>
                <ChevronUpIcon className='size-4 flex-shrink-0' />
              </DropdownButton>
              <DropdownMenu className="min-w-64" anchor="top start">
                <MemoizedDropdownItem to="/profile">
                  <UserIcon className='size-4' />
                  <DropdownLabel>Meu Perfil</DropdownLabel>
                </MemoizedDropdownItem>
                <MemoizedDropdownItem to="/settings">
                  <Cog8ToothIcon className='size-4' />
                  <DropdownLabel>Configurações</DropdownLabel>
                </MemoizedDropdownItem>
                <DropdownDivider />
                <MemoizedDropdownItem onClick={handleLogout}>
                  <ArrowRightStartOnRectangleIcon className='size-4' />
                  <DropdownLabel>Sair</DropdownLabel>
                </MemoizedDropdownItem>
              </DropdownMenu>
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  );
}

export default memo(Menu);