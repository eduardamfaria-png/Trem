'use client';

import { useState } from 'react';
import PhoneFrame from '@/components/PhoneFrame';
import StatusBar from '@/components/StatusBar';
import AppHeader from '@/components/AppHeader';
import BottomNav from '@/components/BottomNav';
import ImageSlot from '@/components/ImageSlot';
import { C, FONT } from '@/lib/theme';
import { exploreCards } from '@/lib/data';

const FILTERS = ['Todos', 'Beleza', 'Lifestyle', 'Bens de Consumo'];

export default function ExploreScreen() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Todos');

  const cards = exploreCards.filter((c) => filter === 'Todos' || c.nicho === filter);

  return (
    <PhoneFrame caption="Explorar">
      <StatusBar background={C.cream} zIndex={6} />
      <AppHeader />

      <div style={{ position: 'absolute', top: 110, bottom: 82, left: 0, right: 0, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ flex: 'none', background: C.cream, padding: '14px 20px 10px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div
            className="f-pink"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: C.card,
              border: `1.5px solid ${C.hairline}`,
              borderRadius: 999,
              padding: '13px 18px',
            }}
          >
            <div style={{ width: 14, height: 14, borderRadius: 999, border: `2px solid ${C.muted}`, flex: 'none' }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar marcas, criadoras, campanhas"
              style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 14.5, color: C.plum, minWidth: 0 }}
            />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {FILTERS.map((label) => {
              const on = filter === label;
              return (
                <div
                  key={label}
                  onClick={() => setFilter(label)}
                  style={{
                    flex: 'none',
                    padding: '9px 16px',
                    borderRadius: 999,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all .16s',
                    background: on ? C.matchPink : C.card,
                    border: `1.5px solid ${on ? C.matchPink : C.hairline}`,
                    color: on ? C.cream : C.plumSoft,
                  }}
                >
                  {label}
                </div>
              );
            })}
          </div>
        </div>

        <div className="scr" style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '4px 20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '6px 0 12px' }}>
            <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 22, letterSpacing: '.02em', color: C.matchPink }}>
              {filter === 'Todos' ? 'Em alta agora' : filter}
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: C.muted }}>
              {cards.length} posts
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, alignItems: 'start' }}>
            {cards.map((c) => (
              <div
                key={c.id}
                className="h-lift-3"
                style={{
                  background: C.card,
                  border: `1.5px solid ${C.hairline}`,
                  borderRadius: 22,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform .18s',
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: c.h, background: C.blush }}>
                  <ImageSlot placeholder={c.hint} />
                  <div
                    style={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: '.1em',
                      textTransform: 'uppercase',
                      color: C.cream,
                      background: c.kind === 'Marca' ? C.glowOrange : C.matchPink,
                      padding: '4px 9px',
                      borderRadius: 999,
                      pointerEvents: 'none',
                    }}
                  >
                    {c.kind}
                  </div>
                </div>
                <div style={{ padding: '12px 14px 14px', display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <div style={{ fontSize: 13.5, lineHeight: 1.4, color: C.plum }}>{c.text}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 999,
                        background: C.blushSoft,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 10,
                        fontWeight: 700,
                        color: C.plum,
                        flex: 'none',
                      }}
                    >
                      {c.ini}
                    </div>
                    <div
                      style={{
                        fontSize: 12.5,
                        fontWeight: 600,
                        color: C.plumSoft,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {c.name}
                    </div>
                  </div>
                  <div style={{ fontSize: 11.5, color: C.muted }}>{c.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
