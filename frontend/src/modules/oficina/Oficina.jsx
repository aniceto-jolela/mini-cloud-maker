import React, { useState } from 'react';
import Menu from '@/components/Menu';

// Dados de exemplo
const initialRepairs = [
  {
    id: 1,
    client: 'Maria Silva',
    vehicle: 'Toyota Corolla 2019',
    plate: 'LD-45-78-AA',
    problem: 'Problema no motor - sobreaquecimento',
    status: 'em_andamento',
    technician: 'João Mendes',
    startDate: '2024-01-15',
    estimatedEnd: '2024-01-18',
    cost: 85000,
    parts: [
      { name: 'Radiador', cost: 25000 },
      { name: 'Líquido refrigerante', cost: 5000 }
    ]
  },
  {
    id: 2,
    client: 'Carlos Santos',
    vehicle: 'Hyundai HB20 2020',
    plate: 'LD-23-45-BB',
    problem: 'Troca de pastilhas de travão',
    status: 'concluido',
    technician: 'Ana Pereira',
    startDate: '2024-01-10',
    endDate: '2024-01-12',
    cost: 35000,
    parts: [
      { name: 'Pastilhas dianteiras', cost: 15000 },
      { name: 'Pastilhas traseiras', cost: 12000 }
    ]
  }
];

const inventory = [
  { id: 1, name: 'Pastilhas de Travão Dianteiras', quantity: 12, minQuantity: 5, cost: 15000 },
  { id: 2, name: 'Filtro de Óleo', quantity: 25, minQuantity: 10, cost: 3500 },
  { id: 3, name: 'Líquido Refrigerante', quantity: 8, minQuantity: 5, cost: 5000 },
  { id: 4, name: 'Pneus 185/65R15', quantity: 4, minQuantity: 2, cost: 45000 }
];

export default function Oficina() {
  const [repairs, setRepairs] = useState(initialRepairs);
  const [activeTab, setActiveTab] = useState('reparos');
  const [showNewRepair, setShowNewRepair] = useState(false);
  const [newRepair, setNewRepair] = useState({
    client: '',
    vehicle: '',
    plate: '',
    problem: '',
    technician: ''
  });

  const stats = {
    totalRepairs: repairs.length,
    inProgress: repairs.filter(r => r.status === 'em_andamento').length,
    completed: repairs.filter(r => r.status === 'concluido').length,
    monthlyRevenue: repairs.reduce((sum, repair) => sum + repair.cost, 0)
  };

  const handleCreateRepair = (e) => {
    e.preventDefault();
    const repair = {
      id: repairs.length + 1,
      ...newRepair,
      status: 'em_andamento',
      startDate: new Date().toISOString().split('T')[0],
      estimatedEnd: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      cost: 0,
      parts: []
    };
    setRepairs([...repairs, repair]);
    setNewRepair({ client: '', vehicle: '', plate: '', problem: '', technician: '' });
    setShowNewRepair(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      em_andamento: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      concluido: 'bg-green-100 text-green-800 border-green-200',
      aguardando: 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return colors[status] || colors.aguardando;
  };

  const getStatusText = (status) => {
    const texts = {
      em_andamento: 'Em Andamento',
      concluido: 'Concluído',
      aguardando: 'Aguardando'
    };
    return texts[status] || status;
  };

  return (
    <Menu>
      <div className="max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                🧰 Oficina Inteligente
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Sistema completo de gestão para sua oficina mecânica
              </p>
            </div>
            <button
              onClick={() => setShowNewRepair(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 transform hover:scale-105"
            >
              + Novo Reparo
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Reparos Totais</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalRepairs}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                <span className="text-orange-600 dark:text-orange-400">🔧</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Em Andamento</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.inProgress}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl flex items-center justify-center">
                <span className="text-yellow-600 dark:text-yellow-400">⏳</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Concluídos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completed}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400">✅</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Receita Mensal</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.monthlyRevenue.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400">💰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          {[
            { id: 'reparos', name: 'Reparos Activos', icon: '🔧' },
            { id: 'inventario', name: 'Inventário', icon: '📦' },
            { id: 'clientes', name: 'Clientes', icon: '👥' },
            { id: 'relatorios', name: 'Relatórios', icon: '📊' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Conteúdo das Tabs */}
        {activeTab === 'reparos' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Reparos em Andamento
                </h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {repairs.filter(r => r.status === 'em_andamento').map((repair) => (
                  <div key={repair.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {repair.vehicle} - {repair.plate}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Cliente: {repair.client}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(repair.status)}`}>
                        {getStatusText(repair.status)}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">{repair.problem}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>Técnico: {repair.technician}</span>
                      <span>Previsão: {repair.estimatedEnd}</span>
                    </div>
                    {repair.parts.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Peças utilizadas:</p>
                        <div className="flex flex-wrap gap-2">
                          {repair.parts.map((part, index) => (
                            <span key={index} className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
                              {part.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Reparos Concluídos */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Histórico de Reparos
                </h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {repairs.filter(r => r.status === 'concluido').map((repair) => (
                  <div key={repair.id} className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {repair.vehicle} - {repair.plate}
                      </h4>
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        {repair.cost.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      Concluído em {repair.endDate} por {repair.technician}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inventario' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Gestão de Inventário
                </h3>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  + Adicionar Peça
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {inventory.map((item) => (
                <div key={item.id} className="p-6 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{item.name}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Custo: {item.cost.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      item.quantity <= item.minQuantity 
                        ? 'text-red-600 dark:text-red-400' 
                        : 'text-green-600 dark:text-green-400'
                    }`}>
                      {item.quantity} unidades
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Mín: {item.minQuantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Novo Reparo */}
        {showNewRepair && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Novo Reparo
                </h3>
                <button
                  onClick={() => setShowNewRepair(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <form onSubmit={handleCreateRepair} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Cliente
                  </label>
                  <input
                    type="text"
                    required
                    value={newRepair.client}
                    onChange={(e) => setNewRepair({...newRepair, client: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Nome do cliente"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Veículo
                  </label>
                  <input
                    type="text"
                    required
                    value={newRepair.vehicle}
                    onChange={(e) => setNewRepair({...newRepair, vehicle: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Modelo do veículo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Matrícula
                  </label>
                  <input
                    type="text"
                    required
                    value={newRepair.plate}
                    onChange={(e) => setNewRepair({...newRepair, plate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Matrícula do veículo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Problema
                  </label>
                  <textarea
                    required
                    value={newRepair.problem}
                    onChange={(e) => setNewRepair({...newRepair, problem: e.target.value})}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Descrição do problema"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Técnico Responsável
                  </label>
                  <input
                    type="text"
                    required
                    value={newRepair.technician}
                    onChange={(e) => setNewRepair({...newRepair, technician: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Nome do técnico"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowNewRepair(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Criar Reparo
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