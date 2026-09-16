'use client';

import { useRef, useState } from 'react';
import PhoneFrame from '@/components/PhoneFrame';
import StatusBar from '@/components/StatusBar';
import BottomNav from '@/components/BottomNav';
import ImageSlot from '@/components/ImageSlot';
import { C, FONT } from '@/lib/theme';
import { matchStack } from '@/lib/data';

const PILLS: { label: string; key: string; options: string[] }[] = [
  { label: 'Nicho', key: 'nicho', options: ['Beleza', 'Lifestyle', 'Bens de Consumo'] },
  { label: 'Resposta', key: 'resposta', options: ['Até 2 h', 'Até 12 h', 'Indiferente'] },
  { label: 'Reputação', key: 'reputacao', options: ['4,8+', '4,5+', 'Indiferente'] },
];

export default function MatchScreen() {
  const [filters, setFilters] = useState<Record<string, string>>({
    nicho: 'Beleza',
    resposta: 'Até 12 h',
    reputacao: '4,8+',
  });
  const [stackIndex, setStackIndex] = useState(0);
  const [matched, setMatched] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const x0 = useRef(0);

  const card = matchStack[stackIndex];

  function startDrag(e: React.PointerEvent<HTMLDivElement>) {
    x0.current = e.clientX;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setDragging(true);
    setDragX(0);
  }

  function moveDrag(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    setDragX(e.clientX - x0.current);
  }

  function endDrag() {
    if (!dragging) return;
    const dx = dragX;
    setDragging(false);
    setDragX(0);
    if (dx > 90) {
      setStackIndex((i) => i + 1);
      setMatched((m) => m + 1);
    } else if (dx < -90) {
      setStackIndex((i) => i + 1);
    }
  }

  const likeOpacity = Math.max(0, Math.min(1, dragX / 90));
  const nopeOpacity = Math.max(0, Math.min(1, -dragX / 90));

  const matchedSummary =
    matched === 0
      ? 'Nenhum match ainda — ajuste os filtros e tente de novo.'
      : matched +
        (matched === 1
          ? ' match enviado. A criadora já pode te responder no chat.'
          : ' matches enviados. Elas já podem te responder no chat.');

  return (
    <PhoneFrame caption="Match · busca ativa">
      <StatusBar background={C.cream} />

      <div
        style={{
          position: 'absolute',
          top: 50,
          bottom: 82,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          padding: '8px 20px 16px',
        }}
      >
        <h1
          style={{
            fontFamily: FONT.display,
            fontWeight: 800,
            fontSize: 29,
            lineHeight: 1.15,
            letterSpacing: '.02em',
            color: C.plum,
            margin: 0,
          }}
        >
          Encontrar
          <br />
          criadora ideal
        </h1>

        <div className="scr" style={{ display: 'flex', gap: 7, marginTop: 12, overflowX: 'auto', flex: 'none' }}>
          {PILLS.map((g) => (
            <div
              key={g.key}
              className="h-plum-border"
              onClick={() =>
                setFilters((s) => ({
                  ...s,
                  [g.key]: g.options[(g.options.indexOf(s[g.key]) + 1) % g.options.length],
                }))
              }
              style={{
                flex: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                padding: '9px 14px',
                borderRadius: 999,
                background: C.card,
                border: `1.5px solid ${C.hairlineDeep}`,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'border-color .16s',
              }}
            >
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: C.muted }}>
                {g.label}
              </span>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.matchPink }}>{filters[g.key]}</span>
            </div>
          ))}
        </div>

        <div style={{ position: 'relative', flex: 1, minHeight: 0, marginTop: 16 }}>
          {card ? (
            <>
              <div style={{ position: 'absolute', left: 14, right: 14, top: 14, bottom: 0, background: C.blushSoft, borderRadius: 26 }} />
              <div style={{ position: 'absolute', left: 7, right: 7, top: 7, bottom: 0, background: C.blush, borderRadius: 26 }} />
              <div
                onPointerDown={startDrag}
                onPointerMove={moveDrag}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: C.card,
                  border: `1.5px solid ${C.hairline}`,
                  borderRadius: 26,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  touchAction: 'none',
                  cursor: 'grab',
                  transform: `translateX(${dragX}px) rotate(${dragX * 0.045}deg)`,
                  transition: dragging ? 'none' : 'transform .3s cubic-bezier(.2,.8,.2,1)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    zIndex: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    background: C.matchPink,
                    color: C.cream,
                    borderRadius: 999,
                    padding: '9px 15px',
                    pointerEvents: 'none',
                    opacity: likeOpacity,
                  }}
                >
                  <div style={{ position: 'relative', width: 20, height: 20 }}>
                    <div style={{ position: 'absolute', left: 0, top: 1, width: 12, height: 12, borderRadius: 999, background: C.cream }} />
                    <div style={{ position: 'absolute', left: 8, top: 1, width: 12, height: 12, borderRadius: 999, background: C.cream }} />
                    <div style={{ position: 'absolute', left: 4, top: 5, width: 12, height: 12, background: C.cream, transform: 'rotate(45deg)' }} />
                  </div>
                  <span style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 16, letterSpacing: '.02em' }}>Match</span>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    zIndex: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    background: C.cream,
                    color: C.plum,
                    border: `1.5px solid ${C.plum}`,
                    borderRadius: 999,
                    padding: '9px 15px',
                    pointerEvents: 'none',
                    opacity: nopeOpacity,
                  }}
                >
                  <div style={{ position: 'relative', width: 16, height: 16 }}>
                    <div style={{ position: 'absolute', top: 7, left: 0, width: 16, height: 1.5, borderRadius: 2, background: C.plum, transform: 'rotate(45deg)' }} />
                    <div style={{ position: 'absolute', top: 7, left: 0, width: 16, height: 1.5, borderRadius: 2, background: C.plum, transform: 'rotate(-45deg)' }} />
                  </div>
                  <span style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 16, letterSpacing: '.02em' }}>Passar</span>
                </div>

                <div style={{ position: 'relative', width: '100%', height: 148, background: C.blush, flex: 'none' }}>
                  <ImageSlot placeholder="retrato" />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 12,
                      right: 12,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      background: C.glowOrange,
                      color: C.cream,
                      borderRadius: 16,
                      padding: '8px 12px',
                      pointerEvents: 'none',
                      zIndex: 1,
                    }}
                  >
                    <span style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 22, lineHeight: 1, letterSpacing: '.02em' }}>
                      {card.compat}
                    </span>
                    <span style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' }}>compatível</span>
                  </div>
                </div>

                <div
                  className="scr"
                  style={{ padding: '14px 18px 16px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1, minHeight: 0, overflowY: 'auto' }}
                >
                  <div>
                    <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 23, letterSpacing: '.02em', color: C.plum, lineHeight: 1.1 }}>
                      {card.name}
                    </div>
                    <div style={{ fontSize: 13.5, color: C.plumSoft, lineHeight: 1.35 }}>{card.role}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 7 }}>
                    {card.stats.map((st) => (
                      <div key={st.k} style={{ flex: 1, background: C.cream, borderRadius: 14, padding: '9px 10px' }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: C.plum, lineHeight: 1 }}>{st.v}</div>
                        <div style={{ fontSize: 10, color: C.muted, marginTop: 3, lineHeight: 1.2 }}>{st.k}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 13, lineHeight: 1.45, color: C.plumSoft }}>{card.why}</div>
                </div>
              </div>
            </>
          ) : (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: C.blush,
                borderRadius: 26,
                padding: 26,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 12,
              }}
            >
              <div style={{ fontFamily: FONT.script, fontSize: 34, color: C.matchPink, lineHeight: 1 }}>É só o começo</div>
              <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 26, letterSpacing: '.02em', color: C.plum, lineHeight: 1.15 }}>
                Você viu todas por hoje.
              </div>
              <div style={{ fontSize: 14.5, lineHeight: 1.5, color: '#7A2B41' }}>{matchedSummary}</div>
              <div
                onClick={() => {
                  setStackIndex(0);
                  setMatched(0);
                }}
                style={{
                  alignSelf: 'flex-start',
                  marginTop: 6,
                  background: C.matchPink,
                  color: C.cream,
                  borderRadius: 999,
                  padding: '13px 22px',
                  fontSize: 14.5,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Rever sugestões
              </div>
            </div>
          )}
        </div>

        {card && (
          <div style={{ flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28, paddingTop: 14 }}>
            <div
              className="h-plum-lift"
              onClick={() => setStackIndex((i) => i + 1)}
              style={{
                width: 60,
                height: 60,
                borderRadius: 999,
                background: C.card,
                border: `1.5px solid ${C.hairlineDeep}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all .18s',
              }}
            >
              <div style={{ position: 'relative', width: 22, height: 22 }}>
                <div style={{ position: 'absolute', top: 10, left: 0, width: 22, height: 1.5, borderRadius: 2, background: C.plum, transform: 'rotate(45deg)' }} />
                <div style={{ position: 'absolute', top: 10, left: 0, width: 22, height: 1.5, borderRadius: 2, background: C.plum, transform: 'rotate(-45deg)' }} />
              </div>
            </div>
            <div
              className="h-cta-lift"
              onClick={() => {
                setStackIndex((i) => i + 1);
                setMatched((m) => m + 1);
              }}
              style={{
                width: 68,
                height: 68,
                borderRadius: 999,
                background: C.matchPink,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(229,33,95,.32)',
                transition: 'all .18s',
              }}
            >
              <div style={{ position: 'relative', width: 28, height: 26 }}>
                <div style={{ position: 'absolute', left: 0, top: 1, width: 16, height: 16, borderRadius: 999, background: C.cream }} />
                <div style={{ position: 'absolute', left: 12, top: 1, width: 16, height: 16, borderRadius: 999, background: C.cream }} />
                <div style={{ position: 'absolute', left: 6, top: 7, width: 16, height: 16, background: C.cream, transform: 'rotate(45deg)' }} />
              </div>
            </div>
          </div>
        )}

        <div
          style={{
            flex: 'none',
            paddingTop: 10,
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            color: C.muted,
          }}
        >
          {card ? `Perfil ${stackIndex + 1} de ${matchStack.length}` : `${matchStack.length} perfis avaliados`}
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
