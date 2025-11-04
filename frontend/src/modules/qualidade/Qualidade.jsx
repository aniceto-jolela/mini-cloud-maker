import React, { useState } from 'react';
import Menu from '@/components/Menu';

const initialChecklists = [
  {
    id: 1,
    name: 'Checklist Diário - Cozinha',
    type: 'cozinha',
    status: 'concluido',
    date: '2024-01-20',
    supervisor: 'Chef Maria Silva',
    score: 95,
    issues: 2,
    completedItems: 28,
    totalItems: 30
  },
  {
    id: 2,
    name: 'Checklist HACCP - Armazenamento',
    type: 'haccp',
    status: 'pendente',
    date: '2024-01-21',
    supervisor: 'Supervisor João Costa',
    score: null,
    issues: 0,
    completedItems: 0,
    totalItems: 25
  }
];

const checklistItems = [
  {
    id: 1,
    checklistId: 1,
    category: 'Higiene Pessoal',
    items: [
      { id: 1, description: 'Mãos lavadas e desinfectadas', status: 'conforme', notes: '' },
      { id: 2, description: 'Unhas cortadas e limpas', status: 'conforme', notes: '' },
      { id: 3, description: 'Uniforme limpo e adequado', status: 'nao_conforme', notes: 'Uniforme com manchas' }
    ]
  },
  {
    id: 2,
    checklistId: 1,
    category: 'Equipamentos',
    items: [
      { id: 4, description: 'Geladeiras na temperatura correta', status: 'conforme', notes: '' },
      { id: 5, description: 'Freezers sem acumulação de gelo', status: 'conforme', notes: '' }
    ]
  }
];

