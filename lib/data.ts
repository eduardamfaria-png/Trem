/** Conteúdo de exemplo, transcrito dos arquivos .dc.html do design. */

export type FeedPost = {
  id: string;
  name: string;
  ini: string;
  avBg: string;
  tag: 'Criadora' | 'Marca';
  role: string;
  time: string;
  text: string;
  hasImage: boolean;
  slotHint?: string;
  likes: number;
  comments: number;
  href: string;
};

export const feedPosts: FeedPost[] = [
  {
    id: 'p1',
    name: 'Marina Duarte',
    ini: 'MD',
    avBg: '#FFB3C8',
    tag: 'Criadora',
    role: 'Criadora de beleza · 84 mil seguidores',
    time: 'há 2 h',
    text: 'Fechei a terceira campanha pelo Matchy este mês. Dica pra quem tá começando: deixe o seu nicho e o seu tom claros no perfil — o match acontece muito mais rápido.',
    hasImage: true,
    slotHint: 'foto: criadora de beleza jovem, luz natural',
    likes: 132,
    comments: 18,
    href: '/perfil/criadora',
  },
  {
    id: 'p2',
    name: 'Casa Verde Cosméticos',
    ini: 'CV',
    avBg: '#FFD9E3',
    tag: 'Marca',
    role: 'Skincare natural · Bens de Consumo',
    time: 'há 5 h',
    text: 'Buscamos 4 criadoras de skincare para o lançamento do nosso sérum de niacinamida. Remuneração fixa + permuta. Briefing aberto no perfil.',
    hasImage: true,
    slotHint: 'foto: produto de skincare, frasco sérum',
    likes: 76,
    comments: 41,
    href: '/perfil/marca',
  },
  {
    id: 'p3',
    name: 'Bianca Rezende',
    ini: 'BR',
    avBg: '#FFC9AE',
    tag: 'Criadora',
    role: 'Lifestyle e maternidade · 32 mil seguidores',
    time: 'há 8 h',
    text: 'Pergunta honesta pra quem contrata: vocês preferem receber um portfólio fechado ou uma proposta feita sob medida para a campanha?',
    hasImage: false,
    likes: 54,
    comments: 27,
    href: '/perfil/criadora',
  },
  {
    id: 'p4',
    name: 'Lume Beauty',
    ini: 'LB',
    avBg: '#FFB3C8',
    tag: 'Marca',
    role: 'Maquiagem vegana · Beleza',
    time: 'há 1 d',
    text: 'Resultado da campanha de outono com 12 criadoras do Matchy: 3,2x mais alcance que a nossa média e 890 cupons usados. Obrigada, meninas.',
    hasImage: true,
    slotHint: 'foto: paleta de maquiagem e batons',
    likes: 208,
    comments: 33,
    href: '/perfil/marca',
  },
];

export const feedSuggestions = [
  {
    id: 's1',
    name: 'Vera Studio',
    ini: 'VS',
    why: 'Marca de beleza vegana · combina em valores e estética',
    href: '/perfil/marca',
  },
  {
    id: 's2',
    name: 'Helena Sampaio',
    ini: 'HS',
    why: 'Criadora de lifestyle · tom de comunicação parecido',
    href: '/perfil/criadora',
  },
];

export type ExploreCard = {
  id: string;
  nicho: string;
  name: string;
  ini: string;
  kind: 'Criadora' | 'Marca';
  text: string;
  meta: string;
  h: string;
  hint: string;
};

