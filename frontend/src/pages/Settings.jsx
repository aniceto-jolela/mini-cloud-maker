import React, { useState } from 'react';
import Menu from '@/components/Menu';
import { useAuth } from '@/hooks/useAuth';

export default function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('geral');

  const settingsSections = [
    {
      id: 'geral',
      name: 'Configurações Gerais',
      icon: '⚙️',
      description: 'Preferências básicas da plataforma'
    },
    {
      id: 'conta',
      name: 'Conta & Facturação',
      icon: '💳',
      description: 'Gerencie sua assinatura e pagamentos'
    },
    {
      id: 'privacidade',
      name: 'Privacidade & Dados',
      icon: '🔒',
      description: 'Controle seus dados e privacidade'
    },
    {
      id: 'modulos',
      name: 'Módulos & Recursos',
      icon: '🧩',
      description: 'Configure seus módulos activos'
    },
    {
      id: 'api',
      name: 'API & Integrações',
      icon: '🔌',
      description: 'Configurações de desenvolvedor'
    }
  ];

  return (
    <Menu>
      <div className="max-w-6xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            ⚙️ Configurações
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Personalize a plataforma de acordo com suas necessidades
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
              <nav className="space-y-2">
                {settingsSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={`w-full text-left flex items-center p-3 rounded-lg transition-colors ${
                      activeTab === section.id
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <span className="text-lg mr-3">{section.icon}</span>
                    <div>
                      <div className="font-medium text-sm">{section.name}</div>
                      <div className="text-xs opacity-75">{section.description}</div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'geral' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    ⚙️ Configurações Gerais
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Aparência</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button className="p-4 border-2 border-primary-500 rounded-xl text-center">
                          <div className="w-full h-20 bg-white border rounded-lg mb-2"></div>
                          <span className="font-medium">Claro</span>
                        </button>
                        <button className="p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-center">
                          <div className="w-full h-20 bg-gray-800 border rounded-lg mb-2"></div>
                          <span className="font-medium">Escuro</span>
                        </button>
                        <button className="p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-center">
                          <div className="w-full h-20 bg-gradient-to-r from-white to-gray-800 border rounded-lg mb-2"></div>
                          <span className="font-medium">Automático</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Idioma
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                          <option value="pt">Português</option>
                          <option value="en">English</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Fuso Horário
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                          <option value="Africa/Luanda">Luanda (WAT)</option>
                          <option value="UTC">UTC</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Formato de Data</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-center">
                          <span className="font-medium">DD/MM/AAAA</span>
                        </button>
                        <button className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-center">
                          <span className="font-medium">MM/DD/AAAA</span>
                        </button>
                        <button className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-center">
                          <span className="font-medium">AAAA-MM-DD</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'conta' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    💳 Conta & Facturação
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Plano Actual */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Plano Actual
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {user?.plan === 'premium' ? 'Premium' : 'Free'}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          user?.plan === 'premium' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
                        }`}>
                          {user?.plan === 'premium' ? 'Premium' : 'Free'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Módulos:</span>
                          <span className="ml-2 font-medium">{user?.modules?.length || 1}/9</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Armazenamento:</span>
                          <span className="ml-2 font-medium">5.2 GB</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Suporte:</span>
                          <span className="ml-2 font-medium">{user?.plan === 'premium' ? 'Prioritário' : 'Básico'}</span>
                        </div>
                      </div>
                      
                      <button className="w-full mt-4 bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-lg font-medium transition-colors">
                        {user?.plan === 'premium' ? 'Gerir Assinatura' : 'Upgrade para Premium'}
                      </button>
                    </div>

                    {/* Método de Pagamento */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Método de Pagamento
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-6 bg-blue-500 rounded mr-3"></div>
                          <div>
                            <div className="font-medium">Cartão Visa</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              •••• 4242 - Expira 12/2025
                            </div>
                          </div>
                        </div>
                        <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
                          Alterar
                        </button>
                      </div>
                    </div>

                    {/* Histórico de Facturação */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Histórico de Facturação
                      </h3>
                      <div className="space-y-3">
                        {[
                          { date: '15 Jan 2024', description: 'Assinatura Premium', amount: '49.900 Kz', status: 'Paga' },
                          { date: '15 Dez 2023', description: 'Assinatura Premium', amount: '49.900 Kz', status: 'Paga' },
                          { date: '15 Nov 2023', description: 'Assinatura Premium', amount: '49.900 Kz', status: 'Paga' }
                        ].map((invoice, index) => (
                          <div key={index} className="flex items-center justify-between py-2">
                            <div>
                              <div className="font-medium">{invoice.description}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">{invoice.date}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">{invoice.amount}</div>
                              <div className="text-sm text-green-600 dark:text-green-400">{invoice.status}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="w-full mt-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        Ver Histórico Completo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacidade' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  🔒 Privacidade & Dados
                </h2>
                {/* Conteúdo será adicionado no próximo componente */}
                <p className="text-gray-600 dark:text-gray-400">
                  As configurações de privacidade estão disponíveis na página dedicada de Privacidade.
                </p>
              </div>
            )}

            {activeTab === 'modulos' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  🧩 Módulos & Recursos
                </h2>
                <div className="space-y-4">
                  {user?.modules?.map((module, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-2xl mr-4">🔧</span>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{module}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Activo • Última actualização: Hoje</div>
                        </div>
                      </div>
                      <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Configurar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  🔌 API & Integrações
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Chave da API</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg font-mono text-sm">
                        sk_live_••••••••••••••••••••••••
                      </div>
                      <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Copiar
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Regenerar
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Webhooks</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div>
                          <div className="font-medium">Webhook de Notificações</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">https://api.exemplo.com/webhooks</div>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                            Editar
                          </button>
                          <button className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                            Remover
                          </button>
                        </div>
                      </div>
                    </div>
                    <button className="w-full mt-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      + Adicionar Webhook
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