'use client';

import { useState } from 'react';
import PhoneFrame from '@/components/PhoneFrame';
import StatusBar from '@/components/StatusBar';
import BottomNav from '@/components/BottomNav';
import { C, FONT } from '@/lib/theme';
import { paymentList, walletStatus } from '@/lib/data';

const FILTERS = ['Todos', 'Pendente', 'Em garantia', 'Liberado'];

export default function CarteiraPage() {
  const [filter, setFilter] = useState('Todos');
  const pays = paymentList.filter((p) => filter === 'Todos' || p.status === filter);

  return (
    <PhoneFrame caption="Carteira · criadora">
      <StatusBar color={C.cream} iconOpacity={0.6} />

      <div style={{ position: 'absolute', top: 50, bottom: 82, left: 0, right: 0, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ flex: 'none', background: C.matchPink, padding: '10px 22px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', color: C.blushSoft }}>Carteira</div>
          <div>
            <div style={{ fontSize: 13.5, color: C.blushSoft }}>Saldo disponível</div>
            <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 44, lineHeight: 1.1, letterSpacing: '.02em', color: C.cream }}>
              R$ 4.820
            </div>
            <div style={{ fontSize: 13, color: C.blushSoft }}>R$ 6.200 em garantia · liberação em até 7 dias</div>
          </div>
          <div style={{ display: 'flex', gap: 9 }}>
            <div
              className="h-blush"
              style={{
                flex: 1.3,
                textAlign: 'center',
                padding: 13,
                borderRadius: 999,
                background: C.cream,
                color: C.matchPink,
                fontSize: 14.5,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Transferir
            </div>
            <div
              className="h-veil"
              style={{
                flex: 1,
                textAlign: 'center',
                padding: 13,
                borderRadius: 999,
                border: `1.5px solid ${C.blush}`,
                color: C.cream,
                fontSize: 14.5,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Extrato
            </div>
          </div>
        </div>

        <div style={{ flex: 'none', padding: '14px 20px 10px', display: 'flex', gap: 7 }}>
          {FILTERS.map((label) => {
            const on = filter === label;
            return (
              <div
                key={label}
                onClick={() => setFilter(label)}
                style={{
                  padding: '8px 13px',
                  borderRadius: 999,
                  fontSize: 12.5,
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

        <div
          className="scr"
          style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '4px 20px 20px', display: 'flex', flexDirection: 'column', gap: 11 }}
        >
          {pays.map((pay) => {
            const st = walletStatus[pay.status];
            return (
              <div
                key={pay.id}
                style={{
                  background: C.card,
                  border: `1.5px solid ${C.hairline}`,
                  borderRadius: 22,
                  padding: '15px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 11,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: C.plum, lineHeight: 1.3 }}>{pay.title}</div>
                    <div style={{ fontSize: 12.5, color: C.plumSoft }}>{pay.brand}</div>
                  </div>
                  <div
                    style={{
                      flex: 'none',
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: '.1em',
                      textTransform: 'uppercase',
                      padding: '5px 10px',
                      borderRadius: 999,
                      background: st.bg,
                      color: st.fg,
                    }}
                  >
                    {pay.status}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', borderTop: `1.5px solid ${C.hairline}`, paddingTop: 11 }}>
                  <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 22, letterSpacing: '.02em', color: st.amount, lineHeight: 1 }}>
                    {pay.amount}
                  </div>
                  <div style={{ textAlign: 'right', fontSize: 12, color: C.muted2, lineHeight: 1.3 }}>{pay.when}</div>
                </div>
                {pay.barPct && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ height: 6, borderRadius: 999, background: C.track, overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          borderRadius: 999,
                          background: pay.status === 'Em garantia' ? C.glowOrange : C.blush,
                          width: pay.barPct,
                        }}
                      />
                    </div>
                    <div style={{ fontSize: 11.5, color: C.muted2 }}>{pay.barNote}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
