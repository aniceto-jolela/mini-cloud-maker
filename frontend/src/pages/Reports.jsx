import React, { useState } from 'react';
import Menu from '@/components/Menu';

export default function Reports() {
  const [activeTab, setActiveTab] = useState('gerados');
  const [dateRange, setDateRange] = useState('30d');

  const generatedReports = [
    {
      id: 1,
      name: 'Relatório Mensal - Janeiro 2024',
      type: 'mensal',
      modules: ['Todos os Módulos'],
      date: '2024-01-31',
      status: 'concluido',
      size: '2.4 MB',
      format: 'PDF'
    },
    {
      id: 2,
      name: 'Análise de Uso - Oficina Inteligente',
      type: 'modulo',
      modules: ['Oficina Inteligente'],
      date: '2024-01-28',
      status: 'concluido',
      size: '1.2 MB',
      format: 'Excel'
    },
    {
      id: 3,
      name: 'Relatório de Performance',
      type: 'performance',
      modules: ['Plataforma'],
      date: '2024-01-25',
      status: 'processando',
      size: '-',
      format: 'PDF'
    }
  ];

  const reportTemplates = [
    {
      id: 1,
      name: 'Relatório Mensal Completo',
      description: 'Visão geral de todos os módulos e métricas',
      frequency: 'mensal',
      modules: ['Todos'],
      lastGenerated: '2024-01-31'
    },
    {
      id: 2,
      name: 'Análise de Uso por Módulo',
      description: 'Métricas detalhadas de uso específico',
      frequency: 'personalizado',
      modules: ['Individual'],
      lastGenerated: '2024-01-28'
    },
    {
      id: 3,
      name: 'Relatório de Performance',
      description: 'Métricas técnicas e de performance',
      frequency: 'semanal',
      modules: ['Plataforma'],
      lastGenerated: '2024-01-25'
    }
  ];

  return (
    <Menu>
      <div className="max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              📋 Relatórios
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gerencie e visualize relatórios da plataforma
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
            </select>
            <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              + Novo Relatório
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          {[
            { id: 'gerados', name: 'Relatórios Gerados', icon: '📁' },
            { id: 'templates', name: 'Modelos', icon: '📋' },
            { id: 'agendados', name: 'Agendados', icon: '⏰' }
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

        {/* Conteúdo das Tabs */}
        {activeTab === 'gerados' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Relatórios Gerados
                </h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {generatedReports.map((report) => (
                  <div key={report.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {report.name}
                          </h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            report.status === 'concluido' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                          }`}>
                            {report.status === 'concluido' ? 'Concluído' : 'Processando'}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                            {report.type}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          Módulos: {report.modules.join(', ')} • Gerado em: {report.date}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <div>
                            <span className="font-medium">Formato:</span> {report.format}
                          </div>
                          <div>
                            <span className="font-medium">Tamanho:</span> {report.size}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      {report.status === 'concluido' && (
                        <>
                          <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            📥 Download
                          </button>
                          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            👁️ Visualizar
                          </button>
                        </>
                      )}
                      <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        🔄 Regenerar
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        🗑️ Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportTemplates.map((template) => (
              <div key={template.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-2xl">📋</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded text-xs font-medium">
                    {template.frequency}
                  </span>
                </div>
                
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {template.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {template.description}
                </p>
                
                <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex justify-between">
                    <span>Módulos:</span>
                    <span>{template.modules.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Última geração:</span>
                    <span>{template.lastGenerated}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                    Gerar Agora
                  </button>
                  <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    ⚙️
                  </button>
                </div>
              </div>
            ))}
            
            {/* Template para Novo Relatório Personalizado */}
            <div className="bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-2xl border-2 border-dashed border-primary-300 dark:border-primary-700 p-6 flex flex-col items-center justify-center text-center">
              <div className="text-3xl text-primary-600 dark:text-primary-400 mb-3">+</div>
              <h3 className="font-semibold text-primary-700 dark:text-primary-300 mb-2">
                Novo Modelo
              </h3>
              <p className="text-primary-600 dark:text-primary-400 text-sm mb-4">
                Crie um modelo de relatório personalizado
              </p>
              <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Criar Modelo
              </button>
            </div>
          </div>
        )}

        {activeTab === 'agendados' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Relatórios Agendados
              </h3>
              
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    name: 'Relatório Semanal - Performance',
                    frequency: 'semanal',
                    nextRun: '2024-02-05 00:00',
                    recipients: ['admin@empresa.com'],
                    status: 'activo'
                  },
                  {
                    id: 2,
                    name: 'Relatório Mensal Completo',
                    frequency: 'mensal',
                    nextRun: '2024-02-01 00:00',
                    recipients: ['gestor@empresa.com', 'admin@empresa.com'],
                    status: 'activo'
                  },
                  {
                    id: 3,
                    name: 'Backup Diário - Logs',
                    frequency: 'diario',
                    nextRun: '2024-01-31 23:00',
                    recipients: ['sistema@empresa.com'],
                    status: 'pausado'
                  }
                ].map((schedule) => (
                  <div key={schedule.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {schedule.name}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          schedule.status === 'activo'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
                        }`}>
                          {schedule.status === 'activo' ? 'Activo' : 'Pausado'}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded text-xs">
                          {schedule.frequency}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <div>
                        <span className="font-medium">Próxima execução:</span> {schedule.nextRun}
                      </div>
                      <div>
                        <span className="font-medium">Destinatários:</span> {schedule.recipients.join(', ')}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="bg-primary-500 hover:bg-primary-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                        Executar Agora
                      </button>
                      <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                        {schedule.status === 'activo' ? 'Pausar' : 'Activar'}
                      </button>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                        Editar
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-6 border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 py-4 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                + Agendar Novo Relatório
              </button>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Relatórios Rápidos</h3>
              <span className="text-2xl">🚀</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Gere relatórios instantâneos com um clique
            </p>
            <button className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-lg font-medium transition-colors">
              Gerar Relatório Rápido
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Exportar Dados</h3>
              <span className="text-2xl">📤</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Exporte dados brutos para análise externa
            </p>
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition-colors">
              Exportar Dados
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Configurações</h3>
              <span className="text-2xl">⚙️</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Configure preferências de relatórios
            </p>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-colors">
              Configurar
            </button>
          </div>
        </div>
      </div>
    </Menu>
  );
}