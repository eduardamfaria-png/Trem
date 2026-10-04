'use client';

import { useState } from 'react';
import Link from 'next/link';
import PhoneFrame from '@/components/PhoneFrame';
import StatusBar from '@/components/StatusBar';
import { C, FONT } from '@/lib/theme';

const STAR_WORDS = ['', 'Ruim', 'Regular', 'Boa', 'Ótima', 'Excelente'];
const TAG_LABELS: Record<string, string> = {
  t1: 'Briefing claro',
  t2: 'Prazo folgado',
  t3: 'Pagamento em dia',
  t4: 'Liberdade criativa',
};

const fieldLabel = {
  fontSize: 11.5,
  fontWeight: 600,
  letterSpacing: '.14em',
  textTransform: 'uppercase' as const,
  color: C.muted2,
};

export default function AvaliacaoPage() {
  const [stars, setStars] = useState(5);
  const [tags, setTags] = useState<Record<string, boolean>>({ t1: true, t2: false, t3: true, t4: false });
  const [comment, setComment] = useState('Briefing claro, liberdade total no roteiro e pagamento liberado em 7 dias. Faria de novo.');
  const [sent, setSent] = useState(false);

  const starLabel = `${stars},0`;
  const chosenTags = Object.keys(TAG_LABELS).filter((k) => tags[k]).map((k) => TAG_LABELS[k]);
  const newRating = stars >= 5 ? '4,9' : stars >= 4 ? '4,8' : '4,6';
  const ratingDelta =
    stars >= 5
      ? '+0,1 com a sua nota · 42 avaliações'
      : stars >= 4
        ? 'estável com a sua nota · 42 avaliações'
        : '−0,2 com a sua nota · 42 avaliações';

  return (
    <PhoneFrame caption="Avaliação pós-job">
      <StatusBar />

      <div style={{ position: 'absolute', top: 50, bottom: 0, left: 0, right: 0, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ flex: 'none', padding: '8px 20px 12px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1.5px solid ${C.hairline}` }}>
          <Link
            href="/carteira"
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
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', color: C.muted2 }}>Avaliação do job</div>
        </div>

        <div className="scr" style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {!sent ? (
            <>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 13,
                  background: C.card,
                  border: `1.5px solid ${C.hairline}`,
                  borderRadius: 22,
                  padding: '15px 16px',
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
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
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15.5, fontWeight: 600, color: C.plum, lineHeight: 1.3 }}>Lançamento sérum</div>
                  <div style={{ fontSize: 12.5, color: C.plumSoft }}>Casa Verde · entregue em 12 ago · R$ 3.500</div>
                </div>
              </div>

              <div>
                <h1 style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 31, lineHeight: 1.14, letterSpacing: '.02em', color: C.plum, margin: 0 }}>
                  Como foi
                  <br />
                  trabalhar juntas?
                </h1>
                <p style={{ fontSize: 15, lineHeight: 1.5, color: C.plumSoft, margin: '10px 0 0' }}>
                  Sua nota entra na reputação pública da marca.
                </p>
              </div>

              <div style={{ background: C.card, border: `1.5px solid ${C.hairline}`, borderRadius: 24, padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={fieldLabel}>Sua nota</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <div
                      key={n}
                      className="h-star"
                      onClick={() => setStars(n)}
                      style={{ fontSize: 38, lineHeight: 1, cursor: 'pointer', transition: 'transform .14s', color: n <= stars ? C.matchPink : C.hairline }}
                    >
                      ★
                    </div>
                  ))}
                  <div style={{ marginLeft: 'auto', fontFamily: FONT.display, fontWeight: 800, fontSize: 24, letterSpacing: '.02em', color: C.plum }}>
                    {starLabel}
                  </div>
                </div>
                <div style={{ fontSize: 14, color: C.plumSoft }}>{STAR_WORDS[stars]} — visível no perfil público da marca.</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={fieldLabel}>O que se destacou</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {Object.keys(TAG_LABELS).map((k) => {
                    const on = !!tags[k];
                    return (
                      <div
                        key={k}
                        onClick={() => setTags((s) => ({ ...s, [k]: !s[k] }))}
                        style={{
                          padding: '10px 15px',
                          borderRadius: 999,
                          fontSize: 13.5,
                          fontWeight: 500,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          transition: 'all .16s',
                          background: on ? C.matchPink : C.card,
                          border: `1.5px solid ${on ? C.matchPink : C.hairline}`,
                          color: on ? C.cream : C.plumSoft,
                        }}
                      >
                        {TAG_LABELS[k]}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                <div style={fieldLabel}>Comentário</div>
                <textarea
                  className="f-pink"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Conte como foi o briefing, o prazo e o pagamento."
                  style={{
                    width: '100%',
                    height: 110,
                    resize: 'none',
                    background: C.card,
                    border: `1.5px solid ${C.hairline}`,
                    borderRadius: 20,
                    padding: '15px 17px',
                    fontSize: 15,
                    lineHeight: 1.45,
                    color: C.plum,
                    outline: 'none',
                  }}
                />
                <div style={{ fontSize: 12, color: C.muted2 }}>{comment.length}/400 caracteres</div>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 10 }}>
              <div style={{ fontFamily: FONT.script, fontSize: 38, color: C.matchPink, lineHeight: 1 }}>Obrigada</div>
              <h1 style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 31, lineHeight: 1.14, letterSpacing: '.02em', color: C.plum, margin: 0 }}>
                Avaliação publicada.
              </h1>
              <div style={{ background: C.blush, borderRadius: 24, padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ ...fieldLabel, color: '#7A2B41' }}>Reputação da Casa Verde</div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
                  <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 44, letterSpacing: '.02em', color: C.plum, lineHeight: 1 }}>
                    {newRating}
                  </div>
                  <div style={{ fontSize: 13.5, color: '#7A2B41', lineHeight: 1.35, paddingBottom: 4 }}>{ratingDelta}</div>
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.45, color: C.plum }}>
                  Sua nota {starLabel} e o comentário já aparecem no perfil da marca.
                </div>
              </div>
              <div style={{ background: C.card, border: `1.5px solid ${C.hairline}`, borderRadius: 22, padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={fieldLabel}>Sua avaliação</div>
                <div style={{ fontSize: 14.5, lineHeight: 1.5, color: C.plum }}>{comment}</div>
                <div style={{ fontSize: 12.5, color: C.muted2 }}>
                  {chosenTags.length ? chosenTags.join(' · ') : 'Nenhum destaque marcado'}
                </div>
              </div>
              <div onClick={() => setSent(false)} style={{ alignSelf: 'flex-start', fontSize: 14, fontWeight: 600, color: C.matchPink, cursor: 'pointer' }}>
                Editar avaliação
              </div>
            </div>
          )}
        </div>

        {!sent && (
          <div style={{ flex: 'none', padding: '14px 20px 22px', borderTop: `1.5px solid ${C.hairline}`, background: C.cream }}>
            <div
              onClick={() => comment.trim() && setSent(true)}
              style={{
                textAlign: 'center',
                padding: 16,
                borderRadius: 999,
                fontSize: 15.5,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background .18s',
                background: comment.trim() ? C.matchPink : C.track,
                color: comment.trim() ? C.cream : C.placeholder,
              }}
            >
              Enviar avaliação
            </div>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}
