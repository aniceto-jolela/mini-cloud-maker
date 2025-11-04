import React, { useState } from 'react';
import Menu from '@/components/Menu';

export default function Analytics() {
  const [activeTab, setActiveTab] = useState('visao-geral');
  const [dateRange, setDateRange] = useState('30d');

  const stats = {
    totalUsers: 1247,
    activeUsers: 892,
    newUsers: 156,
    avgSession: '12m 34s',
    bounceRate: '32%',
    modulesUsage: 2345
  };

  const modulesData = [
    { name: 'Oficina Inteligente', usage: 45, growth: 12 },
    { name: 'Gestão de Arquivos', usage: 38, growth: 8 },
    { name: 'Backup Automático', usage: 32, growth: 15 },
    { name: 'Estúdio de Mídia', usage: 28, growth: 5 },
    { name: 'Gestor de Obras', usage: 25, growth: 20 },
    { name: 'Controlo de Qualidade', usage: 18, growth: 25 }
  ];

  const activityData = [
    { time: '00:00', users: 45 },
    { time: '04:00', users: 32 },
    { time: '08:00', users: 156 },
    { time: '12:00', users: 234 },
    { time: '16:00', users: 189 },
    { time: '20:00', users: 98 }
  ];

  return (
    <Menu>
      <div className="max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              📊 Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Métricas e insights sobre o uso da plataforma
            </p>
          </div>
          <div className="flex gap-3 mt-4 lg:mt-0">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
              <option value="90d">Últimos 90 dias</option>
              <option value="1y">Último ano</option>
            </select>
            <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Exportar Relatório
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          {[
            { id: 'visao-geral', name: 'Visão Geral', icon: '📈' },
            { id: 'modulos', name: 'Uso por Módulo', icon: '🧩' },
            { id: 'usuarios', name: 'Comportamento', icon: '👥' },
            { id: 'performance', name: 'Performance', icon: '⚡' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total de Usuários</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">+12% vs período anterior</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400">👥</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Usuários Activos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeUsers}</p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">+8% vs período anterior</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400">🔥</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Novos Usuários</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.newUsers}</p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">+15% vs período anterior</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400">🆕</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Sessão Média</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgSession}</p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">+2m 15s vs período anterior</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                <span className="text-orange-600 dark:text-orange-400">⏱️</span>
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo das Tabs */}
        {activeTab === 'visao-geral' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico de Actividade */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Actividade por Hora do Dia
              </h3>
              <div className="h-64 flex items-end justify-between space-x-2">
                {activityData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full bg-primary-500 rounded-t-lg transition-all duration-300 hover:bg-primary-600"
                      style={{ height: `${(item.users / 250) * 100}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Módulos Mais Usados */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Módulos Mais Usados
              </h3>
              <div className="space-y-4">
                {modulesData.map((module, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-primary-500 rounded-full mr-3"></div>
                      <span className="font-medium text-gray-900 dark:text-white">{module.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full"
                          style={{ width: `${module.usage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
                        {module.usage}%
                      </span>
                      <span className="text-sm text-green-600 dark:text-green-400">
                        +{module.growth}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'modulos' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Distribuição de Uso por Módulo
              </h3>
              <div className="h-80 flex items-center justify-center">
                {/* Aqui iria um gráfico de pizza */}
                <div className="text-center">
                  <div className="w-48 h-48 bg-gradient-to-br from-primary-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    📊
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Gráfico de distribuição por módulo
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Crescimento por Módulo
              </h3>
              <div className="space-y-6">
                {modulesData.map((module, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">{module.name}</span>
                      <span className="text-sm text-green-600 dark:text-green-400">
                        +{module.growth}% crescimento
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${module.growth}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'usuarios' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Comportamento dos Usuários
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Taxa de Rejeição</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{stats.bounceRate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Páginas por Sessão</span>
                  <span className="font-semibold text-gray-900 dark:text-white">4.2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Usuários Recorrentes</span>
                  <span className="font-semibold text-gray-900 dark:text-white">68%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Taxa de Conversão</span>
                  <span className="font-semibold text-gray-900 dark:text-white">12.5%</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Dispositivos e Navegadores
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Desktop</span>
                    <span className="font-semibold text-gray-900 dark:text-white">62%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Mobile</span>
                    <span className="font-semibold text-gray-900 dark:text-white">35%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Tablet</span>
                    <span className="font-semibold text-gray-900 dark:text-white">3%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '3%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Performance da Plataforma
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Tempo de Carregamento</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">1.2s</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Disponibilidade</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">99.9%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.9%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Erros por Dia</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">0.2%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Métricas de Armazenamento
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Armazenamento Usado</span>
                    <span className="font-semibold text-gray-900 dark:text-white">5.2 GB / 10 GB</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '52%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Backups Realizados</span>
                    <span className="font-semibold text-gray-900 dark:text-white">1,247</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Uploads por Dia</span>
                    <span className="font-semibold text-gray-900 dark:text-white">234</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Menu>
  );
}