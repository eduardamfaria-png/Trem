'use client';

import { useState } from 'react';
import Link from 'next/link';
import PhoneFrame from '@/components/PhoneFrame';
import StatusBar from '@/components/StatusBar';
import { C, FONT } from '@/lib/theme';

const DEADLINES = ['7 dias', '12 dias', '20 dias'];

const DELIVERABLES = [
  { k: 'd1', label: '1 Reels de até 45 s com roteiro próprio' },
  { k: 'd2', label: '1 carrossel de 5 imagens' },
  { k: 'd3', label: 'Cessão de imagem por 90 dias (+R$ 600)' },
];

const HISTORY = [
  { text: 'Casa Verde enviou proposta de R$ 3.500 com 7 dias.', time: 'hoje, 09:12', dot: C.glowOrange },
  { text: 'Você abriu a negociação pela campanha do sérum.', time: 'ontem, 18:40', dot: C.blush },
];

const fieldLabel = {
  fontSize: 11.5,
  fontWeight: 600,
  letterSpacing: '.14em',
  textTransform: 'uppercase' as const,
  color: C.muted2,
};

export default function NegociacaoPage() {
  const [editing, setEditing] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [value, setValue] = useState('3.500');
  const [deadline, setDeadline] = useState('7 dias');
  const [delivs, setDelivs] = useState<Record<string, boolean>>({ d1: true, d2: true, d3: false });

  return (
    <PhoneFrame caption="Negociação">
      <StatusBar />

      <div style={{ position: 'absolute', top: 50, bottom: 0, left: 0, right: 0, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ flex: 'none', padding: '8px 20px 14px', display: 'flex', flexDirection: 'column', gap: 10, borderBottom: `1.5px solid ${C.hairline}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link
              href="/chat"
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
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', color: C.muted2 }}>Negociação</div>
            <div
              style={{
                marginLeft: 'auto',
                fontSize: 10.5,
                fontWeight: 600,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                background: C.glowOrange,
                color: C.cream,
                padding: '5px 10px',
                borderRadius: 999,
              }}
            >
              {accepted ? 'Fechada' : 'Em aberto'}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
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
              CV
            </div>
            <div>
              <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 21, lineHeight: 1.15, letterSpacing: '.02em', color: C.plum }}>
                Casa Verde Cosméticos
              </div>
              <div style={{ fontSize: 13, color: C.plumSoft }}>Lançamento sérum de niacinamida</div>
            </div>
          </div>
        </div>

        <div className="scr" style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '16px 20px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: C.card, border: `1.5px solid ${C.hairline}`, borderRadius: 24, padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', color: C.muted2 }}>
                {editing ? 'Sua contraproposta' : 'Proposta da marca'}
              </div>
              <div style={{ fontSize: 12, color: C.muted2 }}>{editing ? 'agora' : 'recebida hoje, 09:12'}</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={fieldLabel}>Valor</div>
              {editing ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    background: C.cream,
                    border: `1.5px solid ${C.matchPink}`,
                    borderRadius: 18,
                    padding: '13px 16px',
                  }}
                >
                  <span style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 20, letterSpacing: '.02em', color: C.plum }}>R$</span>
                  <input
                    value={value}
                    onChange={(e) => setValue(e.target.value.replace(/[^0-9.,]/g, ''))}
                    style={{
                      flex: 1,
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      fontFamily: FONT.display,
                      fontWeight: 800,
                      fontSize: 22,
                      letterSpacing: '.02em',
                      color: C.plum,
                      minWidth: 0,
                    }}
                  />
                </div>
              ) : (
                <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 30, letterSpacing: '.02em', color: C.matchPink, lineHeight: 1 }}>
                  R$ {value}
                </div>
              )}
              <div style={{ fontSize: 12.5, color: C.muted2 }}>
                {editing ? 'A marca é notificada na hora.' : 'Pagamento único, em garantia até a aprovação.'}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, borderTop: `1.5px solid ${C.hairline}`, paddingTop: 14 }}>
              <div style={fieldLabel}>Prazo de entrega</div>
              {editing ? (
                <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                  {DEADLINES.map((l) => {
                    const on = deadline === l;
                    return (
                      <div
                        key={l}
                        onClick={() => setDeadline(l)}
                        style={{
                          padding: '9px 15px',
                          borderRadius: 999,
                          fontSize: 13.5,
                          fontWeight: 600,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          background: on ? C.matchPink : C.card,
                          border: `1.5px solid ${on ? C.matchPink : C.hairline}`,
                          color: on ? C.cream : C.plumSoft,
                        }}
                      >
                        {l}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ fontSize: 17, fontWeight: 600, color: C.plum }}>{deadline} após o aceite</div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, borderTop: `1.5px solid ${C.hairline}`, paddingTop: 14 }}>
              <div style={fieldLabel}>Entregáveis</div>
              {DELIVERABLES.map((d) => {
                const on = !!delivs[d.k];
                return (
                  <div
                    key={d.k}
                    onClick={() => setDelivs((s) => ({ ...s, [d.k]: !s[d.k] }))}
                    style={{ display: 'flex', alignItems: 'center', gap: 11, cursor: 'pointer' }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 7,
                        flex: 'none',
                        border: `2px solid ${on ? C.matchPink : C.hairlineDeep}`,
                        background: on ? C.matchPink : 'transparent',
                      }}
                    />
                    <div style={{ flex: 1, fontSize: 14.5, lineHeight: 1.35, color: on ? C.plum : C.muted2 }}>{d.label}</div>
                  </div>
                );
              })}
            </div>

            <div style={{ background: C.blush, borderRadius: 18, padding: '13px 15px', fontSize: 13.5, lineHeight: 1.45, color: C.plum }}>
              Pagamento fica em garantia no Matchy até a aprovação da entrega.
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            <div style={{ ...fieldLabel, letterSpacing: '.16em' }}>Histórico</div>
            {HISTORY.map((h) => (
              <div key={h.time} style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                <div style={{ width: 9, height: 9, borderRadius: 999, background: h.dot, marginTop: 6, flex: 'none' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, color: C.plum, lineHeight: 1.4 }}>{h.text}</div>
                  <div style={{ fontSize: 11.5, color: C.muted2 }}>{h.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 'none', padding: '14px 20px 22px', borderTop: `1.5px solid ${C.hairline}`, background: C.cream, display: 'flex', gap: 9 }}>
          {!accepted ? (
            <>
              <div
                className="h-plum-border"
                onClick={() => setEditing((v) => !v)}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: 15,
                  borderRadius: 999,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: C.plum,
                  background: C.card,
                  border: `1.5px solid ${C.hairlineDeep}`,
                }}
              >
                {editing ? 'Cancelar' : 'Contrapropor'}
              </div>
              <div
                className="h-cta"
                onClick={() => (editing ? setEditing(false) : setAccepted(true))}
                style={{
                  flex: 1.3,
                  textAlign: 'center',
                  padding: 15,
                  borderRadius: 999,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: C.matchPink,
                  color: C.cream,
                  transition: 'background .18s',
                }}
              >
                {editing ? 'Enviar contraproposta' : 'Aceitar'}
              </div>
            </>
          ) : (
            <div
              style={{
                flex: 1,
                textAlign: 'center',
                padding: 15,
                borderRadius: 999,
                fontSize: 15,
                fontWeight: 600,
                background: C.blush,
                color: C.plum,
              }}
            >
              Proposta aceita · job criado
            </div>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}