export const exploreCards: ExploreCard[] = [
  { id: 'e1', nicho: 'Beleza', name: 'Júlia Camargo', ini: 'JC', kind: 'Criadora', text: 'Rotina de skincare de 4 passos que caiu no gosto do meu público.', meta: '2,4 mil curtidas', h: '196px', hint: 'foto: rotina de skincare no espelho' },
  { id: 'e2', nicho: 'Bens de Consumo', name: 'Aurora Cosmética', ini: 'AC', kind: 'Marca', text: 'Novo hidratante labial em 6 cores. Buscando criadoras.', meta: '870 curtidas', h: '152px', hint: 'foto: batons e lip balms coloridos' },
  { id: 'e3', nicho: 'Lifestyle', name: 'Amanda Ferraz', ini: 'AF', kind: 'Criadora', text: 'Como organizo a semana entre gravações e cliente.', meta: '1,1 mil curtidas', h: '150px', hint: 'foto: criadora jovem em casa, mesa de trabalho' },
  { id: 'e4', nicho: 'Beleza', name: 'Tatá Bicalho', ini: 'TB', kind: 'Criadora', text: 'Testei 7 bases de farmácia. A vencedora surpreendeu.', meta: '3,8 mil curtidas', h: '204px', hint: 'foto: swatches de base no braço' },
  { id: 'e5', nicho: 'Lifestyle', name: 'Coletivo Maré', ini: 'CM', kind: 'Marca', text: 'Curadoria de casa e bem-estar com propósito.', meta: '640 curtidas', h: '158px', hint: 'foto: objetos de casa, tons terrosos' },
  { id: 'e6', nicho: 'Bens de Consumo', name: 'Sol & Sal', ini: 'SS', kind: 'Marca', text: 'Protetor solar com cor: 8 tons, zero marca branca.', meta: '1,9 mil curtidas', h: '186px', hint: 'foto: protetor solar na praia' },
  { id: 'e7', nicho: 'Beleza', name: 'Rafa Nogueira', ini: 'RN', kind: 'Criadora', text: 'Cabelo cacheado no inverno: o que realmente funciona.', meta: '2,7 mil curtidas', h: '170px', hint: 'foto: cabelo cacheado, retrato' },
  { id: 'e8', nicho: 'Lifestyle', name: 'Nina Portella', ini: 'NP', kind: 'Criadora', text: 'Meu ritual da noite em 15 minutos.', meta: '980 curtidas', h: '148px', hint: 'foto: mesa de cabeceira, luz quente' },
];

export const openCampaigns = [
  { id: 'o1', brand: 'Casa Verde Cosméticos', ini: 'CV', nicho: 'Beleza', title: 'Lançamento sérum de niacinamida', compat: '94%', brief: '1 Reels + 1 carrossel mostrando a rotina noturna com o sérum. Roteiro livre, aprovação em 48 h.', tags: ['Reels', 'Carrossel', 'Skincare'], fee: 'R$ 3.500', deadline: 'Candidaturas até 12 set', applicants: '18 candidatas' },
  { id: 'o2', brand: 'Lume Beauty', ini: 'LB', nicho: 'Beleza', title: 'Coleção de batons veganos', compat: '89%', brief: '3 stories + 1 vídeo curto com swatches dos 6 tons. Permuta da coleção completa incluída.', tags: ['Stories', 'Vídeo', 'Maquiagem'], fee: 'R$ 2.200', deadline: 'Candidaturas até 08 set', applicants: '34 candidatas' },
  { id: 'o3', brand: 'Coletivo Maré', ini: 'CM', nicho: 'Lifestyle', title: 'Ritual da noite em casa', compat: '81%', brief: 'Conteúdo de rotina mostrando 3 produtos de bem-estar. Preferência por criadoras de lifestyle.', tags: ['Reels', 'Casa'], fee: 'R$ 1.800', deadline: 'Candidaturas até 19 set', applicants: '11 candidatas' },
  { id: 'o4', brand: 'Sol & Sal', ini: 'SS', nicho: 'Bens de Consumo', title: 'Protetor com cor — 8 tons', compat: '76%', brief: 'Teste de tonalidade em luz natural, com foto antes e depois. Uso de cupom próprio.', tags: ['Foto', 'Cupom'], fee: 'R$ 1.400 + kit', deadline: 'Candidaturas até 25 set', applicants: '27 candidatas' },
];

