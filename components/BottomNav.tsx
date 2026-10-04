'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { C } from '@/lib/theme';

type Item = { label: string; href: string; icon: (color: string) => ReactNode; match: string[] };

const ICON_PROPS = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none' } as const;

/** As cinco abas definidas no design, na ordem em que aparecem. */
const ITEMS: Item[] = [
  {
    label: 'Feed',
    href: '/feed',
    match: ['/feed'],
    icon: (c) => (
      <svg {...ICON_PROPS}>
        <rect x="4" y="4" width="16" height="16" rx="3.5" stroke={c} strokeWidth="1.8" />
        <line x1="7.5" y1="9" x2="16.5" y2="9" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="7.5" y1="13" x2="16.5" y2="13" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="7.5" y1="17" x2="13" y2="17" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Explorar',
    href: '/explorar',
    match: ['/explorar', '/match'],
    icon: (c) => (
      <svg {...ICON_PROPS}>
        <circle cx="11" cy="11" r="6.5" stroke={c} strokeWidth="1.8" />
        <line x1="15.8" y1="15.8" x2="20" y2="20" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Campanhas',
    href: '/campanhas',
    match: ['/campanhas'],
    icon: (c) => (
      <svg {...ICON_PROPS}>
        <rect x="3.5" y="8" width="17" height="11" rx="2.5" stroke={c} strokeWidth="1.8" />
        <path d="M8.5 8V6.5C8.5 5.4 9.4 4.5 10.5 4.5H13.5C14.6 4.5 15.5 5.4 15.5 6.5V8" stroke={c} strokeWidth="1.8" />
        <line x1="3.5" y1="13" x2="20.5" y2="13" stroke={c} strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    label: 'Chat',
    href: '/chat',
    match: ['/chat', '/negociacao'],
    icon: (c) => (
      <svg {...ICON_PROPS}>
        <path
          d="M4.5 6.5C4.5 5.4 5.4 4.5 6.5 4.5H17.5C18.6 4.5 19.5 5.4 19.5 6.5V14C19.5 15.1 18.6 16 17.5 16H10L6 19.5V16H6.5C5.4 16 4.5 15.1 4.5 14V6.5Z"
          stroke={c}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: 'Carteira',
    href: '/carteira',
    match: ['/carteira'],
    icon: (c) => (
      <svg {...ICON_PROPS}>
        <rect x="3.5" y="6" width="17" height="13" rx="3" stroke={c} strokeWidth="1.8" />
        <path d="M3.5 10H20.5" stroke={c} strokeWidth="1.8" />
        <circle cx="16.5" cy="14" r="1.4" fill={c} />
      </svg>
    ),
  },
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
            <div style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {n.icon(active ? C.matchPink : '#C4A899')}
            </div>
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
