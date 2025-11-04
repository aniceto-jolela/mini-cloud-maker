import React, { useState } from 'react';
import Menu from '@/components/Menu';

export default function Privacy() {
  const [activeTab, setActiveTab] = useState('dados');

  return (
    <Menu>
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🔒 Privacidade & Dados
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Controle como seus dados são coletados, usados e compartilhados
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
              <nav className="space-y-2">
                {[
                  { id: 'dados', name: 'Seus Dados', icon: '📊' },
                  { id: 'permissoes', name: 'Permissões', icon: '🔐' },
                  { id: 'exportar', name: 'Exportar Dados', icon: '📤' },
                  { id: 'excluir', name: 'Excluir Conta', icon: '🗑️' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'dados' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  📊 Seus Dados
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Coleta de Dados
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          title: 'Dados Pessoais',
                          description: 'Nome, email, telefone e informações de perfil',
                          purpose: 'Para personalizar sua experiência e fornecer suporte'
                        },
                        {
                          title: 'Dados de Uso',
                          description: 'Como você interage com a plataforma',
                          purpose: 'Para melhorar nossos serviços e funcionalidades'
                        },
                        {
                          title: 'Dados de Módulos',
                          description: 'Informações específicas de cada módulo activo',
                          purpose: 'Para fornecer os serviços contratados'
                        }
                      ].map((item, index) => (
                        <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-gray-900 dark:text-white">{item.title}</h4>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                            </label>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.description}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            <strong>Finalidade:</strong> {item.purpose}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Compartilhamento de Dados
                    </h3>
                    <div className="space-y-3">
                      {[
                        {
                          partner: 'Provedores de Serviço',
                          data: 'Dados anonimizados para análise',
                          purpose: 'Melhoria da plataforma'
                        },
                        {
                          partner: 'Parceiros de Pagamento',
                          data: 'Informações de facturação',
                          purpose: 'Processamento de pagamentos'
                        },
                        {
                          partner: 'Autoridades Legais',
                          data: 'Quando exigido por lei',
                          purpose: 'Cumprimento legal'
                        }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{item.partner}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{item.data}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-600 dark:text-gray-400">{item.purpose}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'permissoes' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  🔐 Permissões
                </h2>
                
                <div className="space-y-6">
                  {[
                    {
                      title: 'Cookies e Rastreamento',
                      description: 'Permitir que usemos cookies para melhorar sua experiência',
                      enabled: true
                    },
                    {
                      title: 'Análise de Uso',
                      description: 'Compartilhar dados anonimizados para análise',
                      enabled: true
                    },
                    {
                      title: 'Email Marketing',
                      description: 'Receber emails sobre novos recursos e ofertas',
                      enabled: false
                    },
                    {
                      title: 'Notificações Push',
                      description: 'Receber notificações no navegador',
                      enabled: true
                    },
                    {
                      title: 'Localização',
                      description: 'Usar sua localização para serviços relevantes',
                      enabled: false
                    }
                  ].map((permission, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {permission.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {permission.description}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={permission.enabled} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'exportar' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  📤 Exportar Dados
                </h2>
                
                <div className="space-y-6">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Solicitar Exportação de Dados
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Você pode solicitar uma cópia de todos os dados que temos sobre você. 
                      O arquivo será preparado e enviado para seu email em até 48 horas.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Formato do Arquivo
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                          <option value="json">JSON (Recomendado)</option>
                          <option value="csv">CSV</option>
                          <option value="xml">XML</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Incluir
                        </label>
                        <div className="space-y-2">
                          {[
                            'Dados de perfil',
                            'Histórico de actividade',
                            'Configurações da conta',
                            'Dados dos módulos activos',
                            'Arquivos enviados'
                          ].map((item, index) => (
                            <label key={index} className="flex items-center">
                              <input type="checkbox" defaultChecked className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500" />
                              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{item}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <button className="w-full mt-6 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors">
                      Solicitar Exportação
                    </button>
                  </div>

                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Exportações Anteriores
                    </h3>
                    <div className="space-y-3">
                      {[
                        { date: '15 Jan 2024', format: 'JSON', status: 'Concluído', size: '2.4 MB' },
                        { date: '20 Dez 2023', format: 'CSV', status: 'Concluído', size: '1.8 MB' }
                      ].map((exportItem, index) => (
                        <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              Exportação de {exportItem.date}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {exportItem.format} • {exportItem.size}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              exportItem.status === 'Concluído' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                            }`}>
                              {exportItem.status}
                            </span>
                            <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm">
                              Baixar
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'excluir' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  🗑️ Excluir Conta
                </h2>
                
                <div className="border border-red-200 dark:border-red-800 rounded-xl p-6 bg-red-50 dark:bg-red-900/20">
                  <div className="flex items-start mb-4">
                    <span className="text-2xl text-red-600 dark:text-red-400 mr-3">⚠️</span>
                    <div>
                      <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">
                        Atenção: Esta ação é irreversível
                      </h3>
                      <p className="text-red-700 dark:text-red-400">
                        Ao excluir sua conta, todos os seus dados serão permanentemente removidos, incluindo:
                      </p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 text-red-700 dark:text-red-400 mb-6">
                    <li>• Seu perfil e informações pessoais</li>
                    <li>• Todos os dados dos módulos activos</li>
                    <li>• Arquivos e documentos armazenados</li>
                    <li>• Histórico de actividade e configurações</li>
                    <li>• Assinaturas e informações de pagamento</li>
                  </ul>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-red-700 dark:text-red-300 mb-2">
                        Por favor, digite seu email para confirmar
                      </label>
                      <input
                        type="email"
                        placeholder="seu@email.com"
                        className="w-full px-3 py-2 border border-red-300 dark:border-red-700 rounded-lg bg-white dark:bg-gray-700 text-red-900 dark:text-red-100 placeholder-red-400"
                      />
                    </div>
                    
                    <label className="flex items-start">
                      <input type="checkbox" className="w-4 h-4 text-red-600 rounded focus:ring-red-500 mt-1" />
                      <span className="ml-2 text-sm text-red-700 dark:text-red-300">
                        Eu compreendo que esta ação é irreversível e que todos os meus dados serão permanentemente excluídos.
                      </span>
                    </label>
                    
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                      Excluir Minha Conta Permanentemente
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Menu>
  );
}