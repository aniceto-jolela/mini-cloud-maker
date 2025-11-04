import React, { useState } from 'react';
import Menu from '@/components/Menu';

const initialInspections = [
  {
    id: 1,
    vehicle: 'Toyota Hilux',
    plate: 'LD-45-78-AA',
    owner: 'João Silva',
    type: 'seguro',
    status: 'concluido',
    date: '2024-01-20',
    inspector: 'Carlos Mendes',
    photos: 12,
    damages: 3,
    totalValue: 250000
  },
  {
    id: 2,
    vehicle: 'Mercedes C200',
    plate: 'LD-23-45-BB', 
    owner: 'Maria Santos',
    type: 'rental',
    status: 'pendente',
    date: '2024-01-22',
    inspector: 'Ana Pereira',
    photos: 8,
    damages: 1,
    totalValue: 150000
  }
];

const damageReports = [
  {
    id: 1,
    inspectionId: 1,
    part: 'Para-choque dianteiro',
    severity: 'medio',
    description: 'Arranhão profundo no lado direito',
    estimatedCost: 75000,
    photos: ['photo1.jpg', 'photo2.jpg'],
    notes: 'Necessário pintura completa'
  },
  {
    id: 2,
    inspectionId: 1,
    part: 'Porta traseira esquerda',
    severity: 'leve',
    description: 'Amassado pequeno',
    estimatedCost: 45000,
    photos: ['photo3.jpg'],
    notes: 'Pode ser reparado com martelinho de ouro'
  }
];

