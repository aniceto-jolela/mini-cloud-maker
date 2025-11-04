import React, { useMemo } from "react";
import Menu from "../components/Menu";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const { user, logout } = useAuth();

  const allModules = useMemo(() => [
    {
      id: 'oficina',
      title: "🧰 Oficina Inteligente",
      description: "Sistema completo de reparos e gestão técnica",
      color: "orange",
      status: "Ativo",
      active: true,
      path: "/oficina",
      stats: "15 reparos este mês",
      problem: "Clientes reclamam de prazos e custos extras?",
      solution: "Organize reparos, controle peças e gere orçamentos automáticos"
    },
    {
      id: 'webhooks',
      title: "🔄 Testador de Webhooks", 
      description: "Ferramenta essencial para desenvolvedores",
      color: "blue",
      status: user?.modules?.includes('webhooks') ? "Ativo" : "Experimentar",
      active: user?.modules?.includes('webhooks'),
      path: user?.modules?.includes('webhooks') ? "/webhooks" : "/pricing",
      stats: user?.modules?.includes('webhooks') ? "3 testes hoje" : "Para devs e startups",
      problem: "Perde horas configurando túneis?",
      solution: "Teste webhooks em minutos com Ngrok integrado"
    },
    {
      id: 'obras',
      title: "🏗️ Gestor de Obras",
      description: "Sistema completo para construção civil", 
      color: "amber",
      status: user?.modules?.includes('obras') ? "Ativo" : "Para Empreiteiros",
      active: user?.modules?.includes('obras'),
      path: user?.modules?.includes('obras') ? "/obras" : "/pricing",
      stats: user?.modules?.includes('obras') ? "2 obras activas" : "Elimine conflitos",
      problem: "Clientes questionam progresso?",
      solution: "Registo fotográfico e relatórios automáticos"
    },
    {
      id: 'escolas',
      title: "🏫 Inspector Escolar",
      description: "Sistema de inspeção para escolas",
      color: "purple", 
      status: user?.modules?.includes('escolas') ? "Ativo" : "Para Escolas",
      active: user?.modules?.includes('escolas'),
      path: user?.modules?.includes('escolas') ? "/escolas" : "/pricing",
      stats: user?.modules?.includes('escolas') ? "Pronto para AGT" : "Simplifique inspeções",
      problem: "Documentação para AGT é stress?",
      solution: "Checklists digitais e relatórios automáticos"
    },
    {
      id: 'vistoria', 
      title: "🚗 Sistema de Vistoria",
      description: "Solução para seguradoras e rent-a-car",
      color: "red",
      status: user?.modules?.includes('vistoria') ? "Ativo" : "Para Seguradoras", 
      active: user?.modules?.includes('vistoria'),
      path: user?.modules?.includes('vistoria') ? "/vistoria" : "/pricing",
      stats: user?.modules?.includes('vistoria') ? "5 vistorias" : "Reduza prejuízos",
      problem: "Prejuízos com danos não documentados?",
      solution: "Vistorias digitais com assinatura"
    },
    {
      id: 'qualidade',
      title: "🍽️ Controlo de Qualidade", 
      description: "Sistema para restaurantes e catering",
      color: "green",
      status: user?.modules?.includes('qualidade') ? "Ativo" : "Para Restaurantes",
      active: user?.modules?.includes('qualidade'),
      path: user?.modules?.includes('qualidade') ? "/qualidade" : "/pricing",
      stats: user?.modules?.includes('qualidade') ? "Checklists diários" : "Certifique qualidade", 
      problem: "Clientes duvidam da higiene?",
      solution: "Checklists HACCP e certificados digitais"
    },
    {
      id: 'studio',
      title: "🎥 Estúdio de Mídia",
      description: "Gestão profissional de conteúdo",
      color: "pink",
      status: user?.modules?.includes('studio') ? "Ativo" : "Para Criadores", 
      active: user?.modules?.includes('studio'),
      path: user?.modules?.includes('studio') ? "/studio" : "/pricing",
      stats: user?.modules?.includes('studio') ? "2.4GB usados" : "Organize seu portfólio",
      problem: "Perde tempo organizando arquivos?",
      solution: "Galeria online e partilha instantânea"
    },
    {
      id: 'backup',
      title: "📂 Backup Automático", 
      description: "Solução completa de backup",
      color: "indigo",
      status: user?.modules?.includes('backup') ? "Ativo" : "Proteja Dados",
      active: user?.modules?.includes('backup'),
      path: user?.modules?.includes('backup') ? "/backup" : "/pricing", 
      stats: user?.modules?.includes('backup') ? "Backup activo" : "Proteja seu negócio",
      problem: "Já perdeu dados importantes?",
      solution: "Backup automático e recuperação garantida"
    },
    {
      id: 'files',
      title: "📦 Gestão de Arquivos",
      description: "Sistema empresarial de documentos", 
      color: "cyan",
      status: user?.modules?.includes('files') ? "Ativo" : "Organize Documentos",
      active: user?.modules?.includes('files'),
      path: user?.modules?.includes('files') ? "/files" : "/pricing",
      stats: user?.modules?.includes('files') ? "128 arquivos" : "Aumente produtividade",
      problem: "Sua equipa perde tempo?",
      solution: "Centralização e pesquisa inteligente"
    }
  ], [user]);

  const activeModules = allModules.filter(module => module.active);
  const inactiveModules = allModules.filter(module => !module.active);

  const getColorClasses = (color, active) => {
    const baseColors = {
      orange: 'from-orange-50 to-orange-100 border-orange-200 dark:from-orange-900/20 dark:to-orange-800/20 dark:border-orange-700',
      blue: 'from-blue-50 to-blue-100 border-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 dark:border-blue-700',
      amber: 'from-amber-50 to-amber-100 border-amber-200 dark:from-amber-900/20 dark:to-amber-800/20 dark:border-amber-700',
      purple: 'from-purple-50 to-purple-100 border-purple-200 dark:from-purple-900/20 dark:to-purple-800/20 dark:border-purple-700',
      red: 'from-red-50 to-red-100 border-red-200 dark:from-red-900/20 dark:to-red-800/20 dark:border-red-700',
      green: 'from-green-50 to-green-100 border-green-200 dark:from-green-900/20 dark:to-green-800/20 dark:border-green-700',
      pink: 'from-pink-50 to-pink-100 border-pink-200 dark:from-pink-900/20 dark:to-pink-800/20 dark:border-pink-700',
      indigo: 'from-indigo-50 to-indigo-100 border-indigo-200 dark:from-indigo-900/20 dark:to-indigo-800/20 dark:border-indigo-700',
      cyan: 'from-cyan-50 to-cyan-100 border-cyan-200 dark:from-cyan-900/20 dark:to-cyan-800/20 dark:border-cyan-700'
    };
    
    const textColors = {
      orange: 'text-orange-800 dark:text-orange-200',
      blue: 'text-blue-800 dark:text-blue-200', 
      amber: 'text-amber-800 dark:text-amber-200',
      purple: 'text-purple-800 dark:text-purple-200',
      red: 'text-red-800 dark:text-red-200',
      green: 'text-green-800 dark:text-green-200',
      pink: 'text-pink-800 dark:text-pink-200',
      indigo: 'text-indigo-800 dark:text-indigo-200',
      cyan: 'text-cyan-800 dark:text-cyan-200'
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
              {activeModules.length > 0 
                ? `Você tem ${activeModules.length} módulo(s) activo(s)` 
                : 'Explore nossos módulos especializados'
              }
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/pricing"
              className="px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all duration-200 transform hover:scale-105"
            >
              {user?.plan === 'free' ? '🚀 Ver Todos os 9 Módulos' : '💎 Meu Plano'}
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            >
              Sair
            </button>
          </div>
        </div>

        {/* Banner de Upgrade */}
        {user?.plan === 'free' && (
          <div className="bg-gradient-to-r from-primary-500 to-blue-600 rounded-2xl p-6 text-white mb-8 shadow-lg">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">🚀 Desbloqueie Todos os 9 Módulos</h3>
                <p className="opacity-90">
                  Resolva problemas específicos do seu negócio com nossas soluções especializadas
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  to="/pricing"
                  className="bg-white/50 text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray/100 transition-colors duration-200 transform hover:scale-105"
                >
                  Ver Planos
                </Link>
                <Link
                  to="/pricing"
                  className="bg-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors duration-200"
                >
                  Saber Mais
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Módulos Activos */}
        {activeModules.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Seus Módulos Activos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {activeModules.map((module, index) => (
                <Link
                  key={index}
                  to={module.path}
                  className={`${getColorClasses(module.color, module.active)} rounded-2xl border p-6 block`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{module.title.split(' ')[0]}</span>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      module.active 
                        ? 'bg-white/80 text-gray-800' 
                        : 'bg-gray-500 text-white'
                    }`}>
                      {module.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{module.title}</h3>
                  <p className="text-sm opacity-75 mb-3">{module.description}</p>
                  <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 mb-3">
                    <p className="text-xs font-semibold mb-1">🎯 {module.solution}</p>
                  </div>
                  <p className="text-xs opacity-60">{module.stats}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Todos os Módulos Disponíveis */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {activeModules.length > 0 ? 'Mais Módulos Disponíveis' : 'Nossas Soluções Especializadas'}
            </h2>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {inactiveModules.length} de 9 módulos
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inactiveModules.map((module, index) => (
              <div
                key={index}
                className={`${getColorClasses(module.color, module.active)} rounded-2xl border p-6`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{module.title.split(' ')[0]}</span>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-500 text-white">
                    {module.status}
                  </span>
                </div>
                
                <h3 className="font-bold text-lg mb-2">{module.title}</h3>
                <p className="text-sm opacity-75 mb-3">{module.description}</p>
                
                {/* Problema & Solução */}
                <div className="space-y-2 mb-4">
                  <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-2">
                    <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                      ❌ {module.problem}
                    </p>
                  </div>
                  <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-2">
                    <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                      ✅ {module.solution}
                    </p>
                  </div>
                </div>

                <Link
                  to="/pricing"
                  className="block w-full bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white text-center py-2 rounded-lg font-semibold text-sm hover:bg-white dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Saber Mais
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Módulos Activos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{activeModules.length}/9</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-xl flex items-center justify-center">
                <span className="text-primary-600 dark:text-primary-400">📊</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Seu Plano</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white capitalize">{user?.plan}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400">💎</span>
              </div>
            </div>
          </div>
          
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
                <p className="text-gray-600 dark:text-gray-400 text-sm">Suporte</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user?.license?.support ? 'Activo' : 'Básico'}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400">🛡️</span>
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
              to="/pricing" 
              className="p-4 text-left rounded-xl border border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 group"
            >
              <div className="text-primary-600 dark:text-primary-400 font-semibold flex items-center">
                <span className="mr-2">🚀</span>
                Mais Módulos
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Ver todos os 9 módulos</div>
            </Link>
          </div>
        </div>
      </div>
    </Menu>
  );
}