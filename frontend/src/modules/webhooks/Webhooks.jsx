import React, { useState, useEffect } from 'react';
import Menu from '@/components/Menu';

const initialEndpoints = [
  {
    id: 1,
    name: 'Webhook Stripe Payments',
    url: 'https://api.stripe.com/v1/webhooks',
    method: 'POST',
    status: 'active',
    lastTest: '2024-01-15 14:30',
    successRate: 98,
    totalTests: 45
  },
  {
    id: 2,
    name: 'Webhook GitHub Push',
    url: 'https://api.github.com/webhooks',
    method: 'POST', 
    status: 'active',
    lastTest: '2024-01-15 10:15',
    successRate: 100,
    totalTests: 23
  }
];

const testHistory = [
  {
    id: 1,
    endpoint: 'Stripe Payments',
    timestamp: '2024-01-15 14:30:25',
    status: 'success',
    responseTime: '245ms',
    statusCode: 200,
    payload: { "type": "payment_intent.succeeded", "data": { "object": { "id": "pi_123" } } }
  },
  {
    id: 2,
    endpoint: 'GitHub Push',
    timestamp: '2024-01-15 10:15:10', 
    status: 'success',
    responseTime: '189ms',
    statusCode: 202,
    payload: { "ref": "refs/heads/main", "commits": [] }
  }
];

