import Link from 'next/link';
import { C, FONT } from '@/lib/theme';

/**
 * Índice de todas as telas do handoff. Não faz parte do produto — serve
 * para abrir direto as telas que não estão na nav inferior (onboarding,
 * perfis, negociação, avaliação).
 */

const GROUPS: { title: string; items: { href: string; label: string; note: string }[] }[] = [
  {
    title: 'Nav inferior',
    items: [
      { href: '/feed', label: 'Feed', note: 'Mural, curtidas e matches sugeridos' },
      { href: '/explorar', label: 'Explorar', note: 'Grade de descoberta (criadora)' },
      { href: '/campanhas', label: 'Campanhas', note: 'Varia conforme o papel escolhido' },
      { href: '/chat', label: 'Chat', note: 'Conversas por negociação, job e geral' },
      { href: '/carteira', label: 'Carteira', note: 'Saldo, garantia e pagamentos' },
    ],
  },
  {
    title: 'Fora da nav',
    items: [
      { href: '/', label: 'Onboarding', note: 'Papel, formulário, quiz e perfil pronto' },
      { href: '/match', label: 'Match · busca ativa', note: 'Baralho de perfis, arraste para dar match' },
      { href: '/negociacao', label: 'Negociação', note: 'Proposta, contraproposta e entregáveis' },
      { href: '/avaliacao', label: 'Avaliação pós-job', note: 'Estrelas, destaques e comentário' },
      { href: '/perfil/criadora', label: 'Perfil da criadora', note: 'Mural, portfólio e avaliações' },
      { href: '/perfil/marca', label: 'Perfil da marca', note: 'Campanhas ativas e reputação' },
    ],
  },
];

export default function TelasPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '56px 24px 80px', fontFamily: FONT.body, display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 640, display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/matchy-logo-magenta.png" alt="Matchy." style={{ height: 32, width: 'auto' }} />
          <h1
            style={{
              fontFamily: FONT.display,
              fontWeight: 800,
              fontSize: 40,
              lineHeight: 1.15,
              letterSpacing: '.02em',
              color: C.plum,
              margin: '20px 0 0',
            }}
          >
            Todas as telas
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.5, color: C.plumSoft, margin: '10px 0 0' }}>
            A nav inferior funciona dentro do app. Esta página é só um atalho para o que vive fora dela.
          </p>
        </div>

        {GROUPS.map((g) => (
          <div key={g.title} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: C.muted }}>{g.title}</div>
            {g.items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className="h-pink"
                style={{
                  background: C.card,
                  border: `1.5px solid ${C.hairline}`,
                  borderRadius: 24,
                  padding: '18px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                  transition: 'border-color .18s, transform .18s',
                }}
              >
                <div>
                  <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 20, letterSpacing: '.02em', color: C.matchPink }}>
                    {it.label}
                  </div>
                  <div style={{ fontSize: 14, color: C.plumSoft, lineHeight: 1.35 }}>{it.note}</div>
                </div>
                <div style={{ fontSize: 18, color: C.muted, flex: 'none' }}>→</div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
