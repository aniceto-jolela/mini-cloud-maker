import React, { useState } from 'react';
import Menu from '@/components/Menu';

export default function Help() {
  const [activeTab, setActiveTab] = useState('faq');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const faqCategories = [
    {
      id: 'geral',
      name: 'Geral',
      icon: '🏠',
      questions: [
        {
          id: 1,
          question: 'Como faço para actualizar meu plano?',
          answer: 'Para actualizar seu plano, acesse as Configurações > Conta & Facturação e clique em "Upgrade para Premium". Você pode escolher entre os planos disponíveis e seguir o processo de pagamento.'
        },
        {
          id: 2,
          question: 'Quantos módulos posso usar no plano gratuito?',
          answer: 'No plano gratuito, você tem acesso ao módulo Oficina Inteligente. Para desbloquear os outros 8 módulos, é necessário fazer upgrade para um dos planos pagos.'
        },
        {
          id: 3,
          question: 'Como faço backup dos meus dados?',
          answer: 'O backup automático está disponível no módulo "Backup Automático". Você pode agendar backups regulares e configurar as pastas que deseja incluir no backup.'
        }
      ]
    },
    {
      id: 'modulos',
      name: 'Módulos',
      icon: '🧩',
      questions: [
        {
          id: 4,
          question: 'Como configurar a Oficina Inteligente?',
          answer: 'Acesse o módulo Oficina Inteligente > Configurações. Lá você pode configurar serviços, peças, clientes e templates de orçamentos. Recomendamos começar cadastrando seus serviços básicos.'
        },
        {
          id: 5,
          question: 'O Testador de Webhooks funciona com quais APIs?',
          answer: 'Nosso testador de webhooks é compatível com a maioria das APIs RESTful. Suportamos métodos GET, POST, PUT, DELETE e formatos JSON, XML e form-data.'
        },
        {
          id: 6,
          question: 'Como partilhar arquivos com clientes?',
          answer: 'No módulo Gestão de Arquivos, selecione os arquivos desejados e clique em "Partilhar". Você pode gerar links públicos ou convidar usuários específicos por email.'
        }
      ]
    },
    {
      id: 'tecnico',
      name: 'Técnico',
      icon: '🔧',
      questions: [
        {
          id: 7,
          question: 'Quais são os requisitos do sistema?',
          answer: 'Recomendamos: Navegador atualizado (Chrome, Firefox, Safari ou Edge), conexão internet estável, 4GB RAM mínimo. A plataforma é totalmente web-based.'
        },
        {
          id: 8,
          question: 'Como exportar meus dados?',
          answer: 'Acesse Privacidade > Exportar Dados. Você pode solicitar exportação em JSON, CSV ou XML. O arquivo será enviado para seu email em até 48 horas.'
        },
        {
          id: 9,
          question: 'A plataforma funciona offline?',
          answer: 'Algumas funcionalidades básicas funcionam offline com dados em cache, mas para uso completo é necessária conexão com internet.'
        }
      ]
    },
    {
      id: 'pagamentos',
      name: 'Pagamentos',
      icon: '💳',
      questions: [
        {
          id: 10,
          question: 'Quais formas de pagamento são aceitas?',
          answer: 'Aceitamos transferência bancária, MB Way, cartão de crédito (Visa, Mastercard) e referências multicaixa para Angola.'
        },
        {
          id: 11,
          question: 'Como cancelar minha assinatura?',
          answer: 'Acesse Configurações > Conta & Facturação e clique em "Cancelar Assinatura". O cancelamento é efectivo no final do período actual.'
        },
        {
          id: 12,
          question: 'Há cobrança de taxas adicionais?',
          answer: 'Não há taxas escondidas. O valor mostrado é o valor final, incluindo todos os impostos aplicáveis.'
        }
      ]
    }
  ];

  const supportContacts = [
    {
      type: 'email',
      title: 'Suporte por Email',
      description: 'Resposta em até 4 horas',
      contact: 'suporte@minicloudmaker.ao',
      icon: '📧',
      color: 'blue'
    },
    {
      type: 'whatsapp',
      title: 'WhatsApp Business',
      description: 'Atendimento rápido',
      contact: '+244 923 456 789',
      icon: '💬',
      color: 'green'
    },
    {
      type: 'telefone',
      title: 'Telefone',
      description: 'Segunda a Sexta, 8h-18h',
      contact: '+244 222 123 456',
      icon: '📞',
      color: 'purple'
    },
    {
      type: 'emergencia',
      title: 'Emergência Técnica',
      description: 'Problemas críticos 24/7',
      contact: '+244 912 345 678',
      icon: '🚨',
      color: 'red'
    }
  ];

  const videoTutorials = [
    {
      id: 1,
      title: 'Introdução à Plataforma',
      duration: '15:23',
      category: 'Geral',
      thumbnail: '🎬',
      description: 'Aprenda a navegar e usar os recursos básicos'
    },
    {
      id: 2,
      title: 'Configuração da Oficina Inteligente',
      duration: '22:45',
      category: 'Módulos',
      thumbnail: '🔧',
      description: 'Configure seu fluxo de trabalho de reparos'
    },
    {
      id: 3,
      title: 'Gestão de Arquivos Avançada',
      duration: '18:12',
      category: 'Módulos',
      thumbnail: '📁',
      description: 'Domine a organização e partilha de arquivos'
    },
    {
      id: 4,
      title: 'Backup e Segurança',
      duration: '12:30',
      category: 'Técnico',
      thumbnail: '💾',
      description: 'Proteja seus dados com backup automático'
    }
  ];

  const allQuestions = faqCategories.flatMap(category => 
    category.questions.map(q => ({ ...q, category: category.id }))
  );

  const filteredQuestions = selectedCategory === 'todos' 
    ? allQuestions
    : allQuestions.filter(q => q.category === selectedCategory);

  const searchedQuestions = searchTerm
    ? filteredQuestions.filter(q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredQuestions;

  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (questionId) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  return (
    <Menu>
      <div className="max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🛟 Ajuda & Suporte
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Encontre respostas rápidas ou entre em contacto com nossa equipa
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Pesquisar na base de conhecimento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <span className="text-gray-400">🔍</span>
              </div>
            </div>
            <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap">
              Pesquisar
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          {[
            { id: 'faq', name: 'Perguntas Frequentes', icon: '❓' },
            { id: 'contactos', name: 'Contactos', icon: '📞' },
            { id: 'tutoriais', name: 'Tutoriais', icon: '🎬' },
            { id: 'documentacao', name: 'Documentação', icon: '📚' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Conteúdo das Tabs */}
        {activeTab === 'faq' && (
          <div className="space-y-8">
            {/* Categorias */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setSelectedCategory('todos')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === 'todos'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Todas as Categorias
              </button>
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>

            {/* Lista de Perguntas */}
            <div className="space-y-4">
              {searchedQuestions.length > 0 ? (
                searchedQuestions.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <button
                      onClick={() => toggleQuestion(item.id)}
                      className="w-full text-left p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex justify-between items-center"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">
                          {item.question}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {faqCategories.find(cat => cat.id === item.category)?.name}
                        </p>
                      </div>
                      <span className="text-gray-400 transform transition-transform duration-200">
                        {openQuestion === item.id ? '▲' : '▼'}
                      </span>
                    </button>
                    
                    {openQuestion === item.id && (
                      <div className="p-6 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-200 dark:border-gray-600">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {item.answer}
                        </p>
                        <div className="mt-4 flex gap-2">
                          <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
                            👍 Esta resposta foi útil
                          </button>
                          <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium">
                            👎 Preciso de mais ajuda
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Nenhum resultado encontrado
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Tente usar outros termos de pesquisa ou entre em contacto com o suporte
                  </p>
                </div>
              )}
            </div>

            {/* Ainda Precisa de Ajuda? */}
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
              <div className="flex items-center mb-4">
                <span className="text-2xl text-primary-600 dark:text-primary-400 mr-3">💬</span>
                <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-300">
                  Ainda precisa de ajuda?
                </h3>
              </div>
              <p className="text-primary-700 dark:text-primary-400 mb-4">
                Nossa equipa de suporte está pronta para ajudar você com questões específicas.
              </p>
              <button 
                onClick={() => setActiveTab('contactos')}
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Contactar Suporte
              </button>
            </div>
          </div>
        )}

        {activeTab === 'contactos' && (
          <div className="space-y-8">
            {/* Contactos de Suporte */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {supportContacts.map((contact, index) => (
                <div key={index} className={`bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200`}>
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{contact.icon}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${contact.color}-100 dark:bg-${contact.color}-900/20 text-${contact.color}-800 dark:text-${contact.color}-300`}>
                      {contact.type}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">
                    {contact.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {contact.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-gray-900 dark:text-white">
                      {contact.contact}
                    </span>
                    <button 
                      onClick={() => {
                        if (contact.type === 'email') {
                          window.location.href = `mailto:${contact.contact}`;
                        } else if (contact.type === 'whatsapp') {
                          window.open(`https://wa.me/${contact.contact.replace(/\D/g, '')}`, '_blank');
                        } else {
                          window.location.href = `tel:${contact.contact}`;
                        }
                      }}
                      className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Contactar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Formulário de Contacto */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                📝 Enviar Mensagem
              </h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nome
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Módulo Relacionado
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="">Selecionar módulo...</option>
                    <option value="oficina">Oficina Inteligente</option>
                    <option value="webhooks">Testador de Webhooks</option>
                    <option value="obras">Gestor de Obras</option>
                    <option value="escolas">Inspector Escolar</option>
                    <option value="vistoria">Sistema de Vistoria</option>
                    <option value="qualidade">Controlo de Qualidade</option>
                    <option value="studio">Estúdio de Mídia</option>
                    <option value="backup">Backup Automático</option>
                    <option value="files">Gestão de Arquivos</option>
                    <option value="geral">Plataforma Geral</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Assunto
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Descreva brevemente o assunto"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mensagem
                  </label>
                  <textarea
                    rows="6"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Descreva em detalhes sua dúvida ou problema..."
                  ></textarea>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Limpar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Enviar Mensagem
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'tutoriais' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoTutorials.map((tutorial) => (
                <div key={tutorial.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-200">
                  <div className="h-40 bg-gradient-to-br from-primary-500 to-blue-600 flex items-center justify-center text-white text-4xl">
                    {tutorial.thumbnail}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded text-xs font-medium">
                        {tutorial.category}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {tutorial.duration}
                      </span>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">
                      {tutorial.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {tutorial.description}
                    </p>
                    
                    <button className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-lg font-medium transition-colors">
                      Assistir Tutorial
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Playlists Recomendadas */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                🎯 Playlists Recomendadas
              </h3>
              
              <div className="space-y-4">
                {[
                  {
                    title: 'Começando do Zero',
                    videos: 8,
                    duration: '2h 15m',
                    progress: 65
                  },
                  {
                    title: 'Módulos Essenciais',
                    videos: 12,
                    duration: '3h 45m',
                    progress: 30
                  },
                  {
                    title: 'Dicas de Produtividade',
                    videos: 6,
                    duration: '1h 20m',
                    progress: 0
                  }
                ].map((playlist, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <span className="text-2xl mr-4">📺</span>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {playlist.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {playlist.videos} vídeos • {playlist.duration}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {playlist.progress > 0 && (
                        <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${playlist.progress}%` }}
                          ></div>
                        </div>
                      )}
                      <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        {playlist.progress > 0 ? 'Continuar' : 'Começar'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documentacao' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Guia de Instalação',
                  description: 'Configuração inicial da plataforma',
                  icon: '🚀',
                  pages: 15,
                  updated: '2024-01-15'
                },
                {
                  title: 'Manual do Utilizador',
                  description: 'Guia completo de utilização',
                  icon: '📖',
                  pages: 45,
                  updated: '2024-01-10'
                },
                {
                  title: 'API Reference',
                  description: 'Documentação técnica da API',
                  icon: '🔌',
                  pages: 28,
                  updated: '2024-01-08'
                },
                {
                  title: 'Boas Práticas',
                  description: 'Dicas para uso eficiente',
                  icon: '⭐',
                  pages: 12,
                  updated: '2024-01-05'
                },
                {
                  title: 'Troubleshooting',
                  description: 'Soluções para problemas comuns',
                  icon: '🔧',
                  pages: 20,
                  updated: '2024-01-03'
                },
                {
                  title: 'FAQ Técnica',
                  description: 'Perguntas técnicas frequentes',
                  icon: '❓',
                  pages: 18,
                  updated: '2024-01-01'
                }
              ].map((doc, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{doc.icon}</span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded text-xs font-medium">
                      {doc.pages} páginas
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">
                    {doc.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {doc.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
                    <span>Atualizado: {doc.updated}</span>
                    <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
                      Ler Documento →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Recursos Adicionais */}
            <div className="bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
              <div className="flex items-center mb-4">
                <span className="text-2xl text-primary-600 dark:text-primary-400 mr-3">📚</span>
                <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-300">
                  Recursos Adicionais
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 text-center">
                  <div className="text-2xl mb-2">📥</div>
                  <div className="font-medium text-gray-900 dark:text-white">Download PDFs</div>
                </button>
                
                <button className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 text-center">
                  <div className="text-2xl mb-2">🔄</div>
                  <div className="font-medium text-gray-900 dark:text-white">Changelog</div>
                </button>
                
                <button className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 text-center">
                  <div className="text-2xl mb-2">👥</div>
                  <div className="font-medium text-gray-900 dark:text-white">Comunidade</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Help */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Status do Sistema</h3>
              <span className="text-2xl">🟢</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Todos os sistemas operacionais normais
            </p>
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition-colors">
              Ver Status Completo
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Solicitar Treinamento</h3>
              <span className="text-2xl">🎓</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Agende sessões de treinamento personalizado
            </p>
            <button className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-lg font-medium transition-colors">
              Solicitar Agora
            </button>
          </div>
        </div>
      </div>
    </Menu>
  );
}