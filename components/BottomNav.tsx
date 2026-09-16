'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { C } from '@/lib/theme';

type Item = { label: string; href: string; radius: string; match: string[] };

/** As cinco abas definidas no design, na ordem em que aparecem. */
const ITEMS: Item[] = [
  { label: 'Feed', href: '/feed', radius: '6px', match: ['/feed'] },
  { label: 'Explorar', href: '/explorar', radius: '999px', match: ['/explorar', '/match'] },
  { label: 'Campanhas', href: '/campanhas', radius: '4px', match: ['/campanhas'] },
  { label: 'Chat', href: '/chat', radius: '10px 10px 10px 2px', match: ['/chat', '/negociacao'] },
  { label: 'Carteira', href: '/carteira', radius: '5px', match: ['/carteira'] },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 82,
        zIndex: 8,
        background: C.card,
        borderTop: `1.5px solid ${C.hairline}`,
        display: 'flex',
        alignItems: 'flex-start',
        padding: '12px 8px 0',
      }}
    >
      {ITEMS.map((n) => {
        const active = n.match.some((p) => pathname === p || pathname.startsWith(p + '/'));
        return (
          <Link
            key={n.href}
            href={n.href}
            aria-current={active ? 'page' : undefined}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: n.radius,
                background: active ? C.matchPink : 'transparent',
                border: `2px solid ${active ? C.matchPink : '#C4A899'}`,
              }}
            />
            <div
              style={{
                fontSize: 10.5,
                fontWeight: 600,
                color: active ? C.matchPink : C.muted,
              }}
            >
              {n.label}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