export default function Qualidade() {
  const [checklists, setChecklists] = useState(initialChecklists);
  const [activeTab, setActiveTab] = useState('checklists');
  const [showNewChecklist, setShowNewChecklist] = useState(false);
  const [selectedChecklist, setSelectedChecklist] = useState(null);
  const [newChecklist, setNewChecklist] = useState({
    name: '',
    type: 'cozinha',
    date: '',
    supervisor: ''
  });

  const stats = {
    totalChecklists: checklists.length,
    completed: checklists.filter(c => c.status === 'concluido').length,
    pending: checklists.filter(c => c.status === 'pendente').length,
    avgScore: checklists.filter(c => c.score).reduce((sum, c) => sum + c.score, 0) / checklists.filter(c => c.score).length
  };

  const handleCreateChecklist = (e) => {
    e.preventDefault();
    const checklist = {
      id: checklists.length + 1,
      ...newChecklist,
      status: 'pendente',
      score: null,
      issues: 0,
      completedItems: 0,
      totalItems: newChecklist.type === 'cozinha' ? 30 : 25
    };
    setChecklists([...checklists, checklist]);
    setNewChecklist({ name: '', type: 'cozinha', date: '', supervisor: '' });
    setShowNewChecklist(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      concluido: 'bg-green-100 text-green-800 border-green-200',
      pendente: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      cancelado: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || colors.pendente;
  };

  const getStatusText = (status) => {
    const texts = {
      concluido: 'Concluído',
      pendente: 'Pendente',
      cancelado: 'Cancelado'
    };
    return texts[status] || status;
  };

  const getTypeText = (type) => {
    const texts = {
      cozinha: 'Cozinha',
      haccp: 'HACCP',
      limpeza: 'Limpeza',
      recepcao: 'Recepção'
    };
    return texts[type] || type;
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getItemStatusColor = (status) => {
    const colors = {
      conforme: 'bg-green-100 text-green-800',
      nao_conforme: 'bg-red-100 text-red-800',
      nao_aplicavel: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || colors.conforme;
  };

  return (
    <Menu>
      <div className="max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                🍽️ Controlo de Qualidade
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Sistema para restaurantes e catering - Checklists HACCP e certificação digital
              </p>
            </div>
            <button
              onClick={() => setShowNewChecklist(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 transform hover:scale-105"
            >
              + Novo Checklist
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Checklists</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalChecklists}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400">📋</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Concluídos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completed}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400">✅</span>
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
                <p className="text-gray-600 dark:text-gray-400 text-sm">Pontuação Média</p>
                <p className={`text-2xl font-bold ${getScoreColor(stats.avgScore)}`}>
                  {stats.avgScore ? stats.avgScore.toFixed(0) : 0}%
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400">⭐</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          {[
            { id: 'checklists', name: 'Checklists', icon: '📋' },
            { id: 'haccp', name: 'HACCP', icon: '🔬' },
            { id: 'certificados', name: 'Certificados', icon: '📜' },
            { id: 'relatorios', name: 'Relatórios', icon: '📊' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-green-500 text-green-600 dark:text-green-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Conteúdo das Tabs */}
        {activeTab === 'checklists' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Checklists de Qualidade
                </h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {checklists.map((checklist) => (
                  <div key={checklist.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                       onClick={() => setSelectedChecklist(checklist)}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {checklist.name}
                          </h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(checklist.status)}`}>
                            {getStatusText(checklist.status)}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                            {getTypeText(checklist.type)}
                          </span>
                          {checklist.score && (
                            <span className={`px-2 py-1 rounded text-xs font-bold ${getScoreColor(checklist.score)}`}>
                              {checklist.score}%
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          Supervisor: {checklist.supervisor} • Data: {checklist.date}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <div>
                            <span className="font-medium">Itens:</span> {checklist.completedItems}/{checklist.totalItems}
                          </div>
                          <div>
                            <span className="font-medium">Problemas:</span> {checklist.issues}
                          </div>
                          <div>
                            <span className="font-medium">Progresso:</span> 
                            {((checklist.completedItems / checklist.totalItems) * 100).toFixed(0)}%
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Barra de Progresso */}
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <span>Progresso do Checklist</span>
                        <span>{((checklist.completedItems / checklist.totalItems) * 100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(checklist.completedItems / checklist.totalItems) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'haccp' && selectedChecklist && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Itens do Checklist: {selectedChecklist.name}
                </h3>
                <div className="flex gap-2">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Gerar Certificado
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Exportar Relatório
                  </button>
                </div>
              </div>
              
              <div className="space-y-6">
                {checklistItems.filter(item => item.checklistId === selectedChecklist.id).map((category) => (
                  <div key={category.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">
                      {category.category}
                    </h4>
                    
                    <div className="space-y-3">
                      {category.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <div className="flex-1">
                            <p className="text-gray-900 dark:text-white font-medium">
                              {item.description}
                            </p>
                            {item.notes && (
                              <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                                {item.notes}
                              </p>
                            )}
                          </div>
                          
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getItemStatusColor(item.status)}`}>
                            {item.status === 'conforme' ? 'Conforme' :
                             item.status === 'nao_conforme' ? 'Não Conforme' : 'Não Aplicável'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal Novo Checklist */}
        {showNewChecklist && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Novo Checklist de Qualidade
                </h3>
                <button
                  onClick={() => setShowNewChecklist(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <form onSubmit={handleCreateChecklist} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nome do Checklist
                  </label>
                  <input
                    type="text"
                    required
                    value={newChecklist.name}
                    onChange={(e) => setNewChecklist({...newChecklist, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Ex: Checklist Diário - Cozinha"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tipo de Checklist
                    </label>
                    <select
                      value={newChecklist.type}
                      onChange={(e) => setNewChecklist({...newChecklist, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="cozinha">Cozinha</option>
                      <option value="haccp">HACCP</option>
                      <option value="limpeza">Limpeza</option>
                      <option value="recepcao">Recepção</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Data
                    </label>
                    <input
                      type="date"
                      required
                      value={newChecklist.date}
                      onChange={(e) => setNewChecklist({...newChecklist, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Supervisor Responsável
                  </label>
                  <input
                    type="text"
                    required
                    value={newChecklist.supervisor}
                    onChange={(e) => setNewChecklist({...newChecklist, supervisor: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Nome do supervisor"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowNewChecklist(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Criar Checklist
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