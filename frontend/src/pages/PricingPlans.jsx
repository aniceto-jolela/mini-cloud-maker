import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const licensingModels = [
  {
    type: 'MODULAR',
    title: 'Licença Modular',
    description: 'Compre apenas os módulos que precisa',
    icon: '🧩',
    color: 'blue'
  },
  {
    type: 'COMPLETE',
    title: 'Suite Completa',
    description: 'Todos os módulos com desconto',
    icon: '🚀',
    color: 'primary'
  },
  {
    type: 'ENTERPRISE',
    title: 'Enterprise',
    description: 'Solução corporativa personalizada',
    icon: '🏢',
    color: 'purple'
  }
];

const modules = [
  {
    id: 'oficina',
    name: '🧰 Oficina Inteligente',
    description: 'Sistema completo de reparos e gestão técnica',
    problem: "OFICINAS perdem controle de reparos, orçamentos e peças. Clientes reclamam de prazos e custos extras.",
    solution: "Gestão automatizada de reparos, controle de inventário e relatórios profissionais.",
    basePrice: 150000,
    features: [
      'Gestão de reparos e ordens de serviço',
      'Controle de inventário e peças',
      'Relatórios técnicos automáticos',
      'Agendamento de serviços',
      'Histórico de clientes',
      'Faturação integrada',
      'App móvel para técnicos',
      'Backup local dos dados'
    ],
    target: 'Oficinas mecânicas, técnicos independentes',
    icon: '🔧'
  },
  {
    id: 'studio',
    name: '🎥 Estúdio de Mídia',
    description: 'Gestão profissional de conteúdo multimídia',
    problem: "FOTÓGRAFOS e criadores perdem tempo organizando arquivos. Clientes reclamam da demora na entrega.",
    solution: "Organização automática, galeria online e partilha rápida com clientes.",
    basePrice: 120000,
    features: [
      'Upload em lote de imagens/vídeos',
      'Compressão automática',
      'Watermark digital',
      'CDN local integrado',
      'Galeria organizada',
      'Links de partilha',
      'Pré-visualização online',
      'Metadados automáticos'
    ],
    target: 'Fotógrafos, videógrafos, agências',
    icon: '📸'
  },
  {
    id: 'backup',
    name: '📂 Backup Automático',
    description: 'Solução completa de backup e recuperação',
    problem: "EMPRESAS perdem dados importantes por falta de backup. Recuperação é difícil e cara.",
    solution: "Backup automático, recuperação garantida e segurança dos dados.",
    basePrice: 100000,
    features: [
      'Backup automático programado',
      'Recuperação ponto-a-ponto',
      'Criptografia AES-256',
      'Monitorização em tempo real',
      'Relatórios de integridade',
      'Backup incremental',
      'Restauro seletivo',
      'Notificações de alerta'
    ],
    target: 'Todas as empresas com dados críticos',
    icon: '💾'
  },
  {
    id: 'files',
    name: '📦 Gestão de Arquivos',
    description: 'Sistema empresarial de gestão documental',
    problem: "EMPRESAS perdem documentos importantes. Colaboração entre equipas é ineficiente.",
    solution: "Centralização de documentos, controle de versões e partilha segura.",
    basePrice: 130000,
    features: [
      'Gestão de versões',
      'Partilha segura de links',
      'Controlo de permissões',
      'Pesquisa inteligente',
      'Workflow de aprovação',
      'Colaboração em equipa',
      'Histórico de alterações',
      'Integração Office'
    ],
    target: 'Empresas de todos os tamanhos',
    icon: '📁'
  },
  // NOVOS MÓDULOS
  {
    id: 'webhooks',
    name: '🔄 Testador de Webhooks',
    description: 'Ferramenta essencial para desenvolvedores',
    problem: "DESENVOLVEDORES perdem horas configurando túneis para testar webhooks. Desenvolvimento fica mais lento.",
    solution: "Túneis automáticos, testes em tempo real e debugging simplificado.",
    basePrice: 80000,
    features: [
      'Túneis automáticos (Ngrok integrado)',
      'Teste de webhooks em tempo real',
      'Histórico de requests',
      'Debugging visual',
      'Suporte a múltiplos endpoints',
      'Payload validation',
      'Mock de responses',
      'Integração com APIs populares'
    ],
    target: 'Desenvolvedores, startups tech',
    icon: '⚡'
  },
  {
    id: 'obras',
    name: '🏗️ Gestor de Obras',
    description: 'Sistema completo para construção civil',
    problem: "EMPREITEIROS têm conflitos com clientes sobre progresso e custos. Documentação é falha.",
    solution: "Registo fotográfico, controle de etapas e relatórios automáticos para clientes.",
    basePrice: 180000,
    features: [
      'Registo fotográfico diário',
      'Controle de etapas da obra',
      'Gestão de materiais e custos',
      'Relatórios automáticos para clientes',
      'Checklist de qualidade',
      'App para mestres de obra',
      'Armazenamento de projetos',
      'Relatórios para financiadores'
    ],
    target: 'Empreiteiros, construtoras, mestres de obra',
    icon: '👷'
  },
  {
    id: 'escolas',
    name: '🏫 Inspector Escolar',
    description: 'Sistema de inspeção para escolas privadas',
    problem: "ESCOLAS têm dificuldade em documentar infraestrutura para AGT e investidores. Inspeções são stressantes.",
    solution: "Checklists digitais, documentação organizada e relatórios prontos para inspeções.",
    basePrice: 160000,
    features: [
      'Checklists de inspeção pré-configurados',
      'Documentação fotográfica das instalações',
      'Relatórios automáticos para AGT',
      'Gestão de certificados e licenças',
      'Controle de equipamentos',
      'App para inspectores',
      'Backup de documentação legal',
      'Modelos para captação de investimento'
    ],
    target: 'Escolas privadas, colégios, universidades',
    icon: '📚'
  },
  {
    id: 'vistoria',
    name: '🚗 Sistema de Vistoria',
    description: 'Solução para seguradoras e rent-a-car',
    problem: "SEGURADORAS e rent-a-car têm prejuízos com danos não documentados. Processos demoram semanas.",
    solution: "Vistorias digitais, relatórios automáticos e redução de conflitos.",
    basePrice: 140000,
    features: [
      'Vistorias fotográficas digitais',
      'Relatórios automáticos com assinatura',
      'App para vistoriadores',
      'Comparação antes/depois',
      'Gestão de sinistros',
      'Integração com sistemas existentes',
      'Armazenamento seguro de provas',
      'Relatórios para tribunais'
    ],
    target: 'Seguradoras, rent-a-car, leasing',
    icon: '🚘'
  },
  {
    id: 'qualidade',
    name: '🍽️ Controlo de Qualidade',
    description: 'Sistema para restaurantes e catering',
    problem: "RESTAURANTES e catering perdem clientes por falta de provas de qualidade. Inspeções sanitárias são críticas.",
    solution: "Checklists de higiene, registo fotográfico e certificação digital de qualidade.",
    basePrice: 110000,
    features: [
      'Checklists de higiene HACCP',
      'Registo de temperaturas e validades',
      'Certificados de qualidade digitais',
      'App para supervisores',
      'Alertas de validade',
      'Relatórios para clientes corporativos',
      'Gestão de fornecedores',
      'Documentação para inspeções sanitárias'
    ],
    target: 'Restaurantes, catering, hotelaria',
    icon: '⭐'
  }
];

