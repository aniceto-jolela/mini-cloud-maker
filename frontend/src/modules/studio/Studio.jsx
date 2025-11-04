import React, { useState } from 'react';
import Menu from '@/components/Menu';

const initialProjects = [
  {
    id: 1,
    name: 'Casamento Ana & Carlos',
    type: 'fotografia',
    status: 'em_andamento',
    client: 'Ana Silva',
    date: '2024-01-15',
    files: 245,
    size: '2.4 GB',
    progress: 75,
    preview: 'preview1.jpg'
  },
  {
    id: 2,
    name: 'Campanha Verão 2024',
    type: 'video',
    status: 'concluido',
    client: 'Moda Angola Lda',
    date: '2024-01-10',
    files: 89,
    size: '4.1 GB',
    progress: 100,
    preview: 'preview2.jpg'
  }
];

const mediaFiles = [
  {
    id: 1,
    projectId: 1,
    name: 'IMG_001.jpg',
    type: 'image',
    size: '4.2 MB',
    uploadDate: '2024-01-15',
    dimensions: '4000x3000',
    tags: ['casamento', 'cerimonia', 'noivos']
  },
  {
    id: 2,
    projectId: 1,
    name: 'VID_001.mp4',
    type: 'video',
    size: '156 MB',
    uploadDate: '2024-01-15',
    duration: '2:45',
    tags: ['casamento', 'entrada', 'video']
  }
];

export default function Studio() {
  const [projects, setProjects] = useState(initialProjects);
  const [activeTab, setActiveTab] = useState('projetos');
  const [showNewProject, setShowNewProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newProject, setNewProject] = useState({
    name: '',
    type: 'fotografia',
    client: '',
    date: ''
  });

  const stats = {
    totalProjects: projects.length,
    totalFiles: projects.reduce((sum, project) => sum + parseInt(project.files), 0),
    totalSize: '6.5 GB',
    activeProjects: projects.filter(p => p.status === 'em_andamento').length
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    const project = {
      id: projects.length + 1,
      ...newProject,
      status: 'em_andamento',
      files: 0,
      size: '0 GB',
      progress: 0
    };
    setProjects([...projects, project]);
    setNewProject({ name: '', type: 'fotografia', client: '', date: '' });
    setShowNewProject(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      em_andamento: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      concluido: 'bg-green-100 text-green-800 border-green-200',
      planeamento: 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return colors[status] || colors.planeamento;
  };

  const getStatusText = (status) => {
    const texts = {
      em_andamento: 'Em Andamento',
      concluido: 'Concluído',
      planeamento: 'Planeamento'
    };
    return texts[status] || status;
  };

  const getTypeText = (type) => {
    const texts = {
      fotografia: 'Fotografia',
      video: 'Vídeo',
      design: 'Design',
      misto: 'Misto'
    };
    return texts[type] || type;
  };

  const getFileIcon = (type) => {
    const icons = {
      image: '🖼️',
      video: '🎥',
      audio: '🎵',
      document: '📄'
    };
    return icons[type] || '📁';
  };

  return (
    <Menu>
      <div className="max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                🎥 Estúdio de Mídia
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Gestão profissional de conteúdo multimídia para fotógrafos e criadores
              </p>
            </div>
            <button
              onClick={() => setShowNewProject(true)}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 transform hover:scale-105"
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
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-xl flex items-center justify-center">
                <span className="text-pink-600 dark:text-pink-400">🎬</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total de Ficheiros</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalFiles}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400">📁</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Armazenamento</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalSize}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400">💾</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Em Andamento</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeProjects}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl flex items-center justify-center">
                <span className="text-yellow-600 dark:text-yellow-400">⏳</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          {[
            { id: 'projetos', name: 'Projetos', icon: '🎬' },
            { id: 'galeria', name: 'Galeria', icon: '🖼️' },
            { id: 'partilha', name: 'Partilha', icon: '🔗' },
            { id: 'clientes', name: 'Clientes', icon: '👥' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-pink-500 text-pink-600 dark:text-pink-400'
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
                            {getTypeText(project.type)}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          Cliente: {project.client} • Data: {project.date}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <div>
                            <span className="font-medium">Ficheiros:</span> {project.files}
                          </div>
                          <div>
                            <span className="font-medium">Tamanho:</span> {project.size}
                          </div>
                          <div>
                            <span className="font-medium">Progresso:</span> {project.progress}%
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
                          className="bg-pink-500 h-2 rounded-full transition-all duration-300"
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

        {activeTab === 'galeria' && selectedProject && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Galeria: {selectedProject.name}
                </h3>
                <div className="flex gap-2">
                  <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Upload
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Organizar
                  </button>
                </div>
              </div>
              
              {/* Grid de Ficheiros */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mediaFiles.filter(file => file.projectId === selectedProject.id).map((file) => (
                  <div key={file.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getFileIcon(file.type)}</span>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                            {file.name}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {file.size} • {file.uploadDate}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                      {file.dimensions && (
                        <div>📐 {file.dimensions}</div>
                      )}
                      {file.duration && (
                        <div>⏱️ {file.duration}</div>
                      )}
                      <div className="flex flex-wrap gap-1">
                        {file.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
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
                  Novo Projeto de Mídia
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nome do Projeto
                  </label>
                  <input
                    type="text"
                    required
                    value={newProject.name}
                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Ex: Casamento Ana & Carlos"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tipo de Projeto
                    </label>
                    <select
                      value={newProject.type}
                      onChange={(e) => setNewProject({...newProject, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="fotografia">Fotografia</option>
                      <option value="video">Vídeo</option>
                      <option value="design">Design</option>
                      <option value="misto">Misto</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Data
                    </label>
                    <input
                      type="date"
                      required
                      value={newProject.date}
                      onChange={(e) => setNewProject({...newProject, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
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
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Nome do cliente"
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
                    className="flex-1 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
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