export const myCampaigns = [
  { id: 'm1', status: 'Ativa', title: 'Lançamento sérum de niacinamida', brief: 'Reels + carrossel · criadoras de skincare, público 25-40.', budget: 'R$ 3.500', slots: '4 vagas · 2 preenchidas', candidates: '18 candidatas', deadline: '9 dias' },
  { id: 'm2', status: 'Ativa', title: 'Kit inverno — permuta ampliada', brief: 'Rotina de pele seca · kit completo + cachê.', budget: 'R$ 1.200 + kit', slots: '6 vagas · 1 preenchida', candidates: '23 candidatas', deadline: '15 dias' },
  { id: 'm3', status: 'Encerrada', title: 'Campanha verão 2026', brief: '9 criadoras · alcance total de 1,4 milhão.', budget: 'R$ 42.000', slots: '9 vagas · concluída', candidates: '61 candidatas', deadline: '—' },
  { id: 'm4', status: 'Rascunho', title: 'Amostras de argila verde', brief: 'Briefing em construção · sem data definida.', budget: 'R$ 900', slots: '5 vagas previstas', candidates: 'Sem candidatas', deadline: '—' },
];

export const candidateList = [
  { id: 'c1', ini: 'MD', name: 'Marina Duarte', role: 'Beleza e skincare · 84 mil', compat: '94%', pitch: 'Faço teste honesto de ativos e meu público pergunta muito sobre niacinamida.', stats: [{ v: '4,9', k: 'Reputação' }, { v: '2 h', k: 'Resposta' }, { v: '98%', k: 'Prazos' }] },
  { id: 'c2', ini: 'JC', name: 'Júlia Camargo', role: 'Beleza · 47 mil', compat: '90%', pitch: 'Tenho série fixa de rotina noturna com bom retorno em salvamentos.', stats: [{ v: '4,8', k: 'Reputação' }, { v: '4 h', k: 'Resposta' }, { v: '95%', k: 'Prazos' }] },
  { id: 'c3', ini: 'RN', name: 'Rafa Nogueira', role: 'Beleza e cabelo · 61 mil', compat: '85%', pitch: 'Público de pele mista e oleosa, exatamente o alvo do sérum.', stats: [{ v: '4,7', k: 'Reputação' }, { v: '6 h', k: 'Resposta' }, { v: '92%', k: 'Prazos' }] },
  { id: 'c4', ini: 'NP', name: 'Nina Portella', role: 'Lifestyle · 29 mil', compat: '78%', pitch: 'Encaixo o produto em conteúdo de rotina, sem formato de anúncio.', stats: [{ v: '4,9', k: 'Reputação' }, { v: '3 h', k: 'Resposta' }, { v: '100%', k: 'Prazos' }] },
];

export const matchStack = [
  { id: 's1', name: 'Marina Duarte', role: 'Beleza e skincare · São Paulo, SP', compat: '94%', why: 'Mesmos valores da Casa Verde: consumo consciente e visual natural.', stats: [{ v: '84 mil', k: 'Seguidores' }, { v: '4,9', k: 'Reputação' }, { v: '2 h', k: 'Resposta' }] },
  { id: 's2', name: 'Júlia Camargo', role: 'Beleza · Curitiba, PR', compat: '90%', why: 'Mesmo público-alvo e histórico de skincare no prazo.', stats: [{ v: '47 mil', k: 'Seguidores' }, { v: '4,8', k: 'Reputação' }, { v: '4 h', k: 'Resposta' }] },
  { id: 's3', name: 'Tatá Bicalho', role: 'Beleza · Salvador, BA', compat: '86%', why: 'Testes comparativos — formato que converte em lançamento.', stats: [{ v: '112 mil', k: 'Seguidores' }, { v: '4,7', k: 'Reputação' }, { v: '9 h', k: 'Resposta' }] },
  { id: 's4', name: 'Amanda Ferraz', role: 'Lifestyle · Recife, PE', compat: '79%', why: 'Estética parecida, porém nicho mais amplo que a campanha.', stats: [{ v: '38 mil', k: 'Seguidores' }, { v: '4,9', k: 'Reputação' }, { v: '1 h', k: 'Resposta' }] },
];

export type Thread = {
  g: string;
  ini: string;
  name: string;
  avRadius: string;
  msg: string;
  time: string;
  count: string;
  pill: string;
  pillBg: string;
  pillFg: string;
  href?: string;
};

