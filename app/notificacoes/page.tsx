'use client';

import { useState } from 'react';
import Link from 'next/link';
import PhoneFrame from '@/components/PhoneFrame';
import StatusBar from '@/components/StatusBar';
import { C, FONT } from '@/lib/theme';
import { notifications } from '@/lib/data';

const KIND_DOT: Record<string, string> = {
  match: C.matchPink,
  proposta: C.glowOrange,
  pagamento: '#2F8F5B',
  mensagem: C.plumSoft,
  campanha: C.glowOrange,
};

export default function NotificacoesPage() {
  const [read, setRead] = useState<Record<string, boolean>>({});

  return (
    <PhoneFrame caption="Notificações">
      <StatusBar background={C.cream} zIndex={6} />

      <div
        style={{
          position: 'absolute',
          top: 50,
          left: 0,
          right: 0,
          zIndex: 5,
          background: C.cream,
          padding: '10px 20px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          borderBottom: `1.5px solid ${C.hairline}`,
        }}
      >
        <Link
          href="/feed"
          style={{
            width: 36,
            height: 36,
            borderRadius: 999,
            border: `1.5px solid ${C.hairline}`,
            background: C.card,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: C.plum,
            fontSize: 16,
            flex: 'none',
          }}
        >
          ←
        </Link>
        <h1 style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 24, color: C.plum, margin: 0 }}>Notificações</h1>
      </div>

      <div
        className="scr"
        style={{
          position: 'absolute',
          top: 112,
          bottom: 0,
          left: 0,
          right: 0,
          overflowY: 'auto',
          padding: '14px 20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {notifications.map((n) => {
          const unread = n.unread && !read[n.id];
          return (
            <Link
              key={n.id}
              href={n.href}
              onClick={() => setRead((s) => ({ ...s, [n.id]: true }))}
              className="h-lift"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                background: unread ? C.card : 'transparent',
                border: `1.5px solid ${unread ? C.matchPink : C.hairline}`,
                borderRadius: 20,
                padding: 14,
                textDecoration: 'none',
                transition: 'transform .16s',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 999,
                  background: n.avBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 13,
                  color: C.plum,
                  flex: 'none',
                }}
              >
                {n.ini}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ width: 7, height: 7, borderRadius: 999, background: KIND_DOT[n.kind], flex: 'none' }} />
                  <div style={{ fontWeight: 600, fontSize: 14.5, color: C.plum }}>{n.title}</div>
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.4, color: C.plumSoft, marginTop: 2 }}>{n.text}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{n.time}</div>
              </div>
              {unread && <div style={{ width: 9, height: 9, borderRadius: 999, background: C.matchPink, flex: 'none', marginTop: 4 }} />}
            </Link>
          );
        })}
      </div>
    </PhoneFrame>
  );
}
