import { Product, Category } from '../types';

export const categories: Category[] = [
  { id: '1', name: 'Camisetas', slug: 'camisetas' },
  { id: '2', name: 'Calçados', slug: 'calcados' },
  { id: '3', name: 'Acessórios', slug: 'acessorios' },
  { id: '4', name: 'Equipamentos', slug: 'equipamentos' },
];

export const products: Product[] = [
  // --- CAMISETAS ---
  {
    id: 'p1',
    name: 'Camiseta Dev Core',
    slug: 'camiseta-dev-core',
    description: 'Essencial para longas sessões de código. Algodão egípcio com tecnologia anti-suor e modelagem que não prende seus movimentos.',
    price: 89.90,
    categoryId: '1',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Midnight Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80' },
      { name: 'Pure White', hex: '#ffffff', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80' },
      { name: 'Code Gray', hex: '#808080', image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80' }
    ],
    sizes: ['P', 'M', 'G', 'GG', 'XGG'],
    isFeatured: true
  },
  {
    id: 'p4',
    name: 'Oversized "Null Reference"',
    slug: 'camiseta-oversized-null',
    description: 'Modelagem ampla streetwear com estampa minimalista inspirada em erros de código. Conforto máximo para o dia a dia.',
    price: 119.90,
    categoryId: '1',
    images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80'],
    sizes: ['M', 'G', 'GG'],
    isNew: true
  },
  {
    id: 'p6',
    name: 'Tech Hoodie Pro',
    slug: 'tech-hoodie-pro',
    description: 'Moletom técnico com tecido repelente a água e bolso oculto para gadgets. O uniforme oficial do inverno dev.',
    price: 249.90,
    originalPrice: 299.90,
    categoryId: '1',
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80'],
    colors: [
        { name: 'Preto Fosco', hex: '#1a1a1a', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80' },
        { name: 'Cinza Lunar', hex: '#2d2d2d', image: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?auto=format&fit=crop&w=800&q=80' }
    ],
    sizes: ['P', 'M', 'G', 'GG']
  },

  // --- CALÇADOS ---
  {
    id: 'p2',
    name: 'Tênis Cyber Runner v2',
    slug: 'tenis-cyber-runner-v2',
    description: 'Design aerodinâmico com amortecimento reativo. Perfeito para quem corre entre reuniões e deploys.',
    price: 399.90,
    originalPrice: 499.90,
    categoryId: '2',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
        { name: 'Vermelho Laser', hex: '#FF0000', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80' },
        { name: 'Branco Gelo', hex: '#FFFFFF', image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=800&q=80' },
        { name: 'Preto Stealth', hex: '#000000', image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80' }
    ],
    sizes: ['39', '40', '41', '42', '43', '44'],
    isFeatured: true
  },
  {
    id: 'p7',
    name: 'Sneaker High-Top Future',
    slug: 'sneaker-high-top-future',
    description: 'Inspirado no cyberpunk, este tênis de cano alto oferece suporte e um visual inconfundível nas ruas.',
    price: 599.90,
    categoryId: '2',
    images: ['https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80'],
    sizes: ['40', '41', '42'],
    isNew: true
  },

  // --- ACESSÓRIOS ---
  {
    id: 'p3',
    name: 'Boné Minimalista Dad Hat',
    slug: 'bone-minimalista',
    description: 'Proteção discreta para quando você precisa focar. Tecido respirável e ajuste perfeito.',
    price: 59.90,
    categoryId: '3',
    images: ['https://images.tcdn.com.br/img/img_prod/868639/bone_trucker_frisio_sem_tela_353_1_00a194e0a610254c295a3cdac0a4f068.jpg'],
    colors: [
        { name: 'Preto', hex: '#000000', image: 'https://images.tcdn.com.br/img/img_prod/868639/bone_trucker_frisio_sem_tela_353_1_00a194e0a610254c295a3cdac0a4f068.jpg' },
        { name: 'Bege', hex: '#F5F5DC', image: 'https://images.unsplash.com/photo-1596455607563-ad6193f76b17?auto=format&fit=crop&w=1000&q=80' },
        { name: 'Verde Militar', hex: '#4B5320', image: 'https://acdn-us.mitiendanube.com/stores/001/308/583/products/img_0499-adedc5909be2efefa017353316859384-1024-1024.jpg' }
    ],
  },
  {
    id: 'p5',
    name: 'Mochila Nomad Tech 30L',
    slug: 'mochila-nomad-tech',
    description: 'Sua estação de trabalho móvel. Compartimento blindado para notebook de 17", à prova d\'água e com porta USB externa.',
    price: 349.90,
    categoryId: '3',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'],
    colors: [
        { name: 'Obsidian Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80' },
        { name: 'Graphite Gray', hex: '#383838', image: 'https://images.unsplash.com/photo-1581605405669-fze81a561c39?auto=format&fit=crop&w=800&q=80' }
    ],
    isFeatured: true
  },
  {
    id: 'p8',
    name: 'Óculos Anti-Luz Azul "Focus"',
    slug: 'oculos-anti-luz-azul',
    description: 'Proteja sua visão durante longas horas de tela. Lentes premium que filtram 99% da luz azul nociva sem distorcer as cores.',
    price: 199.90,
    categoryId: '3',
    images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80'],
  },

  // --- EQUIPAMENTOS ---
  {
    id: 'p9',
    name: 'Teclado Mecânico RGB 60%',
    slug: 'teclado-mecanico-60',
    description: 'Compacto, barulhento na medida certa e totalmente programável. Switches táteis marrons para o equilíbrio perfeito entre digitação e jogos.',
    price: 499.90,
    originalPrice: 650.00,
    categoryId: '4',
    images: ['https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80'],
    colors: [
        { name: 'Branco Retro', hex: '#f0f0f0', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80' },
        { name: 'Preto Neon', hex: '#000000', image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80' }
    ],
    isFeatured: true
  },
  {
    id: 'p10',
    name: 'Mouse Wireless Ultra-leve',
    slug: 'mouse-wireless-ultraleve',
    description: 'Apenas 60g. Sensor óptico de 20k DPI. A precisão que você precisa para arrastar divs ou dar headshots.',
    price: 299.90,
    categoryId: '4',
    images: ['https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80'],
    isNew: true
  },
  {
    id: 'p11',
    name: 'Desk Mat "Synthwave"',
    slug: 'desk-mat-synthwave',
    description: 'Mousepad gigante (900x400mm) com estampa estética retro-futurista. Superfície speed para deslize suave.',
    price: 129.90,
    categoryId: '4',
    images: ['https://epicdesignpads.com/cdn/shop/files/vaporwave-neon-city-desk-pad-desk-mat-epic-design-pads.jpg?crop=center&height=1200&v=1756669979&width=1200'],
  },
  {
    id: 'p12',
    name: 'Garrafa Térmica "Hydrate or Diedrate"',
    slug: 'garrafa-termica-dev',
    description: 'Mantenha seu café quente por 12h ou sua água gelada por 24h. Aço inoxidável com acabamento fosco.',
    price: 79.90,
    categoryId: '3',
    images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80'],
    colors: [
        { name: 'Preto Matte', hex: '#1c1c1c', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80' },
        { name: 'Branco Minimal', hex: '#f5f5f5', image: 'https://images.unsplash.com/photo-1596512251165-6760a89d48fc?auto=format&fit=crop&w=800&q=80' }
    ]
  }
];