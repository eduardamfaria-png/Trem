'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PhoneFrame from '@/components/PhoneFrame';
import StatusBar from '@/components/StatusBar';
import { C, FONT } from '@/lib/theme';
import { writeRole, type Role } from '@/lib/role';

type Step = 'intro' | 'form' | 'quiz' | 'done';

const NICHOS = ['Beleza', 'Lifestyle', 'Bens de Consumo'];

function questions(creator: boolean) {
  return [
    { t: 'Qual causa mais move o seu conteúdo?', h: 'Isso pesa muito no match.', o: ['Sustentabilidade', 'Diversidade e representatividade', 'Saúde mental e bem-estar', 'Consumo consciente'], k: 'Causa' },
    { t: creator ? 'Como você fala com o seu público?' : 'Como a marca fala com o público?', h: 'Escolha o tom que soa mais natural.', o: ['Descontraída e engraçada', 'Calorosa e próxima', 'Direta e informativa', 'Elegante e minimalista'], k: 'Tom' },
    { t: 'Qual estética visual te representa?', h: 'Pense no feed inteiro, não em um post.', o: ['Colorido e vibrante', 'Clean e minimalista', 'Retrô e nostálgico', 'Natural e terroso'], k: 'Estética' },
    { t: creator ? 'Que tipo de parceria você quer?' : 'Que tipo de parceria vocês buscam?', h: 'Pode mudar depois nas preferências.', o: ['Campanha pontual', 'Embaixadora de longo prazo', 'Cocriação de produto', 'Permuta e recebidos'], k: 'Parceria' },
    { t: creator ? 'Qual é o seu ritmo de conteúdo?' : 'Qual ritmo vocês esperam?', h: 'Sem julgamento — só alinhamento.', o: ['Todos os dias', 'Algumas vezes por semana', 'Uma vez por semana', 'Quando faz sentido'], k: 'Ritmo' },
    { t: 'O que não pode faltar numa parceria?', h: 'Última pergunta.', o: ['Liberdade criativa', 'Briefing claro', 'Remuneração justa', 'Alinhamento de valores'], k: 'Essencial' },
  ];
}

const labelStyle = {
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '.18em',
  textTransform: 'uppercase' as const,
  color: C.muted,
};

const fieldLabel = { ...labelStyle, letterSpacing: '.14em' };

