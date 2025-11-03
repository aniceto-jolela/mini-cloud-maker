import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const modulesData = [
  {
    id: 'oficina',
    icon: '🧰',
    title: 'Oficina Inteligente',
    problem: "Clientes reclamam de prazos não cumpridos e custos extras?",
    problemDetail: "OFICINAS perdem em média 3-5 clientes por mês por falta de organização. Reparos demoram 40% mais tempo sem controle adequado.",
    solution: "Sistema que organiza reparos, controla peças e gera orçamentos automáticos.",
    result: "Aumente em 60% a eficiência e reduza conflitos com clientes",
    price: "150.000 Kz",
    permanent: "Licença permanente",
    testimonial: "“Antes perdía 2 horas por dia procurando peças. Agora tenho tudo controlado e os clientes confiam mais!” - Carlos, Oficina AutoPro",
    cta: "Organize sua oficina hoje"
  },
  {
    id: 'webhooks',
    icon: '🔄',
    title: 'Testador de Webhooks',
    problem: "Perde horas configurando túneis para testar APIs?",
    problemDetail: "DESENVOLVEDORES gastam 15-20 horas por projeto só para configurar ambientes de teste. Cada erro de webhook custa horas de debugging.",
    solution: "Túneis automáticos com Ngrok integrado + debugging visual em tempo real.",
    result: "Economize 80% do tempo em testes e reduza bugs em produção",
    price: "80.000 Kz",
    permanent: "Licença permanente", 
    testimonial: "“Testava webhooks em 3 horas, agora em 10 minutos! Indispensável para qualquer dev.” - Sara, TechLead Startup",
    cta: "Teste webhooks em minutos"
  },
  {
    id: 'obras',
    icon: '🏗️',
    title: 'Gestor de Obras',
    problem: "Clientes questionam o progresso e custos da obra?",
    problemDetail: "EMPREITEIROS têm em média 2-3 conflitos por obra por falta de documentação. 30% das obras têm custos extras não previstos.",
    solution: "Registo fotográfico diário + relatórios automáticos para clientes.",
    result: "Elimine conflitos e ganhe a confiança total dos clientes",
    price: "180.000 Kz",
    permanent: "Licença permanente",
    testimonial: "“Meus clientes agora acompanham a obra em tempo real. Zero conflitos desde que implementei!” - Manuel, Construtor Civil",
    cta: "Documente sua obra agora"
  },
  {
    id: 'escolas',
    icon: '🏫',
    title: 'Inspector Escolar',
    problem: "Preparar documentação para AGT é um pesadelo?",
    problemDetail: "ESCOLAS levam 2-3 semanas para preparar documentação para inspeções. 40% têm problemas por falta de documentos organizados.",
    solution: "Checklists pré-configurados + relatórios automáticos para AGT.",
    result: "Prepare inspeções em horas, não semanas",
    price: "160.000 Kz",
    permanent: "Licença permanente",
    testimonial: "“A última inspeção da AGT foi a mais rápida da história da escola. Tudo organizado digitalmente!” - Dra. Luísa, Directora Escolar",
    cta: "Simplifique suas inspeções"
  },
  {
    id: 'vistoria',
    icon: '🚗',
    title: 'Sistema de Vistoria',
    problem: "Prejuízos com danos não documentados em veículos?",
    problemDetail: "SEGURADORAS perdem em média 500.000 Kz/mês com sinistros não documentados. Processos de vistoria demoram 5-7 dias.",
    solution: "Vistorias digitais com assinatura + relatórios automáticos.",
    result: "Reduza prejuízos em 70% e agilize processos em 80%",
    price: "140.000 Kz",
    permanent: "Licença permanente",
    testimonial: "“Antes tínhamos 3 conflitos por semana com clientes. Agora, com as vistorias digitais, quase zero!” - Ricardo, Gestor Rent-a-Car",
    cta: "Elimine prejuízos agora"
  },
  {
    id: 'qualidade',
    icon: '🍽️',
    title: 'Controlo de Qualidade',
    problem: "Clientes duvidam da qualidade e higiene do seu serviço?",
    problemDetail: "RESTAURANTES perdem 15-20% de clientes corporativos por falta de certificação de qualidade. Inspeções sanitárias causam stress.",
    solution: "Checklists HACCP digitais + certificados de qualidade automáticos.",
    result: "Ganhe a confiança total dos clientes e passe em inspeções facilmente",
    price: "110.000 Kz",
    permanent: "Licença permanente",
    testimonial: "“Conseguimos o contrato com uma multinacional graças aos nossos certificados digitais de qualidade!” - Chef João, Restaurante Premium",
    cta: "Certifique sua qualidade"
  },
  {
    id: 'studio',
    icon: '🎥',
    title: 'Estúdio de Mídia',
    problem: "Perde tempo organizando arquivos e entregando para clientes?",
    problemDetail: "FOTÓGRAFOS gastam 8-10 horas/semana só organizando arquivos. Clientes reclamam da demora na entrega.",
    solution: "Organização automática + galeria online + partilha instantânea.",
    result: "Entregue trabalhos 3x mais rápido e impressione seus clientes",
    price: "120.000 Kz",
    permanent: "Licença permanente",
    testimonial: "“Antes demorava 2 dias para entregar um casamento. Agora em 2 horas! Os clientes adoram.” - Pedro, Fotógrafo Profissional",
    cta: "Organize seu portfólio"
  },
  {
    id: 'backup',
    icon: '📂',
    title: 'Backup Automático',
    problem: "Já perdeu dados importantes por falta de backup?",
    problemDetail: "70% das PMEs que perdem dados críticos fecham em 1 ano. A recuperação manual custa em média 300.000 Kz.",
    solution: "Backup automático + recuperação garantida + criptografia.",
    result: "Proteja seu negócio contra perda de dados para sempre",
    price: "100.000 Kz",
    permanent: "Licença permanente", 
    testimonial: "“Um incêndio destruiu nossos arquivos, mas recuperamos tudo em horas graças ao backup automático!” - Maria, Contabilista",
    cta: "Proteja seus dados hoje"
  },
  {
    id: 'files',
    icon: '📦',
    title: 'Gestão de Arquivos',
    problem: "Sua equipa perde tempo procurando documentos?",
    problemDetail: "Funcionários gastam em média 1,5 horas/dia procurando arquivos. 25% dos documentos são perdidos ou duplicados.",
    solution: "Centralização inteligente + pesquisa instantânea + controle de versões.",
    result: "Aumente a produtividade da equipa em 40%",
    price: "130.000 Kz",
    permanent: "Licença permanente",
    testimonial: "“Encontrar documentos era um caos. Agora em segundos! A equipa está muito mais produtiva.” - Eng. Costa, Empresa de Engenharia",
    cta: "Organize seus documentos"
  }
];

