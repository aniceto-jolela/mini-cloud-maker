import React, { useState } from 'react';
import Menu from '@/components/Menu';

const initialFiles = [
  {
    id: 1,
    name: 'Relatório Anual 2024.pdf',
    type: 'document',
    size: '2.4 MB',
    modified: '2024-01-20',
    owner: 'Maria Silva',
    tags: ['relatório', 'financeiro', '2024'],
    shared: true
  },
  {
    id: 2,
    name: 'Apresentação Vendas.pptx',
    type: 'presentation',
    size: '15.7 MB',
    modified: '2024-01-19',
    owner: 'João Santos',
    tags: ['vendas', 'apresentação'],
    shared: false
  },
  {
    id: 3,
    name: 'Contrato Cliente XYZ.docx',
    type: 'document',
    size: '1.2 MB',
    modified: '2024-01-18',
    owner: 'Carlos Lima',
    tags: ['contrato', 'cliente'],
    shared: true
  }
];

const folders = [
  {
    id: 1,
    name: 'Financeiro',
    files: 24,
    size: '45.2 MB',
    modified: '2024-01-20',
    color: 'blue'
  },
  {
    id: 2,
    name: 'Recursos Humanos',
    files: 18,
    size: '32.1 MB',
    modified: '2024-01-19',
    color: 'green'
  },
  {
    id: 3,
    name: 'Projetos',
    files: 56,
    size: '128.4 MB',
    modified: '2024-01-18',
    color: 'purple'
  }
];

export default function FileManager() {
  const [files, setFiles] = useState(initialFiles);
  const [activeTab, setActiveTab] = useState('todos');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showUpload, setShowUpload] = useState(false);

  const stats = {
    totalFiles: files.length,
    totalSize: '206.9 MB',
    sharedFiles: files.filter(f => f.shared).length,
    recentFiles: files.filter(f => {
      const fileDate = new Date(f.modified);
      const today = new Date();
      const diffTime = Math.abs(today - fileDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    }).length
  };

  const getFileIcon = (type) => {
    const icons = {
      document: '📄',
      image: '🖼️',
      video: '🎥',
      audio: '🎵',
      presentation: '📊',
      spreadsheet: '📈',
      archive: '📦',
      pdf: '📑'
    };
    return icons[type] || '📁';
  };

  const getFolderColor = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
      green: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
      purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
      orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300'
    };
    return colors[color] || colors.blue;
  };

  const handleFileSelect = (fileId) => {
    setSelectedFiles(prev =>
      prev.includes(fileId)
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const filteredFiles = activeTab === 'todos' 
    ? files 
    : activeTab === 'partilhados'
    ? files.filter(f => f.shared)
    : files.filter(f => f.type === activeTab);

  return (
    <Menu>
      <div className="max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                📦 Gestão de Arquivos
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Sistema empresarial de gestão documental e colaboração em equipa
              </p>
            </div>
            <button
              onClick={() => setShowUpload(true)}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 transform hover:scale-105"
            >
              📤 Upload
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total de Arquivos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalFiles}</p>
              </div>
              <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/20 rounded-xl flex items-center justify-center">
                <span className="text-cyan-600 dark:text-cyan-400">📁</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Armazenamento</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalSize}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400">💾</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Partilhados</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.sharedFiles}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400">🔗</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Recentes (7d)</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.recentFiles}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400">🆕</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ações Rápidas e Filtros */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 flex gap-2 overflow-x-auto">
            {[
              { id: 'todos', name: 'Todos', icon: '📁' },
              { id: 'partilhados', name: 'Partilhados', icon: '🔗' },
              { id: 'document', name: 'Documentos', icon: '📄' },
              { id: 'image', name: 'Imagens', icon: '🖼️' },
              { id: 'video', name: 'Vídeos', icon: '🎥' },
              { id: 'presentation', name: 'Apresentações', icon: '📊' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {viewMode === 'grid' ? '📋 Lista' : '🔲 Grid'}
            </button>
            <button className="p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              🔍 Pesquisar
            </button>
          </div>
        </div>

        {/* Pastas */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            📂 Pastas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {folders.map((folder) => (
              <div
                key={folder.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">📁</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFolderColor(folder.color)}`}>
                    {folder.files} ficheiros
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {folder.name}
                </h4>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <div>{folder.size}</div>
                  <div>Modificado: {folder.modified}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arquivos */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {activeTab === 'todos' ? '📄 Todos os Arquivos' :
               activeTab === 'partilhados' ? '🔗 Arquivos Partilhados' :
               `📄 ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}s`}
            </h3>
            {selectedFiles.length > 0 && (
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors">
                  🗑️ Eliminar
                </button>
                <button className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-colors">
                  🔗 Partilhar
                </button>
              </div>
            )}
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className={`bg-white dark:bg-gray-800 rounded-xl p-4 border-2 transition-all duration-200 cursor-pointer ${
                    selectedFiles.includes(file.id)
                      ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-cyan-300'
                  }`}
                  onClick={() => handleFileSelect(file.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{getFileIcon(file.type)}</span>
                    {file.shared && (
                      <span className="text-green-500" title="Partilhado">🔗</span>
                    )}
                  </div>
                  
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-2 truncate">
                    {file.name}
                  </h4>
                  
                  <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <div>📏 {file.size}</div>
                    <div>📅 {file.modified}</div>
                    <div>👤 {file.owner}</div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {file.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className={`p-4 transition-colors cursor-pointer ${
                      selectedFiles.includes(file.id)
                        ? 'bg-cyan-50 dark:bg-cyan-900/20'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                    onClick={() => handleFileSelect(file.id)}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(file.id)}
                        onChange={() => handleFileSelect(file.id)}
                        className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500"
                      />
                      <span className="text-2xl">{getFileIcon(file.type)}</span>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-gray-900 dark:text-white truncate">
                            {file.name}
                          </h4>
                          {file.shared && (
                            <span className="text-green-500" title="Partilhado">🔗</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {file.size} • Modificado: {file.modified} • Por: {file.owner}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex flex-wrap gap-1">
                          {file.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                              #{tag}
                            </span>
                          ))}
                          {file.tags.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                              +{file.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Upload */}
        {showUpload && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  📤 Upload de Arquivos
                </h3>
                <button
                  onClick={() => setShowUpload(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center mb-4">
                <div className="text-4xl mb-4">📁</div>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Arraste os arquivos aqui ou clique para selecionar
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Suporta PDF, DOC, XLS, PPT, JPG, PNG, MP4 (Máx. 100MB por arquivo)
                </p>
                <button className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Selecionar Arquivos
                </button>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowUpload(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Iniciar Upload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Menu>
  );
}