const inputStyle = {
  width: '100%',
  background: C.card,
  border: `1.5px solid ${C.hairline}`,
  borderRadius: 18,
  padding: '15px 18px',
  fontSize: 16,
  color: C.plum,
  outline: 'none',
};

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('intro');
  const [role, setRole] = useState<Role | null>(null);
  const [qi, setQi] = useState(0);
  const [name, setName] = useState('');
  const [nicho, setNicho] = useState<string | null>(null);
  const [ig, setIg] = useState('');
  const [tt, setTt] = useState('');
  const [about, setAbout] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);

  const creator = role === 'creator';
  const qs = questions(creator);
  const q = qs[qi] ?? qs[0];
  const picked = answers[qi];

  function advance() {
    if (step === 'form') {
      setStep('quiz');
      setQi(0);
      return;
    }
    if (step !== 'quiz') return;
    if (qi >= qs.length - 1) setStep('done');
    else setQi(qi + 1);
  }

  function goBack() {
    if (step === 'form') {
      setStep('intro');
      setRole(null);
      return;
    }
    if (step === 'quiz') {
      if (qi === 0) setStep('form');
      else setQi(qi - 1);
    }
  }

  function choose(i: number, label: string) {
    const next = answers.slice();
    next[i] = label;
    setAnswers(next);
    setTimeout(advance, 260);
  }

  function pick(r: Role) {
    setRole(r);
    writeRole(r);
    setStep('form');
  }

  function restart() {
    setStep('intro');
    setRole(null);
    setQi(0);
    setAnswers([]);
    setName('');
    setNicho(null);
    setIg('');
    setTt('');
    setAbout('');
  }

  const summary = [
    { k: creator ? 'Nome' : 'Empresa', v: name || (creator ? 'Sua criadora' : 'Sua marca') },
    { k: creator ? 'Nicho' : 'Segmento', v: nicho || NICHOS[0] },
    { k: 'Tom', v: answers[1] || '—' },
    { k: 'Estética', v: answers[2] || '—' },
  ];

  const backButton = (
    <div
      onClick={goBack}
      style={{
        width: 38,
        height: 38,
        borderRadius: 999,
        border: `1.5px solid ${C.hairline}`,
        background: C.card,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: C.plum,
        fontSize: 17,
        flex: 'none',
      }}
    >
      ←
    </div>
  );

  return (
    <PhoneFrame padding="40px 24px">
      <StatusBar color={step === 'done' ? C.cream : C.plum} height={52} zIndex={5} />

      {step === 'intro' && (
        <div style={{ position: 'absolute', inset: 0, padding: '92px 28px 34px', display: 'flex', flexDirection: 'column' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/matchy-logo-magenta.png" alt="Matchy." style={{ height: 38, width: 'auto', alignSelf: 'flex-start' }} />
          <h1
            style={{
              fontFamily: FONT.display,
              fontWeight: 800,
              fontSize: 44,
              lineHeight: 1.14,
              letterSpacing: '.02em',
              color: C.plum,
              margin: '34px 0 0',
              textWrap: 'pretty',
            }}
          >
            O match certo
            <br />
            existe.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.5, color: C.plumSoft, margin: '16px 0 0', maxWidth: 290 }}>
            Criadoras e marcas que combinam de verdade — em valores, tom e estética.
          </p>

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={labelStyle}>Como você entra</div>

            <div
              className="h-pink"
              onClick={() => pick('creator')}
              style={{
                background: C.card,
                border: `1.5px solid ${C.hairline}`,
                borderRadius: 24,
                padding: '20px 22px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                transition: 'border-color .18s, transform .18s',
              }}
            >
              <div style={{ width: 46, height: 46, borderRadius: 14, background: C.blush, flex: 'none' }} />
              <div>
                <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 21, letterSpacing: '.02em', color: C.matchPink }}>
                  Sou criadora
                </div>
                <div style={{ fontSize: 14, color: C.plumSoft, lineHeight: 1.35 }}>Quero fechar parcerias com a minha cara</div>
              </div>
            </div>

            <div
              className="h-orange"
              onClick={() => pick('brand')}
              style={{
                background: C.card,
                border: `1.5px solid ${C.hairline}`,
                borderRadius: 24,
                padding: '20px 22px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                transition: 'border-color .18s, transform .18s',
              }}
            >
              <div style={{ width: 46, height: 46, borderRadius: 14, background: C.glowOrange, flex: 'none' }} />
              <div>
                <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 21, letterSpacing: '.02em', color: C.matchPink }}>
                  Sou marca
                </div>
                <div style={{ fontSize: 14, color: C.plumSoft, lineHeight: 1.35 }}>Quero criadoras alinhadas ao meu produto</div>
              </div>
            </div>

            <div style={{ textAlign: 'center', fontSize: 14, color: C.plumSoft, paddingTop: 6 }}>
              Já tem conta?{' '}
              <a href="/feed" style={{ fontWeight: 600 }}>
                Entrar
              </a>
            </div>
          </div>
        </div>
      )}

      {step === 'form' && (
        <div style={{ position: 'absolute', inset: 0, padding: '64px 28px 30px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {backButton}
            <div style={labelStyle}>Passo 1 de 3</div>
          </div>
          <h2
            style={{
              fontFamily: FONT.display,
              fontWeight: 700,
              fontSize: 30,
              lineHeight: 1.22,
              letterSpacing: '.02em',
              color: C.matchPink,
              margin: '24px 0 6px',
            }}
          >
            {creator ? 'Conta um pouco de você' : 'Conta um pouco da marca'}
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.5, color: C.plumSoft, margin: '0 0 22px' }}>
            {creator ? 'Só o essencial para as marcas te encontrarem.' : 'Só o essencial para as criadoras te encontrarem.'}
          </p>

          <div className="scr" style={{ display: 'flex', flexDirection: 'column', gap: 18, overflowY: 'auto', paddingBottom: 8 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={fieldLabel}>{creator ? 'Seu nome' : 'Nome da empresa'}</div>
              <input
                className="f-pink"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={creator ? 'Ex.: Marina Duarte' : 'Ex.: Casa Verde Cosméticos'}
                style={inputStyle}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={fieldLabel}>{creator ? 'Seu nicho' : 'Segmento'}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
                {NICHOS.map((label) => {
                  const on = nicho === label;
                  return (
                    <div
                      key={label}
                      onClick={() => setNicho(label)}
                      style={{
                        padding: '11px 18px',
                        borderRadius: 999,
                        fontSize: 15,
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all .16s',
                        background: on ? C.blush : C.card,
                        border: `1.5px solid ${on ? C.matchPink : C.hairline}`,
                        color: on ? C.plum : C.plumSoft,
                      }}
                    >
                      {label}
                    </div>
                  );
                })}
              </div>
            </div>

            {creator && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={fieldLabel}>Redes sociais</div>
                {[
                  { label: 'Instagram', value: ig, set: setIg },
                  { label: 'TikTok', value: tt, set: setTt },
                ].map((f) => (
                  <div
                    key={f.label}
                    className="f-pink"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      background: C.card,
                      border: `1.5px solid ${C.hairline}`,
                      borderRadius: 18,
                      padding: '15px 18px',
                    }}
                  >
                    <span style={{ fontSize: 15, color: C.muted, fontWeight: 500 }}>{f.label}</span>
                    <input
                      value={f.value}
                      onChange={(e) => f.set(e.target.value)}
                      placeholder="@seuperfil"
                      style={{ flex: 1, border: 'none', background: 'transparent', fontSize: 16, color: C.plum, outline: 'none', minWidth: 0 }}
                    />
                  </div>
                ))}
              </div>
            )}

            {!creator && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={fieldLabel}>Sobre a marca</div>
                <textarea
                  className="f-pink"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Em duas linhas: o que vocês fazem e para quem."
                  style={{ ...inputStyle, height: 104, resize: 'none', lineHeight: 1.45 }}
                />
              </div>
            )}
          </div>

          <div
            className="h-cta"
            onClick={advance}
            style={{
              marginTop: 'auto',
              background: C.matchPink,
              color: C.cream,
              borderRadius: 999,
              padding: 18,
              textAlign: 'center',
              fontSize: 17,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background .18s',
            }}
          >
            Continuar
          </div>
        </div>
      )}

      {step === 'quiz' && (
        <div style={{ position: 'absolute', inset: 0, padding: '64px 28px 30px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {backButton}
            <div style={{ flex: 1, height: 8, borderRadius: 999, background: C.track, overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  borderRadius: 999,
                  background: C.matchPink,
                  transition: 'width .35s ease',
                  width: `${Math.round(((qi + 1) / qs.length) * 100)}%`,
                }}
              />
            </div>
          </div>
          <div style={{ ...labelStyle, margin: '26px 0 0' }}>
            Pergunta {qi + 1} de {qs.length}
          </div>
          <h2
            style={{
              fontFamily: FONT.display,
              fontWeight: 700,
              fontSize: 30,
              lineHeight: 1.22,
              letterSpacing: '.02em',
              color: C.matchPink,
              margin: '10px 0 0',
              textWrap: 'pretty',
            }}
          >
            {q.t}
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.5, color: C.plumSoft, margin: '10px 0 0' }}>{q.h}</p>

          <div style={{ marginTop: 26, display: 'flex', flexDirection: 'column', gap: 11 }}>
            {q.o.map((label) => {
              const on = picked === label;
              return (
                <div
                  key={label}
                  onClick={() => choose(qi, label)}
                  style={{
                    borderRadius: 20,
                    padding: '17px 20px',
                    fontSize: 16,
                    fontWeight: 500,
                    lineHeight: 1.3,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    transition: 'all .16s',
                    background: on ? C.blush : C.card,
                    border: `1.5px solid ${on ? C.matchPink : C.hairline}`,
                    color: on ? C.plum : C.plumSoft,
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 999,
                      flex: 'none',
                      border: `2px solid ${on ? C.matchPink : C.hairlineDeep}`,
                      background: on ? C.matchPink : 'transparent',
                    }}
                  />
                  <span>{label}</span>
                </div>
              );
            })}
          </div>

          <div
            onClick={advance}
            style={{
              marginTop: 'auto',
              borderRadius: 999,
              padding: 18,
              textAlign: 'center',
              fontSize: 17,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all .18s',
              background: picked ? C.matchPink : C.track,
              color: picked ? C.cream : C.placeholder,
            }}
          >
            {qi >= qs.length - 1 ? 'Criar meu perfil' : 'Continuar'}
          </div>
        </div>
      )}

      {step === 'done' && (
        <div
          className="riseIn"
          style={{ position: 'absolute', inset: 0, background: C.matchPink, padding: '76px 28px 34px', display: 'flex', flexDirection: 'column' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/matchy-icone-app.png" alt="" style={{ width: 64, height: 64, borderRadius: 18, alignSelf: 'flex-start' }} />
          <div style={{ fontFamily: FONT.script, fontSize: 40, color: C.blush, marginTop: 22, lineHeight: 1 }}>
            {creator ? 'Bem-vinda,' : 'Bem-vindos,'}
          </div>
          <h1
            style={{
              fontFamily: FONT.display,
              fontWeight: 800,
              fontSize: 42,
              lineHeight: 1.14,
              letterSpacing: '.02em',
              color: C.cream,
              margin: '8px 0 0',
              textWrap: 'pretty',
            }}
          >
            Seu perfil está pronto.
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.5, color: C.blushSoft, margin: '14px 0 0', maxWidth: 280 }}>
            Já separamos os primeiros perfis com a sua cara. Dá uma olhada.
          </p>

          <div style={{ marginTop: 26, background: C.cream, borderRadius: 24, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={labelStyle}>Seu perfil</div>
            {summary.map((row) => (
              <div key={row.k} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'baseline' }}>
                <span style={{ fontSize: 14, color: C.plumSoft, flex: 'none' }}>{row.k}</span>
                <span style={{ fontSize: 15, fontWeight: 600, color: C.plum, textAlign: 'right' }}>{row.v}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div
              className="h-blush"
              onClick={() => router.push('/feed')}
              style={{
                background: C.cream,
                color: C.matchPink,
                borderRadius: 999,
                padding: 18,
                textAlign: 'center',
                fontSize: 17,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background .18s',
              }}
            >
              Ver meus matches
            </div>
            <div onClick={restart} style={{ textAlign: 'center', fontSize: 14, color: C.blushSoft, cursor: 'pointer' }}>
              Refazer onboarding
            </div>
          </div>
        </div>
      )}
    </PhoneFrame>
  );
}
