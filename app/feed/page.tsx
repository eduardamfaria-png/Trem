'use client';

import { useState } from 'react';
import Link from 'next/link';
import PhoneFrame from '@/components/PhoneFrame';
import StatusBar from '@/components/StatusBar';
import AppHeader from '@/components/AppHeader';
import BottomNav from '@/components/BottomNav';
import ImageSlot from '@/components/ImageSlot';
import { C, FONT } from '@/lib/theme';
import { feedPosts, feedSuggestions } from '@/lib/data';

export default function FeedPage() {
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [connected, setConnected] = useState<Record<string, boolean>>({});

  return (
    <PhoneFrame caption="Feed">
      <StatusBar background={C.cream} zIndex={6} />
      <AppHeader />

      <div
        className="scr"
        style={{
          position: 'absolute',
          top: 110,
          bottom: 82,
          left: 0,
          right: 0,
          overflowY: 'auto',
          padding: '16px 20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: C.card,
            border: `1.5px solid ${C.hairline}`,
            borderRadius: 24,
            padding: '14px 16px',
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              background: C.blush,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              fontSize: 14,
              color: C.plum,
              flex: 'none',
            }}
          >
            MD
          </div>
          <div style={{ flex: 1, fontSize: 15, color: C.muted }}>Compartilhe um trabalho, uma vaga…</div>
        </div>

        {feedPosts.map((post) => {
          const on = !!liked[post.id];
          const isBrand = post.tag === 'Marca';
          return (
            <div
              key={post.id}
              style={{
                background: C.card,
                border: `1.5px solid ${C.hairline}`,
                borderRadius: 24,
                padding: 18,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <Link
                  href={post.href}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 999,
                    background: post.avBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: 15,
                    color: C.plum,
                    flex: 'none',
                  }}
                >
                  {post.ini}
                </Link>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <Link href={post.href} style={{ fontWeight: 600, fontSize: 16, color: C.plum }}>
                      {post.name}
                    </Link>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: '.1em',
                        textTransform: 'uppercase',
                        color: isBrand ? '#B23A05' : '#B01A49',
                        background: isBrand ? '#FFE0CF' : C.blushSoft,
                        padding: '3px 8px',
                        borderRadius: 999,
                      }}
                    >
                      {post.tag}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: C.plumSoft, lineHeight: 1.35 }}>{post.role}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>{post.time}</div>
                </div>
                <div style={{ color: C.muted, fontSize: 18, fontWeight: 700, letterSpacing: '.1em' }}>···</div>
              </div>

              <div style={{ fontSize: 15, lineHeight: 1.5, color: C.plum }}>{post.text}</div>

              {post.hasImage && (
                <div style={{ position: 'relative', width: '100%', height: 200, borderRadius: 18, overflow: 'hidden', background: C.blush }}>
                  <ImageSlot placeholder={post.slotHint} />
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: C.plumSoft }}>
                <div style={{ width: 18, height: 18, borderRadius: 999, background: C.matchPink }} />
                <span>{post.likes + (on ? 1 : 0)} curtidas</span>
                <span style={{ color: '#D9C0B0' }}>·</span>
                <span>{post.comments} comentários</span>
              </div>

              <div style={{ display: 'flex', gap: 8, borderTop: `1.5px solid ${C.hairline}`, paddingTop: 12 }}>
                <div
                  onClick={() => setLiked((s) => ({ ...s, [post.id]: !s[post.id] }))}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 7,
                    padding: 9,
                    borderRadius: 999,
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: 600,
                    transition: 'all .16s',
                    background: on ? C.blush : 'transparent',
                    color: on ? C.matchPink : C.plumSoft,
                  }}
                >
                  <div style={{ width: 14, height: 14, borderRadius: 999, background: 'currentColor' }} />
                  <span>Curtir</span>
                </div>
                <div
                  className="h-cream"
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 7,
                    padding: 9,
                    borderRadius: 999,
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: 600,
                    color: C.plumSoft,
                  }}
                >
                  <div style={{ width: 14, height: 14, borderRadius: 5, border: '2px solid currentColor' }} />
                  <span>Comentar</span>
                </div>
              </div>
            </div>
          );
        })}

        <div style={{ background: C.blush, borderRadius: 24, padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 20, letterSpacing: '.02em', color: C.plum }}>
              Match sugerido
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#8E2C44' }}>Ver todos</div>
          </div>
          {feedSuggestions.map((sg) => {
            const on = !!connected[sg.id];
            return (
              <div
                key={sg.id}
                style={{ display: 'flex', alignItems: 'center', gap: 12, background: C.cream, borderRadius: 18, padding: '12px 14px' }}
              >
                <Link
                  href={sg.href}
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 999,
                    background: C.blushSoft,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: 14,
                    color: C.plum,
                    flex: 'none',
                  }}
                >
                  {sg.ini}
                </Link>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Link href={sg.href} style={{ display: 'block', fontWeight: 600, fontSize: 15, color: C.plum }}>
                    {sg.name}
                  </Link>
                  <div style={{ fontSize: 12.5, color: C.plumSoft, lineHeight: 1.3 }}>{sg.why}</div>
                </div>
                <div
                  onClick={() => setConnected((s) => ({ ...s, [sg.id]: !s[sg.id] }))}
                  style={{
                    flex: 'none',
                    padding: '9px 16px',
                    borderRadius: 999,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all .16s',
                    background: on ? 'transparent' : C.matchPink,
                    color: on ? '#8E2C44' : C.cream,
                    border: `1.5px solid ${C.matchPink}`,
                  }}
                >
                  {on ? 'Enviado' : 'Conectar'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="h-cta"
        style={{
          position: 'absolute',
          right: 20,
          bottom: 98,
          zIndex: 7,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: C.matchPink,
          color: C.cream,
          borderRadius: 999,
          padding: '15px 20px',
          fontSize: 15,
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 10px 24px rgba(229,33,95,.35)',
          transition: 'background .18s',
        }}
      >
        <div style={{ width: 14, height: 2.5, background: 'currentColor', position: 'relative', borderRadius: 2 }}>
          <div style={{ position: 'absolute', left: 5.75, top: -5.75, width: 2.5, height: 14, background: 'currentColor', borderRadius: 2 }} />
        </div>
        <span>Criar post</span>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
