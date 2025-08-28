import React, { useState, useEffect } from "react";
import { cn } from "./lib/utils";

// Ícones do Lucide React (SEM DUPLICATAS)
import {
  Truck,
  Award,
  Shield,
  Clock,
  Target,
  Eye,
  Heart,
  Users,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Menu,
  X,
  Star,
  Navigation,
  Globe,
  Zap,
  TrendingUp,
} from "lucide-react";

// Constantes da empresa
const COMPANY_INFO = {
  name: 'T.C. Wilbert Transportes',
  phone: '5594992602233',
  phone2: '5594991141518',
  email: 'tcwilbert@gmail.com',
  address: {
    street: 'Rua Bernardo Sayão, 201',
    district: 'Centro',
    city: 'Dom Eliseu',
    state: 'PA',
    zipCode: '68633-000'
  },
  social: {
    whatsapp: 'https://wa.me/5594992602233',
    whatsapp2: 'https://wa.me/5594991141518'
  },
  founded: 2010,
  experience: new Date().getFullYear() - 2010
};

// Componentes UI inline
const Button = ({ children, className = "", onClick, type = "button", ...props }) => (
  <button
    type={type}
    onClick={onClick}
    className={cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

const Input = ({ className = "", ...props }) => (
  <input
    className={cn(
      "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
);

const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={cn(
      "flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
);

const Card = ({ children, className = "" }) => (
  <div className={cn("rounded-lg border bg-white shadow-sm", className)}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = "" }) => (
  <p className={cn("text-sm text-gray-600", className)}>
    {children}
  </p>
);

const CardContent = ({ children, className = "" }) => (
  <div className={cn("p-6 pt-0", className)}>
    {children}
  </div>
);

const Label = ({ children, className = "", htmlFor }) => (
  <label htmlFor={htmlFor} className={cn("text-sm font-medium leading-none", className)}>
    {children}
  </label>
);

// Utilitários
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerHeight = 80;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

function generateWhatsAppMessage(formData) {
  return `Olá! Gostaria de solicitar um orçamento.

*Dados do contato:*
Nome: ${formData.nome}
${formData.empresa ? `Empresa: ${formData.empresa}` : ''}
Telefone: ${formData.telefone}
Email: ${formData.email}

*Mensagem:*
${formData.mensagem || 'Gostaria de mais informações sobre os serviços de transporte.'}

Aguardo retorno!`;
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateBrazilianPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 11;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    empresa: '',
    telefone: '',
    email: '',
    mensagem: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.nome.trim()) {
      errors.nome = 'Nome é obrigatório';
    }
    
    if (!formData.telefone.trim()) {
      errors.telefone = 'Telefone é obrigatório';
    } else if (!validateBrazilianPhone(formData.telefone)) {
      errors.telefone = 'Formato de telefone inválido';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Formato de email inválido';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const message = generateWhatsAppMessage(formData);
    const whatsappUrl = `${COMPANY_INFO.social.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    setFormData({
      nome: '',
      empresa: '',
      telefone: '',
      email: '',
      mensagem: ''
    });
  };

  const handleMenuClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header fixo */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/90 backdrop-blur-md'
      }`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/logo-tcw.svg" alt="TCW Transportes" className="h-12 w-auto" />
            </div>
            
            {/* Menu Desktop */}
            <nav className="hidden md:flex space-x-6">
              {[
                { id: 'home', label: 'Home' },
                { id: 'quem-somos', label: 'Quem Somos' },
                { id: 'missao-visao', label: 'Missão & Visão' },
                { id: 'transportes', label: 'Serviços' },
                { id: 'contato', label: 'Contato' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Menu Mobile */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Menu Mobile Dropdown */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t pt-4">
              <div className="flex flex-col space-y-3">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'quem-somos', label: 'Quem Somos' },
                  { id: 'missao-visao', label: 'Missão & Visão' },
                  { id: 'transportes', label: 'Serviços' },
                  { id: 'contato', label: 'Contato' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className="text-left text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Home - Banner Principal */}
      <section id="home" className="pt-20 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900">
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="absolute top-20 right-10 opacity-10">
          <Truck className="h-64 w-64 text-white" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl text-white">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Segurança, 
                <span className="text-blue-400"> pontualidade</span> e 
                <span className="text-blue-400"> eficiência</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
                Há mais de {COMPANY_INFO.experience} anos conectando o Brasil com soluções 
                de transporte rodoviário de qualidade
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all h-auto"
                  onClick={() => scrollToSection('contato')}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Solicite um Orçamento
                </Button>
                <Button 
                  className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold h-auto bg-transparent border-2"
                  onClick={() => scrollToSection('quem-somos')}
                >
                  <Eye className="mr-2 h-5 w-5" />
                  Conheça Nossa História
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { number: `${COMPANY_INFO.experience}+`, label: 'Anos de Experiência' },
                  { number: '100%', label: 'Cargas Seguras' },
                  { number: '24h', label: 'Suporte Online' },
                  { number: 'Todo', label: 'Brasil' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quem Somos */}
      <section id="quem-somos" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Quem Somos
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  A <strong className="text-blue-600">T.C. Wilbert</strong> é uma empresa brasileira 
                  fundada em {COMPANY_INFO.founded}, em {COMPANY_INFO.address.city} – {COMPANY_INFO.address.state}, 
                  pela empresária <strong>Thaíse Cristina Wilbert</strong>.
                </p>
                <p>
                  Atuamos no <strong>transporte rodoviário de cargas secas</strong> em <strong>todo o Brasil</strong>, 
                  com experiência, responsabilidade e compromisso com a comunidade local.
                </p>
                <p>
                  Nossa trajetória é marcada pela dedicação em oferecer soluções logísticas 
                  eficientes, sempre priorizando a <strong className="text-blue-600">segurança</strong> e 
                  a <strong className="text-blue-600">pontualidade</strong> em cada entrega.
                </p>
                <p>
                  <strong className="text-blue-600">Cobertura Nacional:</strong> Atendemos todo o território brasileiro, 
                  com especialização nas rotas estratégicas entre <strong>Norte/Nordeste</strong> e <strong>Sudeste</strong>, 
                  facilitando o comércio e a logística entre essas regiões.
                </p>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
                {[
                  { icon: Shield, label: 'Certificação ANTT' },
                  { icon: Award, label: 'ISO 9001' },
                  { icon: CheckCircle, label: 'Seguro Total' }
                ].map((cert, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
                    <cert.icon className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">{cert.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <div className="text-center mb-6">
                  <img src="/brasil.svg" alt="Mapa do Brasil - Cobertura Nacional" className="w-64 h-64 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-blue-600">Cobertura Nacional</h4>
                  <p className="text-gray-600">Atendemos todo o território brasileiro</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: Truck, title: 'Frota Moderna', desc: 'Veículos atualizados e seguros' },
                    { icon: Globe, title: 'Presença Nacional', desc: 'Em todo o Brasil' },
                    { icon: Zap, title: 'Agilidade', desc: 'Entregas rápidas e eficientes' },
                    { icon: TrendingUp, title: 'Crescimento', desc: 'Expansão contínua dos serviços' }
                  ].map((feature, index) => (
                    <div key={index} className="text-center group">
                      <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <feature.icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section id="missao-visao" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">
            Missão, Visão e Valores
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <Card className="border-blue-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-600 text-2xl">
                  <Target className="mr-3 h-8 w-8" />
                  Nossa Missão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Proporcionar soluções eficientes e de alta qualidade no setor de transportes 
                  e comércio, garantindo segurança, pontualidade e satisfação total dos nossos clientes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-600 text-2xl">
                  <Eye className="mr-3 h-8 w-8" />
                  Nossa Visão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Ser reconhecida como referência no setor de transporte e comércio, 
                  expandindo nossa atuação e fortalecendo nossa presença nacional.
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Nossos Valores</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { icon: Star, title: 'Qualidade', desc: 'Excelência em todos os serviços' },
                { icon: Users, title: 'Atendimento', desc: 'Foco no cliente sempre' },
                { icon: Award, title: 'Respeito', desc: 'Valorização das pessoas' },
                { icon: Shield, title: 'Transparência', desc: 'Clareza em todas as relações' },
                { icon: Heart, title: 'Flexibilidade', desc: 'Adaptação às necessidades' }
              ].map((value, index) => (
                <div key={index} className="text-center group hover:-translate-y-2 transition-transform duration-300">
                  <div className="bg-blue-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-200 transition-colors shadow-lg">
                    <value.icon className="h-10 w-10 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2 text-lg">{value.title}</h4>
                  <p className="text-sm text-gray-600">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transportes e Rotas */}
      <section id="transportes" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">
            Transportes & Cobertura Nacional
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                Transporte Rodoviário de Cargas Secas
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Especializados no transporte intermunicipal e interestadual de cargas secas, 
                oferecemos soluções logísticas completas para empresas de todos os portes.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'Transporte intermunicipal',
                  'Transporte interestadual',
                  'Cargas secas diversas',
                  'Frota moderna e segura',
                  'Rastreamento em tempo real',
                  'Seguro total da carga'
                ].map((service, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <h4 className="text-xl font-bold text-gray-800 mb-6 text-center">
                  Por que escolher a T.C. Wilbert?
                </h4>
                <div className="space-y-4">
                  {[
                    { icon: Shield, title: 'Segurança Total', desc: 'Seguro completo para sua carga' },
                    { icon: Clock, title: 'Pontualidade', desc: 'Entregas sempre no prazo' },
                    { icon: Navigation, title: 'Rastreamento', desc: 'Acompanhe sua carga em tempo real' },
                    { icon: Phone, title: 'Suporte 24h', desc: 'Atendimento disponível sempre' }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                        <feature.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800">{feature.title}</h5>
                        <p className="text-sm text-gray-600">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Cobertura Nacional */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Cobertura Nacional
            </h3>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center">
                <img src="/brasil.svg" alt="Mapa do Brasil - Cobertura Nacional" className="w-80 h-80 mx-auto mb-6" />
                <h4 className="text-2xl font-bold text-blue-600 mb-4">Atendemos Todo o Brasil</h4>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Nossa rede de transporte cobre todo o território brasileiro, 
                  com especialização nas rotas estratégicas entre as regiões.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl border border-blue-200">
                  <h5 className="text-xl font-bold text-blue-800 mb-3 flex items-center">
                    <Navigation className="mr-3 h-6 w-6" />
                    Rotas Principais
                  </h5>
                  <p className="text-gray-700 mb-4">
                    <strong>Norte e Nordeste ↔ Sudeste:</strong> Nossas rotas mais frequentes 
                    conectam as regiões Norte e Nordeste com o Sudeste, facilitando o comércio 
                    e a logística entre essas áreas estratégicas.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white p-3 rounded-lg">
                      <div className="font-semibold text-blue-600">Norte → Sudeste</div>
                      <div className="text-gray-600">Pará, Amazonas → São Paulo, Rio</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <div className="font-semibold text-green-600">Nordeste → Sudeste</div>
                      <div className="text-gray-600">Bahia, Ceará → Minas, Espírito Santo</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-orange-200">
                  <h5 className="text-xl font-bold text-orange-800 mb-3 flex items-center">
                    <Globe className="mr-3 h-6 w-6" />
                    Cobertura Completa
                  </h5>
                  <p className="text-gray-700">
                    Além das rotas principais, atendemos <strong>todas as regiões do Brasil</strong>, 
                    incluindo Centro-Oeste e Sul, garantindo que sua carga chegue a qualquer destino 
                    com segurança e pontualidade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">
            Entre em Contato
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulário */}
            <div>
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800">
                    Solicite seu orçamento
                  </CardTitle>
                  <CardDescription>
                    Preencha o formulário e entraremos em contato via WhatsApp
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="nome" className="text-gray-700">Nome *</Label>
                      <Input
                        id="nome"
                        name="nome"
                        type="text"
                        required
                        value={formData.nome}
                        onChange={handleInputChange}
                        className={formErrors.nome ? 'border-red-500' : ''}
                        placeholder="Seu nome completo"
                      />
                      {formErrors.nome && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.nome}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="empresa" className="text-gray-700">Empresa</Label>
                      <Input
                        id="empresa"
                        name="empresa"
                        type="text"
                        value={formData.empresa}
                        onChange={handleInputChange}
                        placeholder="Nome da sua empresa (opcional)"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="telefone" className="text-gray-700">Telefone *</Label>
                      <Input
                        id="telefone"
                        name="telefone"
                        type="tel"
                        required
                        value={formData.telefone}
                        onChange={handleInputChange}
                        className={formErrors.telefone ? 'border-red-500' : ''}
                        placeholder="(00) 00000-0000"
                      />
                      {formErrors.telefone && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.telefone}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-gray-700">E-mail *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className={formErrors.email ? 'border-red-500' : ''}
                        placeholder="seu@email.com"
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="mensagem" className="text-gray-700">Mensagem</Label>
                      <Textarea
                        id="mensagem"
                        name="mensagem"
                        rows={4}
                        value={formData.mensagem}
                        onChange={handleInputChange}
                        placeholder="Descreva suas necessidades: origem, destino, tipo de carga, prazo..."
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold h-auto"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Enviar via WhatsApp
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Informações de Contato */}
            <div>
              <div className="space-y-8">
                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-800">
                      Informações de Contato
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
                        <Phone className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Telefones</h4>
                        <div className="space-y-1">
                          <p className="text-gray-600">(94) 99260-2233</p>
                          <p className="text-gray-600">(94) 99114-1518</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
                        <Mail className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">E-mail</h4>
                        <p className="text-gray-600">{COMPANY_INFO.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
                        <MapPin className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Endereço</h4>
                        <div className="text-gray-600 space-y-1">
                          <p>{COMPANY_INFO.address.street}</p>
                          <p>{COMPANY_INFO.address.district} – {COMPANY_INFO.address.city}/{COMPANY_INFO.address.state}</p>
                          <p>CEP: {COMPANY_INFO.address.zipCode}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-800">
                      <Clock className="mr-2 h-6 w-6" />
                      Horário de Atendimento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-gray-700">
                      <p><strong>Segunda a Sexta:</strong> 8h às 18h</p>
                      <p><strong>Sábado:</strong> 8h às 12h</p>
                      <div className="mt-4 p-3 bg-green-100 rounded-lg">
                        <p className="text-green-800 text-sm font-medium flex items-center">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Atendimento de emergência 24h via WhatsApp
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Truck className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">T.C. Wilbert Transportes</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Segurança, pontualidade e eficiência no transporte de cargas desde {COMPANY_INFO.founded}.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-blue-400">Contato</h4>
              <div className="space-y-2 text-gray-300">
                <p>(94) 99260-2233</p>
                <p>(94) 99114-1518</p>
                <p>{COMPANY_INFO.email}</p>
                <p>{COMPANY_INFO.address.city} - {COMPANY_INFO.address.state}</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-blue-400">Serviços</h4>
              <div className="space-y-2 text-gray-300">
                <p>Transporte Rodoviário</p>
                <p>Cargas Secas</p>
                <p>Intermunicipal</p>
                <p>Interestadual</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-blue-400">Cobertura Nacional</h4>
              <div className="space-y-2 text-gray-300">
                <p>Todo o Brasil</p>
                <p>Rotas Norte ↔ Sudeste</p>
                <p>Rotas Nordeste ↔ Sudeste</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} T.C. Wilbert Transportes. Todos os direitos reservados.</p>
            <p className="mt-2 text-sm">
              CNPJ: XX.XXX.XXX/XXXX-XX | Fundada em {COMPANY_INFO.founded}
            </p>
          </div>
        </div>
      </footer>

      {/* Botão WhatsApp Flutuante */}
      <a
        href={COMPANY_INFO.social.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 animate-bounce"
        title="Fale conosco no WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}

export default App;