export const threads: Thread[] = [
  { g: 'Negociações ativas', ini: 'CV', name: 'Casa Verde Cosméticos', avRadius: '14px', msg: 'Enviei a proposta: R$ 3.500 com 7 dias.', time: '09:12', count: '2', pill: 'Proposta', pillBg: '#FFE0CF', pillFg: '#B23A05', href: '/negociacao' },
  { g: 'Negociações ativas', ini: 'LB', name: 'Lume Beauty', avRadius: '14px', msg: 'Enviamos o briefing dos batons, dá uma olhada.', time: 'Ontem', count: '', pill: 'Aguardando', pillBg: '#FFD9E3', pillFg: '#B01A49' },
  { g: 'Jobs em andamento', ini: 'SS', name: 'Sol & Sal', avRadius: '14px', msg: 'Aprovado! Pode publicar na quinta.', time: '08:40', count: '1', pill: 'Em produção', pillBg: '#FFB3C8', pillFg: '#3B0E1E' },
  { g: 'Jobs em andamento', ini: 'CM', name: 'Coletivo Maré', avRadius: '14px', msg: 'Você: mandei o corte final agora.', time: 'Seg', count: '', pill: 'Aprovação', pillBg: '#FFD9E3', pillFg: '#B01A49' },
  { g: 'Geral', ini: 'BR', name: 'Bianca Rezende', avRadius: '999px', msg: 'Adorei a campanha da Casa Verde!', time: 'Dom', count: '', pill: '', pillBg: '', pillFg: '' },
  { g: 'Geral', ini: 'JC', name: 'Júlia Camargo', avRadius: '999px', msg: 'Bora fazer um colab de skincare?', time: '21 ago', count: '3', pill: '', pillBg: '', pillFg: '' },
];

export const paymentList = [
  { id: 'w1', title: 'Lançamento sérum de niacinamida', brand: 'Casa Verde Cosméticos', status: 'Em garantia', amount: 'R$ 3.500', when: 'Libera em 3 dias', barPct: '62%', barNote: 'Aprovação da marca em andamento' },
  { id: 'w2', title: 'Coleção de batons veganos', brand: 'Lume Beauty', status: 'Pendente', amount: 'R$ 2.200', when: 'Entrega até 05 set', barPct: '20%', barNote: 'Pagamento entra em garantia ao aceitar' },
  { id: 'w3', title: 'Protetor com cor — 8 tons', brand: 'Sol & Sal', status: 'Liberado', amount: 'R$ 1.400', when: 'Recebido em 14 ago' },
  { id: 'w4', title: 'Ritual da noite em casa', brand: 'Coletivo Maré', status: 'Liberado', amount: 'R$ 1.800', when: 'Recebido em 02 ago' },
  { id: 'w5', title: 'Campanha verão 2026', brand: 'Casa Verde Cosméticos', status: 'Liberado', amount: 'R$ 1.620', when: 'Recebido em 18 jul' },
];

export const walletStatus: Record<string, { bg: string; fg: string; amount: string }> = {
  Pendente: { bg: '#FFD9E3', fg: '#B01A49', amount: '#6B4450' },
  'Em garantia': { bg: '#FD5E12', fg: '#FFF4E6', amount: '#FD5E12' },
  Liberado: { bg: '#FFB3C8', fg: '#3B0E1E', amount: '#E5215F' },
};

export type Profile = {
  key: string;
  caption: string;
  kind: string;
  kindBg: string;
  kindFg: string;
  avatarRadius: string;
  compat: string;
  coverHint: string;
  avatarHint: string;
  name: string;
  role: string;
  meta: string;
  chips: string[];
  bioLabel: string;
  bio: string;
  links: { handle: string; count: string; dot: string }[];
  metrics: { v: string; k: string }[];
  hasCampaigns: boolean;
  campaigns: { title: string; desc: string; fee: string; slots: string; match: string }[];
  tabLabels: [string, string][];
  posts: { id: string; time: string; stats: string; text: string; hasImage: boolean; hint?: string }[];
  work: { id: string; title: string; meta: string; hint: string }[];
  rating: string;
  ratingNote: string;
  reviews: { ini: string; name: string; ctx: string; score: string; text: string }[];
  connCount: string;
  connections: { ini: string; name: string; role: string; match: string }[];
};