const supportPlans = [
  {
    name: 'Básico',
    price: 50000,
    period: '/ano',
    description: 'Para pequenas empresas',
    features: [
      'Suporte por email',
      'Actualizações de segurança',
      'Documentação online',
      'Comunidade de suporte',
      '8h de resposta'
    ]
  },
  {
    name: 'Profissional',
    price: 120000,
    period: '/ano',
    description: 'Para negócios em crescimento',
    popular: true,
    features: [
      '✅ Todos os recursos Básico',
      'Suporte telefónico',
      'Actualizações de funcionalidades',
      '4h de resposta',
      '1 sessão de formação/mês',
      'Backup de configuração'
    ]
  },
  {
    name: 'Enterprise',
    price: 250000,
    period: '/ano',
    description: 'Para missão crítica',
    features: [
      '✅ Todos os recursos Profissional',
      'Suporte 24/7',
      '1h de resposta crítica',
      'Gestor de conta dedicado',
      '4 sessões de formação/mês',
      'Monitorização proativa',
      'Relatórios personalizados'
    ]
  }
];

const implementationServices = [
  {
    name: 'Instalação Básica',
    price: 75000,
    description: 'Configuração inicial do sistema',
    features: [
      'Instalação do MinIO',
      'Configuração da plataforma',
      '1 módulo básico',
      '2h de formação',
      'Documentação técnica'
    ]
  },
  {
    name: 'Implementação Completa',
    price: 150000,
    description: 'Implementação total da solução',
    popular: true,
    features: [
      '✅ Todos os recursos Básico',
      'Até 4 módulos',
      'Migração de dados',
      '8h de formação',
      'Configuração de backup',
      'Suporte pós-implantação (30 dias)'
    ]
  },
  {
    name: 'Implementação Enterprise',
    price: 300000,
    description: 'Solução corporativa completa',
    features: [
      '✅ Todos os recursos Completo',
      'Módulos ilimitados',
      'Integrações personalizadas',
      '16h de formação',
      'Configuração de alta disponibilidade',
      'Suporte dedicado (60 dias)'
    ]
  }
];

