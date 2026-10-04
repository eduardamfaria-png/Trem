'use client';

import { useState } from 'react';
import PhoneFrame from '@/components/PhoneFrame';
import StatusBar from '@/components/StatusBar';
import BottomNav from '@/components/BottomNav';
import { C, FONT } from '@/lib/theme';
import { myCampaigns, candidateList } from '@/lib/data';

const STATUS_FILTERS = ['Ativas', 'Encerradas', 'Rascunho'];
const STATUS_MAP: Record<string, string> = { Ativas: 'Ativa', Encerradas: 'Encerrada', Rascunho: 'Rascunho' };

const sectionLabel = {
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '.16em',
  textTransform: 'uppercase' as const,
  color: C.muted,
};

export default function CampaignsBrand() {
  const [statusFilter, setStatusFilter] = useState('Ativas');
  const [openCampaign, setOpenCampaign] = useState<string | null>(null);
  const [decisions, setDecisions] = useState<Record<string, 'yes' | 'no'>>({});

  const list = myCampaigns.filter((c) => c.status === STATUS_MAP[statusFilter]);
  const detail = myCampaigns.find((c) => c.id === openCampaign);

  return (
    <PhoneFrame caption="Campanhas · marca">
      <StatusBar background={C.cream} />

      {!detail ? (
        <div style={{ position: 'absolute', top: 50, bottom: 82, left: 0, right: 0, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div style={{ flex: 'none', padding: '8px 20px 12px', display: 'flex', flexDirection: 'column', gap: 12, borderBottom: `1.5px solid ${C.hairline}` }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <h1 style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 30, lineHeight: 1.15, letterSpacing: '.02em', color: C.plum, margin: 0 }}>
                Minhas campanhas
              </h1>
            </div>
            <div style={{ display: 'flex', gap: 7 }}>
              {STATUS_FILTERS.map((label) => {
                const on = statusFilter === label;
                return (
                  <div
                    key={label}
                    onClick={() => setStatusFilter(label)}
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
            style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '14px 20px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}
          >
            <div
              className="h-cta"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                background: C.matchPink,
                color: C.cream,
                borderRadius: 999,
                padding: 16,
                fontSize: 15.5,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background .18s',
              }}
            >
              <div style={{ width: 14, height: 2.5, background: 'currentColor', position: 'relative', borderRadius: 2 }}>
                <div style={{ position: 'absolute', left: 5.75, top: -5.75, width: 2.5, height: 14, background: 'currentColor', borderRadius: 2 }} />
              </div>
              <span>Criar campanha</span>
            </div>

            {list.map((c) => (
              <div
                key={c.id}
                className="h-lift"
                onClick={() => setOpenCampaign(c.id)}
                style={{
                  background: C.card,
                  border: `1.5px solid ${C.hairline}`,
                  borderRadius: 24,
                  padding: 18,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  cursor: 'pointer',
                  transition: 'transform .16s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 19, lineHeight: 1.2, letterSpacing: '.02em', color: C.plum }}>
                    {c.title}
                  </div>
                  <div
                    style={{
                      flex: 'none',
                      fontSize: 10.5,
                      fontWeight: 600,
                      letterSpacing: '.1em',
                      textTransform: 'uppercase',
                      padding: '5px 10px',
                      borderRadius: 999,
                      background: c.status === 'Ativa' ? C.blush : c.status === 'Encerrada' ? C.hairline : '#FFE0CF',
                      color: c.status === 'Rascunho' ? '#B23A05' : C.plum,
                    }}
                  >
                    {c.status}
                  </div>
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.45, color: C.plumSoft }}>{c.brief}</div>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', borderTop: `1.5px solid ${C.hairline}`, paddingTop: 12 }}>
                  <div>
                    <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 20, letterSpacing: '.02em', color: C.matchPink, lineHeight: 1 }}>
                      {c.budget}
                    </div>
                    <div style={{ fontSize: 11.5, color: C.muted, marginTop: 3 }}>{c.slots}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.plum }}>{c.candidates}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.matchPink }}>Ver candidatas →</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ position: 'absolute', top: 50, bottom: 82, left: 0, right: 0, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div style={{ flex: 'none', padding: '8px 20px 14px', display: 'flex', flexDirection: 'column', gap: 12, borderBottom: `1.5px solid ${C.hairline}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                onClick={() => setOpenCampaign(null)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  border: `1.5px solid ${C.hairline}`,
                  background: C.card,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: C.plum,
                  fontSize: 16,
                  flex: 'none',
                }}
              >
                ←
              </div>
              <div style={sectionLabel}>Candidatas</div>
            </div>
            <h2 style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 25, lineHeight: 1.2, letterSpacing: '.02em', color: C.matchPink, margin: 0 }}>
              {detail.title}
            </h2>
            <div style={{ display: 'flex', gap: 18 }}>
              {[
                { v: detail.budget, k: 'por criadora' },
                { v: detail.slots.split(' ')[0], k: 'vagas abertas' },
                { v: detail.deadline, k: 'encerra em' },
              ].map((s) => (
                <div key={s.k}>
                  <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 18, letterSpacing: '.02em', color: C.plum, lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: 11.5, color: C.muted, marginTop: 3 }}>{s.k}</div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="scr"
            style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '14px 20px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}
          >
            <div style={sectionLabel}>Ordenadas por compatibilidade</div>
            {candidateList.map((k) => {
              const d = decisions[k.id];
              return (
                <div
                  key={k.id}
                  style={{
                    background: C.card,
                    border: `1.5px solid ${d === 'yes' ? C.matchPink : C.hairline}`,
                    borderRadius: 24,
                    padding: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: 999,
                        background: C.blush,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 14,
                        fontWeight: 700,
                        color: C.plum,
                        flex: 'none',
                      }}
                    >
                      {k.ini}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 16, fontWeight: 600, color: C.plum }}>{k.name}</div>
                      <div style={{ fontSize: 12.5, color: C.plumSoft }}>{k.role}</div>
                    </div>
                    <div
                      style={{
                        flex: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        background: C.glowOrange,
                        color: C.cream,
                        borderRadius: 14,
                        padding: '7px 10px',
                      }}
                    >
                      <span style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 17, lineHeight: 1, letterSpacing: '.02em' }}>{k.compat}</span>
                      <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' }}>match</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {k.stats.map((st) => (
                      <div key={st.k} style={{ flex: 1, background: C.cream, borderRadius: 14, padding: '9px 10px' }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: C.plum, lineHeight: 1 }}>{st.v}</div>
                        <div style={{ fontSize: 10.5, color: C.muted, marginTop: 3, lineHeight: 1.2 }}>{st.k}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 13.5, lineHeight: 1.45, color: C.plumSoft }}>{k.pitch}</div>

                  {!d ? (
                    <div style={{ display: 'flex', gap: 9 }}>
                      <div
                        className="h-plum"
                        onClick={() => setDecisions((s) => ({ ...s, [k.id]: 'no' }))}
                        style={{
                          flex: 1,
                          textAlign: 'center',
                          padding: 12,
                          borderRadius: 999,
                          fontSize: 14,
                          fontWeight: 600,
                          cursor: 'pointer',
                          color: C.plumSoft,
                          background: 'transparent',
                          border: `1.5px solid ${C.hairlineDeep}`,
                        }}
                      >
                        Dispensar
                      </div>
                      <div
                        className="h-cta"
                        onClick={() => setDecisions((s) => ({ ...s, [k.id]: 'yes' }))}
                        style={{
                          flex: 1.4,
                          textAlign: 'center',
                          padding: 12,
                          borderRadius: 999,
                          fontSize: 14,
                          fontWeight: 600,
                          cursor: 'pointer',
                          background: C.matchPink,
                          color: C.cream,
                          transition: 'background .18s',
                        }}
                      >
                        Dar match
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        textAlign: 'center',
                        padding: 12,
                        borderRadius: 999,
                        fontSize: 14,
                        fontWeight: 600,
                        background: d === 'yes' ? C.blush : '#F5E7DA',
                        color: d === 'yes' ? C.plum : C.caption,
                      }}
                    >
                      {d === 'yes' ? 'Match dado · conversa aberta' : 'Dispensada'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <BottomNav />
    </PhoneFrame>
  );
}
