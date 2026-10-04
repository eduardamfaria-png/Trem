'use client';

import { useState } from 'react';
import PhoneFrame from '@/components/PhoneFrame';
import StatusBar from '@/components/StatusBar';
import BottomNav from '@/components/BottomNav';
import ImageSlot from '@/components/ImageSlot';
import { C, FONT } from '@/lib/theme';
import { profiles } from '@/lib/data';

export default function ProfileScreen({ which }: { which: 'criadora' | 'marca' }) {
  const p = profiles[which];
  const [tab, setTab] = useState('mural');
  const [connected, setConnected] = useState(which === 'marca');

  return (
    <PhoneFrame caption={p.caption}>
      <StatusBar color={C.cream} iconOpacity={0.6} />

      <div className="scr" style={{ position: 'absolute', top: 0, bottom: 82, left: 0, right: 0, overflowY: 'auto' }}>
        <div style={{ position: 'relative', width: '100%', height: 176, background: C.blush }}>
          <ImageSlot placeholder={p.coverHint} />
          <div
            style={{
              position: 'absolute',
              top: 58,
              left: 20,
              right: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 999,
                background: 'rgba(59,14,30,.55)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: C.cream,
                fontSize: 15,
              }}
            >
              ←
            </div>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 999,
                background: 'rgba(59,14,30,.55)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: C.cream,
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: '.08em',
              }}
            >
              ···
            </div>
          </div>
        </div>

        <div style={{ padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, marginTop: -52 }}>
            <div
              style={{
                position: 'relative',
                width: 112,
                height: 112,
                borderRadius: p.avatarRadius,
                overflow: 'hidden',
                border: `3px solid ${C.cream}`,
                background: C.blushSoft,
                flex: 'none',
              }}
            >
              <ImageSlot />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                background: C.glowOrange,
                color: C.cream,
                borderRadius: 999,
                padding: '8px 14px',
                marginBottom: 8,
              }}
            >
              <div style={{ width: 9, height: 9, borderRadius: 999, background: C.cream }} />
              <span style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 18, letterSpacing: '.02em' }}>{p.compat}</span>
              <span style={{ fontSize: 12, fontWeight: 600 }}>compatível</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h1 style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 30, lineHeight: 1.15, letterSpacing: '.02em', color: C.plum, margin: 0 }}>
                {p.name}
              </h1>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  color: p.kindFg,
                  background: p.kindBg,
                  padding: '4px 9px',
                  borderRadius: 999,
                }}
              >
                {p.kind}
              </span>
            </div>
            <div style={{ fontSize: 15, color: C.plumSoft, lineHeight: 1.4 }}>{p.role}</div>
            <div style={{ fontSize: 13, color: C.muted }}>{p.meta}</div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {p.chips.map((chip) => (
              <div key={chip} style={{ padding: '7px 14px', borderRadius: 999, background: C.blush, color: C.plum, fontSize: 13, fontWeight: 500 }}>
                {chip}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 9 }}>
            <div
              onClick={() => setConnected((v) => !v)}
              style={{
                flex: 1,
                textAlign: 'center',
                padding: 14,
                borderRadius: 999,
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all .18s',
                background: connected ? 'transparent' : C.matchPink,
                color: connected ? C.matchPink : C.cream,
                border: `1.5px solid ${C.matchPink}`,
              }}
            >
              {connected ? 'Conectados' : 'Conectar'}
            </div>
            <div
              className="h-plum-border"
              style={{
                flex: 1,
                textAlign: 'center',
                padding: 14,
                borderRadius: 999,
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                color: C.plum,
                background: C.card,
                border: `1.5px solid ${C.hairline}`,
              }}
            >
              Mensagem
            </div>
          </div>

          <div style={{ background: C.card, border: `1.5px solid ${C.hairline}`, borderRadius: 24, padding: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: C.muted }}>{p.bioLabel}</div>
            <div style={{ fontSize: 15, lineHeight: 1.55, color: C.plum }}>{p.bio}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingTop: 4 }}>
              {p.links.map((lk) => (
                <div
                  key={lk.handle}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    background: C.cream,
                    border: `1.5px solid ${C.hairline}`,
                    borderRadius: 999,
                    padding: '8px 13px',
                  }}
                >
                  <div style={{ width: 16, height: 16, borderRadius: 5, background: lk.dot, flex: 'none' }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.plum }}>{lk.handle}</span>
                  <span style={{ fontSize: 12, color: C.muted }}>{lk.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 9 }}>
            {p.metrics.map((m) => (
              <div
                key={m.k}
                style={{
                  flex: 1,
                  background: C.card,
                  border: `1.5px solid ${C.hairline}`,
                  borderRadius: 20,
                  padding: '14px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}
              >
                <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 24, letterSpacing: '.02em', color: C.matchPink, lineHeight: 1 }}>
                  {m.v}
                </div>
                <div style={{ fontSize: 11.5, lineHeight: 1.25, color: C.plumSoft }}>{m.k}</div>
              </div>
            ))}
          </div>

          {p.hasCampaigns && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 21, letterSpacing: '.02em', color: C.matchPink }}>
                  Campanhas ativas
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.muted }}>Ver todas</div>
              </div>
              {p.campaigns.map((c) => (
                <div key={c.title} style={{ background: C.blush, borderRadius: 22, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ fontWeight: 600, fontSize: 16, color: C.plum, lineHeight: 1.3 }}>{c.title}</div>
                    <div
                      style={{
                        flex: 'none',
                        background: C.glowOrange,
                        color: C.cream,
                        fontSize: 11,
                        fontWeight: 600,
                        padding: '5px 10px',
                        borderRadius: 999,
                      }}
                    >
                      {c.match}
                    </div>
                  </div>
                  <div style={{ fontSize: 13.5, color: '#7A2B41', lineHeight: 1.4 }}>{c.desc}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1.5px solid rgba(59,14,30,.14)', paddingTop: 10 }}>
                    <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 19, letterSpacing: '.02em', color: C.plum }}>{c.fee}</div>
                    <div style={{ fontSize: 12.5, color: '#7A2B41' }}>{c.slots}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', gap: 6, background: C.card, border: `1.5px solid ${C.hairline}`, borderRadius: 999, padding: 5 }}>
              {p.tabLabels.map(([id, label]) => (
                <div
                  key={id}
                  onClick={() => setTab(id)}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '10px 4px',
                    borderRadius: 999,
                    fontSize: 13.5,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all .16s',
                    background: tab === id ? C.matchPink : 'transparent',
                    color: tab === id ? C.cream : C.plumSoft,
                  }}
                >
                  {label}
                </div>
              ))}
            </div>

            {tab === 'mural' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {p.posts.map((post) => (
                  <div
                    key={post.id}
                    style={{
                      background: C.card,
                      border: `1.5px solid ${C.hairline}`,
                      borderRadius: 24,
                      padding: 16,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: C.muted }}>
                        {post.time}
                      </div>
                      <div style={{ fontSize: 12.5, color: C.muted }}>{post.stats}</div>
                    </div>
                    <div style={{ fontSize: 15, lineHeight: 1.5, color: C.plum }}>{post.text}</div>
                    {post.hasImage && (
                      <div style={{ position: 'relative', width: '100%', height: 170, borderRadius: 18, overflow: 'hidden', background: C.blush }}>
                        <ImageSlot placeholder={post.hint} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {tab === 'work' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11 }}>
                {p.work.map((w) => (
                  <div key={w.id} style={{ background: C.card, border: `1.5px solid ${C.hairline}`, borderRadius: 20, overflow: 'hidden' }}>
                    <div style={{ position: 'relative', width: '100%', height: 132, background: C.blush }}>
                      <ImageSlot placeholder={w.hint} />
                    </div>
                    <div style={{ padding: '11px 13px 13px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: C.plum, lineHeight: 1.3 }}>{w.title}</div>
                      <div style={{ fontSize: 11.5, color: C.muted }}>{w.meta}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'reviews' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ background: C.blush, borderRadius: 22, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 38, letterSpacing: '.02em', color: C.plum, lineHeight: 1 }}>
                    {p.rating}
                  </div>
                  <div style={{ fontSize: 13.5, color: '#7A2B41', lineHeight: 1.4 }}>{p.ratingNote}</div>
                </div>
                {p.reviews.map((r) => (
                  <div
                    key={r.name}
                    style={{
                      background: C.card,
                      border: `1.5px solid ${C.hairline}`,
                      borderRadius: 22,
                      padding: 16,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 9,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 999,
                          background: C.blushSoft,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 12,
                          fontWeight: 700,
                          color: C.plum,
                          flex: 'none',
                        }}
                      >
                        {r.ini}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14.5, fontWeight: 600, color: C.plum }}>{r.name}</div>
                        <div style={{ fontSize: 12, color: C.muted }}>{r.ctx}</div>
                      </div>
                      <div
                        style={{
                          flex: 'none',
                          background: C.cream,
                          border: `1.5px solid ${C.hairline}`,
                          borderRadius: 999,
                          padding: '5px 11px',
                          fontSize: 13,
                          fontWeight: 700,
                          color: C.matchPink,
                        }}
                      >
                        {r.score}
                      </div>
                    </div>
                    <div style={{ fontSize: 14.5, lineHeight: 1.5, color: C.plum }}>{r.text}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ background: C.card, border: `1.5px solid ${C.hairline}`, borderRadius: 24, padding: 18, display: 'flex', flexDirection: 'column', gap: 13 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 20, letterSpacing: '.02em', color: C.plum }}>Conexões</div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: C.matchPink }}>{p.connCount}</div>
            </div>
            {p.connections.map((c) => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 999,
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
                  <div style={{ fontSize: 14.5, fontWeight: 600, color: C.plum }}>{c.name}</div>
                  <div style={{ fontSize: 12.5, color: C.plumSoft }}>{c.role}</div>
                </div>
                <div style={{ flex: 'none', fontSize: 12, fontWeight: 600, color: C.glowOrange }}>{c.match}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
