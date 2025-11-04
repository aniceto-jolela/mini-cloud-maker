import React from 'react';
import Menu from '@/components/Menu';

export default function Vistoria() {
  return (
    <Menu>
      <div className="max-w-7xl mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            🔄 Testador de Vistorias
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Ferramenta essencial para desenvolvedores - Teste vistorias em minutos com Ngrok integrado
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Configuração Rápida
            </h3>
            {/* Conteúdo do módulo */}
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Histórico de Testes
            </h3>
            {/* Conteúdo do módulo */}
          </div>
        </div>
      </div>
    </Menu>
  );
}