export default function Vistoria() {
  const [inspections, setInspections] = useState(initialInspections);
  const [activeTab, setActiveTab] = useState('vistorias');
  const [showNewInspection, setShowNewInspection] = useState(false);
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [newInspection, setNewInspection] = useState({
    vehicle: '',
    plate: '',
    owner: '',
    type: 'seguro',
    date: '',
    inspector: ''
  });

  const stats = {
    totalInspections: inspections.length,
    pending: inspections.filter(i => i.status === 'pendente').length,
    completed: inspections.filter(i => i.status === 'concluido').length,
    totalValue: inspections.reduce((sum, inspection) => sum + inspection.totalValue, 0)
  };

  const handleCreateInspection = (e) => {
    e.preventDefault();
    const inspection = {
      id: inspections.length + 1,
      ...newInspection,
      status: 'pendente',
      photos: 0,
      damages: 0,
      totalValue: 0
    };
    setInspections([...inspections, inspection]);
    setNewInspection({ vehicle: '', plate: '', owner: '', type: 'seguro', date: '', inspector: '' });
    setShowNewInspection(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      concluido: 'bg-green-100 text-green-800 border-green-200',
      pendente: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      cancelado: 'bg-red-100 text-red-800 border-red-200',
      em_andamento: 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return colors[status] || colors.pendente;
  };

  const getStatusText = (status) => {
    const texts = {
      concluido: 'Concluído',
      pendente: 'Pendente',
      cancelado: 'Cancelado',
      em_andamento: 'Em Andamento'
    };
    return texts[status] || status;
  };

  const getTypeText = (type) => {
    const texts = {
      seguro: 'Seguro',
      rental: 'Rent-a-Car',
      leasing: 'Leasing',
      particular: 'Particular'
    };
    return texts[type] || type;
  };

  const getSeverityColor = (severity) => {
    const colors = {
      leve: 'bg-green-100 text-green-800',
      medio: 'bg-yellow-100 text-yellow-800',
      grave: 'bg-red-100 text-red-800',
      critico: 'bg-purple-100 text-purple-800'
    };
    return colors[severity] || colors.leve;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Menu>
      <div className="max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                🚗 Sistema de Vistoria
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Solução completa para vistorias veiculares de seguradoras e rent-a-car
              </p>
            </div>
            <button
              onClick={() => setShowNewInspection(true)}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 transform hover:scale-105"
            >
              + Nova Vistoria
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Vistorias</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalInspections}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center">
                <span className="text-red-600 dark:text-red-400">🚗</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Pendentes</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl flex items-center justify-center">
                <span className="text-yellow-600 dark:text-yellow-400">⏳</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Concluídas</p>
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
                <p className="text-gray-600 dark:text-gray-400 text-sm">Valor Total</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(stats.totalValue)}
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
            { id: 'vistorias', name: 'Vistorias', icon: '📋' },
            { id: 'danos', name: 'Registo de Danos', icon: '🚨' },
            { id: 'relatorios', name: 'Relatórios', icon: '📊' },
            { id: 'fotos', name: 'Galeria', icon: '📸' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-red-500 text-red-600 dark:text-red-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Conteúdo das Tabs */}
        {activeTab === 'vistorias' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Vistorias Agendadas
                </h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {inspections.map((inspection) => (
                  <div key={inspection.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                       onClick={() => setSelectedInspection(inspection)}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {inspection.vehicle} - {inspection.plate}
                          </h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(inspection.status)}`}>
                            {getStatusText(inspection.status)}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                            {getTypeText(inspection.type)}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          Proprietário: {inspection.owner} • Vistoriador: {inspection.inspector}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <div>
                            <span className="font-medium">Data:</span> {inspection.date}
                          </div>
                          <div>
                            <span className="font-medium">Fotos:</span> {inspection.photos}
                          </div>
                          <div>
                            <span className="font-medium">Danos:</span> {inspection.damages}
                          </div>
                          <div>
                            <span className="font-medium">Valor:</span> {formatCurrency(inspection.totalValue)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'danos' && selectedInspection && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Danos Registados: {selectedInspection.vehicle}
                </h3>
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  + Novo Registo
                </button>
              </div>
              
              <div className="space-y-4">
                {damageReports.filter(damage => damage.inspectionId === selectedInspection.id).map((damage) => (
                  <div key={damage.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{damage.part}</h4>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(damage.severity)}`}>
                          {damage.severity === 'leve' ? 'Leve' :
                           damage.severity === 'medio' ? 'Médio' :
                           damage.severity === 'grave' ? 'Grave' : 'Crítico'}
                        </span>
                        <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                          {formatCurrency(damage.estimatedCost)}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {damage.description}
                    </p>
                    
                    {damage.notes && (
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 mb-3">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                          <strong>Notas:</strong> {damage.notes}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>📸 {damage.photos.length} foto(s)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal Nova Vistoria */}
        {showNewInspection && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Nova Vistoria Veicular
                </h3>
                <button
                  onClick={() => setShowNewInspection(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <form onSubmit={handleCreateInspection} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Veículo
                    </label>
                    <input
                      type="text"
                      required
                      value={newInspection.vehicle}
                      onChange={(e) => setNewInspection({...newInspection, vehicle: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Ex: Toyota Hilux"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Matrícula
                    </label>
                    <input
                      type="text"
                      required
                      value={newInspection.plate}
                      onChange={(e) => setNewInspection({...newInspection, plate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="LD-00-00-AA"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Proprietário
                  </label>
                  <input
                    type="text"
                    required
                    value={newInspection.owner}
                    onChange={(e) => setNewInspection({...newInspection, owner: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Nome do proprietário"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tipo de Vistoria
                    </label>
                    <select
                      value={newInspection.type}
                      onChange={(e) => setNewInspection({...newInspection, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="seguro">Seguro</option>
                      <option value="rental">Rent-a-Car</option>
                      <option value="leasing">Leasing</option>
                      <option value="particular">Particular</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Data
                    </label>
                    <input
                      type="date"
                      required
                      value={newInspection.date}
                      onChange={(e) => setNewInspection({...newInspection, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Vistoriador
                  </label>
                  <input
                    type="text"
                    required
                    value={newInspection.inspector}
                    onChange={(e) => setNewInspection({...newInspection, inspector: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Nome do vistoriador"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowNewInspection(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Criar Vistoria
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