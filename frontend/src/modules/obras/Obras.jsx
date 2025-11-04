import React, { useState } from 'react';
import Menu from '@/components/Menu';

const initialProjects = [
  {
    id: 1,
    name: 'Residencial Bella Vista',
    client: 'Eng. Manuel Santos',
    location: 'Talatona, Luanda',
    type: 'residencial',
    status: 'em_andamento',
    startDate: '2024-01-10',
    estimatedEnd: '2024-06-15',
    budget: 25000000,
    progress: 45,
    photos: 23,
    documents: 8
  },
  {
    id: 2,
    name: 'Edifício Comercial Sky Tower',
    client: 'Empresa Construção Lda',
    location: 'Maianga, Luanda', 
    type: 'comercial',
    status: 'planeamento',
    startDate: '2024-02-01',
    estimatedEnd: '2024-12-20',
    budget: 75000000,
    progress: 15,
    photos: 5,
    documents: 12
  }
];

const projectStages = [
  { id: 1, projectId: 1, name: 'Fundação', status: 'concluido', progress: 100 },
  { id: 2, projectId: 1, name: 'Estrutura', status: 'em_andamento', progress: 80 },
  { id: 3, projectId: 1, name: 'Alvenaria', status: 'pendente', progress: 0 },
  { id: 4, projectId: 1, name: 'Instalações', status: 'pendente', progress: 0 },
  { id: 5, projectId: 1, name: 'Acabamentos', status: 'pendente', progress: 0 }
];

export default function Obras() {
  const [projects, setProjects] = useState(initialProjects);
  const [activeTab, setActiveTab] = useState('projetos');
  const [showNewProject, setShowNewProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newProject, setNewProject] = useState({
    name: '',
    client: '',
    location: '',
    type: 'residencial',
    budget: '',
    startDate: '',
    estimatedEnd: ''
  });

  const stats = {
    totalProjects: projects.length,
    inProgress: projects.filter(p => p.status === 'em_andamento').length,
    totalBudget: projects.reduce((sum, project) => sum + project.budget, 0),
    avgProgress: projects.reduce((sum, project) => sum + project.progress, 0) / projects.length
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    const project = {
      id: projects.length + 1,
      ...newProject,
      status: 'planeamento',
      progress: 0,
      photos: 0,
      documents: 0,
      budget: parseInt(newProject.budget)
    };
    setProjects([...projects, project]);
    setNewProject({ name: '', client: '', location: '', type: 'residencial', budget: '', startDate: '', estimatedEnd: '' });
    setShowNewProject(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      em_andamento: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      concluido: 'bg-green-100 text-green-800 border-green-200',
      planeamento: 'bg-blue-100 text-blue-800 border-blue-200',
      suspenso: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || colors.planeamento;
  };

  const getStatusText = (status) => {
    const texts = {
      em_andamento: 'Em Andamento',
      concluido: 'Concluído',
      planeamento: 'Planeamento',
      suspenso: 'Suspenso'
    };
    return texts[status] || status;
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
                🏗️ Gestor de Obras
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Sistema completo para gestão de projetos de construção civil
              </p>
            </div>
            <button
              onClick={() => setShowNewProject(true)}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 transform hover:scale-105"
            >
              + Novo Projeto
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Projetos Activos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalProjects}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-xl flex items-center justify-center">
                <span className="text-amber-600 dark:text-amber-400">🏗️</span>
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
                <p className="text-gray-600 dark:text-gray-400 text-sm">Orçamento Total</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(stats.totalBudget)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400">💰</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Progresso Médio</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.avgProgress ? stats.avgProgress.toFixed(0) : 0}%
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400">📊</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          {[
            { id: 'projetos', name: 'Projetos', icon: '📁' },
            { id: 'etapas', name: 'Etapas', icon: '📋' },
            { id: 'documentos', name: 'Documentos', icon: '📄' },
            { id: 'fotos', name: 'Registo Fotográfico', icon: '📸' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Conteúdo das Tabs */}
        {activeTab === 'projetos' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Meus Projetos
                </h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {projects.map((project) => (
                  <div key={project.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                       onClick={() => setSelectedProject(project)}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {project.name}
                          </h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                            {getStatusText(project.status)}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                            {project.type}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          Cliente: {project.client} • Localização: {project.location}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <div>
                            <span className="font-medium">Início:</span> {project.startDate}
                          </div>
                          <div>
                            <span className="font-medium">Previsão:</span> {project.estimatedEnd}
                          </div>
                          <div>
                            <span className="font-medium">Orçamento:</span> {formatCurrency(project.budget)}
                          </div>
                          <div>
                            <span className="font-medium">Fotos:</span> {project.photos}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Barra de Progresso */}
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <span>Progresso do Projeto</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'etapas' && selectedProject && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Etapas do Projeto: {selectedProject.name}
                </h3>
                <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  + Nova Etapa
                </button>
              </div>
              
              <div className="space-y-4">
                {projectStages.filter(stage => stage.projectId === selectedProject.id).map((stage) => (
                  <div key={stage.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{stage.name}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        stage.status === 'concluido' ? 'bg-green-100 text-green-800 border-green-200' :
                        stage.status === 'em_andamento' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        'bg-gray-100 text-gray-800 border-gray-200'
                      }`}>
                        {stage.status === 'concluido' ? 'Concluído' :
                         stage.status === 'em_andamento' ? 'Em Andamento' : 'Pendente'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>Progresso: {stage.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          stage.status === 'concluido' ? 'bg-green-500' :
                          stage.status === 'em_andamento' ? 'bg-amber-500' : 'bg-gray-400'
                        }`}
                        style={{ width: `${stage.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal Novo Projeto */}
        {showNewProject && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Novo Projeto de Construção
                </h3>
                <button
                  onClick={() => setShowNewProject(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <form onSubmit={handleCreateProject} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nome do Projeto
                    </label>
                    <input
                      type="text"
                      required
                      value={newProject.name}
                      onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Ex: Residencial Bella Vista"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Cliente
                    </label>
                    <input
                      type="text"
                      required
                      value={newProject.client}
                      onChange={(e) => setNewProject({...newProject, client: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Nome do cliente"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Localização
                  </label>
                  <input
                    type="text"
                    required
                    value={newProject.location}
                    onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Endereço da obra"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tipo de Obra
                    </label>
                    <select
                      value={newProject.type}
                      onChange={(e) => setNewProject({...newProject, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="residencial">Residencial</option>
                      <option value="comercial">Comercial</option>
                      <option value="industrial">Industrial</option>
                      <option value="infraestrutura">Infraestrutura</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Orçamento (Kz)
                    </label>
                    <input
                      type="number"
                      required
                      value={newProject.budget}
                      onChange={(e) => setNewProject({...newProject, budget: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="25000000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Data Início
                    </label>
                    <input
                      type="date"
                      required
                      value={newProject.startDate}
                      onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Previsão de Conclusão
                  </label>
                  <input
                    type="date"
                    required
                    value={newProject.estimatedEnd}
                    onChange={(e) => setNewProject({...newProject, estimatedEnd: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowNewProject(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Criar Projeto
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