export default function Webhooks() {
  const [endpoints, setEndpoints] = useState(initialEndpoints);
  const [activeTab, setActiveTab] = useState('endpoints');
  const [showCreateEndpoint, setShowCreateEndpoint] = useState(false);
  const [testingEndpoint, setTestingEndpoint] = useState(null);
  const [testResults, setTestResults] = useState([]);
  const [newEndpoint, setNewEndpoint] = useState({
    name: '',
    url: '',
    method: 'POST',
    headers: '',
    body: ''
  });

  const stats = {
    totalEndpoints: endpoints.length,
    activeEndpoints: endpoints.filter(e => e.status === 'active').length,
    totalTests: endpoints.reduce((sum, endpoint) => sum + endpoint.totalTests, 0),
    avgSuccessRate: endpoints.reduce((sum, endpoint) => sum + endpoint.successRate, 0) / endpoints.length
  };

  const handleTestEndpoint = async (endpoint) => {
    setTestingEndpoint(endpoint.id);
    
    // Simular teste de webhook
    setTimeout(() => {
      const result = {
        id: Date.now(),
        endpoint: endpoint.name,
        timestamp: new Date().toISOString(),
        status: Math.random() > 0.1 ? 'success' : 'error',
        responseTime: `${Math.floor(Math.random() * 500) + 100}ms`,
        statusCode: Math.random() > 0.1 ? 200 : 400,
        payload: newEndpoint.body || '{}'
      };
      
      setTestResults([result, ...testResults]);
      setTestingEndpoint(null);
      
      // Actualizar estatísticas do endpoint
      setEndpoints(endpoints.map(e => 
        e.id === endpoint.id 
          ? { 
              ...e, 
              lastTest: new Date().toLocaleString(),
              totalTests: e.totalTests + 1,
              successRate: result.status === 'success' ? 
                Math.min(100, e.successRate + 1) : Math.max(0, e.successRate - 5)
            }
          : e
      ));
    }, 2000);
  };

  const handleCreateEndpoint = (e) => {
    e.preventDefault();
    const endpoint = {
      id: endpoints.length + 1,
      ...newEndpoint,
      status: 'active',
      lastTest: 'Nunca',
      successRate: 0,
      totalTests: 0
    };
    setEndpoints([...endpoints, endpoint]);
    setNewEndpoint({ name: '', url: '', method: 'POST', headers: '', body: '' });
    setShowCreateEndpoint(false);
  };

  const getStatusColor = (status) => {
    return status === 'success' 
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <Menu>
      <div className="max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                🔄 Testador de Webhooks
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Ferramenta essencial para desenvolvedores - Teste webhooks em minutos
              </p>
            </div>
            <button
              onClick={() => setShowCreateEndpoint(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 transform hover:scale-105"
            >
              + Novo Endpoint
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Endpoints</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalEndpoints}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400">🔗</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Activos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeEndpoints}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400">✅</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total de Testes</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalTests}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400">📊</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Taxa de Sucesso</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.avgSuccessRate ? stats.avgSuccessRate.toFixed(1) : 0}%
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl flex items-center justify-center">
                <span className="text-yellow-600 dark:text-yellow-400">🎯</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          {[
            { id: 'endpoints', name: 'Endpoints', icon: '🔗' },
            { id: 'testes', name: 'Histórico de Testes', icon: '📋' },
            { id: 'tunels', name: 'Túneis Ngrok', icon: '🚇' },
            { id: 'config', name: 'Configurações', icon: '⚙️' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Conteúdo das Tabs */}
        {activeTab === 'endpoints' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Meus Endpoints
                </h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {endpoints.map((endpoint) => (
                  <div key={endpoint.id} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {endpoint.name}
                          </h4>
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded text-xs font-medium">
                            {endpoint.status}
                          </span>
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded text-xs">
                            {endpoint.method}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm font-mono mb-2">
                          {endpoint.url}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span>Último teste: {endpoint.lastTest}</span>
                          <span>Taxa de sucesso: {endpoint.successRate}%</span>
                          <span>Total de testes: {endpoint.totalTests}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleTestEndpoint(endpoint)}
                          disabled={testingEndpoint === endpoint.id}
                          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          {testingEndpoint === endpoint.id ? 'Testando...' : 'Testar Agora'}
                        </button>
                        <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          Editar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Ngrok */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Status do Túnel Ngrok
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div>
                    <p className="text-green-700 dark:text-green-300 font-medium">Túnel Principal</p>
                    <p className="text-green-600 dark:text-green-400 text-sm">https://abc123.ngrok.io</p>
                  </div>
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">Online</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div>
                    <p className="text-blue-700 dark:text-blue-300 font-medium">Sessão Activa</p>
                    <p className="text-blue-600 dark:text-blue-400 text-sm">2 horas restantes</p>
                  </div>
                  <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">Activa</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'testes' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Histórico de Testes
              </h3>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {testResults.map((test) => (
                <div key={test.id} className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {test.endpoint}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {test.timestamp}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(test.status)}`}>
                        {test.status === 'success' ? 'Sucesso' : 'Erro'}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        {test.responseTime}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        HTTP {test.statusCode}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <pre className="text-xs text-gray-700 dark:text-gray-300 overflow-x-auto">
                      {JSON.stringify(JSON.parse(test.payload), null, 2)}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Criar Endpoint */}
        {showCreateEndpoint && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Novo Endpoint de Webhook
                </h3>
                <button
                  onClick={() => setShowCreateEndpoint(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <form onSubmit={handleCreateEndpoint} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nome do Endpoint
                    </label>
                    <input
                      type="text"
                      required
                      value={newEndpoint.name}
                      onChange={(e) => setNewEndpoint({...newEndpoint, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Ex: Webhook Stripe Payments"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Método HTTP
                    </label>
                    <select
                      value={newEndpoint.method}
                      onChange={(e) => setNewEndpoint({...newEndpoint, method: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="POST">POST</option>
                      <option value="GET">GET</option>
                      <option value="PUT">PUT</option>
                      <option value="DELETE">DELETE</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    URL do Webhook
                  </label>
                  <input
                    type="url"
                    required
                    value={newEndpoint.url}
                    onChange={(e) => setNewEndpoint({...newEndpoint, url: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="https://api.example.com/webhooks"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Cabeçalhos (JSON)
                  </label>
                  <textarea
                    value={newEndpoint.headers}
                    onChange={(e) => setNewEndpoint({...newEndpoint, headers: e.target.value})}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                    placeholder='{"Content-Type": "application/json", "Authorization": "Bearer token"}'
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Corpo da Requisição (JSON)
                  </label>
                  <textarea
                    value={newEndpoint.body}
                    onChange={(e) => setNewEndpoint({...newEndpoint, body: e.target.value})}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                    placeholder='{"event": "payment.succeeded", "data": {}}'
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateEndpoint(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Criar Endpoint
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Menu>
  );
}