import React, { useMemo } from "react";
import Menu from "../components/Menu";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const { user, logout } = useAuth();

  const modules = useMemo(() => [
    {
      title: "🧰 Oficina Inteligente",
      description: "Reparos e relatórios técnicos",
      color: "orange",
      icon: "🔧",
      status: "Ativo",
      active: true,
      path: "/oficina",
      stats: "15 reparos este mês"
    },
    {
      title: "🎥 Estúdio de Mídia",
      description: "Armazenamento e entrega de fotos/vídeos",
      color: "purple",
      icon: "🎬",
      status: user?.modules?.includes('studio') ? "Ativo" : "Upgrade",
      active: user?.modules?.includes('studio'),
      path: user?.modules?.includes('studio') ? "/studio" : "/pricing",
      stats: user?.modules?.includes('studio') ? "2.4GB usados" : "Disponível no Pro"
    },
    {
      title: "📂 Backup Local",
      description: "Backup automático e seguro",
      color: "green",
      icon: "💾",
      status: user?.modules?.includes('backup') ? "Ativo" : "Upgrade",
      active: user?.modules?.includes('backup'),
      path: user?.modules?.includes('backup') ? "/backup" : "/pricing",
      stats: user?.modules?.includes('backup') ? "Backup ativo" : "Disponível no Pro"
    },
    {
      title: "📦 Gestão de Arquivos",
      description: "Gestão de arquivos para empresas",
      color: "blue",
      icon: "📁",
      status: user?.modules?.includes('files') ? "Ativo" : "Upgrade",
      active: user?.modules?.includes('files'),
      path: user?.modules?.includes('files') ? "/files" : "/pricing",
      stats: user?.modules?.includes('files') ? "128 arquivos" : "Disponível no Business"
    }
  ], [user]);

  const getColorClasses = (color, active) => {
    const baseColors = {
      orange: 'from-orange-50 to-orange-100 border-orange-200 dark:from-orange-900/20 dark:to-orange-800/20 dark:border-orange-700',
      purple: 'from-purple-50 to-purple-100 border-purple-200 dark:from-purple-900/20 dark:to-purple-800/20 dark:border-purple-700',
      green: 'from-green-50 to-green-100 border-green-200 dark:from-green-900/20 dark:to-green-800/20 dark:border-green-700',
      blue: 'from-blue-50 to-blue-100 border-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 dark:border-blue-700',
    };
    
    const textColors = {
      orange: 'text-orange-800 dark:text-orange-200',
      purple: 'text-purple-800 dark:text-purple-200',
      green: 'text-green-800 dark:text-green-200',
      blue: 'text-blue-800 dark:text-blue-200',
    };

    return `bg-gradient-to-br ${baseColors[color]} ${textColors[color]} ${
      !active ? 'opacity-60 grayscale' : 'hover:shadow-xl transition-all duration-300 hover:-translate-y-2'
    }`;
  };

  return (
    <Menu>
      <div className="min-h-full w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Olá, {user?.name?.split(' ')[0] || 'Usuário'}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Bem-vindo de volta ao seu painel de controle
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/pricing"
              className="px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all duration-200 transform hover:scale-105"
            >
              {user?.plan === 'free' ? '🚀 Fazer Upgrade' : '💎 Meu Plano'}
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            >
              Sair
            </button>
          </div>
        </div>

        {/* Welcome Card */}
        {user?.plan === 'free' && (
          <div className="bg-gradient-to-r from-primary-500 to-blue-600 rounded-2xl p-6 text-white mb-8 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">🚀 Experimente o Mini Cloud Maker Pro</h3>
                <p className="opacity-90">
                  Desbloqueie todos os módulos e recursos avançados com 14 dias grátis
                </p>
              </div>
              <Link
                to="/pricing"
                className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105"
              >
                Ver Planos
              </Link>
            </div>
          </div>
        )}

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {modules.map((module, index) => (
            <Link
              key={index}
              to={module.path}
              className={`${getColorClasses(module.color, module.active)} rounded-2xl border p-6 block`}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{module.icon}</span>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  module.active 
                    ? (module.color === 'orange' ? 'bg-orange-500 text-white' :
                       module.color === 'purple' ? 'bg-purple-500 text-white' :
                       module.color === 'green' ? 'bg-green-500 text-white' :
                       'bg-blue-500 text-white')
                    : 'bg-gray-500 text-white'
                }`}>
                  {module.status}
                </span>
              </div>
              <h3 className="font-bold text-lg mb-2">{module.title}</h3>
              <p className="text-sm opacity-75 mb-3">{module.description}</p>
              <p className="text-xs opacity-60">{module.stats}</p>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Armazenamento</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">5.2GB</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400">💾</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Reparos Ativos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                <span className="text-orange-600 dark:text-orange-400">🔧</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Plano Atual</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white capitalize">{user?.plan}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400">💎</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link 
              to="/oficina/reparos" 
              className="p-4 text-left rounded-xl border border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 group"
            >
              <div className="text-primary-600 dark:text-primary-400 font-semibold flex items-center">
                <span className="mr-2">🔧</span>
                Novo Reparo
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Registrar serviço técnico</div>
            </Link>
            
            <Link 
              to="/files/upload" 
              className="p-4 text-left rounded-xl border border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 group"
            >
              <div className="text-primary-600 dark:text-primary-400 font-semibold flex items-center">
                <span className="mr-2">📤</span>
                Upload
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Enviar arquivos</div>
            </Link>
            
            <Link 
              to="/backup/agendamentos" 
              className="p-4 text-left rounded-xl border border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 group"
            >
              <div className="text-primary-600 dark:text-primary-400 font-semibold flex items-center">
                <span className="mr-2">🔄</span>
                Backup
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Agendar backup</div>
            </Link>
            
            <Link 
              to="/reports" 
              className="p-4 text-left rounded-xl border border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 group"
            >
              <div className="text-primary-600 dark:text-primary-400 font-semibold flex items-center">
                <span className="mr-2">📊</span>
                Relatórios
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Gerar relatórios</div>
            </Link>
          </div>
        </div>
      </div>
    </Menu>
  );
}