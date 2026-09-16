'use client';

import { useState } from 'react';
import PhoneFrame from '@/components/PhoneFrame';
import StatusBar from '@/components/StatusBar';
import BottomNav from '@/components/BottomNav';
import { C, FONT } from '@/lib/theme';
import { openCampaigns } from '@/lib/data';

const FILTERS = ['Todas', 'Beleza', 'Lifestyle', 'Bens de Consumo'];

export default function CampaignsCreator() {
  const [filter, setFilter] = useState('Todas');
  const [applied, setApplied] = useState<Record<string, boolean>>({});

  const list = openCampaigns.filter((c) => filter === 'Todas' || c.nicho === filter);

  return (
    <PhoneFrame caption="Campanhas · criadora">
      <StatusBar background={C.cream} />

      <div style={{ position: 'absolute', top: 50, bottom: 82, left: 0, right: 0, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div
          style={{
            flex: 'none',
            background: C.cream,
            padding: '8px 20px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            borderBottom: `1.5px solid ${C.hairline}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <h1 style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 30, lineHeight: 1.15, letterSpacing: '.02em', color: C.plum, margin: 0 }}>
              Campanhas
            </h1>
            <div style={{ fontSize: 12.5, color: C.muted, paddingBottom: 4 }}>{list.length} abertas</div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {FILTERS.map((label) => {
              const on = filter === label;
              return (
                <div
                  key={label}
                  onClick={() => setFilter(label)}
                  style={{
                    padding: '8px 15px',
                    borderRadius: 999,
                    fontSize: 13.5,
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

        <div
          className="scr"
          style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '14px 20px 24px', display: 'flex', flexDirection: 'column', gap: 13 }}
        >
          {list.map((c) => {
            const on = !!applied[c.id];
            return (
              <div
                key={c.id}
                style={{
                  background: C.card,
                  border: `1.5px solid ${C.hairline}`,
                  borderRadius: 24,
                  padding: 18,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 13,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 13,
                      background: C.blush,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 13,
                      fontWeight: 700,
                      color: C.plum,
                      flex: 'none',
                    }}
                  >
                    {c.ini}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.plumSoft }}>{c.brand}</div>
                    <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 19, lineHeight: 1.2, letterSpacing: '.02em', color: C.plum }}>
                      {c.title}
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      background: C.glowOrange,
                      color: C.cream,
                      borderRadius: 16,
                      padding: '8px 11px',
                    }}
                  >
                    <span style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 19, lineHeight: 1, letterSpacing: '.02em' }}>{c.compat}</span>
                    <span style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' }}>match</span>
                  </div>
                </div>

                <div style={{ fontSize: 14.5, lineHeight: 1.5, color: C.plum }}>{c.brief}</div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {c.tags.map((t) => (
                    <div
                      key={t}
                      style={{
                        padding: '5px 11px',
                        borderRadius: 999,
                        background: C.cream,
                        border: `1.5px solid ${C.hairline}`,
                        fontSize: 12,
                        fontWeight: 600,
                        color: C.plumSoft,
                      }}
                    >
                      {t}
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1.5px solid ${C.hairline}`, paddingTop: 12 }}>
                  <div>
                    <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 21, letterSpacing: '.02em', color: C.matchPink, lineHeight: 1 }}>
                      {c.fee}
                    </div>
                    <div style={{ fontSize: 11.5, color: C.muted, marginTop: 3 }}>{c.deadline}</div>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: 12.5, color: C.plumSoft }}>{c.applicants}</div>
                </div>

                <div
                  onClick={() => setApplied((s) => ({ ...s, [c.id]: !s[c.id] }))}
                  style={{
                    textAlign: 'center',
                    padding: 14,
                    borderRadius: 999,
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all .18s',
                    background: on ? 'transparent' : C.matchPink,
                    color: on ? C.matchPink : C.cream,
                    border: `1.5px solid ${C.matchPink}`,
                  }}
                >
                  {on ? 'Candidatura enviada' : 'Candidatar-se'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
