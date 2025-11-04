import React, { useState } from 'react';
import Menu from '@/components/Menu';

const initialSchools = [
  {
    id: 1,
    name: 'Escola Primária nº 1001',
    director: 'Maria Fernandes',
    location: 'Kilamba, Luanda',
    type: 'primaria',
    status: 'regular',
    students: 1250,
    teachers: 45,
    lastInspection: '2024-01-15',
    nextInspection: '2024-07-15',
    rating: 4.2,
    issues: 3
  },
  {
    id: 2,
    name: 'Liceu Nacional do Cazenga',
    director: 'João Miguel',
    location: 'Cazenga, Luanda',
    type: 'secundario',
    status: 'pendente',
    students: 2800,
    teachers: 89,
    lastInspection: '2023-11-20',
    nextInspection: '2024-05-20',
    rating: 3.8,
    issues: 7
  }
];

const inspectionReports = [
  {
    id: 1,
    schoolId: 1,
    date: '2024-01-15',
    inspector: 'Dr. Ana Silva',
    type: 'rotina',
    status: 'concluido',
    rating: 4.2,
    findings: [
      { id: 1, description: 'Infraestrutura em bom estado', type: 'positivo' },
      { id: 2, description: 'Falta de material didático', type: 'negativo' },
      { id: 3, description: 'Professores qualificados', type: 'positivo' }
    ]
  }
];

export default function Escolas() {
  const [schools, setSchools] = useState(initialSchools);
  const [activeTab, setActiveTab] = useState('escolas');
  const [showNewInspection, setShowNewInspection] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [newInspection, setNewInspection] = useState({
    schoolId: '',
    date: '',
    type: 'rotina',
    inspector: ''
  });

  const stats = {
    totalSchools: schools.length,
    pendingInspections: schools.filter(s => s.status === 'pendente').length,
    totalStudents: schools.reduce((sum, school) => sum + school.students, 0),
    avgRating: schools.reduce((sum, school) => sum + school.rating, 0) / schools.length
  };

  const getStatusColor = (status) => {
    const colors = {
      regular: 'bg-green-100 text-green-800 border-green-200',
      pendente: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      irregular: 'bg-red-100 text-red-800 border-red-200',
      suspenso: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[status] || colors.regular;
  };

  const getStatusText = (status) => {
    const texts = {
      regular: 'Regular',
      pendente: 'Pendente',
      irregular: 'Irregular',
      suspenso: 'Suspenso'
    };
    return texts[status] || status;
  };

  const getTypeText = (type) => {
    const texts = {
      primaria: 'Primária',
      secundario: 'Secundário',
      tecnico: 'Técnico',
      superior: 'Superior'
    };
    return texts[type] || type;
  };

  return (
    <Menu>
      <div className="max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                🎓 Inspector Escolar
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Sistema de inspeção e monitoramento de instituições de ensino
              </p>
            </div>
            <button
              onClick={() => setShowNewInspection(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 transform hover:scale-105"
            >
              + Nova Inspeção
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Escolas Cadastradas</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalSchools}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400">🏫</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Inspeções Pendentes</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pendingInspections}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl flex items-center justify-center">
                <span className="text-yellow-600 dark:text-yellow-400">📋</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total de Alunos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalStudents.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400">👨‍🎓</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Avaliação Média</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.avgRating ? stats.avgRating.toFixed(1) : 0}/5
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
            { id: 'escolas', name: 'Escolas', icon: '🏫' },
            { id: 'inspecoes', name: 'Inspeções', icon: '📋' },
            { id: 'relatorios', name: 'Relatórios', icon: '📊' },
            { id: 'metricas', name: 'Métricas', icon: '📈' }
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
        {activeTab === 'escolas' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Instituições de Ensino
                </h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {schools.map((school) => (
                  <div key={school.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                       onClick={() => setSelectedSchool(school)}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {school.name}
                          </h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(school.status)}`}>
                            {getStatusText(school.status)}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                            {getTypeText(school.type)}
                          </span>
                          <div className="flex items-center text-sm text-yellow-600 dark:text-yellow-400">
                            <span>⭐</span>
                            <span className="ml-1">{school.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          Director: {school.director} • Localização: {school.location}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <div>
                            <span className="font-medium">Alunos:</span> {school.students.toLocaleString()}
                          </div>
                          <div>
                            <span className="font-medium">Professores:</span> {school.teachers}
                          </div>
                          <div>
                            <span className="font-medium">Última Inspeção:</span> {school.lastInspection}
                          </div>
                          <div>
                            <span className="font-medium">Próxima:</span> {school.nextInspection}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Indicadores */}
                    <div className="flex gap-4 text-sm">
                      <div className={`px-3 py-1 rounded-full ${
                        school.issues > 5 ? 'bg-red-100 text-red-800' : 
                        school.issues > 2 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {school.issues} problemas identificados
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inspecoes' && selectedSchool && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Inspeções: {selectedSchool.name}
                </h3>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  + Nova Inspeção
                </button>
              </div>
              
              <div className="space-y-4">
                {inspectionReports.filter(report => report.schoolId === selectedSchool.id).map((report) => (
                  <div key={report.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          Inspeção {report.type === 'rotina' ? 'de Rotina' : 'Extraordinária'}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Por {report.inspector} em {report.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          report.status === 'concluido' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {report.status === 'concluido' ? 'Concluída' : 'Em Andamento'}
                        </span>
                        <div className="flex items-center text-yellow-600 dark:text-yellow-400">
                          <span>⭐</span>
                          <span className="ml-1">{report.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-medium text-gray-900 dark:text-white">Achados da Inspeção:</h5>
                      {report.findings.map((finding) => (
                        <div key={finding.id} className={`flex items-center gap-2 text-sm ${
                          finding.type === 'positivo' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          <span>{finding.type === 'positivo' ? '✅' : '❌'}</span>
                          <span>{finding.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal Nova Inspeção */}
        {showNewInspection && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Nova Inspeção Escolar
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
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Escola
                    </label>
                    <select
                      value={newInspection.schoolId}
                      onChange={(e) => setNewInspection({...newInspection, schoolId: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Selecionar escola...</option>
                      {schools.map(school => (
                        <option key={school.id} value={school.id}>{school.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Data da Inspeção
                    </label>
                    <input
                      type="date"
                      required
                      value={newInspection.date}
                      onChange={(e) => setNewInspection({...newInspection, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tipo de Inspeção
                    </label>
                    <select
                      value={newInspection.type}
                      onChange={(e) => setNewInspection({...newInspection, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="rotina">Rotina</option>
                      <option value="extraordinaria">Extraordinária</option>
                      <option value="especial">Especial</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Inspector Responsável
                    </label>
                    <input
                      type="text"
                      required
                      value={newInspection.inspector}
                      onChange={(e) => setNewInspection({...newInspection, inspector: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Nome do inspector"
                    />
                  </div>
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
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Agendar Inspeção
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