export default function Landing() {
  const [activeModule, setActiveModule] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const nextModule = () => {
    setActiveModule((prev) => (prev + 1) % modulesData.length);
  };

  const prevModule = () => {
    setActiveModule((prev) => (prev - 1 + modulesData.length) % modulesData.length);
  };

  const currentModule = modulesData[activeModule];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="border-b border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-primary-200/50 transition-all duration-300">
                <span className="text-white font-bold text-lg">☁️</span>
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-gray-900 to-primary-600 dark:from-white dark:to-primary-400 bg-clip-text text-transparent">
                Mini Cloud Maker
              </span>
            </div>
            
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setShowVideoModal(true)}
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200 flex items-center"
              >
                <span className="mr-2">🎬</span>
                Ver Demo
              </button>
              <Link
                to="/pricing"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200"
              >
                Planos
              </Link>
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
                Testar Grátis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section com Problema/Solução */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-gray-900/5 dark:bg-grid-gray-100/5 bg-[size:20px_20px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 mb-8">
              <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                🚀 9 Soluções Específicas para Problemas Reais do Mercado Angolano
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Pare de perder
              <span className="block bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent">
                dinheiro e tempo
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Cada minuto que você <span className="text-red-500 font-semibold">não resolve</span> esses problemas 
              está a <span className="text-red-500 font-semibold">custar dinheiro ao seu negócio</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/register"
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
              >
                🚀 Resolver Meus Problemas Agora
              </Link>
              <button
                onClick={() => setShowVideoModal(true)}
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 group"
              >
                <span className="flex items-center">
                  📹 Ver Como Funciona
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </span>
              </button>
            </div>

            {/* Social Proof */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {[
                { number: '500+', label: 'Problemas Resolvidos' },
                { number: '9', label: 'Soluções Especializadas' },
                { number: '100%', label: 'Dados no Seu Controlo' },
                { number: '0', label: 'Mensalidades Obrigatórias' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel de Módulos com Problema/Solução */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header do Carousel */}
            <div className="bg-gradient-to-r from-primary-500 to-blue-600 p-6 text-black">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {currentModule.title}
                  </h2>
                  <p className="text-primary-100">
                    {currentModule.problem}
                  </p>
                </div>
                <div className="text-4xl">
                  {currentModule.icon}
                </div>
              </div>
            </div>

            {/* Conteúdo do Carousel */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Lado Esquerdo - Problema */}
                <div className="space-y-6">
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold">❌</span>
                      </div>
                      <h3 className="text-xl font-bold text-red-800 dark:text-red-200">
                        O Problema que Você Enfrenta
                      </h3>
                    </div>
                    <p className="text-red-700 dark:text-red-300 mb-4">
                      {currentModule.problemDetail}
                    </p>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-red-200 dark:border-red-700">
                      <p className="text-sm text-red-600 dark:text-red-400 font-semibold">
                        💸 <strong>Custo Estimado:</strong> Este problema está a custar ao seu negócio entre 50.000 - 500.000 Kz por mês
                      </p>
                    </div>
                  </div>

                  {/* Testemunho */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6">
                    <div className="flex items-start">
                      <span className="text-2xl mr-4">💬</span>
                      <div>
                        <p className="text-gray-600 dark:text-gray-300 italic mb-2">
                          {currentModule.testimonial}
                        </p>
                        <div className="flex items-center">
                          <div className="flex space-x-1 text-yellow-400">
                            {'★'.repeat(5)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lado Direito - Solução */}
                <div className="space-y-6">
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold">✅</span>
                      </div>
                      <h3 className="text-xl font-bold text-green-800 dark:text-green-200">
                        Nossa Solução
                      </h3>
                    </div>
                    <p className="text-green-700 dark:text-green-300 mb-4">
                      {currentModule.solution}
                    </p>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-green-200 dark:border-green-700">
                      <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
                        🎯 <strong>Resultado Garantido:</strong> {currentModule.result}
                      </p>
                    </div>
                  </div>

                  {/* CTA Box */}
                  <div className="bg-gradient-to-r from-primary-500 to-blue-600 rounded-2xl p-6 text-black">
                    <h3 className="text-xl font-bold mb-2">
                      Resolva Este Problema Hoje
                    </h3>
                    <p className="text-primary-100 mb-4">
                      Licença permanente - Instale na sua máquina
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-bold">
                        {currentModule.price}
                      </span>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                        {currentModule.permanent}
                      </span>
                    </div>
                    <Link
                      to="/register"
                      className="block w-full bg-white text-primary-600 text-center py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105"
                    >
                      {currentModule.cta}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Navegação do Carousel */}
              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={prevModule}
                  className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                  Anterior
                </button>
                
                <div className="flex space-x-2">
                  {modulesData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveModule(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === activeModule
                          ? 'bg-primary-500'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextModule}
                  className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Próximo
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Urgência */}
      <section className="py-16 bg-gradient-to-r from-red-500 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ⏰ Cada Dia que Espera está a Custa Dinheiro
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Os problemas que você enfrenta hoje não vão resolver-se sozinhos. 
            <strong> Amanhã serão maiores e mais caros.</strong>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { icon: '💸', text: 'Perdas Financeiras Diárias' },
              { icon: '😤', text: 'Clientes Insatisfeitos' },
              { icon: '⏳', text: 'Tempo Perdido para Sempre' }
            ].map((item, index) => (
              <div key={index} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="font-semibold">{item.text}</p>
              </div>
            ))}
          </div>
          <Link
            to="/register"
            className="inline-flex items-center bg-white text-red-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-white/25"
          >
            🚀 Resolver Tudo Agora - Testar Grátis
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </Link>
        </div>
      </section>

      {/* Seção de Garantia */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl p-8 border-2 border-green-200 dark:border-green-800">
            <div className="text-4xl mb-4">🛡️</div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Garantia de 30 Dias ou seu Dinheiro de Volta
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              Se em 30 dias você não resolver pelo menos <strong>3 dos problemas</strong> que enfrenta hoje, 
              devolvemos 100% do seu dinheiro. Sem perguntas.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
              <div className="flex items-center text-green-600 dark:text-green-400">
                <span className="mr-2">✅</span>
                Zero risco para você
              </div>
              <div className="flex items-center text-green-600 dark:text-green-400">
                <span className="mr-2">✅</span>
                Resultados garantidos
              </div>
              <div className="flex items-center text-green-600 dark:text-green-400">
                <span className="mr-2">✅</span>
                Suporte incluído
              </div>
              <div className="flex items-center text-green-600 dark:text-green-400">
                <span className="mr-2">✅</span>
                Licença permanente
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Está Pronto para Resolver Seus Problemas de Vez?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            <strong>9 soluções específicas</strong> para problemas reais do mercado Angolano. 
            <br />
            <span className="text-primary-600 dark:text-primary-400">Licenças permanentes</span> - Instalação na sua infraestrutura.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="bg-gradient-to-r from-primary-500 to-blue-600 hover:from-primary-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-primary-500/25"
            >
              🚀 Começar Agora - Testar Grátis
            </Link>
            <Link
              to="/pricing"
              className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
            >
              Ver Todos os Planos
            </Link>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mt-4 text-sm">
            ⚡ Configure em 5 minutos • 📦 Dados 100% no seu controlo • 💰 Zero mensalidades obrigatórias
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">☁️</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              © 2025 Mini Cloud Maker. Resolvendo problemas reais do mercado Angolano.
            </p>
          </div>
        </div>
      </footer>

      {/* Modal de Video */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                🎬 Veja Como Funciona em 2 Minutos
              </h3>
              <button
                onClick={() => setShowVideoModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎥</div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Demo em vídeo mostrando como resolver problemas em minutos
                </p>
                <Link
                  to="/register"
                  className="inline-flex items-center bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Testar na Prática Agora
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}