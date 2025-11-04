import React, { useState } from 'react';
import Menu from '@/components/Menu';

export default function Feedback() {
  const [activeTab, setActiveTab] = useState('sugestao');
  const [formData, setFormData] = useState({
    type: 'sugestao',
    title: '',
    description: '',
    module: '',
    priority: 'medio',
    contact: false,
    email: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar feedback
    console.log('Feedback enviado:', formData);
    alert('Obrigado pelo seu feedback! Vamos analisar sua sugestão.');
    setFormData({
      type: 'sugestao',
      title: '',
      description: '',
      module: '',
      priority: 'medio',
      contact: false,
      email: ''
    });
  };

  const feedbackTypes = [
    {
      id: 'sugestao',
      name: '💡 Sugestão',
      description: 'Tem uma ideia para melhorar a plataforma?'
    },
    {
      id: 'problema',
      name: '🐛 Reportar Problema',
      description: 'Encontrou um bug ou algo que não funciona?'
    },
    {
      id: 'melhoria',
      name: '🚀 Melhoria Existente',
      description: 'Como podemos melhorar um recurso actual?'
    },
    {
      id: 'outro',
      name: '📝 Outro',
      description: 'Outro tipo de feedback ou comentário'
    }
  ];

  const modules = [
    'Oficina Inteligente',
    'Testador de Webhooks',
    'Gestor de Obras',
    'Inspector Escolar',
    'Sistema de Vistoria',
    'Controlo de Qualidade',
    'Estúdio de Mídia',
    'Backup Automático',
    'Gestão de Arquivos',
    'Plataforma Geral'
  ];

  return (
    <Menu>
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            💬 Enviar Feedback
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sua opinião é importante para melhorarmos a plataforma
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Tipo de Feedback
              </h3>
              <nav className="space-y-2">
                {feedbackTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setActiveTab(type.id)}
                    className={`w-full text-left flex items-start p-3 rounded-lg transition-colors ${
                      activeTab === type.id
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-sm">{type.name}</div>
                      <div className="text-xs opacity-75 mt-1">{type.description}</div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center mb-6">
                <span className="text-2xl mr-3">
                  {feedbackTypes.find(t => t.id === activeTab)?.name.split(' ')[0]}
                </span>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {feedbackTypes.find(t => t.id === activeTab)?.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feedbackTypes.find(t => t.id === activeTab)?.description}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Módulo Relacionado
                    </label>
                    <select
                      value={formData.module}
                      onChange={(e) => setFormData({ ...formData, module: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Selecionar módulo...</option>
                      {modules.map((module, index) => (
                        <option key={index} value={module}>{module}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Prioridade
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="baixo">Baixa</option>
                      <option value="medio">Média</option>
                      <option value="alto">Alta</option>
                      <option value="critico">Crítica</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Título
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Descreva brevemente seu feedback..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Descrição Detalhada
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="6"
                    placeholder={`${
                      activeTab === 'sugestao' ? 'Descreva sua sugestão em detalhes. O que você gostaria de ver implementado?' :
                      activeTab === 'problema' ? 'Descreva o problema encontrado. Passos para reproduzir, o que esperava que acontecesse e o que realmente aconteceu.' :
                      activeTab === 'melhoria' ? 'Qual recurso você gostaria de melhorar e como?' :
                      'Compartilhe seu feedback ou comentário...'
                    }`}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                {activeTab === 'problema' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Passos para Reproduzir
                    </label>
                    <textarea
                      placeholder="1. Passo um...
2. Passo dois...
3. Passo três..."
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                )}

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      checked={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.checked })}
                      className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Posso entrar em contacto com você para mais detalhes?
                    </label>
                  </div>

                  {formData.contact && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email para Contacto
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="seu@email.com"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        type: 'sugestao',
                        title: '',
                        description: '',
                        module: '',
                        priority: 'medio',
                        contact: false,
                        email: ''
                      });
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Limpar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Enviar Feedback
                  </button>
                </div>
              </form>
            </div>

            {/* Informações Adicionais */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center mb-3">
                  <span className="text-2xl text-blue-600 dark:text-blue-400 mr-3">💡</span>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-300">Dicas para um Bom Feedback</h3>
                </div>
                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
                  <li>• Seja específico e detalhado</li>
                  <li>• Inclua exemplos quando possível</li>
                  <li>• Descreva o contexto de uso</li>
                  <li>• Mantenha um tom construtivo</li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                <div className="flex items-center mb-3">
                  <span className="text-2xl text-green-600 dark:text-green-400 mr-3">⏱️</span>
                  <h3 className="font-semibold text-green-900 dark:text-green-300">O que Esperar</h3>
                </div>
                <ul className="space-y-2 text-sm text-green-800 dark:text-green-400">
                  <li>• Resposta em até 48 horas</li>
                  <li>• Actualizações sobre o status</li>
                  <li>• Agradecimento pela contribuição</li>
                  <li>• Possível implementação futura</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Menu>
  );
}