import React, { useState } from 'react';
import Menu from '@/components/Menu';

// Dados de exemplo
const initialBackups = [
  {
    id: 1,
    name: 'Backup Diário - Documentos',
    type: 'automático',
    schedule: 'diário',
    lastRun: '2024-01-15 02:00',
    status: 'sucesso',
    size: '2.4 GB',
    files: 1245,
    location: 'minio/bucket-documentos'
  },
  {
    id: 2,
    name: 'Backup Semanal - Base de Dados',
    type: 'automático',
    schedule: 'semanal',
    lastRun: '2024-01-14 03:00',
    status: 'sucesso',
    size: '1.2 GB',
    files: 1,
    location: 'minio/bucket-database'
  },
  {
    id: 3,
    name: 'Backup Manual - Imagens',
    type: 'manual',
    schedule: 'sob demanda',
    lastRun: '2024-01-13 14:30',
    status: 'sucesso',
    size: '4.7 GB',
    files: 234,
    location: 'minio/bucket-imagens'
  }
];

const backupStats = {
  totalBackups: 156,
  totalSize: '8.3 GB',
  successRate: 98.7,
  failedLast24h: 0
};

export default function Backup() {
  const [backups, setBackups] = useState(initialBackups);
  const [activeTab, setActiveTab] = useState('agendamentos');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    name: '',
    type: 'automático',
    schedule: 'diário',
    location: ''
  });

  const getStatusColor = (status) => {
    const colors = {
      sucesso: 'bg-green-100 text-green-800 border-green-200',
      executando: 'bg-blue-100 text-blue-800 border-blue-200',
      falha: 'bg-red-100 text-red-800 border-red-200',
      pendente: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colors[status] || colors.pendente;
  };

  const handleRunBackup = (backupId) => {
    setBackups(backups.map(backup => 
      backup.id === backupId 
        ? { ...backup, status: 'executando' }
        : backup
    ));
    
    // Simular execução do backup
    setTimeout(() => {
      setBackups(backups.map(backup => 
        backup.id === backupId 
          ? { ...backup, status: 'sucesso', lastRun: new Date().toISOString() }
          : backup
      ));
    }, 2000);
  };

  const handleCreateSchedule = (e) => {
    e.preventDefault();
    const schedule = {
      id: backups.length + 1,
      ...newSchedule,
      status: 'pendente',
      lastRun: 'Nunca',
      size: '0 GB',
      files: 0
    };
    setBackups([...backups, schedule]);
    setNewSchedule({ name: '', type: 'automático', schedule: 'diário', location: '' });
    setShowScheduleModal(false);
  };

  return (
    <Menu>
      <div className="max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                📂 Backup Automático
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Proteção contínua dos seus dados com backup em tempo real
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowScheduleModal(true)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 transform hover:scale-105"
              >
                + Agendar Backup
              </button>
              <button
                onClick={() => handleRunBackup(1)}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
              >
                🔄 Executar Agora
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total de Backups</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{backupStats.totalBackups}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center">
                <span className="text-indigo-600 dark:text-indigo-400">💾</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Espaço Utilizado</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{backupStats.totalSize}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400">📊</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Taxa de Sucesso</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{backupStats.successRate}%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400">✅</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Falhas (24h)</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{backupStats.failedLast24h}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center">
                <span className="text-red-600 dark:text-red-400">⚠️</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          {[
            { id: 'agendamentos', name: 'Agendamentos', icon: '📅' },
            { id: 'historico', name: 'Histórico', icon: '📋' },
            { id: 'restauracao', name: 'Restauração', icon: '🔄' },
            { id: 'configuracoes', name: 'Configurações', icon: '⚙️' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Conteúdo das Tabs */}
        {activeTab === 'agendamentos' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Backups Agendados
                </h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {backups.map((backup) => (
                  <div key={backup.id} className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {backup.name}
                          </h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(backup.status)}`}>
                            {backup.status}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                            {backup.type}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div>
                            <span className="font-medium">Agendamento:</span> {backup.schedule}
                          </div>
                          <div>
                            <span className="font-medium">Última execução:</span> {backup.lastRun}
                          </div>
                          <div>
                            <span className="font-medium">Tamanho:</span> {backup.size}
                          </div>
                          <div>
                            <span className="font-medium">Ficheiros:</span> {backup.files}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          Localização: {backup.location}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleRunBackup(backup.id)}
                          disabled={backup.status === 'executando'}
                          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          {backup.status === 'executando' ? 'Executando...' : 'Executar'}
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

            {/* Status do Sistema */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Status do Sistema
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <span className="text-green-700 dark:text-green-300 font-medium">MinIO Storage</span>
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">Online</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <span className="text-green-700 dark:text-green-300 font-medium">Serviço de Backup</span>
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">Activo</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'restauracao' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Restauração de Dados
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-8 text-center hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors cursor-pointer">
                  <div className="text-4xl mb-4">📁</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Restaurar Ficheiros
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Selecione ficheiros específicos para restaurar
                  </p>
                </div>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-8 text-center hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors cursor-pointer">
                  <div className="text-4xl mb-4">🕒</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Restauração por Data
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Restaure dados de um ponto específico no tempo
                  </p>
                </div>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-6">
                <div className="flex items-start">
                  <span className="text-yellow-600 dark:text-yellow-400 text-xl mr-3">⚠️</span>
                  <div>
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                      Aviso Importante
                    </h4>
                    <p className="text-yellow-700 dark:text-yellow-400 text-sm">
                      A restauração de dados irá substituir os ficheiros actuais. 
                      Recomendamos fazer um backup manual antes de proceder.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Agendar Backup */}
        {showScheduleModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Agendar Novo Backup
                </h3>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <form onSubmit={handleCreateSchedule} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nome do Backup
                  </label>
                  <input
                    type="text"
                    required
                    value={newSchedule.name}
                    onChange={(e) => setNewSchedule({...newSchedule, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Ex: Backup Diário - Documentos"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tipo
                  </label>
                  <select
                    value={newSchedule.type}
                    onChange={(e) => setNewSchedule({...newSchedule, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="automático">Automático</option>
                    <option value="manual">Manual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Agendamento
                  </label>
                  <select
                    value={newSchedule.schedule}
                    onChange={(e) => setNewSchedule({...newSchedule, schedule: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="diário">Diário</option>
                    <option value="semanal">Semanal</option>
                    <option value="mensal">Mensal</option>
                    <option value="sob demanda">Sob Demanda</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Localização (Bucket MinIO)
                  </label>
                  <input
                    type="text"
                    required
                    value={newSchedule.location}
                    onChange={(e) => setNewSchedule({...newSchedule, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="minio/nome-do-bucket"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowScheduleModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Criar Agendamento
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