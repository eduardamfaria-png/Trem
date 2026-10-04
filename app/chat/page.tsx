'use client';

import { useState } from 'react';
import Link from 'next/link';
import PhoneFrame from '@/components/PhoneFrame';
import StatusBar from '@/components/StatusBar';
import BottomNav from '@/components/BottomNav';
import { C, FONT } from '@/lib/theme';
import { threads } from '@/lib/data';

const TABS = ['Tudo', 'Negociações', 'Jobs', 'Geral'];
const GROUPS = ['Negociações ativas', 'Jobs em andamento', 'Geral'];

function visible(tab: string, g: string) {
  if (tab === 'Tudo') return true;
  if (tab === 'Negociações') return g === 'Negociações ativas';
  if (tab === 'Jobs') return g === 'Jobs em andamento';
  return g === 'Geral';
}

export default function ChatPage() {
  const [tab, setTab] = useState('Tudo');

  const groups = GROUPS.filter((g) => visible(tab, g)).map((g) => ({
    title: g,
    threads: threads.filter((t) => t.g === g),
  }));

  return (
    <PhoneFrame caption="Chat">
      <StatusBar />

      <div style={{ position: 'absolute', top: 50, bottom: 82, left: 0, right: 0, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ flex: 'none', padding: '8px 20px 12px', display: 'flex', flexDirection: 'column', gap: 12, borderBottom: `1.5px solid ${C.hairline}` }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <h1 style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 30, lineHeight: 1.15, letterSpacing: '.02em', color: C.plum, margin: 0 }}>
              Chat
            </h1>
            <div
              onClick={() => setTab('Tudo')}
              style={{ display: 'flex', alignItems: 'center', gap: 9, background: C.blush, borderRadius: 999, padding: '9px 14px', cursor: 'pointer' }}
            >
              <div style={{ width: 22, height: 22, borderRadius: 8, background: C.plum, flex: 'none' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: C.plum }}>Suporte</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, background: C.card, border: `1.5px solid ${C.hairline}`, borderRadius: 999, padding: 5 }}>
            {TABS.map((label) => {
              const on = tab === label;
              return (
                <div
                  key={label}
                  onClick={() => setTab(label)}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '9px 4px',
                    borderRadius: 999,
                    fontSize: 12.5,
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all .16s',
                    background: on ? C.matchPink : 'transparent',
                    color: on ? C.cream : C.plumSoft,
                  }}
                >
                  {label}
                </div>
              );
            })}
          </div>
        </div>

        <div className="scr" style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '8px 20px 20px' }}>
          {groups.map((g) => (
            <div key={g.title} style={{ display: 'flex', flexDirection: 'column', gap: 9, paddingTop: 14 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', color: C.muted2 }}>{g.title}</div>
                <div style={{ fontSize: 11.5, color: C.placeholder }}>
                  {g.threads.length} {g.threads.length === 1 ? 'conversa' : 'conversas'}
                </div>
              </div>
              {g.threads.map((th) => {
                const body = (
                  <>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: th.avRadius,
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
                      {th.ini}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <span style={{ fontSize: 15, fontWeight: 600, color: C.plum, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {th.name}
                        </span>
                        {th.pill && (
                          <span
                            style={{
                              flex: 'none',
                              fontSize: 9.5,
                              fontWeight: 600,
                              letterSpacing: '.08em',
                              textTransform: 'uppercase',
                              padding: '3px 8px',
                              borderRadius: 999,
                              background: th.pillBg,
                              color: th.pillFg,
                            }}
                          >
                            {th.pill}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 13, color: C.plumSoft, lineHeight: 1.35, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {th.msg}
                      </div>
                    </div>
                    <div style={{ flex: 'none', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5 }}>
                      <div style={{ fontSize: 11, color: C.muted2 }}>{th.time}</div>
                      {th.count && (
                        <div
                          style={{
                            minWidth: 20,
                            height: 20,
                            borderRadius: 999,
                            background: C.glowOrange,
                            color: C.cream,
                            fontSize: 11,
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '0 6px',
                          }}
                        >
                          {th.count}
                        </div>
                      )}
                    </div>
                  </>
                );

                const style = {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  background: C.card,
                  border: `1.5px solid ${th.count ? C.matchPink : C.hairline}`,
                  borderRadius: 22,
                  padding: 14,
                  cursor: 'pointer',
                  transition: 'transform .16s',
                } as const;

                return th.href ? (
                  <Link key={th.name} href={th.href} className="h-lift" style={style}>
                    {body}
                  </Link>
                ) : (
                  <div key={th.name} className="h-lift" style={style}>
                    {body}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
