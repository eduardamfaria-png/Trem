import { C } from '@/lib/theme';

/** Cabeçalho com logo e ações, usado nas telas de Feed e Explorar. */
export default function AppHeader() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        zIndex: 5,
        background: C.cream,
        padding: '6px 20px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `1.5px solid ${C.hairline}`,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/matchy-logo-magenta.png" alt="Matchy." style={{ height: 24, width: 'auto' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 12,
            background: C.card,
            border: `1.5px solid ${C.hairline}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: C.plumSoft,
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          ?
        </div>
        <div style={{ position: 'relative', width: 36, height: 36, borderRadius: 12, background: C.card, border: `1.5px solid ${C.hairline}` }}>
          <div
            style={{
              position: 'absolute',
              top: -3,
              right: -3,
              width: 16,
              height: 16,
              borderRadius: 999,
              background: C.glowOrange,
              color: C.cream,
              fontSize: 10,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            3
          </div>
        </div>
      </div>
    </div>
  );
}