// Categorias para organização
const moduleCategories = [
  {
    name: 'Gestão Empresarial',
    modules: ['oficina', 'files', 'backup']
  },
  {
    name: 'Soluções Especializadas', 
    modules: ['obras', 'escolas', 'vistoria', 'qualidade']
  },
  {
    name: 'Ferramentas Técnicas',
    modules: ['studio', 'webhooks']
  }
];

export default function Pricing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedModel, setSelectedModel] = React.useState('MODULAR');
  const [selectedModules, setSelectedModules] = React.useState([]);
  const [selectedSupport, setSelectedSupport] = React.useState(null);
  const [selectedImplementation, setSelectedImplementation] = React.useState(null);
  const [activeCategory, setActiveCategory] = React.useState('all');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const filteredModules = activeCategory === 'all' 
    ? modules 
    : modules.filter(module => 
        moduleCategories.find(cat => cat.name === activeCategory)?.modules.includes(module.id)
      );

  const calculateTotal = () => {
    let total = 0;

    if (selectedModel === 'MODULAR') {
      selectedModules.forEach(moduleId => {
        const module = modules.find(m => m.id === moduleId);
        if (module) total += module.basePrice;
      });
    } else if (selectedModel === 'COMPLETE') {
      // Suite completa com 25% de desconto (aumentado de 20% para 25%)
      total = modules.reduce((sum, module) => sum + module.basePrice, 0) * 0.75;
    }

    if (selectedImplementation) {
      const implementation = implementationServices.find(s => s.name === selectedImplementation);
      if (implementation) total += implementation.price;
    }

    if (selectedSupport) {
      const support = supportPlans.find(s => s.name === selectedSupport);
      if (support) total += support.price;
    }

    return total;
  };

  const handleModuleToggle = (moduleId) => {
    setSelectedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleCheckout = () => {
    const order = {
      model: selectedModel,
      modules: selectedModules,
      support: selectedSupport,
      implementation: selectedImplementation,
      total: calculateTotal()
    };
    
    if (user) {
      navigate('/payment', { state: { order } });
    } else {
      navigate('/register', { state: { order } });
    }
  };

  const getModelColor = (modelType) => {
    const colors = {
      MODULAR: 'from-blue-50 to-cyan-50 border-blue-200 dark:from-blue-900/20 dark:to-cyan-900/20 dark:border-blue-700',
      COMPLETE: 'from-primary-50 to-green-50 border-primary-200 dark:from-primary-900/20 dark:to-green-900/20 dark:border-primary-700',
      ENTERPRISE: 'from-purple-50 to-pink-50 border-purple-200 dark:from-purple-900/20 dark:to-pink-900/20 dark:border-purple-700'
    };
    return colors[modelType] || colors.MODULAR;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="border-b border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-primary-200/50 transition-all duration-300">
                <span className="text-white font-bold text-lg">☁️</span>
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-gray-900 to-primary-600 dark:from-white dark:to-primary-400 bg-clip-text text-transparent">
                Mini Cloud Maker
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200"
              >
                Entrar
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-primary-500 to-blue-600 hover:from-primary-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-primary-500/25"
              >
                Demo Grátis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 mb-8">
              <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                🚀 9 Módulos Especializados - Sua infraestrutura, seu controlo total
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Soluções que resolvem
              <span className="block bg-gradient-to-r from-primary-600 to-blue-600 dark:from-primary-400 dark:to-blue-400 bg-clip-text text-transparent">
                problemas reais
              </span>
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
              Cada módulo foi criado para resolver uma dor específica do mercado Angolano. 
              <span className="font-semibold text-primary-600 dark:text-primary-400"> Licenças permanentes </span>
              + suporte opcional. Instale na sua infraestrutura e mantenha o controlo total.
            </p>
          </div>

          {/* Modelos de Licenciamento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {licensingModels.map((model) => (
              <button
                key={model.type}
                onClick={() => setSelectedModel(model.type)}
                className={`p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
                  selectedModel === model.type
                    ? `${getModelColor(model.type)} shadow-2xl scale-105`
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg'
                }`}
              >
                <div className="text-3xl mb-4">{model.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {model.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {model.description}
                </p>
                {model.type === 'COMPLETE' && (
                  <div className="text-sm text-green-600 font-semibold">
                    🎁 25% de desconto em todos os 9 módulos
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Filtro de Categorias */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'all'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Todos os Módulos
            </button>
            {moduleCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.name
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Módulos */}
          {(selectedModel === 'MODULAR' || selectedModel === 'COMPLETE') && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                {selectedModel === 'COMPLETE' ? 'Suite Completa Inclui Todos os 9 Módulos:' : 'Escolha os Módulos que Precisa'}
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredModules.map((module) => (
                  <div
                    key={module.id}
                    className={`bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 transition-all duration-300 ${
                      selectedModel === 'COMPLETE' || selectedModules.includes(module.id)
                        ? 'border-primary-500 shadow-lg'
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{module.icon}</span>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {module.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {module.target}
                          </p>
                        </div>
                      </div>
                      
                      {selectedModel === 'MODULAR' && (
                        <button
                          onClick={() => handleModuleToggle(module.id)}
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                            selectedModules.includes(module.id)
                              ? 'bg-primary-500 border-primary-500 text-white'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          {selectedModules.includes(module.id) && '✓'}
                        </button>
                      )}
                    </div>
                    
                    {/* Problema & Solução */}
                    <div className="mb-4">
                      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 mb-2">
                        <p className="text-xs text-red-700 dark:text-red-300 font-medium">
                          ❌ <strong>Problema:</strong> {module.problem}
                        </p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                        <p className="text-xs text-green-700 dark:text-green-300 font-medium">
                          ✅ <strong>Solução:</strong> {module.solution}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {module.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                        {formatCurrency(module.basePrice)}
                      </span>
                      {selectedModel === 'COMPLETE' && (
                        <span className="text-sm text-green-600 bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded">
                          🎁 25% desconto
                        </span>
                      )}
                    </div>

                    <ul className="space-y-2">
                      {module.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                      {module.features.length > 4 && (
                        <li className="text-xs text-gray-500 dark:text-gray-500">
                          + {module.features.length - 4} mais funcionalidades...
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Enterprise */}
          {selectedModel === 'ENTERPRISE' && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 border-2 border-purple-200 dark:border-purple-700 mb-12">
              <div className="text-center">
                <div className="text-4xl mb-4">🏢</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Solução Enterprise Personalizada
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                  Para grandes corporações com necessidades específicas. Inclui customizações, 
                  integrações, treinamento dedicado e suporte premium.
                </p>
                <button
                  onClick={() => window.open('mailto:comercial@minicloudmaker.ao?subject=Consulta Enterprise - 9 Módulos')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200"
                >
                  📞 Solicitar Proposta Personalizada
                </button>
              </div>
            </div>
          )}

          {/* Serviços de Implementação */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Serviços de Implementação
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {implementationServices.map((service, index) => (
                <div
                  key={index}
                  className={`bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 transition-all duration-300 cursor-pointer ${
                    selectedImplementation === service.name
                      ? 'border-primary-500 shadow-lg'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                  }`}
                  onClick={() => setSelectedImplementation(
                    selectedImplementation === service.name ? null : service.name
                  )}
                >
                  {service.popular && (
                    <div className="inline-block bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                      ⭐ Recomendado
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {service.name}
                  </h3>
                  
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                    {formatCurrency(service.price)}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Planos de Suporte */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Planos de Suporte (Opcional)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {supportPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 transition-all duration-300 cursor-pointer ${
                    selectedSupport === plan.name
                      ? 'border-primary-500 shadow-lg'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                  }`}
                  onClick={() => setSelectedSupport(
                    selectedSupport === plan.name ? null : plan.name
                  )}
                >
                  {plan.popular && (
                    <div className="inline-block bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                      ⭐ Popular
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  
                  <div className="flex items-baseline mb-4">
                    <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {formatCurrency(plan.price)}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">
                      {plan.period}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {plan.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-primary-500 shadow-lg sticky bottom-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Resumo do Pedido
                </h3>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  {selectedModel === 'MODULAR' && (
                    <span>{selectedModules.length} módulo(s) selecionado(s) de 9 disponíveis</span>
                  )}
                  {selectedModel === 'COMPLETE' && (
                    <span>Suite Completa (9 módulos) - 25% desconto</span>
                  )}
                  {selectedModel === 'ENTERPRISE' && (
                    <span>Solução Enterprise Personalizada</span>
                  )}
                  {selectedImplementation && ` + Implementação ${selectedImplementation}`}
                  {selectedSupport && ` + Suporte ${selectedSupport}`}
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {selectedModel === 'ENTERPRISE' ? 'Sob Consulta' : formatCurrency(calculateTotal())}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedModel !== 'ENTERPRISE' ? 'Licença permanente' : 'Proposta personalizada'}
                  </div>
                </div>
                
                <button
                  onClick={handleCheckout}
                  disabled={selectedModel === 'MODULAR' && selectedModules.length === 0}
                  className="bg-gradient-to-r from-primary-500 to-blue-600 hover:from-primary-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  {selectedModel === 'ENTERPRISE' ? 'Solicitar Proposta' : 'Continuar para Pagamento'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200/50 dark:border-gray-700/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © 2025 Mini Cloud Maker. 9 módulos especializados - Licenças permanentes - Instalação na sua infraestrutura.
          </p>
        </div>
      </footer>
    </div>
  );
}