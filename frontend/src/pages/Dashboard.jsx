import React from "react";
import Menu from "../components/Menu";

export default function Dashboard({ onLogout }) {
  const modules = [
    {
      title: "🧰 Oficina",
      description: "Reparos e relatórios técnicos",
      color: "orange",
      icon: "🔧",
      status: "Ativo"
    },
    {
      title: "🎥 Estúdio de Mídia",
      description: "Armazenamento e entrega de fotos/vídeos",
      color: "purple",
      icon: "🎬",
      status: "Ativo"
    },
    {
      title: "📂 Backup Local",
      description: "Backup automático e seguro",
      color: "green",
      icon: "💾",
      status: "Ativo"
    },
    {
      title: "📦 Gestão de Arquivos",
      description: "Gestão de arquivos para empresas",
      color: "blue",
      icon: "📁",
      status: "Ativo"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      orange: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-200',
      purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-200',
      green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
      blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
    };
    return colors[color] || colors.blue;
  };

  return (
    <Menu>
      <div className="min-h-full w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mini Cloud Maker</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Plataforma completa de gestão em nuvem</p>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
          >
            Sair
          </button>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {modules.map((module, index) => (
            <div key={index} className={`${getColorClasses(module.color)} rounded-xl border p-6`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{module.icon}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  module.color === 'orange' ? 'bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-100' :
                  module.color === 'purple' ? 'bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-100' :
                  module.color === 'green' ? 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100' :
                  'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100'
                }`}>
                  {module.status}
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{module.title}</h3>
              <p className="text-sm opacity-75">{module.description}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-4 text-left rounded-lg border border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
              <div className="text-primary-600 dark:text-primary-400 font-semibold">Upload de Arquivos</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Envie novos arquivos</div>
            </button>
            <button className="p-4 text-left rounded-lg border border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
              <div className="text-primary-600 dark:text-primary-400 font-semibold">Novo Backup</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Iniciar backup agora</div>
            </button>
            <button className="p-4 text-left rounded-lg border border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
              <div className="text-primary-600 dark:text-primary-400 font-semibold">Relatórios</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Gerar relatórios</div>
            </button>
            <button className="p-4 text-left rounded-lg border border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
              <div className="text-primary-600 dark:text-primary-400 font-semibold">Configurações</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Ajustar preferências</div>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Atividade Recente</h2>
          <div className="space-y-3">
            {[
              { action: "Backup concluído", time: "Há 2 minutos", type: "backup" },
              { action: "Arquivo enviado", time: "Há 15 minutos", type: "upload" },
              { action: "Relatório gerado", time: "Há 1 hora", type: "report" },
              { action: "Usuário adicionado", time: "Há 2 horas", type: "user" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'backup' ? 'bg-green-500' :
                    activity.type === 'upload' ? 'bg-blue-500' :
                    activity.type === 'report' ? 'bg-orange-500' : 'bg-purple-500'
                  }`} />
                  <span className="text-gray-700 dark:text-gray-300">{activity.action}</span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Menu>
  );
}