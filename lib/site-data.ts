import {
  Archive,
  BadgeCheck,
  BookOpen,
  Boxes,
  Building2,
  CalendarClock,
  ClipboardCheck,
  Headphones,
  Mail,
  MapPin,
  MessageCircle,
  PackageCheck,
  PenTool,
  Phone,
  Printer,
  Recycle,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";

export const site = {
  name: "ADIKI ALVANIR Angola",
  shortName: "ADIKI ALVANIR",
  description:
    "Comércio e distribuição de material gastável de escritório para empresas, instituições e equipas em Angola.",
  url: "https://adikialvanirangola.com",
  phone: "+244 936 080 173",
  phone2: "+244 936 079 317",
  whatsapp: "244936080173",
  email: "comercial@adikialvanir.co.ao",
  address: "Avenida 4 de Fevereiro, Bairro Ingombota, Nº 23, Município de Ingombota, Luanda, Angola",
  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com"
  }
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Sobre nós", href: "/sobre" },
  { label: "Produtos", href: "/produtos" },
  { label: "Serviços", href: "/servicos" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" }
];

export const imageLibrary = {
  hero: "/brand/adiki-logo-gold.png",
  office: "/brand/adiki-logo-gold.png",
  meeting: "/brand/adiki-logo-gold.png",
  logistics: "/brand/adiki-logo-gold.png",
  supplies: "/brand/adiki-logo-gold.png",
  desk: "/brand/adiki-logo-gold.png",
  business: "/brand/adiki-logo-gold.png",
  team: "/brand/adiki-logo-gold.png",
  archive: "/brand/adiki-logo-gold.png",
  cleaning: "/brand/adiki-logo-gold.png",
  equipment: "/brand/adiki-logo-gold.png",
  school: "/brand/adiki-logo-gold.png",
  ink: "/brand/adiki-logo-gold.png",
  paperPremium: "/brand/adiki-logo-gold.png",
  operationalConsumables: "/brand/adiki-logo-gold.png",
  deskAccessories: "/brand/adiki-logo-gold.png",
  envelopesLabels: "/brand/adiki-logo-gold.png"
};

export const categories = [
  {
    name: "Papelaria",
    description: "Cadernos, blocos, envelopes, agendas, etiquetas e artigos de rotina.",
    icon: PenTool,
    image: imageLibrary.supplies
  },
  {
    name: "Tinteiros",
    description: "Consumíveis de impressão para ambientes corporativos e institucionais.",
    icon: Printer,
    image: imageLibrary.ink
  },
  {
    name: "Consumíveis",
    description: "Itens recorrentes para equipas administrativas, comerciais e técnicas.",
    icon: Boxes,
    image: imageLibrary.operationalConsumables
  },
  {
    name: "Material escolar",
    description: "Soluções completas para escolas, centros de formação e departamentos.",
    icon: BookOpen,
    image: imageLibrary.school
  },
  {
    name: "Arquivo",
    description: "Pastas, caixas, separadores e sistemas de organização documental.",
    icon: Archive,
    image: imageLibrary.archive
  },
  {
    name: "Limpeza",
    description: "Produtos de apoio para ambientes limpos, seguros e produtivos.",
    icon: Recycle,
    image: imageLibrary.cleaning
  },
  {
    name: "Equipamentos",
    description: "Acessórios e equipamentos essenciais para operações de escritório.",
    icon: Building2,
    image: imageLibrary.equipment
  }
];

export const products = [
  {
    id: "papel-a4-premium",
    name: "Papel A4 Premium",
    category: "Papelaria",
    description: "Resmas de alta brancura para impressão diária, propostas e documentação oficial.",
    image: imageLibrary.paperPremium
  },
  {
    id: "toner-corporativo",
    name: "Toner corporativo",
    category: "Tinteiros",
    description: "Linha de toners compatíveis e originais para escritórios com alto volume.",
    image: imageLibrary.ink
  },
  {
    id: "pastas-arquivo",
    name: "Pastas e arquivo",
    category: "Arquivo",
    description: "Organização documental com lombadas, caixas, separadores e etiquetas.",
    image: imageLibrary.archive
  },
  {
    id: "kits-escolares",
    name: "Kits escolares",
    category: "Material escolar",
    description: "Composição por ciclo, turma ou departamento com entrega programada.",
    image: imageLibrary.school
  },
  {
    id: "higiene-escritorio",
    name: "Higiene de escritório",
    category: "Limpeza",
    description: "Consumíveis de limpeza para receções, salas de reunião e áreas comuns.",
    image: imageLibrary.cleaning
  },
  {
    id: "acessorios-mesa",
    name: "Acessórios de mesa",
    category: "Equipamentos",
    description: "Organizadores, suportes, calculadoras, agrafadores e acessórios de produtividade.",
    image: imageLibrary.deskAccessories
  },
  {
    id: "envelopes-etiquetas",
    name: "Envelopes e etiquetas",
    category: "Papelaria",
    description: "Materiais para correspondência, arquivo, expedição e identificação interna.",
    image: imageLibrary.envelopesLabels
  },
  {
    id: "consumiveis-operacionais",
    name: "Consumíveis operacionais",
    category: "Consumíveis",
    description: "Itens de reposição recorrente para equipas que não podem parar.",
    image: imageLibrary.operationalConsumables
  }
];

export const services = [
  {
    title: "Fornecimento empresarial",
    description:
      "Abastecimento recorrente de material gastável com catálogo por departamento, controlo de consumo e suporte comercial dedicado.",
    icon: PackageCheck
  },
  {
    title: "Distribuição e logística",
    description:
      "Entregas organizadas por rota, prioridade e volume, com foco em rapidez, previsibilidade e segurança dos materiais.",
    icon: Truck
  },
  {
    title: "Entregas programadas",
    description:
      "Planeamento mensal, quinzenal ou semanal para que a empresa mantenha stock essencial sem compras de emergência.",
    icon: CalendarClock
  },
  {
    title: "Contratos corporativos",
    description:
      "Condições comerciais, listas aprovadas e reposição estruturada para empresas, escolas, clínicas e instituições.",
    icon: ClipboardCheck
  }
];

export const advantages = [
  { title: "Entrega rápida", description: "Fluxos preparados para urgências e reposição recorrente.", icon: Truck },
  {
    title: "Atendimento empresarial",
    description: "Contacto direto com equipa comercial habituada a compras corporativas.",
    icon: Headphones
  },
  {
    title: "Suporte personalizado",
    description: "Recomendações por tipo de operação, volume e necessidade de consumo.",
    icon: Users
  },
  {
    title: "Qualidade garantida",
    description: "Produtos selecionados para consistência, durabilidade e apresentação.",
    icon: ShieldCheck
  }
];

export const values = [
  { title: "Rigor", description: "Trabalhamos com processos claros, prazos assumidos e resposta responsável.", icon: BadgeCheck },
  { title: "Eficiência", description: "Reduzimos o atrito das compras recorrentes para libertar tempo às equipas.", icon: Sparkles },
  { title: "Confiança", description: "Mantemos comunicação transparente desde a cotação até à entrega.", icon: SearchCheck }
];

export const testimonials = [
  {
    quote:
      "A ADIKI ALVANIR trouxe previsibilidade ao nosso consumo mensal. O atendimento é rápido e a entrega chega organizada.",
    author: "Direção Administrativa",
    company: "Grupo Empresarial de Luanda"
  },
  {
    quote:
      "Precisávamos de um fornecedor com resposta empresarial. Hoje temos orçamento, reposição e acompanhamento num único contacto.",
    author: "Gestão de Compras",
    company: "Instituição de Ensino"
  },
  {
    quote:
      "A apresentação dos materiais e a clareza comercial passam confiança. É uma parceria que simplifica a operação.",
    author: "Office Manager",
    company: "Consultoria Corporativa"
  }
];

export const partners = ["Kwanza Tower", "Maianga Offices", "Escola Prime", "Clinicorp", "Logiserv", "Atlas Group"];

export const blogPosts = [
  {
    slug: "como-organizar-compras-de-escritorio",
    title: "Como organizar compras de escritório sem desperdício",
    excerpt:
      "Boas práticas para prever consumo, evitar ruturas e manter equipas produtivas sem compras urgentes.",
    category: "Gestão de escritório",
    date: "08 Maio 2026",
    image: imageLibrary.deskAccessories,
    readTime: "5 min"
  },
  {
    slug: "material-gastavel-empresas",
    title: "Material gastável: o que toda empresa deve controlar",
    excerpt:
      "Uma visão prática dos itens que mais impactam a rotina administrativa e a experiência dos colaboradores.",
    category: "Compras empresariais",
    date: "03 Maio 2026",
    image: imageLibrary.operationalConsumables,
    readTime: "4 min"
  },
  {
    slug: "entregas-programadas-reduzem-custos",
    title: "Como entregas programadas reduzem custos operacionais",
    excerpt:
      "Planeamento de abastecimento, listas aprovadas e reposição por período tornam a operação mais previsível.",
    category: "Logística",
    date: "28 Abril 2026",
    image: imageLibrary.equipment,
    readTime: "6 min"
  },
  {
    slug: "escritorio-produtivo-e-organizado",
    title: "O impacto de um escritório bem abastecido na produtividade",
    excerpt:
      "Pequenos consumíveis evitam interrupções, melhoram a organização e elevam a imagem interna da empresa.",
    category: "Produtividade",
    date: "21 Abril 2026",
    image: imageLibrary.archive,
    readTime: "4 min"
  }
];

export const contactCards = [
  { label: "WhatsApp", value: site.phone, href: `https://wa.me/${site.whatsapp}`, icon: MessageCircle },
  { label: "Telefone", value: `${site.phone} / ${site.phone2}`, href: `tel:${site.phone.replace(/\s/g, "")}`, icon: Phone },
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: Mail },
  { label: "Endereço", value: site.address, href: "https://maps.google.com/?q=Luanda%20Angola", icon: MapPin }
];

export const warehouseStats = [
  { value: "+120", label: "linhas de produtos" },
  { value: "24h", label: "resposta comercial" },
  { value: "B2B", label: "foco empresarial" },
  { value: "Luanda", label: "distribuição local" }
];

export const serviceProcess = [
  { title: "Diagnóstico", description: "Levantamos volume, periodicidade e prioridades da empresa." },
  { title: "Cotação", description: "Enviamos proposta clara com produtos, prazos e condições." },
  { title: "Preparação", description: "Organizamos o pedido por categoria, departamento ou centro de custo." },
  { title: "Entrega", description: "Distribuímos com acompanhamento comercial até à confirmação." }
];