export const profiles: Record<'criadora' | 'marca', Profile> = {
  criadora: {
    key: 'cr',
    caption: 'Perfil da criadora',
    kind: 'Criadora',
    kindBg: '#FFD9E3',
    kindFg: '#B01A49',
    avatarRadius: '999px',
    compat: '94%',
    coverHint: 'foto: criadora jovem, banner horizontal',
    avatarHint: 'foto: retrato da criadora',
    name: 'Marina Duarte',
    role: 'Criadora de conteúdo de beleza e skincare',
    meta: 'São Paulo, SP · no Matchy desde 2024',
    chips: ['Beleza', 'Skincare', 'Consumo consciente'],
    bioLabel: 'Sobre mim',
    bio: 'Falo de skincare sem promessa mágica: teste honesto, pele real. Trabalho melhor com marcas que aceitam roteiro meu e prazo combinado.',
    links: [
      { handle: '@marinaduarte', count: '84 mil', dot: '#E5215F' },
      { handle: '@marina.skin', count: '31 mil', dot: '#3B0E1E' },
      { handle: 'YouTube', count: '12 mil', dot: '#FD5E12' },
    ],
    metrics: [
      { v: '4,9', k: 'Nota de reputação' },
      { v: '2 h', k: 'Resposta média' },
      { v: '98%', k: 'Prazos cumpridos' },
    ],
    hasCampaigns: false,
    campaigns: [],
    tabLabels: [['mural', 'Mural'], ['work', 'Portfólio'], ['reviews', 'Avaliações']],
    posts: [
      { id: 'cp1', time: 'há 3 dias', stats: '132 curtidas · 18 comentários', text: 'Terceira campanha fechada pelo Matchy este mês. Deixar o nicho e o tom claros no perfil muda o jogo.', hasImage: true, hint: 'foto: criadora aplicando skincare' },
      { id: 'cp2', time: 'há 1 semana', stats: '76 curtidas · 9 comentários', text: 'Recebi 14 propostas em abril e aceitei 3. Não é sobre volume, é sobre encaixe de valores.', hasImage: false },
    ],
    work: [
      { id: 'cw1', title: 'Lançamento sérum · Casa Verde', meta: 'Reels · 214 mil views', hint: 'foto: frasco de sérum na mão' },
      { id: 'cw2', title: 'Rotina noturna · Lume', meta: 'Carrossel · 89 mil alcance', hint: 'foto: produtos de skincare na pia' },
      { id: 'cw3', title: 'Teste de bases', meta: 'Vídeo · 340 mil views', hint: 'foto: swatches de base no braço' },
      { id: 'cw4', title: 'Protetor com cor · Sol & Sal', meta: 'Reels · 121 mil views', hint: 'foto: protetor solar, luz de praia' },
    ],
    rating: '4,9',
    ratingNote: '27 avaliações de marcas parceiras nos últimos 12 meses.',
    reviews: [
      { ini: 'CV', name: 'Casa Verde Cosméticos', ctx: 'Campanha de lançamento · mai 2026', score: '5,0', text: 'Entregou dois dias antes do prazo e trouxe um roteiro melhor que o nosso briefing. Já contratamos de novo.' },
      { ini: 'LB', name: 'Lume Beauty', ctx: 'Campanha de outono · mar 2026', score: '4,8', text: 'Comunicação impecável e resultado acima da média do time. Só ajustaria o prazo de aprovação.' },
      { ini: 'SS', name: 'Sol & Sal', ctx: 'Permuta + cachê · jan 2026', score: '5,0', text: 'Público engajado de verdade. Vendemos o lote todo em quatro dias.' },
    ],
    connCount: '312 conexões',
    connections: [
      { ini: 'CV', name: 'Casa Verde Cosméticos', role: 'Marca · Bens de Consumo', match: '94%' },
      { ini: 'BR', name: 'Bianca Rezende', role: 'Criadora · Lifestyle', match: '88%' },
      { ini: 'LB', name: 'Lume Beauty', role: 'Marca · Beleza', match: '91%' },
    ],
  },
  marca: {
    key: 'br',
    caption: 'Perfil da marca',
    kind: 'Marca',
    kindBg: '#FFE0CF',
    kindFg: '#B23A05',
    avatarRadius: '26px',
    compat: '91%',
    coverHint: 'foto: bancada com produtos da marca',
    avatarHint: 'logo da marca',
    name: 'Casa Verde',
    role: 'Skincare natural feito em pequenos lotes',
    meta: 'Belo Horizonte, MG · 38 campanhas no Matchy',
    chips: ['Bens de Consumo', 'Beleza', 'Sustentabilidade'],
    bioLabel: 'Sobre a empresa',
    bio: 'Fórmulas curtas, ingrediente nacional e zero teste em animais. Trabalhamos com criadoras que topam mostrar o produto no uso real, sem script decorado.',
    links: [
      { handle: '@casaverde', count: '196 mil', dot: '#E5215F' },
      { handle: 'casaverde.com.br', count: 'site', dot: '#FD5E12' },
    ],
    metrics: [
      { v: '4,8', k: 'Avaliação da marca' },
      { v: '5 h', k: 'Resposta média' },
      { v: '100%', k: 'Pagamentos em dia' },
    ],
    hasCampaigns: true,
    campaigns: [
      { title: 'Lançamento sérum de niacinamida', desc: 'Reels + carrossel para criadoras de skincare com público 25-40.', fee: 'R$ 3.500', slots: '4 vagas · 2 preenchidas', match: '94% match' },
      { title: 'Kit inverno — permuta ampliada', desc: 'Kit completo + cachê para conteúdo de rotina de pele seca.', fee: 'R$ 1.200 + kit', slots: '6 vagas · 1 preenchida', match: '87% match' },
    ],
    tabLabels: [['mural', 'Mural'], ['work', 'Campanhas'], ['reviews', 'Avaliações']],
    posts: [
      { id: 'bp1', time: 'há 5 horas', stats: '76 curtidas · 41 comentários', text: 'Buscamos 4 criadoras de skincare para o lançamento do sérum de niacinamida. Cachê fixo de R$ 3.500 + permuta. Briefing aberto no perfil.', hasImage: true, hint: 'foto: frasco de sérum, fundo creme' },
      { id: 'bp2', time: 'há 6 dias', stats: '154 curtidas · 22 comentários', text: 'Fechamos o trimestre com 12 parcerias e R$ 148 mil investidos em criadoras. Transparência é parte do produto.', hasImage: false },
    ],
    work: [
      { id: 'bw1', title: 'Campanha verão 2026', meta: '9 criadoras · R$ 42 mil', hint: 'foto: produto com fundo colorido' },
      { id: 'bw2', title: 'Sérum niacinamida', meta: 'Em andamento · 4 vagas', hint: 'foto: sérum e conta-gotas' },
      { id: 'bw3', title: 'Kit inverno', meta: '6 criadoras · R$ 18 mil', hint: 'foto: kit de produtos em caixa' },
      { id: 'bw4', title: 'Amostras de argila', meta: 'Encerrada · 5 criadoras', hint: 'foto: máscara de argila na pele' },
    ],
    rating: '4,8',
    ratingNote: '41 avaliações de criadoras que já fecharam campanha com a marca.',
    reviews: [
      { ini: 'MD', name: 'Marina Duarte', ctx: 'Lançamento sérum · mai 2026', score: '5,0', text: 'Briefing claríssimo, pagamento em 7 dias e liberdade total no roteiro. Referência de como se contrata criadora.' },
      { ini: 'TB', name: 'Tatá Bicalho', ctx: 'Campanha verão · dez 2025', score: '4,7', text: 'Time atencioso e produto bom de mostrar. As aprovações demoraram um pouco mais do que o combinado.' },
      { ini: 'NP', name: 'Nina Portella', ctx: 'Kit inverno · jun 2026', score: '5,0', text: 'Recebi tudo antes do prazo e ainda me deram dado de venda depois. Parceria de gente grande.' },
    ],
    connCount: '1.204 conexões',
    connections: [
      { ini: 'MD', name: 'Marina Duarte', role: 'Criadora · Beleza', match: '94%' },
      { ini: 'JC', name: 'Júlia Camargo', role: 'Criadora · Beleza', match: '90%' },
      { ini: 'AF', name: 'Amanda Ferraz', role: 'Criadora · Lifestyle', match: '82%' },
    ],
  },
};
